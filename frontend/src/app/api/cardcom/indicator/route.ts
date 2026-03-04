import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { Wine } from "@/models/Wine";
import { getLowProfileResult } from "@/lib/cardcom";

/** Extract the transaction ID from the webhook payload (used only as a fallback ID). */
function extractWebhookTransactionId(data: Record<string, unknown>): string {
  return String(
    data.TranzactionId || data.tranzactionId || data.InternalDealNumber || data.internalDealNumber || ""
  );
}

export async function POST(request: Request) {
  let webhookData: Record<string, unknown> = {};

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    webhookData = await request.json();
  } else {
    const formData = await request.formData();
    formData.forEach((value, key) => {
      webhookData[key] = value;
    });
  }

  console.info("Cardcom webhook received:", {
    ResponseCode: webhookData.ResponseCode,
    LowProfileId: webhookData.LowProfileId || webhookData.LowProfileCode,
    ReturnValue: webhookData.ReturnValue,
  });

  const lowProfileCode =
    (webhookData.LowProfileId as string) ||
    (webhookData.LowProfileCode as string) ||
    (webhookData.lowprofilecode as string);

  const returnValue =
    (webhookData.ReturnValue as string) ||
    (webhookData.returnValue as string) ||
    "";

  if (!lowProfileCode) {
    console.error("Indicator: missing LowProfileCode in webhook");
    return NextResponse.json({ status: "ok" });
  }

  try {
    await connectDB();

    // Find order by lowProfileCode or by orderId (ReturnValue)
    const targetOrder =
      (await Order.findOne({ lowProfileCode })) ||
      (returnValue ? await Order.findOne({ orderId: returnValue }) : null);

    if (!targetOrder) {
      console.error(
        `Indicator: no order found for lpCode=${lowProfileCode} returnValue=${returnValue}`
      );
      return NextResponse.json({ status: "ok" });
    }

    // Primary verification: check the webhook payload itself.
    // Cardcom v11 webhooks include ResponseCode + TranzactionInfo directly.
    const webhookTransactionId = extractWebhookTransactionId(webhookData);

    // Secondary verification: call GetLpResult API as cross-check.
    // Note: this API returns 5096 on test terminal 1000, so we don't fail
    // the payment if GetLpResult is unavailable but the webhook indicates success.
    let apiVerified = false;
    let apiTransactionId = "";
    let apiSumBilled: number | null = null;
    try {
      const lpResult = await getLowProfileResult(lowProfileCode);
      apiVerified = lpResult.approved;
      apiTransactionId = lpResult.cardcomTransactionId;
      apiSumBilled = lpResult.sumBilled;
      console.info(
        `Indicator: GetLpResult approved=${apiVerified} txId=${apiTransactionId} sum=${apiSumBilled}`
      );
    } catch (err) {
      // If the API call fails entirely (network error, timeout), do NOT
      // fall back to the unauthenticated webhook data. Fail closed.
      // The order stays PENDING and can be manually verified in the admin panel.
      console.warn("Indicator: GetLpResult call failed, payment NOT approved (fail-closed):", err);
    }

    // Payment is approved ONLY if the server-to-server API check confirms it.
    // The webhook data alone is never trusted (endpoint is unauthenticated).
    const approved = apiVerified;
    const transactionId = apiTransactionId || webhookTransactionId;

    // Verify the charged amount matches the order total
    if (approved && apiSumBilled !== null) {
      const expectedShekel = targetOrder.totalAgorot / 100;
      if (Math.abs(apiSumBilled - expectedShekel) > 0.01) {
        console.error(
          `Indicator: amount mismatch for order ${targetOrder.orderId} — ` +
          `expected ₪${expectedShekel}, charged ₪${apiSumBilled}`
        );
        await Order.findOneAndUpdate(
          { orderId: targetOrder.orderId, status: "PENDING" },
          { $set: { status: "FAILED" } }
        );
        return NextResponse.json({ status: "ok" });
      }
    }

    if (!approved) {
      console.warn(
        `Indicator: payment not approved for order ${targetOrder.orderId} ` +
        `(api=${apiVerified})`
      );
      const failed = await Order.findOneAndUpdate(
        { orderId: targetOrder.orderId, status: "PENDING" },
        { $set: { status: "FAILED" } },
        { new: true }
      );

      // Restore stock that was reserved at checkout
      if (failed) {
        await Promise.all(
          failed.items.map((item) =>
            Wine.updateOne(
              { slug: item.wineSlug },
              { $inc: { stock: item.quantity } }
            )
          )
        );
        console.info(
          `Order ${failed.orderId} marked FAILED, stock restored`
        );
      }
      return NextResponse.json({ status: "ok" });
    }

    // Stock was already reserved at checkout — just mark order as PAID
    const updated = await Order.findOneAndUpdate(
      { orderId: targetOrder.orderId, status: "PENDING" },
      {
        $set: {
          status: "PAID",
          cardcomTransactionId: transactionId,
          paymentVerifiedAt: new Date(),
        },
      },
      { new: true }
    );

    if (updated) {
      console.info(
        `Order ${updated.orderId} marked as PAID (tx: ${transactionId})`
      );
    } else {
      console.info(
        `Order ${targetOrder.orderId} already processed, skipping`
      );
    }
  } catch (err) {
    console.error("Indicator error:", err);
  }

  return NextResponse.json({ status: "ok" });
}

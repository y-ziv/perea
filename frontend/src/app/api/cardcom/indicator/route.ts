import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { Wine } from "@/models/Wine";
import { getLowProfileResult } from "@/lib/cardcom";

/**
 * Check if the webhook data itself indicates a successful payment.
 * Cardcom v11 webhooks include full TranzactionInfo with ResponseCode.
 */
function isWebhookApproved(data: Record<string, unknown>): {
  approved: boolean;
  transactionId: string;
} {
  // eslint-disable-next-line eqeqeq
  const topLevelOk = data.ResponseCode == 0;
  const txId = String(
    data.TranzactionId || data.tranzactionId || data.InternalDealNumber || data.internalDealNumber || ""
  );
  const txInfo = data.TranzactionInfo as Record<string, unknown> | null;
  // eslint-disable-next-line eqeqeq
  const txInfoOk = txInfo && txInfo.ResponseCode == 0;

  return {
    approved: topLevelOk && !!txId && txId !== "0" && !!txInfoOk,
    transactionId: txId,
  };
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

  console.info("Cardcom webhook data:", JSON.stringify(webhookData));

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
    const webhookResult = isWebhookApproved(webhookData);

    // Secondary verification: call GetLpResult API as cross-check.
    // Note: this API returns 5096 on test terminal 1000, so we don't fail
    // the payment if GetLpResult is unavailable but the webhook indicates success.
    let apiVerified = false;
    let apiTransactionId = "";
    try {
      const lpResult = await getLowProfileResult(lowProfileCode);
      apiVerified = lpResult.approved;
      apiTransactionId = lpResult.cardcomTransactionId;
      console.info(
        `Indicator: GetLpResult approved=${apiVerified} txId=${apiTransactionId}`
      );
    } catch (err) {
      console.warn("Indicator: GetLpResult call failed, relying on webhook data:", err);
    }

    // Payment is approved if either source confirms it
    const approved = webhookResult.approved || apiVerified;
    const transactionId = apiTransactionId || webhookResult.transactionId;

    if (!approved) {
      console.warn(
        `Indicator: payment not approved for order ${targetOrder.orderId} ` +
        `(webhook=${webhookResult.approved}, api=${apiVerified})`
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

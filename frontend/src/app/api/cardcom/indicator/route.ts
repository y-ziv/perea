import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { Wine } from "@/models/Wine";

export async function POST(request: Request) {
  // Parse webhook body — log it to see what Cardcom sends
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

  console.log("Cardcom webhook received:", JSON.stringify(webhookData, null, 2));

  // Extract fields — Cardcom v11 webhook fields
  const lowProfileCode =
    (webhookData.LowProfileId as string) ||
    (webhookData.LowProfileCode as string) ||
    (webhookData.lowprofilecode as string);

  const responseCode =
    webhookData.ResponseCode ?? webhookData.ResponeCode ?? webhookData.responseCode;

  const dealResponse =
    webhookData.DealResponse ?? webhookData.dealResponse;

  const internalDealNumber =
    (webhookData.InternalDealNumber as string) ||
    (webhookData.internalDealNumber as string) ||
    "";

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

    const order = await Order.findOne({ lowProfileCode });
    if (!order) {
      // Try finding by ReturnValue (orderId)
      const orderByReturn = returnValue
        ? await Order.findOne({ orderId: returnValue })
        : null;
      if (!orderByReturn) {
        console.error(
          `Indicator: no order found for lpCode=${lowProfileCode} returnValue=${returnValue}`
        );
        return NextResponse.json({ status: "ok" });
      }
    }

    const targetOrder = order || (await Order.findOne({ orderId: returnValue }));
    if (!targetOrder) {
      return NextResponse.json({ status: "ok" });
    }

    // Check if payment was successful from webhook data
    // Cardcom sends ResponseCode=0 and/or DealResponse=0 on success
    const isApproved =
      Number(responseCode) === 0 || Number(dealResponse) === 0;

    if (!isApproved) {
      console.log(
        `Indicator: payment not approved for order ${targetOrder.orderId} (ResponseCode=${responseCode}, DealResponse=${dealResponse})`
      );
      await Order.findOneAndUpdate(
        { orderId: targetOrder.orderId, status: "PENDING" },
        { $set: { status: "FAILED" } }
      );
      return NextResponse.json({ status: "ok" });
    }

    // Atomic PENDING → PAID
    const updated = await Order.findOneAndUpdate(
      { orderId: targetOrder.orderId, status: "PENDING" },
      {
        $set: {
          status: "PAID",
          cardcomTransactionId: String(internalDealNumber),
          paymentVerifiedAt: new Date(),
        },
      },
      { new: true }
    );

    if (updated) {
      // Decrement stock for each item
      for (const item of updated.items) {
        await Wine.findOneAndUpdate(
          { slug: item.wineSlug, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } }
        );
      }
      console.log(
        `Order ${targetOrder.orderId} marked as PAID, stock updated (tx: ${internalDealNumber})`
      );
    } else {
      console.log(
        `Order ${targetOrder.orderId} already processed, skipping`
      );
    }
  } catch (err) {
    console.error("Indicator error:", err);
  }

  return NextResponse.json({ status: "ok" });
}

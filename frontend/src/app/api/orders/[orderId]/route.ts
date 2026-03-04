import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { getLowProfileResult } from "@/lib/cardcom";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  await connectDB();

  const order = await Order.findOne({ orderId })
    .select("orderId status lowProfileCode totalAgorot")
    .lean();

  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // If still PENDING, try to verify with Cardcom
  if (order.status === "PENDING") {
    const url = new URL(request.url);
    const lpCode =
      order.lowProfileCode || url.searchParams.get("lowprofilecode");

    if (lpCode) {
      let verified = false;
      let txId = "";

      // Method 1: GetLpResult API (works in production)
      try {
        const result = await getLowProfileResult(lpCode);
        if (result.approved) {
          verified = true;
          txId = result.cardcomTransactionId;
        }
      } catch {
        // Sandbox may not support GetLpResult
      }

      // Method 2: Cardcom redirect params (fallback for sandbox/localhost)
      if (!verified) {
        const responseCode = url.searchParams.get("ResponseCode");
        const internalDealNumber = url.searchParams.get("internalDealNumber");
        const redirectLpCode = url.searchParams.get("lowprofilecode");

        if (
          responseCode === "0" &&
          internalDealNumber &&
          redirectLpCode === lpCode
        ) {
          verified = true;
          txId = internalDealNumber;
          console.log(
            `Order ${orderId} verified via redirect params (tx: ${txId})`
          );
        }
      }

      if (verified) {
        const updated = await Order.findOneAndUpdate(
          { orderId, status: "PENDING" },
          {
            $set: {
              status: "PAID",
              cardcomTransactionId: txId,
              paymentVerifiedAt: new Date(),
            },
          },
          { new: true }
        );
        if (updated) {
          console.log(`Order ${orderId} marked as PAID (tx: ${txId})`);
          return NextResponse.json({ orderId, status: "PAID" });
        }
      }
    }
  }

  return NextResponse.json({ orderId: order.orderId, status: order.status });
}

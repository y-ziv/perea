import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { getLowProfileIndicator } from "@/lib/cardcom";

export async function POST(request: Request) {
  // Always return 200 to Cardcom first, then process
  const formData = await request.formData();
  const lowProfileCode = formData.get("lowprofilecode") as string;

  if (!lowProfileCode) {
    console.error("Indicator: missing lowprofilecode");
    return NextResponse.json({ status: "ok" });
  }

  try {
    await connectDB();

    // Find the order by lowProfileCode
    const order = await Order.findOne({ lowProfileCode });
    if (!order) {
      console.error(`Indicator: no order found for lowProfileCode ${lowProfileCode}`);
      return NextResponse.json({ status: "ok" });
    }

    // Verify via GetLowProfileIndicator
    const result = await getLowProfileIndicator(lowProfileCode);

    if (!result.approved) {
      console.log(`Indicator: payment not approved for order ${order.orderId}`);
      await Order.findOneAndUpdate(
        { orderId: order.orderId, status: "PENDING" },
        { $set: { status: "FAILED" } }
      );
      return NextResponse.json({ status: "ok" });
    }

    // Verify amount — convert Cardcom sum (ILS float) to agorot with Math.round
    const billedAgorot = Math.round(result.sumBilled * 100);
    if (billedAgorot !== order.totalAgorot) {
      console.error(
        `Indicator: amount mismatch for order ${order.orderId}. Expected ${order.totalAgorot} agorot, got ${billedAgorot}`
      );
      await Order.findOneAndUpdate(
        { orderId: order.orderId, status: "PENDING" },
        { $set: { status: "FAILED" } }
      );
      return NextResponse.json({ status: "ok" });
    }

    // Verify ReturnValue matches orderId
    if (result.returnValue !== order.orderId) {
      console.error(
        `Indicator: orderId mismatch. Expected ${order.orderId}, got ${result.returnValue}`
      );
      return NextResponse.json({ status: "ok" });
    }

    // Atomic update — only transitions PENDING → PAID (idempotent)
    const updated = await Order.findOneAndUpdate(
      { orderId: order.orderId, status: "PENDING" },
      {
        $set: {
          status: "PAID",
          cardcomTransactionId: result.cardcomTransactionId,
          paymentVerifiedAt: new Date(),
        },
      },
      { new: true }
    );

    if (updated) {
      // First time PENDING → PAID transition
      console.log(`Order ${order.orderId} marked as PAID (tx: ${result.cardcomTransactionId})`);
      // TODO: send email notification
    } else {
      // Already processed (idempotent — no action needed)
      console.log(`Order ${order.orderId} already processed, skipping`);
    }
  } catch (err) {
    console.error("Indicator error:", err);
  }

  return NextResponse.json({ status: "ok" });
}

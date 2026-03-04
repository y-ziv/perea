import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { orderIdSchema } from "@/lib/validations";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const parsed = orderIdSchema.safeParse(orderId);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    await connectDB();
    const order = await Order.findOne({ orderId: parsed.data })
      .select("orderId status")
      .lean();

    if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ orderId: order.orderId, status: order.status });
  } catch (error) {
    console.error("GET /api/orders/[orderId]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

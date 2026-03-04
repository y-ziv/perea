import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { withAdminAuth } from "@/lib/admin-auth";
import { orderIdSchema } from "@/lib/validations";

export const GET = withAdminAuth(async (_request, { params }) => {
  try {
    const { orderId } = await params;
    const parsed = orderIdSchema.safeParse(orderId);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    await connectDB();
    const order = await Order.findOne({ orderId: parsed.data }).lean();

    if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("GET /api/admin/orders/[orderId]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

export const DELETE = withAdminAuth(async (_request, { params }) => {
  try {
    const { orderId } = await params;
    const parsed = orderIdSchema.safeParse(orderId);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    await connectDB();
    const order = await Order.findOne({ orderId: parsed.data });

    if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (order.status === "PAID") {
      return NextResponse.json(
        { error: "Cannot delete a paid order" },
        { status: 400 }
      );
    }

    await Order.findOneAndDelete({ orderId: parsed.data });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/orders/[orderId]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

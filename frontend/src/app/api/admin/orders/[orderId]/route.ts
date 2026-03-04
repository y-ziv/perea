import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { Wine } from "@/models/Wine";
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

    await Order.findOneAndDelete({ orderId: parsed.data });

    // Restore reserved stock only for unpaid orders (paid = items were sold)
    if (order.status !== "PAID") {
      await Promise.all(
        order.items.map((item) =>
          Wine.updateOne(
            { slug: item.wineSlug },
            { $inc: { stock: item.quantity } }
          )
        )
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/orders/[orderId]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

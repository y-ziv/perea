import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { withAdminAuth } from "@/lib/admin-auth";
import { orderStatusSchema } from "@/lib/validations";

export const GET = withAdminAuth(async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const statusRaw = searchParams.get("status");
    const parsed = orderStatusSchema.safeParse(statusRaw || undefined);
    const status = parsed.success ? parsed.data : undefined;

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 50));
    const skip = (page - 1) * limit;

    const filter = status ? { status } : {};
    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(filter),
    ]);

    return NextResponse.json({ orders, total, page, limit });
  } catch (error) {
    console.error("GET /api/admin/orders:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

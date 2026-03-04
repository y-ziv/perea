import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { connectDB } from "@/lib/mongodb";
import { Wine } from "@/models/Wine";
import { Order, type IOrderItem } from "@/models/Order";
import { createLowProfile } from "@/lib/cardcom";
import { checkoutBodySchema } from "@/lib/validations";
import { env } from "@/lib/env";

/** Restore previously reserved stock (best-effort rollback). */
async function restoreStock(reserved: { slug: string; quantity: number }[]) {
  await Promise.all(
    reserved.map((r) =>
      Wine.updateOne({ slug: r.slug }, { $inc: { stock: r.quantity } })
    )
  );
}

export async function POST(request: Request) {
  // CSRF protection: verify the request originates from our own domain
  const origin = request.headers.get("origin");
  const baseUrl = env.BASE_URL;
  try {
    if (!origin || new URL(origin).origin !== new URL(baseUrl).origin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const raw = await request.json();
    const parsed = checkoutBodySchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { items, customer, deliveryMethod } = parsed.data;

    await connectDB();

    // Fetch wines from DB — never trust client prices
    const slugs = items.map((i) => i.wineSlug);
    const wines = await Wine.find({ slug: { $in: slugs } }).lean();
    const wineMap = new Map(wines.map((w) => [w.slug, w]));

    // Validate all wines exist, have price, and atomically reserve stock
    const orderItems: IOrderItem[] = [];
    let totalAgorot = 0;
    const reservedItems: { slug: string; quantity: number }[] = [];

    for (const item of items) {
      const wine = wineMap.get(item.wineSlug);
      if (!wine) {
        // Rollback any already-reserved stock
        await restoreStock(reservedItems);
        return NextResponse.json(
          { error: `Wine not found: ${item.wineSlug}` },
          { status: 400 }
        );
      }
      if (wine.priceAgorot <= 0) {
        await restoreStock(reservedItems);
        return NextResponse.json(
          { error: `Wine has no price: ${item.wineSlug}` },
          { status: 400 }
        );
      }

      // Atomically decrement stock — prevents overselling
      const reserved = await Wine.findOneAndUpdate(
        { slug: item.wineSlug, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { new: true }
      );

      if (!reserved) {
        await restoreStock(reservedItems);
        return NextResponse.json(
          { error: `Insufficient stock for ${wine.name}` },
          { status: 400 }
        );
      }

      reservedItems.push({ slug: item.wineSlug, quantity: item.quantity });

      const lineTotal = wine.priceAgorot * item.quantity;
      totalAgorot += lineTotal;

      orderItems.push({
        wineId: wine._id,
        wineSlug: wine.slug,
        name: wine.name,
        priceAgorot: wine.priceAgorot,
        quantity: item.quantity,
      });
    }

    // Create order
    const orderId = randomUUID();

    const order = await Order.create({
      orderId,
      status: "PENDING",
      items: orderItems,
      totalAgorot,
      customer,
      deliveryMethod,
    });

    // Create Cardcom Low Profile
    try {
      const { url, lowProfileCode } = await createLowProfile({
        totalAgorot,
        orderId,
        customerName: customer.name,
        customerEmail: customer.email,
        webhookUrl: `${baseUrl}/api/cardcom/indicator`,
        successUrl: `${baseUrl}/checkout/success?orderId=${orderId}`,
        failureUrl: `${baseUrl}/checkout/failure?orderId=${orderId}`,
        products: orderItems.map((item) => ({
          description: item.name,
          priceAgorot: item.priceAgorot,
          quantity: item.quantity,
        })),
      });

      await Order.findByIdAndUpdate(order._id, { lowProfileCode });
      return NextResponse.json({ redirectUrl: url, orderId });
    } catch (err) {
      await Order.findByIdAndUpdate(order._id, { status: "FAILED" });
      await restoreStock(reservedItems);
      console.error("Cardcom error:", err);
      return NextResponse.json(
        { error: "Payment gateway error" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("POST /api/checkout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { connectDB } from "@/lib/mongodb";
import { Wine } from "@/models/Wine";
import { Order } from "@/models/Order";
import { createLowProfile } from "@/lib/cardcom";

interface CheckoutItem {
  wineSlug: string;
  quantity: number;
}

interface CheckoutBody {
  items: CheckoutItem[];
  customer: {
    name: string;
    phone: string;
    email: string;
    address?: string;
    notes?: string;
  };
  deliveryMethod: "pickup" | "shipping";
}

export async function POST(request: Request) {
  const body: CheckoutBody = await request.json();
  const { items, customer, deliveryMethod } = body;

  // Validate required fields
  if (!items?.length || !customer?.name || !customer?.phone || !customer?.email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!["pickup", "shipping"].includes(deliveryMethod)) {
    return NextResponse.json(
      { error: "Invalid delivery method" },
      { status: 400 }
    );
  }

  await connectDB();

  // Fetch wines from DB — never trust client prices
  const slugs = items.map((i) => i.wineSlug);
  const wines = await Wine.find({ slug: { $in: slugs } }).lean();

  const wineMap = new Map(wines.map((w) => [w.slug, w]));

  // Validate all wines exist and have stock
  const orderItems = [];
  let totalAgorot = 0;

  for (const item of items) {
    const wine = wineMap.get(item.wineSlug);
    if (!wine) {
      return NextResponse.json(
        { error: `Wine not found: ${item.wineSlug}` },
        { status: 400 }
      );
    }
    if (wine.priceAgorot <= 0) {
      return NextResponse.json(
        { error: `Wine has no price: ${item.wineSlug}` },
        { status: 400 }
      );
    }
    if (wine.stock < item.quantity) {
      return NextResponse.json(
        { error: `Insufficient stock for ${wine.name}` },
        { status: 400 }
      );
    }

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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4001";

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

    // Store lowProfileCode
    await Order.findByIdAndUpdate(order._id, { lowProfileCode });

    return NextResponse.json({ redirectUrl: url, orderId });
  } catch (err) {
    // Mark order as failed if Cardcom creation fails
    await Order.findByIdAndUpdate(order._id, { status: "FAILED" });
    console.error("Cardcom error:", err);
    return NextResponse.json(
      { error: "Payment gateway error" },
      { status: 500 }
    );
  }
}

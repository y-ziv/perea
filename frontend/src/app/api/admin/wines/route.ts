import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Wine } from "@/models/Wine";
import { revalidatePath } from "next/cache";
import { withAdminAuth } from "@/lib/admin-auth";
import { wineSchema } from "@/lib/validations";

export const GET = withAdminAuth(async () => {
  try {
    await connectDB();
    const wines = await Wine.find().sort({ createdAt: -1 }).limit(500).lean();
    return NextResponse.json(wines);
  } catch (error) {
    console.error("GET /api/admin/wines:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

export const POST = withAdminAuth(async (request) => {
  try {
    const raw = await request.json();
    const parsed = wineSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await connectDB();
    const wine = await Wine.create(parsed.data);

    revalidatePath("/store");
    revalidatePath("/");

    return NextResponse.json(wine, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/wines:", error);
    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "A wine with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

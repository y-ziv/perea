import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Wine } from "@/models/Wine";
import { revalidatePath } from "next/cache";
import { withAdminAuth } from "@/lib/admin-auth";
import { wineUpdateSchema } from "@/lib/validations";

export const GET = withAdminAuth(async (_request, { params }) => {
  try {
    const { slug } = await params;
    await connectDB();
    const wine = await Wine.findOne({ slug }).lean();

    if (!wine) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(wine);
  } catch (error) {
    console.error("GET /api/admin/wines/[slug]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

export const PUT = withAdminAuth(async (request, { params }) => {
  try {
    const { slug } = await params;
    const raw = await request.json();
    const parsed = wineUpdateSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (Object.keys(parsed.data).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    await connectDB();
    const wine = await Wine.findOneAndUpdate({ slug }, { $set: parsed.data }, { new: true });

    if (!wine) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    revalidatePath("/store");
    revalidatePath("/");

    return NextResponse.json(wine);
  } catch (error) {
    console.error("PUT /api/admin/wines/[slug]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

export const DELETE = withAdminAuth(async (_request, { params }) => {
  try {
    const { slug } = await params;
    await connectDB();
    const wine = await Wine.findOneAndDelete({ slug });

    if (!wine) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    revalidatePath("/store");
    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/wines/[slug]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
});

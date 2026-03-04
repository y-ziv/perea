import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Wine } from "@/models/Wine";
import { revalidatePath } from "next/cache";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  await connectDB();
  const wine = await Wine.findOne({ slug }).lean();

  if (!wine) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(wine);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  await connectDB();
  const body = await request.json();

  const wine = await Wine.findOneAndUpdate({ slug }, body, { new: true });

  if (!wine) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  revalidatePath("/store");
  revalidatePath("/");

  return NextResponse.json(wine);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  await connectDB();
  const wine = await Wine.findOneAndDelete({ slug });

  if (!wine) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  revalidatePath("/store");
  revalidatePath("/");

  return NextResponse.json({ success: true });
}

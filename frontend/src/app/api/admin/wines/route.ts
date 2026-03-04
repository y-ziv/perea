import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Wine } from "@/models/Wine";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const wines = await Wine.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(wines);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await request.json();

  const wine = await Wine.create(body);

  revalidatePath("/store");
  revalidatePath("/");

  return NextResponse.json(wine, { status: 201 });
}

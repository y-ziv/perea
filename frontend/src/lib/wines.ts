import { connectDB } from "@/lib/mongodb";
import { Wine } from "@/models/Wine";
import type { Wine as WineType } from "@/types";

export async function getAllWines(): Promise<WineType[]> {
  await connectDB();
  return Wine.find({ stock: { $gt: 0 } })
    .sort({ featured: -1, createdAt: -1 })
    .limit(200)
    .lean<WineType[]>();
}

export async function getFeaturedWines(): Promise<WineType[]> {
  await connectDB();
  return Wine.find({ featured: true, stock: { $gt: 0 } }).lean<WineType[]>();
}

export async function getWineBySlug(slug: string): Promise<WineType | null> {
  await connectDB();
  return Wine.findOne({ slug }).lean<WineType | null>();
}

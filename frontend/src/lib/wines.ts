import { connectDB } from "@/lib/mongodb";
import { Wine, type IWine } from "@/models/Wine";

export async function getAllWines(): Promise<IWine[]> {
  await connectDB();
  return Wine.find({ stock: { $gt: 0 } }).sort({ featured: -1, createdAt: -1 }).lean();
}

export async function getFeaturedWines(): Promise<IWine[]> {
  await connectDB();
  return Wine.find({ featured: true, stock: { $gt: 0 } }).lean();
}

export async function getWineBySlug(slug: string): Promise<IWine | null> {
  await connectDB();
  return Wine.findOne({ slug }).lean();
}

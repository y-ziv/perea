import { getFeaturedWines } from "@/lib/wines";
import { FeaturedWinesClient } from "./FeaturedWinesClient";

export async function FeaturedWinesSection() {
  let wines;
  try {
    wines = await getFeaturedWines();
  } catch {
    // Graceful degradation: if DB is unavailable (e.g. during build), skip section
    return null;
  }

  const winesData = wines.map((w) => ({
    slug: w.slug,
    name: w.name,
    winery: w.winery,
    country: w.country,
    grape: w.grape,
    year: w.year,
    description: w.description,
    image: w.image,
    priceAgorot: w.priceAgorot,
  }));

  return <FeaturedWinesClient wines={winesData} />;
}

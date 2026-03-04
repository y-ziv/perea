import { getAllWines } from "@/lib/wines";
import { FeaturedWinesClient } from "./FeaturedWinesClient";

export async function FeaturedWinesSection() {
  const wines = await getAllWines();

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

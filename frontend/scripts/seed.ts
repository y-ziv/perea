import mongoose from "mongoose";
import { wines } from "../src/data/wines";
import { Wine } from "../src/models/Wine";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please set MONGODB_URI environment variable");
  process.exit(1);
}

async function seed() {
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected to MongoDB");

  for (const wine of wines) {
    await Wine.findOneAndUpdate(
      { slug: wine.id },
      {
        slug: wine.id,
        name: wine.name,
        nameHe: wine.nameHe,
        winery: wine.winery,
        region: wine.region,
        country: wine.country,
        type: wine.type,
        grape: wine.grape,
        year: wine.year,
        description: wine.description,
        image: wine.image,
        featured: wine.featured ?? false,
        $setOnInsert: { priceAgorot: 0, stock: 10 },
      },
      { upsert: true, new: true }
    );
    console.log(`Upserted: ${wine.name} (${wine.id})`);
  }

  console.log("Seed complete!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

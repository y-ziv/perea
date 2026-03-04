import { readFileSync } from "fs";
import { resolve } from "path";
import mongoose from "mongoose";
import { wines } from "../src/data/wines";
import { Wine } from "../src/models/Wine";

// Load .env.local (tsx doesn't load it automatically like Next.js)
try {
  const envPath = resolve(__dirname, "../.env.local");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex);
    const value = trimmed.slice(eqIndex + 1);
    if (!process.env[key]) process.env[key] = value;
  }
} catch {}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please set MONGODB_URI environment variable");
  process.exit(1);
}

async function seed() {
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected to MongoDB");

  const ops = wines.map((wine) => ({
    updateOne: {
      filter: { slug: wine.slug },
      update: {
        $set: {
          slug: wine.slug,
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
        },
        $setOnInsert: { priceAgorot: 9900, stock: 10 },
      },
      upsert: true,
    },
  }));

  const result = await Wine.bulkWrite(ops);
  console.log(
    `Seed complete! Inserted: ${result.upsertedCount}, Modified: ${result.modifiedCount}`
  );
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

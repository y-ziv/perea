import mongoose, { Schema, type Document } from "mongoose";

export interface IWine extends Document {
  slug: string;
  name: string;
  nameHe?: string;
  winery: string;
  region: "galilee" | "northern-greece";
  country: "Israel" | "Greece";
  type: "red" | "white" | "rosé" | "orange";
  grape: string;
  year?: number;
  description: string;
  image: string;
  featured: boolean;
  priceAgorot: number;
  stock: number;
}

const WineSchema = new Schema<IWine>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    nameHe: { type: String },
    winery: { type: String, required: true },
    region: {
      type: String,
      required: true,
      enum: ["galilee", "northern-greece"],
    },
    country: { type: String, required: true, enum: ["Israel", "Greece"] },
    type: { type: String, required: true, enum: ["red", "white", "rosé", "orange"] },
    grape: { type: String, required: true },
    year: { type: Number },
    description: { type: String, required: true },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
    priceAgorot: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true }
);

export const Wine =
  mongoose.models.Wine || mongoose.model<IWine>("Wine", WineSchema);

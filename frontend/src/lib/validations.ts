import { z } from "zod";

// --- Wine ---

export const wineSchema = z.object({
  name: z.string().min(1),
  nameHe: z.string().optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  winery: z.string().min(1),
  region: z.enum(["galilee", "northern-greece"]),
  country: z.enum(["Israel", "Greece"]),
  type: z.enum(["red", "white", "rosé", "orange"]),
  grape: z.string().min(1),
  year: z.number().int().min(1900).max(2100).optional(),
  description: z.string().min(1),
  descriptionHe: z.string().optional(),
  image: z.string().url().or(z.literal("")),
  priceAgorot: z.number().int().min(0),
  stock: z.number().int().min(0),
  featured: z.boolean().optional(),
});

export const wineUpdateSchema = wineSchema.partial();

// --- Checkout ---

const checkoutItemSchema = z.object({
  wineSlug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  quantity: z.number().int().min(1).max(100),
});

export const checkoutBodySchema = z.object({
  items: z.array(checkoutItemSchema).min(1).max(50),
  customer: z.object({
    name: z.string().min(1).max(200),
    phone: z.string().regex(/^0\d{8,9}$/, "Invalid Israeli phone number"),
    email: z.string().email(),
    address: z.string().max(500).optional(),
    notes: z.string().max(1000).optional(),
  }),
  deliveryMethod: z.enum(["pickup", "shipping"]),
});

// --- Order ID ---

export const orderIdSchema = z
  .string()
  .uuid("Invalid order ID format");

// --- Order status filter ---

export const orderStatusSchema = z
  .enum(["PENDING", "PAID", "FAILED"])
  .optional();

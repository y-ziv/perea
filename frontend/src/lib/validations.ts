import { z } from "zod";

// --- Slug ---

export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with single hyphens");

// --- Wine ---

export const wineSchema = z.object({
  name: z.string().min(1).max(200),

  slug: slugSchema,
  winery: z.string().min(1).max(200),
  region: z.enum(["galilee", "northern-greece"]),
  country: z.enum(["Israel", "Greece"]),
  type: z.enum(["red", "white", "rosé", "orange"]),
  grape: z.string().min(1).max(200),
  year: z.number().int().min(1900).max(2100).optional(),
  description: z.string().min(1).max(5000),

  image: z.string().url("Image must be a valid URL").refine(
    (url) => url.startsWith("https://"),
    "Image must be an HTTPS URL"
  ),
  priceAgorot: z.number().int().min(1, "Price must be at least 1 agora").max(10_000_000),
  stock: z.number().int().min(0),
  featured: z.boolean().optional(),
});

export const wineUpdateSchema = wineSchema.omit({ slug: true }).partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field is required" }
);

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

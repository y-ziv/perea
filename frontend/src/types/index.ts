export type OrderStatus = "PENDING" | "PAID" | "FAILED";
export type DeliveryMethod = "pickup" | "shipping";
export type WineType = "red" | "white" | "rosé" | "orange";
export type WineRegion = "galilee" | "northern-greece";
export type WineCountry = "Israel" | "Greece";

export interface Wine {
  _id: string;
  slug: string;
  name: string;
  winery: string;
  region: WineRegion;
  country: WineCountry;
  type: WineType;
  grape: string;
  year?: number;
  description: string;
  image: string;
  featured: boolean;
  priceAgorot: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  wineSlug: string;
  quantity: number;
  name: string;
  priceAgorot: number;
  image: string;
  stock: number;
}

export interface WineEvent {
  slug: string;
  title: string;
  titleHe?: string;
  date: string;
  time: string;
  description: string;
  longDescription?: string;
  image: string;
  type: "tasting" | "dinner" | "winemaker" | "chef" | "special";
  featured?: boolean;
}

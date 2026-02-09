export interface Wine {
  id: string;
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
  featured?: boolean;
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

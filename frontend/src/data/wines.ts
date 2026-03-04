import type { Wine } from "@/types";

type SeedWine = Omit<Wine, "_id" | "priceAgorot" | "stock" | "featured"> & { featured?: boolean };

const IMG = "/drive-download-20260209T114257Z-1-001";

export const wines: SeedWine[] = [
  {
    slug:"ktima-alpha-xinomavro",
    name: "קסינומאברו רזרב",
    nameHe: "קסינומאברו רזרב",
    winery: "Ktima Alpha",
    region: "northern-greece",
    country: "Greece",
    type: "red",
    grape: "Xinomavro",
    year: 2019,
    description:
      "אדום עמוק ומובנה מהמדרונות של אמינדיאו. ורדים מיובשים, עלי עגבנייה וטאנינים עדינים שמספרים על מקום וסבלנות.",
    image: `${IMG}/0Y1A2187 copy.jpg`,
    featured: true,
  },
  {
    slug:"galilee-heights-syrah",
    name: "סירה גליל",
    nameHe: "סירה גליל",
    winery: "Galilee Heights",
    region: "galilee",
    country: "Israel",
    type: "red",
    grape: "Syrah",
    year: 2020,
    description:
      "פירות כהים, אבן כתושה ועשבי תיבול בר מהקרקעות הוולקניות של הגליל העליון. יין של עומק ועוצמה שקטה.",
    image: `${IMG}/0Y1A2192 copy.jpg`,
    featured: true,
  },
  {
    slug:"domaine-gerovassiliou-malagousia",
    name: "מלגוזיה",
    nameHe: "מלגוזיה",
    winery: "Domaine Gerovassiliou",
    region: "northern-greece",
    country: "Greece",
    type: "white",
    grape: "Malagousia",
    year: 2022,
    description:
      "זן ילידי שניצל מהכחדה, שהוחיה ליד סלוניקי. ארומטי, טקסטורלי, עם אפרסק לבן ויסמין – יוון בכוס.",
    image: `${IMG}/0Y1A2195 copy.jpg`,
    featured: true,
  },
  {
    slug:"galilee-cabernet",
    name: "קברנה סוביניון גליל",
    winery: "יקב הגליל",
    region: "galilee",
    country: "Israel",
    type: "red",
    grape: "Cabernet Sauvignon",
    year: 2019,
    description:
      "קברנה קלאסי מהגליל – דובדבן שחור, ארז וטבק עדין. מלא גוף עם סיום ארוך ואלגנטי.",
    image: `${IMG}/0Y1A2196 copy.jpg`,
  },
  {
    slug:"naoussa-xinomavro",
    name: "קסינומאברו נאוסה",
    winery: "Boutari",
    region: "northern-greece",
    country: "Greece",
    type: "red",
    grape: "Xinomavro",
    year: 2018,
    description:
      "מנאוסה, לב אזור הקסינומאברו. עגבניות מיובשות, זיתים שחורים ותבלינים – יין יווני אותנטי עם אופי.",
    image: `${IMG}/0Y1A2199 copy.jpg`,
  },
  {
    slug:"assyrtiko-thessaloniki",
    name: "אסירטיקו",
    winery: "Ktima Gerovassiliou",
    region: "northern-greece",
    country: "Greece",
    type: "white",
    grape: "Assyrtiko",
    year: 2022,
    description:
      "אסירטיקו מצפון יוון – מינרלי, רענן, עם הדרים וחומציות חדה. מושלם ליין של צהריים ים תיכוניים.",
    image: `${IMG}/0Y1A2200 copy.jpg`,
  },
  {
    slug:"galilee-rose",
    name: "רוזה גלילי",
    winery: "יקב הגליל",
    region: "galilee",
    country: "Israel",
    type: "rosé",
    grape: "Grenache",
    year: 2023,
    description:
      "רוזה קייצי ורענן מענבי גרנאש. תותי בר, אשכולית ורדרדה ומלון – קל, אלגנטי ומזמין.",
    image: `${IMG}/0Y1A2200-2 copy.jpg`,
  },
  {
    slug:"agiorgitiko-nemea",
    name: "אגיורגיטיקו",
    winery: "Skouras",
    region: "northern-greece",
    country: "Greece",
    type: "red",
    grape: "Agiorgitiko",
    year: 2020,
    description:
      "אדום יווני רך ונגיש – דובדבן, שזיף ותבלין עדין. יין שמזמין לשתות עוד כוס.",
    image: `${IMG}/0Y1A2201 copy.jpg`,
  },
];

export const featuredWines = wines.filter((w) => w.featured);

export const siteConfig = {
  name: "Perea Wine House",
  nameHe: "פראה בית יין",
  tagline: "חנות ובר יין משפחתית",
  taglineEn: "Where Greece Meets the Galilee",
  description:
    "בית יין בוטיק בגליל הישראלי, המחבר בין תרבויות היין של יוון וישראל. חנות יין וטעימות במהלך היום, ביסטרו יין בשעות הערב, ערבי טעימות מודרכות ואירועים מיוחדים.",
  descriptionEn: "A boutique wine house in the Israeli Galilee, bridging the wine cultures of Greece and Israel.",
  url: "https://pereawine.com",
  social: {
    instagram: "https://instagram.com/pereawine",
  },
  location: {
    address: "קיבוץ עברון, מתחם עברונה",
    addressEn: "Upper Galilee, Israel",
    coordinates: {
      lat: 32.9924718,
      lng: 35.0981251,
    },
    googleMapsUrl: "https://maps.app.goo.gl/X7QBmoGamNifBi3P6?g_st=iw",
  },
  hours: {
    daytime: {
      label: "חנות יין ובראנץ",
      labelEn: "Wine Shop & Tastings",
      hours: "ג׳ – ש׳ 11:00–15:00",
    },
    evening: {
      label: "ביסטרו יין",
      labelEn: "Wine Bistro",
      hours: "ה׳ – ש׳ 19:00–00:00",
    },
  },
} as const;

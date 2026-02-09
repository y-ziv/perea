export const siteConfig = {
  name: "Perea Wine House",
  nameHe: "פראה בית יין",
  tagline: "המקום בו יוון פוגשת את הגליל",
  taglineEn: "Where Greece Meets the Galilee",
  description:
    "בית יין בוטיק בגליל הישראלי, המחבר בין תרבויות היין של יוון וישראל. חנות יין וטעימות במהלך היום, ביסטרו יין בשעות הערב, ערבי טעימות מודרכות ואירועים מיוחדים.",
  descriptionEn:
    "A boutique wine house in the Israeli Galilee, bridging the wine cultures of Greece and Israel.",
  url: "https://pereawine.com",
  social: {
    instagram: "https://instagram.com/pereawine",
  },
  location: {
    address: "גליל עליון, ישראל",
    addressEn: "Upper Galilee, Israel",
    coordinates: {
      lat: 32.9924718,
      lng: 35.0981251,
    },
    googleMapsUrl:
      "https://maps.app.goo.gl/X7QBmoGamNifBi3P6?g_st=iw",
  },
  hours: {
    daytime: {
      label: "חנות יין וטעימות",
      labelEn: "Wine Shop & Tastings",
      hours: "א׳–ה׳ 10:00–17:00",
    },
    evening: {
      label: "ביסטרו יין",
      labelEn: "Wine Bistro",
      hours: "ה׳–ש׳ 18:00–23:00",
    },
  },
} as const;

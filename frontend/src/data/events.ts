import type { WineEvent } from "@/types";

const IMG = "/drive-download-20260209T114257Z-1-001";

export const events: WineEvent[] = [
  {
    slug: "tasting-northern-greece",
    title: "ערב טעימות – יינות צפון יוון",
    titleHe: "ערב טעימות – יינות צפון יוון",
    date: "2026-03-15",
    time: "19:00",
    description:
      "ערב מיוחד של טעימות יינות מצפון יוון – קסינומאברו, מלגוזיה ואסירטיקו. מלווה במנות ים תיכוניות עונתיות.",
    longDescription:
      "הצטרפו אלינו לערב מיוחד בו נטעם יינות נבחרים מיקבי בוטיק בצפון יוון – מאזור נאוסה, סלוניקי ואמינדיאו. נלמד על הזנים היוונים הייחודיים, נשמע סיפורים מהכרמים, ונלווה את הטעימות בתפריט ים תיכוני עונתי שהוכן במיוחד לערב.",
    image: `${IMG}/0Y1A2301 copy.jpg`,
    type: "tasting",
    featured: true,
  },
];

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

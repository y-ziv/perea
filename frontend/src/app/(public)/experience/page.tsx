import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";

export const metadata: Metadata = {
  title: "החוויה",
  description:
    "חנות יין וטעימות במהלך היום, ביסטרו יין בשעות הערב, ערבי טעימות מודרכות, אירוח ייננים ושפים ואירועים מיוחדים.",
};

export default function ExperiencePage() {
  return (
    <section className="bg-primary pt-24 pb-14 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          overline="החוויה"
          heading="מהיום אל הלילה"
          align="center"
          className="mb-6 sm:mb-10"
        />
      </div>

      {/* Daytime */}
      <div className="relative h-80 w-full overflow-hidden sm:h-[28rem]">
        <Image
          src="/images/perea day.jpg"
          alt="חנות יין וטעימות בפראה"
          fill
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-sans text-h2 font-normal text-cream">
          חנות יין וטעימות
        </h2>
        <div className="mt-6 space-y-6 text-body-lg font-light leading-relaxed text-cream-muted">
          <p>
            במהלך היום, בית היין פועל כחנות יין וטעימות. גלו ובחרו מתוך מגוון
            יינות בוטיק מהגליל ומצפון יוון – יינות שלא תמצאו בשום מקום אחר
            בישראל.
          </p>
          <p>
            שבו איתנו לטעימה מודרכת, למדו את הסיפורים מאחורי כל בקבוק, הכירו
            את הזנים היוונים המיוחדים כמו קסינומאברו, מלגוזיה ואסירטיקו, ואת
            הייננים החברים שלנו מהגליל.
          </p>
        </div>
      </div>

      <Divider />

      {/* Evening */}
      <div className="relative mt-20 h-80 w-full overflow-hidden sm:h-[28rem]">
        <Image
          src="/images/perea night.jpg"
          alt="ביסטרו יין בפראה"
          fill
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-sans text-h2 font-normal text-cream">
          ביסטרו יין
        </h2>
        <div className="mt-6 space-y-6 text-body-lg font-light leading-relaxed text-cream-muted">
          <p>
            עם רדת הערב, המקום הופך לביסטרו יין אינטימי. תפריט אוכל ים תיכוני
            ששם דגש על עונתיות וחומרי גלם מעולים, שנועד ללוות את היינות שאנחנו
            אוהבים.
          </p>
          <p>
            כל מנה מעוצבת בקפידה כדי לשקף את הקשר העמוק בין הים התיכון, הגליל
            ויוון – טעמים שמספרים סיפור.
          </p>
        </div>
      </div>

      <Divider />

      {/* Events */}
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-sans text-h2 font-normal text-cream">
          אירועים וטעימות
        </h2>
        <div className="mt-6 space-y-6 text-body-lg font-light leading-relaxed text-cream-muted">
          <p>
            אנחנו מקיימים פעילויות מגוונות שמטרתן לקדם ולהנגיש את תרבות היין
            ואת יינות יוון והגליל – ערבי טעימות מודרכות, אירוח של ייננים ושפים,
            ואירועים מסוגים שונים.
          </p>
          <p>
            עקבו אחרינו באינסטגרם לעדכונים על אירועים קרובים.
          </p>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";

const IMG = "/drive-download-20260209T114257Z-1-001";

export const metadata: Metadata = {
  title: "הסיפור שלנו",
  description:
    "הסיפור של פראה בית יין – מקום של מפגש בין תקופות, תרבויות, מקומות ואהבות. בגליל הישראלי, בין ישראל ליוון.",
};

export default function AboutPage() {
  return (
    <article className="bg-primary pt-32 pb-20">
      {/* Hero */}
      <div className="mx-auto max-w-4xl px-6 pb-20">
        <SectionHeading
          overline="הסיפור שלנו"
          heading="מקום של מפגש בין עולמות"
          align="center"
        />
      </div>

      {/* Full-width image */}
      <div className="relative h-80 w-full overflow-hidden sm:h-[28rem]">
        <Image
          src={`${IMG}/0Y1A2364 copy.jpg`}
          alt="פראה בית יין"
          fill
          className="object-cover"
        />
      </div>

      {/* Story body */}
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="space-y-8 text-body-lg font-light leading-relaxed text-cream-muted">
          <p>
            בתקופה ההלנית פראה היה שם של מחוז בארץ ישראל. ביוון המודרנית פראה
            היא עיירת חוף שלווה בקרבת המטרופולין של סלוניקי.
          </p>
          <p>
            בית היין שלנו הוא מקום של מפגש – בין תקופות, בין תרבויות, בין
            מקומות, בין אהבות. בחרנו להקים אותו בגליל הישראלי, חבל ארץ קסום בו
            אנחנו חיים ואליו אנחנו קשורים בכל נימי נפשנו. יוון היא בית נוסף, בה
            אנחנו מגדלים זיתים וגפנים, ולומדים את שמחת החיים והשלווה היוונית.
          </p>
        </div>

        <Divider className="my-16" />

        <div className="space-y-8 text-body-lg font-light leading-relaxed text-cream-muted">
          <p>
            Perea Wine House הוא מקום שמשקף את אורח החיים של המשפחה שלנו, ונועד
            להפגיש בין אהבות גדולות של ישראלים רבים – אהבה ליוון ואהבה ליין.
          </p>
          <p>
            תוכלו למצוא אצלנו יינות יוונים איכותיים מיקבי בוטיק בצפון יוון
            שאנו מייבאים בעצמנו, לצד יינות בוטיק של ייננים חברים מהטרואר המצוין
            של הגליל. את היין מלווה תפריט אוכל ים תיכוני ששם דגש על עונתיות
            וחומרי גלם מעולים.
          </p>
        </div>
      </div>

      {/* Second image */}
      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        <Image
          src={`${IMG}/0Y1A2312 copy.jpg`}
          alt="אווירה בפראה"
          fill
          className="object-cover"
        />
      </div>

      {/* Closing */}
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="space-y-8 text-body-lg font-light leading-relaxed text-cream-muted">
          <p>
            Perea Wine House משמש כחנות יין וטעימות במהלך היום, וכביסטרו יין
            בשעות הערב, ומקיים פעילויות מגוונות שמטרתן לקדם ולהנגיש את תרבות
            היין ואת יינות יוון והגליל דרך ערבי טעימות מודרכות, אירוח של ייננים
            ושפים ואירועים מסוגים שונים.
          </p>
          <p className="font-serif text-h3 font-normal text-cream">
            מוזמנים אלינו לרגעים קסומים של טעם ושמחה.
          </p>
        </div>
      </div>
    </article>
  );
}

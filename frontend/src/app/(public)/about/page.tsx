import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "הסיפור שלנו",
  description:
    "הסיפור של פראה בית יין – מקום של מפגש בין תקופות, תרבויות, מקומות ואהבות. בגליל הישראלי, בין ישראל ליוון.",
};

export default function AboutPage() {
  return (
    <article className="bg-primary pt-24 pb-20">
      {/* Heading */}
      <div className="mx-auto max-w-4xl px-6 pb-8">
        <SectionHeading overline="הסיפור שלנו" heading="מקום של מפגש בין עולמות" align="center" />
      </div>

      {/* Image left, text right — single clean section */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:items-start md:gap-12 lg:gap-16">
          {/* Text — right side in RTL */}
          <div className="flex flex-col justify-center md:order-1">
            <div className="space-y-6 text-body-lg font-light leading-relaxed text-cream-muted">
              <p>
                בתקופה ההלנית פראה היה שם של מחוז בארץ ישראל. ביוון המודרנית פראה היא עיירת חוף שלווה בקרבת המטרופולין
                של סלוניקי.
              </p>
              <p>
                בית היין שלנו הוא מקום של מפגש – בין תקופות, בין תרבויות, בין מקומות, בין אהבות. בחרנו להקים אותו בגליל
                הישראלי, חבל ארץ קסום בו אנחנו חיים ואליו אנחנו קשורים בכל נימי נפשנו. יוון היא בית נוסף, בה אנחנו
                מגדלים זיתים וגפנים, ולומדים את שמחת החיים והשלווה היוונית.
              </p>
              <p>
                Perea Wine House הוא מקום שמשקף את אורח החיים של המשפחה שלנו, ונועד להפגיש בין אהבות גדולות של ישראלים
                רבים – אהבה ליוון ואהבה ליין.
              </p>
              <p>
                תוכלו למצוא אצלנו יינות יוונים איכותיים מיקבי בוטיק בצפון יוון שאנו מייבאים בעצמנו, לצד יינות בוטיק של
                ייננים חברים מהטרואר המצוין של הגליל. את היין מלווה תפריט אוכל ים תיכוני ששם דגש על עונתיות וחומרי גלם
                מעולים.
              </p>
              <p>
                Perea Wine House משמש כחנות יין וטעימות במהלך היום, וכביסטרו יין בשעות הערב, ומקיים פעילויות מגוונות
                שמטרתן לקדם ולהנגיש את תרבות היין ואת יינות יוון והגליל דרך ערבי טעימות מודרכות, אירוח של ייננים ושפים
                ואירועים מסוגים שונים.
              </p>
              <p className="font-sans text-h3 font-normal text-cream">מוזמנים אלינו לרגעים קסומים של טעם ושמחה.</p>
            </div>
          </div>

          {/* Image — left side in RTL */}
          <div className="relative h-80 w-full overflow-hidden sm:h-[28rem] md:sticky md:top-32 md:order-2 md:h-[36rem]">
            <Image
              src="/images/our-story/home-1.jpg"
              alt="פראה בית יין"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

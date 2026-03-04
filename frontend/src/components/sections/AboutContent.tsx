"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, stagger, viewportConfig } from "@/lib/animations";

function HandwrittenUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      width="180"
      height="12"
      viewBox="0 0 180 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`mt-2 text-copper ${className}`}
    >
      <path
        d="M2 8c20-6 40-2 60-4s40 4 58-2 30 4 58 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function BoldUnderline() {
  return (
    <svg
      viewBox="0 0 240 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-0.5 block h-1.5 w-full max-w-full text-copper"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="aboutUnderlineFade" x1="0" x2="240" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity="1" />
          <stop offset="0.6" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="aboutUnderlineFadeMask">
          <rect x="0" y="0" width="240" height="10" fill="url(#aboutUnderlineFade)" />
        </mask>
      </defs>
      <path
        d="M0 5.8 L18 5.4 L38 5.2 L58 4.6 L76 5 L94 4.2 L112 4.8 L132 4 L150 4.5 L168 3.8 L186 4.2 L204 3.6 L222 4 L240 3.4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M2 7.8 L22 7.4 L42 7.2 L62 6.6 L80 7 L98 6.4 L118 6.8 L136 6.2 L154 6.6 L172 6 L190 6.4 L208 5.8 L224 6.2"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        mask="url(#aboutUnderlineFadeMask)"
      />
    </svg>
  );
}

const DOODLE_FILTER = "brightness(0) sepia(1) saturate(3) hue-rotate(-10deg)";

// Doodles positioned between photo (left) and text (right) in RTL
const doodles = [
  { src: "/doodles/wine-bottle.png", className: "top-8 left-[34%] w-28 sm:w-40 -rotate-6", w: 150, h: 300 },
  { src: "/doodles/grapes.png", className: "top-[30%] left-[34%] w-28 sm:w-40 rotate-12", w: 200, h: 200 },
  { src: "/doodles/vase.png", className: "top-[55%] left-[36%] w-20 sm:w-28 -rotate-12", w: 200, h: 300 },
];

const paragraphs = [
  "בתקופה ההלנית פראה היה שם של מחוז בארץ ישראל. ביוון המודרנית פראה היא עיירת חוף שלווה בקרבת המטרופולין של סלוניקי.",
  "בית היין שלנו הוא מקום של מפגש – בין תקופות, בין תרבויות, בין מקומות, בין אהבות. בחרנו להקים אותו בגליל הישראלי, חבל ארץ קסום בו אנחנו חיים ואליו אנחנו קשורים בכל נימי נפשנו. יוון היא בית נוסף, בה אנחנו מגדלים זיתים וגפנים, ולומדים את שמחת החיים והשלווה היוונית.",
  "Perea Wine House הוא מקום שמשקף את אורח החיים של המשפחה שלנו, ונועד להפגיש בין אהבות גדולות של ישראלים רבים –",
  "תוכלו למצוא אצלנו יינות יוונים איכותיים מיקבי בוטיק בצפון יוון שאנו מייבאים בעצמנו, לצד יינות בוטיק של ייננים חברים מהטרואר המצוין של הגליל. את היין מלווה תפריט אוכל ים תיכוני ששם דגש על עונתיות וחומרי גלם מעולים.",
  "Perea Wine House משמש כחנות יין וטעימות במהלך היום, וכביסטרו יין בשעות הערב, ומקיים פעילויות מגוונות שמטרתן לקדם ולהנגיש את תרבות היין ואת יינות יוון והגליל דרך ערבי טעימות מודרכות, אירוח של ייננים ושפים ואירועים מסוגים שונים.",
];

export function AboutContent() {
  return (
    <article className="bg-primary pt-28 pb-24 sm:pt-36 sm:pb-32">
      {/* Hero heading area */}
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-6 sm:mb-8"
        >
          <motion.p variants={fadeUp} className="overline mb-4">
            הסיפור שלנו
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-h2 font-medium text-cream sm:text-h1">
            מקום של מפגש בין עולמות
          </motion.h1>
          <motion.div variants={fadeIn}>
            <HandwrittenUnderline />
          </motion.div>
        </motion.div>

        {/* Main content grid */}
        <div className="relative flex flex-col gap-12 md:grid md:grid-cols-12 md:gap-10 lg:gap-16">
          {/* Doodles in the gutter between photo and text — desktop only */}
          {doodles.map((d) => (
            <div key={d.src} className={`pointer-events-none absolute z-20 hidden opacity-50 md:block ${d.className}`}>
              <Image
                src={d.src}
                alt=""
                width={d.w}
                height={d.h}
                className="h-auto w-full object-contain"
                style={{ filter: DOODLE_FILTER }}
              />
            </div>
          ))}

          {/* Text column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="relative z-10 md:col-span-7 md:order-1"
          >
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="mb-6 font-handwritten text-body-lg font-bold leading-relaxed text-cream last:mb-0"
              >
                {i === 2 ? (
                  <>
                    {text}{" "}
                    <span className="inline-block align-top">
                      אהבה ליוון ואהבה ליין
                      <BoldUnderline />
                    </span>
                  </>
                ) : (
                  text
                )}
              </motion.p>
            ))}

            {/* Closing handwritten quote */}
            <motion.p variants={fadeUp} className="mt-10 font-handwritten text-h3 font-normal leading-snug text-cream">
              מוזמנים אלינו לרגעים קסומים של טעם ושמחה.
            </motion.p>
            <motion.div variants={fadeIn}>
              <HandwrittenUnderline className="mx-0" />
            </motion.div>
          </motion.div>

          {/* Image column with doodle */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="relative md:col-span-5 md:order-2"
          >
            <div className="relative h-80 w-full overflow-hidden sm:h-[28rem] md:sticky md:top-32 md:h-[36rem]">
              <div className="relative h-full w-full">
                <Image
                  src="/images/our-story/home-1.jpg"
                  alt="פראה בית יין"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>

              {/* Diagonal decorative text — on top of photo */}
              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" dir="ltr">
                <p
                  className="text-center font-hand text-[4rem] font-bold leading-[0.88] tracking-[0.15em] text-primary/25 sm:text-[5rem] md:text-[5.5rem]"
                  style={{ transform: "rotate(-38deg)" }}
                >
                  PEREA WINE
                  <br />
                  HOUSE
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-20 flex items-center justify-center gap-6 sm:mt-28"
        >
          <div className="h-px flex-1 bg-copper/20" />
          <p className="font-hand text-h3 tracking-[0.2em] text-copper/40 sm:text-h2" dir="ltr">
            PEREA
          </p>
          <div className="h-px flex-1 bg-copper/20" />
        </motion.div>
      </div>
    </article>
  );
}

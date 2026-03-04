import Link from "next/link";
import Image from "next/image";

const photos = [
  {
    src: "/images/home-screen-photos/our-story-3.jpg",
    alt: "חנות היין",
    caption: "חנות יין – יינות מיקבי בוטיק יוונים שאנחנו מייבאים בעצמנו, יינות ישראלים מהגליל",
  },
  {
    src: "/images/home-screen-photos/our-story-2.jpg",
    alt: "אירוח",
    caption: "בית לתרבות יין. ערבי טעימות מודרכות, אירוח של ייננים ושפים ואירועים מסוגים שונים",
  },
  {
    src: "/images/home-screen-photos/our-story-1.jpg",
    alt: "ביסטרו",
    caption: "בר וביסטרו יין אינטימי בשעות הערב עם תפריט אוכל ים תיכוני גלילי מותאם",
  },
];

function HandwrittenUnderline() {
  return (
    <svg
      width="180"
      height="12"
      viewBox="0 0 180 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-2 text-copper"
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

function BoldUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`mt-0.5 block h-1.5 w-full max-w-full text-primary ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="underlineFade" x1="0" x2="240" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" stopOpacity="1" />
          <stop offset="0.6" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="underlineFadeMask">
          <rect x="0" y="0" width="240" height="10" fill="url(#underlineFade)" />
        </mask>
      </defs>
      {/* Top line: more irregular, handwritten wobble */}
      <path
        d="M0 5.8 L18 5.4 L38 5.2 L58 4.6 L76 5 L94 4.2 L112 4.8 L132 4 L150 4.5 L168 3.8 L186 4.2 L204 3.6 L222 4 L240 3.4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Bottom line: thinner, shorter, fades at the right */}
      <path
        d="M2 7.8 L22 7.4 L42 7.2 L62 6.6 L80 7 L98 6.4 L118 6.8 L136 6.2 L154 6.6 L172 6 L190 6.4 L208 5.8 L224 6.2"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        mask="url(#underlineFadeMask)"
      />
    </svg>
  );
}

export function StoryIntro() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading with handwritten underline */}
        <div className="mb-10">
          <h2 className="font-serif text-h2 font-medium text-primary sm:text-h1">חנות ובר יין משפחתי</h2>
          <HandwrittenUnderline />
        </div>

        {/* Content area: PEREA WINE HOUSE diagonal on left, text on right */}
        <div className="relative mb-14 min-h-[22rem]">
          {/* PEREA WINE HOUSE — diagonal decorative text, left side */}
          <div className="pointer-events-none absolute inset-0 hidden items-start justify-start  md:flex" dir="ltr">
            <p
              className="font-hand text-[5.5rem] font-bold leading-[0.88] tracking-[0.15em] text-copper text-center lg:text-[4.5rem] xl:text-[8rem]"
              style={{ transform: "rotate(-38deg)" }}
            >
              PEREA WINE
              <br />
              HOUSE
            </p>
          </div>

          {/* Text paragraphs — pushed to the right side */}
          <div className="md:mr-0 md:ml-auto md:max-w-[55%]">
            <p className="text-body-lg font-light leading-relaxed text-primary/80">
              Perea Wine House הוא מקום שמשקף את אורח החיים של המשפחה שלנו, ונועד להפגיש בין אהבות גדולות של ישראלים
              רבים –{" "}
              <span className="inline-block align-top">
                אהבה ליוון ואהבה ליין
                <BoldUnderline />
              </span>
            </p>
            <p className="mt-8 text-body-lg font-light leading-relaxed text-primary/80">
              תוכלו למצוא אצלנו יינות יוונים איכותיים מיקבי בוטיק בצפון יוון שאנו מייבאים בעצמנו, לצד יינות בוטיק של
              ייננים חברים מהטרואר המצוין של הגליל. את היין מלווה תפריט אוכל ים תיכוני ששם דגש על עונתיות וחומרי גלם
              מעולים.
            </p>
          </div>
        </div>

        {/* Three photos with doodle overlay */}
        <div className="relative overflow-visible">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {photos.map((photo) => (
              <div key={photo.src}>
                <div className="relative aspect-3/4 w-full overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <p className="mt-3 text-caption font-light leading-snug text-primary/70">{photo.caption}</p>
              </div>
            ))}
          </div>

          {/* Doodle overlays — spilling left into background and over photos */}
          <div className="pointer-events-none absolute inset-0 -left-24 sm:-left-32">
            <Image
              src="/doodles/grapes.png"
              alt=""
              width={120}
              height={120}
              className="absolute top-[2%] left-0 h-28 w-28 brightness-0 invert sm:h-36 sm:w-36"
            />
            <Image
              src="/doodles/wine-bottle.png"
              alt=""
              width={80}
              height={160}
              className="absolute top-[20%] left-[6%] h-40 w-auto brightness-0 invert sm:h-48"
            />
            <Image
              src="/doodles/cheese.png"
              alt=""
              width={100}
              height={100}
              className="absolute top-[15%] left-[16%] h-24 w-24 brightness-0 invert sm:h-32 sm:w-32"
            />
            <Image
              src="/doodles/bread.png"
              alt=""
              width={120}
              height={120}
              className="absolute top-[42%] left-[2%] h-28 w-28 brightness-0 invert sm:h-36 sm:w-36"
            />
            <Image
              src="/doodles/candle.png"
              alt=""
              width={60}
              height={140}
              className="absolute top-[38%] left-[14%] h-40 w-auto brightness-0 invert sm:h-48"
            />
            <Image
              src="/doodles/vase.png"
              alt=""
              width={100}
              height={120}
              className="absolute top-[62%] left-[4%] h-36 w-auto brightness-0 invert sm:h-44"
            />
          </div>
        </div>

        {/* Link to full story */}
        <div className="mt-12">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-caption font-medium tracking-wide text-copper-light transition-colors duration-300 hover:text-primary"
          >
            לסיפור המלא שלנו
            <span aria-hidden="true">&larr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

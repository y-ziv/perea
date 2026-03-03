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
    caption: "בית להרבות יין. ערבי טעימות מודרכות, אירוח של ייננים ושפים ואירועים מסוגים שונים",
  },
  {
    src: "/images/home-screen-photos/our-story-1.jpg",
    alt: "ביסטרו",
    caption: "בר וביסטרו יין אינטימי בשעות הערב עם תפריט אוכל ים תיכוני גלילי מוקפד",
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
          <div className="space-y-8 md:mr-0 md:ml-auto md:max-w-[55%]">
            <p className="text-body-lg font-light leading-relaxed text-primary/80">
              Perea Wine House הוא מקום שמשקף את אורח החיים של המשפחה שלנו, ונועד להפגיש בין אהבות גדולות של ישראלים
              רבים – אהבה ליוון ואהבה ליין.
            </p>
            <p className="text-body-lg font-light leading-relaxed text-primary/80">
              תוכלו למצוא אצלנו יינות יוונים איכותיים מיקבי בוטיק בצפון יוון שאנו מייבאים בעצמנו, לצד יינות בוטיק של
              ייננים חברים מהטרואר המצוין של הגליל. את היין מלווה תפריט אוכל ים תיכוני ששם דגש על עונתיות וחומרי גלם
              מעולים.
            </p>
          </div>
        </div>

        {/* Three photos with doodle overlay */}
        <div className="relative">
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

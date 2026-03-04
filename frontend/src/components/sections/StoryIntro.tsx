"use client";

import { useState } from "react";
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

function MobilePhotoStack() {
  const [order, setOrder] = useState([0, 1, 2]);
  const [swiping, setSwiping] = useState(false);

  const handleTap = () => {
    if (swiping) return;
    setSwiping(true);
    // After the fly-out animation, move front card to back
    setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setSwiping(false);
    }, 400);
  };

  // Stack layout: each card gets a fixed rotation and offset
  const stackStyles = [
    { rotate: 0, x: 0, y: 0, scale: 1 }, // front
    { rotate: 3, x: 10, y: -6, scale: 0.97 }, // behind-right
    { rotate: -2, x: -8, y: -12, scale: 0.94 }, // behind-left
  ];

  return (
    <div className="sm:hidden">
      <div className="relative mx-auto aspect-3/4 w-[80%]" onClick={handleTap}>
        {order.map((photoIdx, stackPos) => {
          const photo = photos[photoIdx];
          const style = stackStyles[stackPos];
          const isFront = stackPos === 0;

          return (
            <div
              key={photo.src}
              className="absolute inset-0 overflow-hidden rounded shadow-xl"
              style={{
                zIndex: photos.length - stackPos,
                transform:
                  swiping && isFront
                    ? "translateX(-120%) rotate(-15deg)"
                    : `rotate(${style.rotate}deg) translateX(${style.x}px) translateY(${style.y}px) scale(${style.scale})`,
                opacity: swiping && isFront ? 0 : 1,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="85vw" />
            </div>
          );
        })}
      </div>
      <p className="mt-5 min-h-[3rem] text-center text-caption font-light leading-snug text-primary/70">
        {photos[order[0]].caption}
      </p>
      {/* Dots */}
      <div className="mt-2 flex justify-center gap-2">
        {photos.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              order[0] === i ? "w-4 bg-copper" : "w-2 bg-primary/30"
            }`}
          />
        ))}
      </div>
    </div>
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
        <div className="relative mb-6 min-h-64">
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

        {/* Photos */}
        <div className="relative overflow-visible">
          {/* Mobile: tappable carousel */}
          <MobilePhotoStack />

          {/* Desktop: 3-column grid */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-3">
            {photos.map((photo) => (
              <div key={photo.src}>
                <div className="relative aspect-3/4 w-full overflow-hidden">
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="33vw" />
                </div>
                <p className="mt-3 text-caption font-light leading-snug text-primary/70">{photo.caption}</p>
              </div>
            ))}
          </div>

          {/* Doodle overlay — on top of photos */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-48 sm:-left-24 sm:w-80">
            <Image
              src="/doodles/our-story-doodle4.png"
              alt=""
              width={400}
              height={800}
              className="h-full w-full object-contain object-left"
              style={{ filter: "brightness(0) invert(1) drop-shadow(0 0 1.5px black) drop-shadow(0 0 1px black)" }}
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

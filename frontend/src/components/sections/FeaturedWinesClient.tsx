"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

interface FeaturedWine {
  slug: string;
  name: string;
  winery: string;
  country: string;
  grape: string;
  year?: number;
  description: string;
  image: string;
  priceAgorot: number;
}

function WineCard({ wine }: { wine: FeaturedWine }) {
  return (
    <div className="group">
      <div className="relative mb-3 h-56 overflow-hidden rounded-sm bg-warm/30 sm:mb-4 sm:h-48">
        <Image
          src={wine.image}
          alt={wine.name}
          fill
          sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 30vw"
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="overline mb-1">
        {wine.country === "Greece" ? "יוון" : "ישראל"} · {wine.grape}
      </p>
      <h4 className="font-heading-secondary text-body-lg font-semibold text-cream-muted sm:text-h4">
        {wine.name}
      </h4>
      <p className="mt-1 text-caption text-cream-muted">
        {wine.winery} {wine.year && `· ${wine.year}`}
      </p>
      {wine.priceAgorot > 0 && (
        <p className="mt-1 text-body font-medium text-copper">
          {formatPrice(wine.priceAgorot)}
        </p>
      )}
      <p className="mt-2 text-body font-light leading-relaxed text-cream-muted sm:text-body-sm">
        {wine.description}
      </p>
    </div>
  );
}

export function FeaturedWinesClient({ wines }: { wines: FeaturedWine[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-wine-card]");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
    const distance = card.offsetWidth + gap;
    el.scrollBy({ left: -dir * distance, behavior: "smooth" });
  }, []);

  if (wines.length === 0) return null;

  return (
    <section className="bg-secondary py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          overline="מהחנות שלנו"
          heading="טעמו את המבחר"
          align="center"
          className="mb-6 sm:mb-10"
        />

        <div className="-mx-4 sm:-mx-6">
          <div
            ref={scrollRef}
            dir="rtl"
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:gap-6 sm:px-6"
          >
            {wines.map((wine) => (
              <div
                key={wine.slug}
                data-wine-card
                className="w-[75vw] shrink-0 snap-center sm:w-[45vw] lg:w-[30%]"
              >
                <WineCard wine={wine} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="הבא"
            className="flex items-center justify-center rounded-full border border-copper/30 bg-primary/80 p-3 text-copper transition-all duration-300 hover:border-copper hover:bg-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="הקודם"
            className="flex items-center justify-center rounded-full border border-copper/30 bg-primary/80 p-3 text-copper transition-all duration-300 hover:border-copper hover:bg-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>

        <div className="mt-10 text-center sm:mt-14">
          <Button href="/store">לחנות</Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { wines } from "@/data/wines";

const ITEMS_PER_PAGE = 3;

export function FeaturedWines() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next
  const totalPages = Math.ceil(wines.length / ITEMS_PER_PAGE);

  // Infinite wrap-around
  const getWrappedPage = (p: number) => ((p % totalPages) + totalPages) % totalPages;

  const visibleWines = (() => {
    const idx = getWrappedPage(page);
    const start = idx * ITEMS_PER_PAGE;
    return wines.slice(start, start + ITEMS_PER_PAGE);
  })();

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setPage((p) => p + dir);
    },
    []
  );

  // Slide animation variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 400 : -400,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -400 : 400,
      opacity: 0,
    }),
  };

  return (
    <section className="bg-secondary py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          overline="יינות נבחרים"
          heading="מהאוסף שלנו"
          className="mb-16"
        />

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Arrow — Right (prev in RTL) */}
          <button
            onClick={() => paginate(-1)}
            aria-label="הקודם"
            className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-copper/30 bg-primary/80 p-3 text-copper shadow-md backdrop-blur-sm transition-all duration-300 hover:border-copper hover:bg-primary hover:text-copper-light lg:-right-14 lg:flex"
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

          {/* Arrow — Left (next in RTL) */}
          <button
            onClick={() => paginate(1)}
            aria-label="הבא"
            className="absolute top-1/2 -left-4 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-copper/30 bg-primary/80 p-3 text-copper shadow-md backdrop-blur-sm transition-all duration-300 hover:border-copper hover:bg-primary hover:text-copper-light lg:-left-14 lg:flex"
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

          {/* Animated wine grid */}
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={getWrappedPage(page)}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 28 },
                  opacity: { duration: 0.3 },
                }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {visibleWines.map((wine) => (
                  <div key={wine.id} className="group">
                    <div className="relative mb-4 h-48 overflow-hidden rounded-sm bg-warm/30">
                      <Image
                        src={wine.image}
                        alt={wine.name}
                        fill
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="overline mb-1">
                      {wine.country === "Greece" ? "יוון" : "ישראל"} ·{" "}
                      {wine.grape}
                    </p>
                    <h4 className="font-heading-secondary text-h4 font-semibold text-cream-muted">
                      {wine.name}
                    </h4>
                    <p className="mt-1 text-caption text-cream-muted">
                      {wine.winery} {wine.year && `· ${wine.year}`}
                    </p>
                    <p className="mt-2 text-body-sm font-light leading-relaxed text-cream-muted">
                      {wine.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile arrows + dots */}
          <div className="mt-8 flex items-center justify-center gap-4 lg:hidden">
            <button
              onClick={() => paginate(1)}
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
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Page dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > getWrappedPage(page) ? 1 : -1);
                    setPage(i);
                  }}
                  aria-label={`עמוד ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === getWrappedPage(page)
                      ? "w-6 bg-copper"
                      : "w-2 bg-copper/30 hover:bg-copper/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(-1)}
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
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-14">
          <Button href="/wine">
            לכל היינות &larr;
          </Button>
        </div>
      </div>
    </section>
  );
}

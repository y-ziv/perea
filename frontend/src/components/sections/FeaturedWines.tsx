"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { wines } from "@/data/wines";

function useItemsPerPage() {
  const [items, setItems] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setItems(3);
      else if (window.innerWidth >= 640) setItems(2);
      else setItems(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return items;
}

export function FeaturedWines() {
  const itemsPerPage = useItemsPerPage();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next
  const totalPages = Math.ceil(wines.length / itemsPerPage);

  // Reset page when items per page changes to avoid blank pages
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  // Infinite wrap-around
  const getWrappedPage = (p: number) => ((p % totalPages) + totalPages) % totalPages;

  const visibleWines = (() => {
    const idx = getWrappedPage(page);
    const start = idx * itemsPerPage;
    return wines.slice(start, start + itemsPerPage);
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
    <section className="bg-secondary py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          overline="יינות נבחרים"
          heading="מהאוסף שלנו"
          className="mb-10 sm:mb-16"
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
                key={`${itemsPerPage}-${getWrappedPage(page)}`}
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
                    <div className="relative mb-3 h-56 overflow-hidden rounded-sm bg-warm/30 sm:mb-4 sm:h-48">
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
                    <h4 className="font-heading-secondary text-body-lg font-semibold text-cream-muted sm:text-h4">
                      {wine.name}
                    </h4>
                    <p className="mt-1 text-caption text-cream-muted">
                      {wine.winery} {wine.year && `· ${wine.year}`}
                    </p>
                    <p className="mt-2 text-body font-light leading-relaxed text-cream-muted sm:text-body-sm">
                      {wine.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile arrows + dots — RTL: right arrow (>) = prev, left arrow (<) = next */}
          <div className="mt-8 flex items-center justify-center gap-4 lg:hidden">
            {/* Right arrow — goes to previous (RTL: right = back) */}
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

            {/* Left arrow — goes to next (RTL: left = forward) */}
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
          </div>
        </div>

        <div className="mt-10 text-center sm:mt-14">
          <Button href="/wine">
            לכל היינות
          </Button>
        </div>
      </div>
    </section>
  );
}

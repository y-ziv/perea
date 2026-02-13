"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];
const FADE_DURATION = 1.8;

type PhotoConfig =
  | { src: string; alt: string; type: "pan"; from: number; to: number; duration: number }
  | { src: string; alt: string; type: "zoom"; duration: number }
  | { src: string; alt: string; type: "rotate-zoom"; duration: number }
  | { src: string; alt: string; type: "static"; at: number; duration: number };

const photos: PhotoConfig[] = [
  { src: "/images/home-screen-photos/home-1.jpg", alt: "Perea 1", type: "pan", from: 10, to: 50, duration: 20 },
  { src: "/images/home-screen-photos/home-2.jpg", alt: "Perea 2", type: "rotate-zoom", duration: 10 },
  { src: "/images/home-screen-photos/home-3.jpg", alt: "Perea 3", type: "zoom", duration: 10 },
  { src: "/images/home-screen-photos/home-4.jpg", alt: "Perea 4", type: "zoom", duration: 10 },
  { src: "/images/home-screen-photos/home-5.jpg", alt: "Perea 5", type: "pan", from: 10, to: 70, duration: 14 },
  { src: "/images/home-screen-photos/home-6.jpg", alt: "Perea 6", type: "pan", from: 20, to: 50, duration: 14 },
  { src: "/images/home-screen-photos/home-7.jpg", alt: "Perea 7", type: "pan", from: 45, to: 100, duration: 14 },
  { src: "/images/home-screen-photos/home-8.jpg", alt: "Perea 8", type: "static", at: 60, duration: 8 },
  { src: "/images/home-screen-photos/home-9.jpg", alt: "Perea 9", type: "pan", from: 50, to: 100, duration: 14 },
];

function SlideImage({ photo }: { photo: PhotoConfig }) {
  const [started, setStarted] = useState(false);
  const totalDuration = photo.duration + FADE_DURATION;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  switch (photo.type) {
    case "pan":
      return (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
          style={{
            objectPosition: `center ${started ? photo.to : photo.from}%`,
            transition: `object-position ${totalDuration}s ease-in-out`,
          }}
        />
      );

    case "zoom":
      return (
        <motion.div
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: totalDuration, ease: "linear" }}
          className="h-full w-full"
        >
          <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="100vw" quality={85} />
        </motion.div>
      );

    case "rotate-zoom":
      return (
        <motion.div
          initial={{ scale: 1.0, rotate: 90, x: "-50%", y: "-50%" }}
          animate={{ scale: 1.1, rotate: 90, x: "-50%", y: "-50%" }}
          transition={{ duration: totalDuration, ease: "linear" }}
          className="absolute top-1/2 left-1/2"
          style={{ width: "100vh", height: "100vw" }}
        >
          <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="100vw" quality={85} />
        </motion.div>
      );

    case "static":
      return (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
          style={{ objectPosition: `center ${photo.at}%` }}
        />
      );
  }
}

export function Hero() {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % photos.length);
  }, []);

  const photo = photos[current];

  useEffect(() => {
    const timer = setTimeout(advance, photo.duration * 1000);
    return () => clearTimeout(timer);
  }, [advance, current, photo.duration]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary">
      {/* Slideshow */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION, ease }}
          className="absolute inset-0"
        >
          <SlideImage photo={photo} />
        </motion.div>
      </AnimatePresence>

      {/* Warm overlay — gentle gradient at bottom only */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/80" />

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="flex flex-col items-center"
        >
          <Image
            src="/images/logo-warm.png"
            alt="פראה בית יין"
            width={320}
            height={320}
            className="h-64 w-auto sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

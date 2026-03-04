"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/home-screen-photos/home-6.jpg"
          alt="Perea Wine House"
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
          style={{ objectPosition: "center 35%" }}
          priority
        />
      </div>

      {/* Gradient overlay — fades to cream (dark brown) to match StoryIntro */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream" />

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="relative flex flex-col items-center"
        >
          {/* Logo with doodle star to the right */}
          <div className="relative">
            <Image
              src="/images/logo-warm.png"
              alt="פראה בית יין"
              width={320}
              height={320}
              className="h-64 w-auto sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]"
              priority
            />
            <motion.div
              initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease }}
              className="absolute -right-0 top-[29%] sm:right-0 sm:top-[29%] md:-right-1"
            >
              <Image
                src="/doodles/astrix-doodle.png"
                alt=""
                width={100}
                height={100}
                className="h-14 w-14 sm:h-20 sm:w-20 md:h-30 md:w-30"
                style={{ filter: "brightness(0.5) sepia(1) hue-rotate(340deg) saturate(6) contrast(0.9) opacity(0.85) drop-shadow(0 0 1.5px black) drop-shadow(0 0 1px black)" }}
              />
            </motion.div>
          </div>
          <div className="-mt-20 md:-mt-40">
            <h1 className="font-handwritten text-h2 font-normal tracking-widest text-copper drop-shadow-sm md:text-h2">
              פראה - בר וחנות יין משפחתית
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

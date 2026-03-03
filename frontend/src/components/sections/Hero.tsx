"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary brightness-110">
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
          <div className="-mt-24 space-y-2">
            <h1 className="font-serif text-h1 font-medium text-white drop-shadow-sm md:text-display">
              פראה - בר וחנות יין משפחתית
            </h1>
            {/* <p className="font-heading-secondary text-h3 font-light tracking-wide text-white drop-shadow-sm md:text-h2">
              שתי ארצות. כוס אחת.
            </p> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

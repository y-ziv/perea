"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/home_page_video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary" />

      {/* Logo + tagline (tagline sits in logo's empty area) */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="flex flex-col items-center"
        >
          <Image
            src="/images/logo.png"
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

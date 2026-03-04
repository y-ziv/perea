import { Noto_Sans_Hebrew, Rubik, Assistant, Amatic_SC } from "next/font/google";

export const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ["latin", "hebrew"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-hebrew",
  display: "swap",
});

export const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap",
});

export const assistant = Assistant({
  subsets: ["latin", "hebrew"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-assistant",
  display: "swap",
});

export const amaticSC = Amatic_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-amatic-sc",
  display: "swap",
});

// Playpen Sans Hebrew is loaded via <link> in layout.tsx to avoid
// Next.js font fallback warnings (no override values in its database).
// The CSS variable --font-playpen is set in globals.css instead.

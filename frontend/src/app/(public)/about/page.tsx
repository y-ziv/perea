import type { Metadata } from "next";
import { AboutContent } from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "הסיפור שלנו",
  description:
    "הסיפור של פראה בית יין – מקום של מפגש בין תקופות, תרבויות, מקומות ואהבות. בגליל הישראלי, בין ישראל ליוון.",
};

export default function AboutPage() {
  return <AboutContent />;
}

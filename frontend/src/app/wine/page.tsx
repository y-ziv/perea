import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { wines } from "@/data/wines";

export const metadata: Metadata = {
  title: "היינות שלנו",
  description:
    "יינות בוטיק מהגליל וצפון יוון – קסינומאברו, מלגוזיה, סירה, אסירטיקו ועוד. יינות שמספרים סיפור של מקום.",
};

export default function WinePage() {
  return (
    <section className="bg-primary pt-24 pb-14 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          overline="היינות"
          heading="מהאוסף שלנו"
          subtitle="יינות יוונים איכותיים מיקבי בוטיק בצפון יוון שאנו מייבאים בעצמנו, לצד יינות בוטיק של ייננים חברים מהטרואר המצוין של הגליל."
          align="center"
          className="mb-6 sm:mb-10"
        />

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          {wines.map((wine) => (
            <div key={wine.id} className="group">
              <div className="relative mb-4 h-56 overflow-hidden rounded-sm sm:mb-6 sm:h-72">
                <Image
                  src={wine.image}
                  alt={wine.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="overline mb-1">
                {wine.country === "Greece" ? "יוון" : "ישראל"} · {wine.grape}
              </p>
              <h3 className="font-sans text-body-lg font-medium text-cream sm:text-h4">
                {wine.name}
              </h3>
              <p className="mt-1 text-caption text-cream-muted">
                {wine.winery} {wine.year && `· ${wine.year}`}
              </p>
              <p className="mt-2 text-body font-light leading-relaxed text-cream-muted sm:mt-3">
                {wine.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

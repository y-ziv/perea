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
    <section className="bg-primary pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          overline="היינות"
          heading="מהאוסף שלנו"
          subtitle="יינות יוונים איכותיים מיקבי בוטיק בצפון יוון שאנו מייבאים בעצמנו, לצד יינות בוטיק של ייננים חברים מהטרואר המצוין של הגליל."
          align="center"
          className="mb-20"
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {wines.map((wine) => (
            <div key={wine.id} className="group">
              <div className="relative mb-6 h-72 overflow-hidden rounded-sm">
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
              <h3 className="font-serif text-h4 font-medium text-cream">
                {wine.name}
              </h3>
              <p className="mt-1 text-caption text-cream-muted">
                {wine.winery} {wine.year && `· ${wine.year}`}
              </p>
              <p className="mt-3 text-body font-light leading-relaxed text-cream-muted">
                {wine.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

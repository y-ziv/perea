import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WineCard } from "@/components/store/WineCard";
import { getAllWines } from "@/lib/wines";

export const metadata: Metadata = {
  title: "החנות",
  description:
    "יינות בוטיק מהגליל וצפון יוון – קסינומאברו, מלגוזיה, סירה, אסירטיקו ועוד. יינות שמספרים סיפור של מקום.",
};

export const dynamic = "force-dynamic";

export default async function WinePage() {
  const wines = await getAllWines();

  return (
    <section className="bg-primary pt-24 pb-14 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          overline="החנות"
          heading="מהאוסף שלנו"
          subtitle="יינות יוונים איכותיים מיקבי בוטיק בצפון יוון שאנו מייבאים בעצמנו, לצד יינות בוטיק של ייננים חברים מהטרואר המצוין של הגליל."
          align="center"
          className="mb-6 sm:mb-10"
        />

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          {wines.map((wine) => (
            <WineCard
              key={wine.slug}
              slug={wine.slug}
              name={wine.name}
              winery={wine.winery}
              country={wine.country}
              grape={wine.grape}
              year={wine.year}
              description={wine.description}
              image={wine.image}
              priceAgorot={wine.priceAgorot}
              stock={wine.stock}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

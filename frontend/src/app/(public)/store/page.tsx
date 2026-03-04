import type { Metadata } from "next";
import type { Wine } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WineGrid } from "@/components/store/WineGrid";
import { getAllWines } from "@/lib/wines";

export const metadata: Metadata = {
  title: "החנות",
  description:
    "יינות בוטיק מהגליל וצפון יוון – קסינומאברו, מלגוזיה, סירה, אסירטיקו ועוד. יינות שמספרים סיפור של מקום.",
};

export const revalidate = 60;

export default async function WinePage() {
  let wines: Wine[];
  try {
    wines = await getAllWines();
  } catch {
    wines = [];
  }

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

        {wines.length === 0 ? (
          <p className="py-12 text-center text-body text-cream-muted">
            אין יינות זמינים כרגע. בקרו שוב בקרוב!
          </p>
        ) : (
          <WineGrid wines={JSON.parse(JSON.stringify(wines))} />
        )}
      </div>
    </section>
  );
}

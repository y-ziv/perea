import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredWines } from "@/data/wines";

export function FeaturedWines() {
  const [hero, ...rest] = featuredWines;

  return (
    <section className="bg-secondary py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          overline="יינות נבחרים"
          heading="מהאוסף שלנו"
          className="mb-16"
        />

        {/* Hero wine — larger feature */}
        {hero && (
          <div className="mb-12 grid gap-8 sm:grid-cols-2">
            <div className="relative h-80 overflow-hidden rounded-sm">
              <Image
                src={hero.image}
                alt={hero.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="overline mb-2">{hero.country} · {hero.grape}</p>
              <h3 className="font-serif text-h3 font-normal text-cream">
                {hero.name}
              </h3>
              <p className="mt-1 text-caption text-cream-muted">
                {hero.winery} {hero.year && `· ${hero.year}`}
              </p>
              <p className="mt-4 text-body font-light leading-relaxed text-cream-muted">
                {hero.description}
              </p>
            </div>
          </div>
        )}

        {/* Smaller wines */}
        {rest.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2">
            {rest.map((wine) => (
              <div key={wine.id} className="group">
                <div className="relative mb-6 h-56 overflow-hidden rounded-sm">
                  <Image
                    src={wine.image}
                    alt={wine.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="overline mb-1">{wine.country} · {wine.grape}</p>
                <h4 className="font-serif text-h4 font-medium text-cream">
                  {wine.name}
                </h4>
                <p className="mt-1 text-caption text-cream-muted">
                  {wine.winery} {wine.year && `· ${wine.year}`}
                </p>
                <p className="mt-3 text-body font-light text-cream-muted">
                  {wine.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14">
          <Link
            href="/wine"
            className="inline-flex items-center gap-2 text-caption font-medium tracking-wide text-copper transition-colors duration-300 hover:text-copper-light"
          >
            לכל היינות
            <span aria-hidden="true">&larr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

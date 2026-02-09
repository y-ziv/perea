import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";

export function VisitCTA() {
  return (
    <section className="bg-primary py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <p className="font-serif text-h2 font-light leading-snug text-cream">
            מוזמנים אלינו לרגעים קסומים של טעם ושמחה
          </p>
        </FadeIn>

        <div className="mt-10 space-y-2 text-caption text-cream-muted">
          <p>{siteConfig.location.address}</p>
          <p>
            {siteConfig.hours.daytime.label}: {siteConfig.hours.daytime.hours}
          </p>
          <p>
            {siteConfig.hours.evening.label}: {siteConfig.hours.evening.hours}
          </p>
        </div>

        <div className="mt-10">
          <FadeIn delay={0.2}>
            <Button href="/visit">תכננו את הביקור &larr;</Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";

export function VisitCTA() {
  return (
    <section className="bg-primary py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 sm:grid-cols-2">
          {/* Right column — Text content (appears first in RTL) */}
          <div>
            <FadeIn>
              <p className="font-sans text-h2 font-semibold leading-snug text-cream-muted">
                מוזמנים אלינו לרגעים קסומים של טעם ושמחה
              </p>
            </FadeIn>

            <div className="mt-8 space-y-2 text-caption text-cream-muted">
              <p>{siteConfig.location.address}</p>
              <p>
                {siteConfig.hours.daytime.label}: {siteConfig.hours.daytime.hours}
              </p>
              <p>
                {siteConfig.hours.evening.label}: {siteConfig.hours.evening.hours}
              </p>
            </div>

            <div className="mt-8">
              <FadeIn delay={0.2}>
                <Button href="/visit">תכננו את הביקור &larr;</Button>
              </FadeIn>
            </div>
          </div>

          {/* Left column — Google Maps embed */}
          <div className="overflow-hidden rounded-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d35.0981251!3d32.9924718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c30a5a6b0b0b1%3A0x0!2sPEREA+WINE+HOUSE!5e0!3m2!1sen!2sil!4v1"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PEREA WINE HOUSE בית יין פראה"
              className="h-72 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

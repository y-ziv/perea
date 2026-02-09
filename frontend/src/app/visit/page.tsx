import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/siteConfig";
import { Divider } from "@/components/ui/Divider";

export const metadata: Metadata = {
  title: "בקרו אותנו",
  description:
    "בואו לבקר בפראה בית יין בגליל העליון. חנות יין וטעימות במהלך היום, ביסטרו יין בשעות הערב.",
};

export default function VisitPage() {
  return (
    <section className="bg-primary pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          overline="בקרו אותנו"
          heading="בואו לפראה"
          align="center"
          className="mb-20"
        />

        {/* Hours */}
        <div className="grid gap-10 sm:grid-cols-2">
          <div className="rounded-sm bg-secondary p-8">
            <h3 className="font-serif text-h3 font-normal text-cream">
              {siteConfig.hours.daytime.label}
            </h3>
            <p className="mt-3 text-body-lg text-cream-muted">
              {siteConfig.hours.daytime.hours}
            </p>
            <p className="mt-4 text-body font-light leading-relaxed text-cream-muted">
              גלו ובחרו יינות מהגליל ומצפון יוון, או שבו איתנו לטעימה מודרכת.
            </p>
          </div>

          <div className="rounded-sm bg-secondary p-8">
            <h3 className="font-serif text-h3 font-normal text-cream">
              {siteConfig.hours.evening.label}
            </h3>
            <p className="mt-3 text-body-lg text-cream-muted">
              {siteConfig.hours.evening.hours}
            </p>
            <p className="mt-4 text-body font-light leading-relaxed text-cream-muted">
              ביסטרו יין אינטימי עם תפריט ים תיכוני עונתי מחומרי גלם מעולים.
            </p>
          </div>
        </div>

        <Divider className="my-16" />

        {/* Location */}
        <div className="text-center">
          <h3 className="font-serif text-h3 font-normal text-cream">
            איך מגיעים
          </h3>
          <p className="mt-4 text-body-lg text-cream-muted">
            {siteConfig.location.address}
          </p>
          <div className="mt-8">
            <a
              href={siteConfig.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-copper px-8 py-3 text-caption font-medium tracking-wide text-cream transition-colors duration-300 hover:bg-copper hover:text-primary"
            >
              פתח במפות גוגל &larr;
            </a>
          </div>
        </div>

        <Divider className="my-16" />

        {/* Map embed */}
        <div className="overflow-hidden rounded-sm">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${siteConfig.location.coordinates.lng}!3d${siteConfig.location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151dcf8019e0e175%3A0x1b1c1f1f06744993!2sPEREA+WINE+HOUSE!5e0!3m2!1she!2sil!4v1`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="מיקום פראה בית יין"
          />
        </div>

        <Divider className="my-16" />

        {/* Contact */}
        <div className="text-center">
          <h3 className="font-serif text-h3 font-normal text-cream">
            צרו קשר
          </h3>
          <p className="mt-4 text-body-lg text-cream-muted">
            לשאלות, הזמנות או אירועים פרטיים – דברו איתנו.
          </p>
          <div className="mt-6">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption font-medium tracking-wide text-copper transition-colors duration-300 hover:text-copper-light"
            >
              עקבו אחרינו באינסטגרם
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

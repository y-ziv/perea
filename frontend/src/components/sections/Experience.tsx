import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

const IMG = "/drive-download-20260209T114257Z-1-001";

export function Experience() {
  return (
    <section className="bg-primary py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          overline="החוויה"
          heading="מהיום אל הלילה"
          align="center"
          className="mb-20"
        />

        <div className="grid gap-12 sm:grid-cols-2">
          {/* Daytime */}
          <div>
            <div className="relative mb-8 h-72 overflow-hidden rounded-sm">
              <Image
                src={`${IMG}/0Y1A2293 copy.jpg`}
                alt="חנות יין וטעימות"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-sans text-h3 font-semibold text-cream-muted">
              חנות יין וטעימות
            </h3>
            <p className="mt-4 text-body font-light leading-relaxed text-cream-muted">
              במהלך היום, גלו ובחרו יינות מהגליל ומצפון יוון. שבו איתנו לטעימה
              מודרכת – למדו את הסיפורים מאחורי כל בקבוק, כל יינן, כל אזור.
            </p>
          </div>

          {/* Evening */}
          <div>
            <div className="relative mb-8 h-72 overflow-hidden rounded-sm">
              <Image
                src={`${IMG}/0Y1A2294 copy.jpg`}
                alt="ביסטרו יין"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-sans text-h3 font-semibold text-cream-muted">
              ביסטרו יין
            </h3>
            <p className="mt-4 text-body font-light leading-relaxed text-cream-muted">
              עם רדת הערב, המקום הופך לביסטרו יין אינטימי. תפריט ים תיכוני
              עונתי, מחומרי גלם מעולים, שנועד ללוות את היינות שאנחנו אוהבים.
            </p>
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-caption font-medium tracking-wide text-copper transition-colors duration-300 hover:text-copper-light"
          >
            גלו את החוויה
            <span aria-hidden="true">&larr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

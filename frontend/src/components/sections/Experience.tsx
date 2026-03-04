import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function Experience() {
  return (
    <section className="bg-primary py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          overline="החוויה"
          heading="מהיום אל הלילה"
          align="center"
          className="mb-6 sm:mb-10"
        />

        <div className="grid gap-12 sm:grid-cols-2">
          {/* Daytime */}
          <div>
            <div className="relative mb-8 h-72 overflow-hidden rounded-sm">
              <Image
                src="/images/perea day.jpg"
                alt="חנות יין וטעימות"
                fill
                className="object-cover object-[center_70%]"
              />
            </div>
            <h3 className="font-heading-secondary text-h3 font-semibold text-cream-muted">
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
                src="/images/perea night.jpg"
                alt="ביסטרו יין"
                fill
                className="object-cover object-[center_60%]"
              />
            </div>
            <h3 className="font-heading-secondary text-h3 font-semibold text-cream-muted">
              ביסטרו יין
            </h3>
            <p className="mt-4 text-body font-light leading-relaxed text-cream-muted">
              עם רדת הערב, המקום הופך לביסטרו יין אינטימי. תפריט ים תיכוני
              עונתי, מחומרי גלם מעולים, שנועד ללוות את היינות שאנחנו אוהבים.
            </p>
          </div>
        </div>

        <div className="mt-14 text-center">
          <Button href="/experience">
            לחוויה שלנו
          </Button>
        </div>
      </div>
    </section>
  );
}

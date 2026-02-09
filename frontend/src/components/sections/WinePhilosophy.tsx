import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";

const IMG = "/drive-download-20260209T114257Z-1-001";

export function WinePhilosophy() {
  return (
    <section className="bg-warm py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          overline="הפילוסופיה שלנו"
          heading="שתי ארצות, כוס אחת"
          align="center"
          className="mb-20"
        />

        {/* Galilee */}
        <div className="mb-16">
          <div className="relative mb-10 h-64 w-full overflow-hidden rounded-sm">
            <Image
              src={`${IMG}/0Y1A2282 copy.jpg`}
              alt="יינות הגליל"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-serif text-h3 font-normal text-cream">
            הגליל
          </h3>
          <p className="mt-4 max-w-2xl text-body-lg font-light leading-relaxed text-cream-muted">
            יינות בוטיק של ייננים חברים מהטרואר המצוין של הגליל – ארץ של בזלת
            וגיר, אוויר הרים קריר וגפנים עתיקות. כל בקבוק נושא את האופי של
            המקום המיוחד הזה.
          </p>
        </div>

        <Divider className="my-16" />

        {/* Northern Greece */}
        <div>
          <div className="relative mb-10 h-64 w-full overflow-hidden rounded-sm">
            <Image
              src={`${IMG}/0Y1A2283 copy.jpg`}
              alt="יינות צפון יוון"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-serif text-h3 font-normal text-cream">
            צפון יוון
          </h3>
          <p className="mt-4 max-w-2xl text-body-lg font-light leading-relaxed text-cream-muted">
            יינות יוונים איכותיים מיקבי בוטיק בצפון יוון שאנו מייבאים בעצמנו –
            שם חום ים תיכוני פוגש גובה הררי, ומייצר יינות בעומק ואלגנטיות
            מפתיעים שרוב הישראלים עדיין לא טעמו.
          </p>
        </div>
      </div>
    </section>
  );
}

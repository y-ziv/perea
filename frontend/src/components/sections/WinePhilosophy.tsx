import { FadeLoopVideo } from "@/components/ui/FadeLoopVideo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WinePhilosophy() {
  return (
    <section className="bg-secondary py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          overline="הפילוסופיה שלנו"
          heading="שתי ארצות, כוס אחת"
          align="center"
          className="mb-20"
        />

        {/* Galilee */}
        <div className="mb-24 flex flex-col gap-12 md:flex-row-reverse md:items-center md:gap-16">
          <div className="relative h-56 w-full overflow-hidden rounded-sm md:h-[28rem] md:w-3/5">
            <FadeLoopVideo
              src="/videos/13157705-uhd_3840_2160_25fps.mp4"
              className="h-full w-full object-cover"
            />
            {/* Subtle overlay */}
            <div className="pointer-events-none absolute inset-0 bg-primary/10" />
          </div>
          <div className="md:w-2/5 md:px-8">
            <h3 className="font-heading-secondary text-h3 font-semibold text-cream-muted">
              הגליל
            </h3>
            <p className="mt-4 text-body-lg font-light leading-relaxed text-cream-muted">
              יינות בוטיק של ייננים חברים מהטרואר המצוין של הגליל – ארץ של בזלת
              וגיר, אוויר הרים קריר וגפנים עתיקות. כל בקבוק נושא את האופי של
              המקום המיוחד הזה.
            </p>
          </div>
        </div>

        {/* Northern Greece */}
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
          <div className="relative h-56 w-full overflow-hidden rounded-sm md:h-[28rem] md:w-3/5">
            <FadeLoopVideo
              src="/videos/perea video.mp4"
              className="h-full w-full object-cover"
            />
            {/* Subtle overlay */}
            <div className="pointer-events-none absolute inset-0 bg-primary/10" />
          </div>
          <div className="md:w-2/5 md:px-8">
            <h3 className="font-heading-secondary text-h3 font-semibold text-cream-muted">
              צפון יוון
            </h3>
            <p className="mt-4 text-body-lg font-light leading-relaxed text-cream-muted">
              יינות יוונים איכותיים מיקבי בוטיק בצפון יוון שאנו מייבאים בעצמנו –
              שם חום ים תיכוני פוגש גובה הררי, ומייצר יינות בעומק ואלגנטיות
              מפתיעים שרוב הישראלים עדיין לא טעמו.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

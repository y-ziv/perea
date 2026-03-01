import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function StoryIntro() {
  return (
    <section className="bg-primary py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid items-center gap-12 sm:grid-cols-2">
          <div>
            <SectionHeading
              overline="הסיפור שלנו"
              heading="מקום של מפגש בין עולמות"
            />

            <div className="mt-10 space-y-6 text-body-lg font-light leading-relaxed text-cream-muted">
              <p>
                בתקופה ההלנית פראה היה שם של מחוז בארץ ישראל. ביוון המודרנית
                פראה היא עיירת חוף שלווה בקרבת המטרופולין של סלוניקי.
              </p>
              <p>
                בית היין שלנו הוא מקום של מפגש – בין תקופות, בין תרבויות, בין
                מקומות, בין אהבות. בחרנו להקים אותו בגליל הישראלי, חבל ארץ קסום
                בו אנחנו חיים ואליו אנחנו קשורים בכל נימי נפשנו.
              </p>
              <p>
                יוון היא בית נוסף, בה אנחנו מגדלים זיתים וגפנים, ולומדים את
                שמחת החיים והשלווה היוונית.
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-caption font-medium tracking-wide text-copper transition-colors duration-300 hover:text-copper-light"
              >
                  לסיפור המלא שלנו
                <span aria-hidden="true">&larr;</span>
              </Link>
            </div>
          </div>

          <div className="relative aspect-[3/4] min-h-80 w-full overflow-hidden rounded-sm bg-primary">
            <Image
              src="/images/our-story-image.jpg"
              alt="בית היין פראה"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { FadeIn } from "./FadeIn";

interface SectionHeadingProps {
  overline?: string;
  heading: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  overline,
  heading,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-start";

  return (
    <div className={`${alignClass} ${className}`}>
      {overline && (
        <FadeIn>
          <p className="overline mb-4">{overline}</p>
        </FadeIn>
      )}
      <FadeIn delay={0.1}>
        <h2 className="font-serif text-h3 font-semibold text-[var(--color-header)] sm:text-h2 lg:text-h1">
          {heading}
        </h2>
      </FadeIn>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-body font-light leading-relaxed text-cream-muted sm:mt-5 sm:text-body-lg ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

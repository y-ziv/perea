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
        <h2 className="font-sans text-h1 font-semibold text-clay">
          {heading}
        </h2>
      </FadeIn>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-body-lg font-light leading-relaxed text-cream-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}

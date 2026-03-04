import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { events, getEventBySlug } from "@/data/events";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <article className="bg-primary pt-32 pb-20">
      {/* Hero image */}
      <div className="relative h-80 w-full overflow-hidden sm:h-[28rem]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-20">
        <SectionHeading
          overline={`${event.date} · ${event.time}`}
          heading={event.title}
        />

        <div className="mt-10 space-y-6 text-body-lg font-light leading-relaxed text-cream-muted">
          <p>{event.longDescription || event.description}</p>
        </div>
      </div>
    </article>
  );
}

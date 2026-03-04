import { Hero } from "@/components/sections/Hero";
import { StoryIntro } from "@/components/sections/StoryIntro";
import { Experience } from "@/components/sections/Experience";
import { FeaturedWinesSection } from "@/components/sections/FeaturedWinesSection";
import { VisitCTA } from "@/components/sections/VisitCTA";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <StoryIntro />
      <Experience />
      <FeaturedWinesSection />
      <VisitCTA />
    </>
  );
}

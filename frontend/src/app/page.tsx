import { Hero } from "@/components/sections/Hero";
import { StoryIntro } from "@/components/sections/StoryIntro";
import { Experience } from "@/components/sections/Experience";
import { FeaturedWines } from "@/components/sections/FeaturedWines";
import { VisitCTA } from "@/components/sections/VisitCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StoryIntro />
      <Experience />
      <FeaturedWines />
      <VisitCTA />
    </>
  );
}

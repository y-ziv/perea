import { Hero } from "@/components/sections/Hero";
import { StoryIntro } from "@/components/sections/StoryIntro";
import { WinePhilosophy } from "@/components/sections/WinePhilosophy";
import { Experience } from "@/components/sections/Experience";
import { FeaturedWines } from "@/components/sections/FeaturedWines";
import { VisitCTA } from "@/components/sections/VisitCTA";
import { Divider } from "@/components/ui/Divider";

export default function Home() {
  return (
    <>
      <Hero />
      <Divider className="my-0" />
      <StoryIntro />
      <WinePhilosophy />
      <Divider className="my-0" />
      <Experience />
      <FeaturedWines />
      <Divider className="my-0" />
      <VisitCTA />
    </>
  );
}

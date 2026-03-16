import { Hero } from "@/components/Hero";
import { RetreatsSection } from "@/components/RetreatsSection";
import { CoLivingSection } from "@/components/CoLivingSection";
import { CommunitySection } from "@/components/CommunitySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RetreatsSection />
      <CoLivingSection />
      <CommunitySection />
    </>
  );
}

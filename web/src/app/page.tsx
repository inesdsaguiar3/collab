import { Hero } from "@/components/Hero";
import { WhyHereSection } from "@/components/WhyHereSection";
import { RetreatsSection } from "@/components/RetreatsSection";
import { CoLivingSection } from "@/components/CoLivingSection";
import { GallerySection } from "@/components/GallerySection";
import { CommunitySection } from "@/components/CommunitySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyHereSection />
      <RetreatsSection />
      <CoLivingSection />
      <GallerySection />
      <CommunitySection />
    </>
  );
}

import { Hero } from "@/components/Hero";
import { WhyHereSection } from "@/components/WhyHereSection";
import { RetreatsSection } from "@/components/RetreatsSection";
import { ExperienceTypesSection } from "@/components/ExperienceTypesSection";
import { CoLivingSection } from "@/components/CoLivingSection";
import { GallerySection } from "@/components/GallerySection";
import { CommunitySection } from "@/components/CommunitySection";
import { ReviewsSection } from "@/components/ReviewsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coliving & Retreats in Portugal",
  keywords: [
    "coliving portugal",
    "retreats portugal",
    "community",
    "creativity",
    "conscious living",
    "breathwork",
    "somatics",
    "art",
    "yoga",
    "meditation",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyHereSection />
      <ExperienceTypesSection />
      <RetreatsSection />
      <CoLivingSection />
      <GallerySection />
      <ReviewsSection />
      <CommunitySection />
    </>
  );
}

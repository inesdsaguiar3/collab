
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Breathwork, Somatics, Yoga & Meditation Retreats Portugal",
  description:
    "Explore Co-llab retreats in Portugal focused on breathwork, somatics, yoga, meditation, and integrative healing experiences.",
  keywords: [
    "breathwork retreats portugal",
    "somatics retreats portugal",
    "yoga retreat portugal",
    "meditation retreat portugal",
    "wellness retreat portugal",
  ],
  alternates: {
    canonical: "/retreats",
  },
  openGraph: {
    title: "Retreats in Portugal | Co-llab",
    description:
      "Breathwork, somatics, yoga and meditation retreats in Portugal by Co-llab.",
    url: "https://www.collab.living/retreats",
    type: "website",
  },
};

export default function RetreatsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

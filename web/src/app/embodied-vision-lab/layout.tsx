import type { Metadata } from "next";
import { embodiedVisionLab } from "@/content/embodied-vision-lab";

const { seo } = embodiedVisionLab;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: [...seo.keywords],
  alternates: {
    canonical: "/embodied-vision-lab",
  },
  openGraph: {
    title: "Embodied Vision Lab — Business Immersion & Mentorship",
    description: embodiedVisionLab.tagline,
    url: "https://www.collab.living/embodied-vision-lab",
    type: "website",
    images: [{ url: "/images/vision-lab/garden-group.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: embodiedVisionLab.name,
    description: embodiedVisionLab.tagline,
  },
};

export default function EmbodiedVisionLabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

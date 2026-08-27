import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Creators' Club | A Living Container — Co-llab",
    description:
      "A living container — Ritual of Creativity, Wisdom Keepers, Book Club, and Sacred Circles. Donation-based. Join the circle.",
  keywords: [
    "online creativity circle",
    "creative ritual online",
    "weekly creativity group",
    "donation-based creativity",
    "creative community online",
    "writing circle online",
    "art circle online",
    "wisdom keepers",
    "gene keys contemplation",
    "book club creative community",
    "sacred circles",
    "women's circle",
    "men's circle",
  ],
  alternates: {
    canonical: "/creators-club",
  },
  openGraph: {
    title: "The Creators' Club | A Living Container",
    description:
      "Ritual of Creativity, Wisdom Keepers, Book Club, and Sacred Circles — together. Donation-based. Join the circle.",
    url: "https://www.collab.living/creators-club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Creators' Club | A Living Container",
    description:
      "Four practices. One circle. Ritual of Creativity, Wisdom Keepers, Book Club & Sacred Circles.",
  },
};

export default function CreatorsClubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

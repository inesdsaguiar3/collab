import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Creators' Club | A Weekly Ritual of Creativity — Co-llab",
  description:
    "A weekly online ritual of creativity — declutter, create, and share together. Donation-based. Join the circle.",
  keywords: [
    "online creativity circle",
    "creative ritual online",
    "weekly creativity group",
    "donation-based creativity",
    "creative community online",
    "writing circle online",
    "art circle online",
  ],
  alternates: {
    canonical: "/creators-club",
  },
  openGraph: {
    title: "The Creators' Club | A Weekly Ritual of Creativity",
    description:
      "Declutter, create, and share — a weekly online ritual of creativity. Donation-based. Join the circle.",
    url: "https://www.collab.living/creators-club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Creators' Club | A Weekly Ritual of Creativity",
    description: "A weekly online ritual of creativity. Donation-based. Join the circle.",
  },
};

export default function CreatorsClubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

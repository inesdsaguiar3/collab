import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rates & Booking — Casa do Sol | Co-llab",
  description:
    "See rates and book your stay at Casa do Sol, Óbidos. Shared, private, suite and studio packages with full board and morning yoga.",
  alternates: {
    canonical: "/rates",
  },
  openGraph: {
    title: "Rates & Booking — Casa do Sol",
    description:
      "Pricing and booking for Casa do Sol coliving stays in Óbidos, Portugal.",
    url: "https://www.collab.living/rates",
    type: "website",
  },
};

export default function RatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

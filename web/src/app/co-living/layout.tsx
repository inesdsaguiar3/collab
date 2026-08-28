import type { Metadata } from "next";
import { COLIVING_FAQS } from "@/lib/colivingFaqs";

const BASE = "https://www.collab.living";
const PAGE = `${BASE}/coliving`;

export const metadata: Metadata = {
  title: "Coliving in Óbidos — Community at Casa do Sol",
  description:
    "Short-term coliving at Casa do Sol, Óbidos — 6–30 day community stays with co-working, daily practices, and shared living near Lisbon, Portugal.",
  alternates: {
    canonical: "/coliving",
  },
  openGraph: {
    title: "Slow Living Portugal Near Lisbon | Co-llab",
    description:
      "Digital nomad coliving in Óbidos, Portugal — strong WiFi, remote-work rhythm, creative labs, and community life one hour from Lisbon.",
    url: PAGE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Nomad Coliving in Óbidos, Portugal",
    description:
      "Slow living and intentional community near Lisbon. 6–30 days at Casa do Sol, Óbidos — co-creation, rest, and connection with Collab.",
  },
};

export default function CoLivingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Collab Living — Coliving at Casa do Sol",
              description:
                "Conscious coliving and slow living in Óbidos, Portugal for digital nomads and remote workers. Short-term community stays with daily practices, co-creation, and themed creative labs.",
              url: PAGE,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Óbidos",
                addressCountry: "PT",
              },
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Co-working space with WiFi" },
                { "@type": "LocationFeatureSpecification", name: "Shared kitchen" },
                { "@type": "LocationFeatureSpecification", name: "Community meals (optional)" },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: COLIVING_FAQS.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: BASE },
                { "@type": "ListItem", position: 2, name: "Coliving", item: PAGE },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}

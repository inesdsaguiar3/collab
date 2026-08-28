import type { Metadata } from "next";

const BASE = "https://www.collab.living";
const PAGE = `${BASE}/one-to-one`;
const IMAGE = `${BASE}/images/INES-152.jpeg`;

export const metadata: Metadata = {
  title: "1:1 Somatic Therapy in Portugal | Psychosomatic Sessions, Breathwork & Burnout Recovery",
  description:
    "Individual somatic therapy sessions in Portugal (Óbidos) and online. Combining somatic experiencing, breathwork, Internal Family Systems, and compassionate inquiry to support burnout recovery, anxiety, and deep nervous system healing.",
  keywords: [
    "somatic therapy Portugal",
    "somatic therapy online",
    "psychosomatic session Portugal",
    "somatic experiencing Portugal",
    "breathwork therapy Portugal",
    "burnout recovery Portugal",
    "1:1 somatic session",
    "nervous system healing",
    "Internal Family Systems therapy",
    "compassionate inquiry",
    "somatic experiencing online",
    "breathwork session online",
    "therapy near Lisbon",
    "holistic therapy Portugal",
    "trauma therapy Portugal",
    "somatic coaching Portugal",
  ],
  alternates: {
    canonical: "/one-to-one",
  },
  openGraph: {
    title: "1:1 Somatic Therapy in Portugal | Somatic Experiencing & Breathwork",
    description:
      "Individual somatic therapy sessions combining somatic experiencing, breathwork, and IFS for burnout, anxiety, and nervous system reset. In person in Portugal or online.",
    url: PAGE,
    type: "website",
    images: [{ url: IMAGE, width: 800, height: 1067, alt: "Inês — somatic therapist in Portugal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "1:1 Somatic Therapy in Portugal | Breathwork & Nervous System Healing",
    description:
      "Somatic therapy, somatic experiencing, and breathwork sessions for burnout and nervous system healing. In person in Portugal or online.",
    images: [IMAGE],
  },
};

const faqItems = [
  {
    q: "What is somatic therapy?",
    a: "Somatic therapy is a body-based approach to healing. Rather than working only through conversation, we include physical sensations, breath, and movement as entry points into emotional and nervous system patterns.",
  },
  {
    q: "How is this different from talking therapy?",
    a: "Talking therapy works primarily through insight and language. Somatic therapy works with what the body is holding — tension, bracing, shutdown, or activation — so that change happens at a felt level, not just a cognitive one.",
  },
  {
    q: "Is somatic therapy effective for burnout?",
    a: "Yes. Burnout is often a nervous system collapse, not just a mindset problem. Somatic approaches help regulate the system, discharge accumulated stress, and rebuild capacity.",
  },
  {
    q: "What happens in a somatic experiencing session?",
    a: "Sessions are slow and relational. We work with breath, body sensation, intuitive movement, or parts work (IFS). There is no fixed agenda — we follow what shows up in the moment.",
  },
  {
    q: "Do you offer somatic therapy sessions in Portugal?",
    a: "Yes — in person in Óbidos, Portugal, about one hour from Lisbon. Sessions are also available online.",
  },
  {
    q: "Do I need prior experience with somatic work or breathwork?",
    a: "No. These sessions are open to anyone, including people who have never done body-based work before.",
  },
];

export default function OneToOneLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "1:1 Somatic Therapy Sessions",
              description:
                "Individual somatic therapy sessions combining somatic experiencing, breathwork, Internal Family Systems, and compassionate inquiry. Available in person in Portugal and online.",
              provider: {
                "@type": "Person",
                name: "Inês Rosa",
                url: PAGE,
                jobTitle: "Somatic Therapist & Breathwork Facilitator",
                worksFor: { "@type": "Organization", name: "Collab Living", url: BASE },
                address: { "@type": "PostalAddress", addressLocality: "Óbidos", addressCountry: "PT" },
              },
              serviceType: "Somatic Therapy",
              areaServed: [
                { "@type": "Place", name: "Portugal" },
                { "@type": "AdministrativeArea", name: "Online" },
              ],
              offers: {
                "@type": "Offer",
                description: "60-minute individual somatic therapy session",
                priceCurrency: "EUR",
              },
              url: PAGE,
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map(({ q, a }) => ({
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
                { "@type": "ListItem", position: 2, name: "1:1 Somatic Therapy", item: PAGE },
              ],
            },
          ]),
        }}
      />
      {children}
    </>
  );
}

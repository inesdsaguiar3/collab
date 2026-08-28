import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wellness Retreats in Portugal | Recovery, Reset, and Nervous System Care",
  description:
    "Explore wellness retreats in Portugal focused on stress reset, emotional balance, somatic support, and sustainable wellbeing practices.",
  alternates: {
    canonical: "/retreats/wellness-portugal",
  },
  openGraph: {
    title: "Wellness Retreats in Portugal",
    description:
      "A practical guide to choosing wellness retreats in Portugal, including options near Lisbon and Obidos.",
    url: "https://www.collab.living/retreats/wellness-portugal",
    type: "article",
  },
};

export default function WellnessRetreatsPortugalPage() {
  return (
    <main className="min-h-screen px-6 py-20">
      <article className="max-w-4xl mx-auto space-y-6 text-white/80 leading-relaxed">
        <h1 className="text-4xl md:text-6xl font-light text-white">Wellness Retreats in Portugal</h1>
        <p>
          The best wellness retreats in Portugal balance restoration with practical integration. Look for programs with
          clear daily rhythm, skilled facilitation, and enough space to regulate your nervous system rather than forcing
          constant activity.
        </p>
        <p>
          Many guests choose Portugal because it combines easy travel logistics with high-quality retreat settings. If
          you want a shorter transfer, consider options near Lisbon. If you want deeper immersion, Obidos and the Silver
          Coast are strong choices.
        </p>
        <p>
          Next steps:{" "}
          <Link href="/retreats/inner-peace-portugal" className="underline underline-offset-4">
            view our featured Obidos retreat
          </Link>{" "}
          or{" "}
          <Link href="/retreats" className="underline underline-offset-4">
            compare all retreats in Portugal
          </Link>
          .
        </p>
      </article>
    </main>
  );
}

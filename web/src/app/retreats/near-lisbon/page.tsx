import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wellness Retreats Near Lisbon | Portugal Retreat Guide",
  description:
    "Explore wellness retreats near Lisbon, including Obidos retreat options with breathwork, yoga, and somatic healing.",
  alternates: { canonical: "/retreats/near-lisbon" },
};

export default function NearLisbonRetreatsPage() {
  return (
    <main className="min-h-screen px-6 py-20">
      <section className="max-w-4xl mx-auto space-y-6 text-white/80">
        <h1 className="text-4xl md:text-6xl font-light text-white">Wellness Retreats Near Lisbon</h1>
        <p>
          Looking for <strong>wellness retreats near Lisbon</strong>? This page curates experiences that combine easy
          travel access with deeper transformational work, including breathwork, movement, and somatic healing.
        </p>
        <p>
          Obidos is one of the strongest nearby retreat destinations: close enough for smooth logistics, far enough to
          reset your nervous system and attention.
        </p>
        <div className="space-y-2 pt-2">
          <p>
            - Explore all options: <Link href="/retreats" className="underline underline-offset-4">retreats in Portugal</Link>
          </p>
          <p>
            - Featured breathwork retreat:{" "}
            <Link href="/retreats/inner-peace-portugal" className="underline underline-offset-4">
              Inner Peace Retreat
            </Link>
          </p>
          <p>
            - Related guide: <Link href="/retreats/portugal#near-lisbon" className="underline underline-offset-4">best retreats in Portugal</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

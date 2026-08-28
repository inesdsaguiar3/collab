import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Breathwork Retreats Portugal | Somatic & Nervous System Reset",
  description:
    "Discover breathwork retreats in Portugal with somatic healing, integration practices, and near-Lisbon retreat options.",
  alternates: { canonical: "/retreats/breathwork-portugal" },
};

export default function BreathworkRetreatsPortugalPage() {
  return (
    <main className="min-h-screen px-6 py-20">
      <section className="max-w-4xl mx-auto space-y-6 text-white/80">
        <h1 className="text-4xl md:text-6xl font-light text-white">Breathwork Retreats Portugal</h1>
        <p>
          The best <strong>breathwork retreats Portugal</strong> has to offer combine guided breath modalities with
          trauma-aware facilitation, integration support, and enough rest to let your nervous system truly settle.
        </p>
        <p>
          If your intention is emotional release, clarity, and embodied resilience, start with a retreat that blends
          conscious connected breathwork, regulation tools, and group integration circles.
        </p>
        <div className="space-y-2 pt-2">
          <p>
            - Featured option:{" "}
            <Link href="/retreats/inner-peace-portugal" className="underline underline-offset-4">
              Inner Peace Breathwork Retreat
            </Link>
          </p>
          <p>
            - Browse all formats: <Link href="/retreats" className="underline underline-offset-4">retreats in Portugal</Link>
          </p>
          <p>
            - Compare categories:{" "}
            <Link href="/retreats/portugal#comparison-table" className="underline underline-offset-4">
              best retreats in Portugal comparison
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

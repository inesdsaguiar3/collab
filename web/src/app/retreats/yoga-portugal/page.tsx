import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Yoga Retreats Portugal | Movement, Meditation & Integration",
  description:
    "Explore yoga retreats in Portugal that combine movement, meditation, breathwork, and somatic integration in restorative settings.",
  alternates: { canonical: "/retreats/yoga-portugal" },
};

export default function YogaRetreatsPortugalPage() {
  return (
    <main className="min-h-screen px-6 py-20">
      <section className="max-w-4xl mx-auto space-y-6 text-white/80">
        <h1 className="text-4xl md:text-6xl font-light text-white">Yoga Retreats Portugal</h1>
        <p>
          Many people search for <strong>yoga retreats Portugal</strong> to reconnect body and mind. The strongest
          programs now blend yoga-inspired movement with breathwork, meditation, and integration practices for lasting
          change.
        </p>
        <p>
          If you prefer a modern, holistic rhythm over a single-modality yoga schedule, look for retreats that include
          nervous system education and personal reflection alongside movement.
        </p>
        <div className="space-y-2 pt-2">
          <p>
            - Explore all options: <Link href="/retreats" className="underline underline-offset-4">retreats in Portugal</Link>
          </p>
          <p>
            - Breathwork-focused option:{" "}
            <Link href="/retreats/inner-peace-portugal" className="underline underline-offset-4">
              Inner Peace Retreat
            </Link>
          </p>
          <p>
            - Read full guide:{" "}
            <Link href="/retreats/portugal#yoga-retreats" className="underline underline-offset-4">
              best retreats in Portugal
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

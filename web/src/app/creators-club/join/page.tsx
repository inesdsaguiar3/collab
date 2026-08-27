import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { JoinForm } from "./JoinForm";

export const metadata: Metadata = {
  title: "Join the Lab — Co-llab",
  description:
    "Join the weekly Creators' Lab — a monthly online ritual of creativity.",
  alternates: {
    canonical: "/creators-club/join",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CreatorsClubJoinPage() {
  return (
    <div className="px-6 py-20 min-h-screen">
      <section className="max-w-xl mx-auto pt-6 space-y-10">
        <div className="space-y-4">
          <Link
            href="/creators-club"
            className="text-white/40 text-sm hover:text-white/70 transition-colors"
          >
            ← Back to Creators&apos; Lab
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Join the Lab<span className="text-[#EB8064]">.</span>
          </h1>
          <div className="space-y-5 text-white/55 text-base font-light leading-relaxed">
            <p>
              Weekly on Thursdays · Online. Complete the form below to join the circle and receive
              your invitation.
            </p>
            <p>
              This is a once monthly payment to join this creative community and attend as many
              workshops as you are able. You will receive all recordings for the live sessions.
            </p>
          </div>
        </div>

        <div className="glass rounded-2xl border border-white/10 px-5 py-8 md:px-8 md:py-10">
          <Suspense fallback={<p className="text-white/40 text-sm">Loading…</p>}>
            <JoinForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

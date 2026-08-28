"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.65, ease: "easeOut" as const },
});

const roles = [
  {
    title: "Artist",
    type: "Volunteer",
    description:
      "Share your craft with the community — workshops, performances, installations, or creative sessions during retreats, labs, and coliving chapters.",
    highlights: [
      "Lead or co-facilitate creative sessions",
      "Exchange your gift for room & board during stays",
      "Join a growing network of creators in Portugal",
    ],
    cta: "Apply as an artist",
    href: "/contact?topic=work&role=artist",
  },
  {
    title: "Community Manager",
    type: "Paid",
    description:
      "Support Co-llab mostly online — admin, community care, and growing the network. You also get access to labs & co-livings.",
    highlights: [
      "Mostly remote / online",
      "Admin support & expanding the network",
      "Access to labs & co-livings",
      "Paid position — details shared on application",
    ],
    cta: "Apply for community manager",
    href: "/contact?topic=work&role=community-manager",
  },
] as const;

export default function WorkWithUsPage() {
  return (
    <div className="px-6 py-20 min-h-screen">
      <section className="max-w-3xl mx-auto pt-10 space-y-16">
        <div className="space-y-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold block"
          >
            Join the team
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]"
          >
            Work with <span className="gradient-text">us.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-white/55 text-lg font-light leading-relaxed max-w-xl mx-auto"
          >
            We&apos;re building a living community in Portugal — and we&apos;re looking for people who
            want to grow with us.
          </motion.p>
        </div>

        <div className="space-y-6">
          {roles.map((role, i) => (
            <motion.article
              key={role.title}
              {...fadeUp(i * 0.08)}
              className="glass rounded-2xl border border-white/10 p-8 md:p-10 space-y-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {role.title}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold ${
                    role.type === "Paid"
                      ? "bg-[#7F5AA1]/20 text-white/80 border border-[#7F5AA1]/40"
                      : "bg-white/[0.06] text-white/60 border border-white/15"
                  }`}
                >
                  {role.type}
                </span>
              </div>
              <p className="text-white/55 text-base font-light leading-relaxed">{role.description}</p>
              <ul className="space-y-2.5">
                {role.highlights.map((item) => (
                  <li key={item} className="flex gap-3 items-start text-sm text-white/50 font-light">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#EB8064]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={role.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#EB8064] hover:text-white transition-colors"
              >
                {role.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.p {...fadeUp()} className="text-center text-white/40 text-sm font-light">
          Not sure which fits?{" "}
          <Link href="/contact" className="text-white/60 underline underline-offset-4 hover:text-white">
            Get in touch
          </Link>{" "}
          and tell us about yourself.
        </motion.p>
      </section>
    </div>
  );
}

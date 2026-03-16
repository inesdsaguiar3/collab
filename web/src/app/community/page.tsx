"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  User,
  Video,
  MessageCircle,
  Sparkles,
  Globe,
  BookOpen,
  Mic,
  Users,
  ArrowRight,
  Check,
  Calendar,
  Clock,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */

const oneOnOneOffers = [
  {
    id: 1,
    icon: User,
    title: "Soul Alignment Session",
    duration: "60 min",
    price: "€120",
    description:
      "A deep-dive 1:1 with one of our facilitators. We explore where you are, where you want to go, and what's standing in the way. Equal parts coaching, intuition, and strategy.",
    includes: [
      "Personal intake questionnaire",
      "60-min Zoom call",
      "Post-session voice note summary",
      "Resource bundle tailored to you",
    ],
    accent: "#EB8064",
    badge: "Most Personal",
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Co-Creation Intensive",
    duration: "90 min",
    price: "€200",
    description:
      "Bring your project, business idea, or creative vision. Together we map it out, stress-test it, and build a clear action plan you can act on immediately.",
    includes: [
      "Pre-session vision board exercise",
      "90-min deep-work call",
      "Co-llab action map (PDF)",
      "30-day follow-up check-in",
    ],
    accent: "#D16678",
    badge: "Most Popular",
  },
  {
    id: 3,
    icon: MessageCircle,
    title: "Monthly Mentorship",
    duration: "4 × 45 min / month",
    price: "€380/mo",
    description:
      "Ongoing accountability and guidance across a full month. Four weekly calls, unlimited voice messages in between, and direct access to your mentor's perspective.",
    includes: [
      "4 weekly 45-min calls",
      "Async voice messaging (unlimited)",
      "Monthly reflection review",
      "Priority access to workshops",
    ],
    accent: "#D96B50",
    badge: "Best Value",
  },
];

const onlineOffers = [
  {
    id: 1,
    icon: Video,
    title: "Live Circles",
    frequency: "Every 2 weeks",
    price: "Included in membership",
    description:
      "Intimate group video calls (max 12 people) facilitated by a Co-llab host. A safe container for sharing, receiving, and being witnessed. No agenda, just presence.",
    tags: ["Group", "Video", "Live"],
    accent: "#EB8064",
  },
  {
    id: 2,
    icon: BookOpen,
    title: "Co-llab Library",
    frequency: "Always on",
    price: "Included in membership",
    description:
      "On-demand recordings of past workshops, guided meditations, somatic practices, and masterclasses. Grow at your own pace, whenever inspiration strikes.",
    tags: ["Self-paced", "Video", "Audio"],
    accent: "#D16678",
  },
  {
    id: 3,
    icon: Mic,
    title: "Monthly Masterclass",
    frequency: "Once a month",
    price: "Included in membership",
    description:
      "A deep-dive live session led by a guest expert — from breathwork to business, astrology to architecture. Open Q&A and always recorded for members.",
    tags: ["Expert", "Live", "Recorded"],
    accent: "#D96B50",
  },
  {
    id: 4,
    icon: Globe,
    title: "Private Community",
    frequency: "24/7",
    price: "Included in membership",
    description:
      "Your people, in one place. Share wins, ask questions, find co-founders, plan meet-ups. The Co-llab community is the most generous group of humans we know.",
    tags: ["Async", "Text", "Community"],
    accent: "#C85A3A",
  },
  {
    id: 5,
    icon: Users,
    title: "Skill-Share Sessions",
    frequency: "Weekly",
    price: "Included in membership",
    description:
      "Community-led peer-to-peer workshops. Got a skill to share? Host one. Need to learn something? Request it. The exchange is the magic.",
    tags: ["Peer", "Interactive", "Weekly"],
    accent: "#EB8064",
  },
  {
    id: 6,
    icon: Calendar,
    title: "Member Events",
    frequency: "Monthly IRL + online",
    price: "Discounted for members",
    description:
      "Dinners, pop-ups, day retreats, and online socials exclusively for Co-llab members. Because the best connections happen off the screen too.",
    tags: ["IRL", "Social", "Exclusive"],
    accent: "#EB8064",
  },
];

const membershipTiers = [
  {
    name: "Explorer",
    price: "€29",
    period: "/mo",
    description: "Dip your toes in. Access the community and one live circle per month.",
    features: [
      "Private community access",
      "1 Live Circle / month",
      "Co-llab Library (basic)",
      "Monthly newsletter",
    ],
    accent: "#D96B50",
    cta: "Start Exploring",
  },
  {
    name: "Member",
    price: "€79",
    period: "/mo",
    description: "The full experience. Everything you need to grow with your community.",
    features: [
      "Everything in Explorer",
      "Unlimited Live Circles",
      "Full Library access",
      "Monthly Masterclass",
      "Weekly Skill-Shares",
      "Member event discounts",
    ],
    accent: "#EB8064",
    cta: "Become a Member",
    featured: true,
  },
  {
    name: "Contributor",
    price: "€149",
    period: "/mo",
    description: "For those who want to give and receive at the deepest level.",
    features: [
      "Everything in Member",
      "Host your own Circles",
      "1 monthly 1:1 check-in (30 min)",
      "Early access to retreats",
      "Co-llab contributor badge",
      "Annual in-person gathering",
    ],
    accent: "#C85A3A",
    cta: "Lead the Way",
  },
];

/* ─── Animation helpers ─────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.55, ease: "easeOut" as const },
});

/* ─── Page ──────────────────────────────────────────────── */

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"1:1" | "online">("1:1");

  return (
    <div className="px-6 py-20 space-y-32">

      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto text-center space-y-6 pt-10">
        <motion.div {...fadeUp(0)}>
          <span className="text-xs uppercase tracking-[0.3em] text-white/60 font-semibold">Community</span>
        </motion.div>
        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none"
        >
          Grow together.<br />
          <span className="gradient-text">Go further.</span>
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
          Whether you want intimate 1:1 guidance or the energy of a global online tribe — there's a Co-llab space designed exactly for where you are right now.
        </motion.p>

        {/* Tab switcher */}
        <motion.div {...fadeUp(0.3)} className="flex justify-center pt-4">
          <div className="flex gap-1 p-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
            {(["1:1", "online"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-250 ${
                  activeTab === tab
                    ? "bg-white text-[#C85A3A] shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {tab === "1:1" ? "1:1 Sessions" : "Online Community"}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 1:1 Offers ── */}
      {activeTab === "1:1" && (
        <section className="max-w-6xl mx-auto space-y-12">
          <motion.div {...fadeUp()} className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">1:1 Sessions</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Your own <span className="gradient-text">guide.</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Personalised sessions with experienced facilitators. No templates, no scripts — just real, present-moment guidance built around you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {oneOnOneOffers.map((offer, idx) => (
              <motion.div
                key={offer.id}
                {...fadeUp(idx * 0.1)}
                className="glass glass-hover rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden"
              >
                {/* Badge */}
                <div
                  className="absolute top-5 right-5 text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ background: `${offer.accent}60`, border: `1px solid ${offer.accent}80` }}
                >
                  {offer.badge}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: `${offer.accent}20`, border: `1px solid ${offer.accent}40` }}
                >
                  <offer.icon className="w-5 h-5" style={{ color: offer.accent }} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white">{offer.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-white/50">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{offer.duration}</span>
                    <span className="font-bold text-base" style={{ color: offer.accent }}>{offer.price}</span>
                  </div>
                </div>

                <p className="text-white/60 text-sm leading-relaxed flex-grow">{offer.description}</p>

                <ul className="space-y-2">
                  {offer.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: offer.accent }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-auto"
                  style={{
                    background: `linear-gradient(135deg, ${offer.accent}, ${offer.accent}99)`,
                    boxShadow: `0 8px 24px ${offer.accent}30`,
                  }}
                >
                  Book a Session →
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Online Offers ── */}
      {activeTab === "online" && (
        <section className="max-w-6xl mx-auto space-y-12">
          <motion.div {...fadeUp()} className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D16678] font-semibold">Online Community</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Always <span className="gradient-text">connected.</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              A living, breathing digital home for Co-llab members worldwide. Show up live or catch the recording — either way, you belong here.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {onlineOffers.map((offer, idx) => (
              <motion.div
                key={offer.id}
                {...fadeUp(idx * 0.08)}
                className="glass glass-hover rounded-2xl p-7 flex flex-col gap-5"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${offer.accent}20`, border: `1px solid ${offer.accent}40` }}
                >
                  <offer.icon className="w-5 h-5" style={{ color: offer.accent }} />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white">{offer.title}</h3>
                  <p className="text-xs font-medium" style={{ color: offer.accent }}>{offer.frequency}</p>
                </div>

                <p className="text-white/60 text-sm leading-relaxed flex-grow">{offer.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {offer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full text-white/70"
                      style={{ background: `${offer.accent}18`, border: `1px solid ${offer.accent}35` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-white/40">{offer.price}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Divider ── */}
      <div className="line-glow max-w-7xl mx-auto" />

      {/* ── Membership Tiers ── */}
      <section className="max-w-6xl mx-auto space-y-14 pb-10">
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Membership</span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            One community, <span className="gradient-text">your pace.</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            All memberships include access to the online community. Upgrade anytime. No lock-ins.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {membershipTiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              {...fadeUp(idx * 0.1)}
              className={`glass rounded-3xl p-8 flex flex-col gap-6 relative ${
                tier.featured ? "ring-2 ring-white/30 scale-[1.02]" : ""
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#EB8064] to-[#D16678] shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-2xl font-black text-white mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-4xl font-black" style={{ color: tier.accent }}>{tier.price}</span>
                  <span className="text-white/40 text-sm">{tier.period}</span>
                </div>
              </div>

              <p className="text-white/60 text-sm leading-relaxed">{tier.description}</p>

              <ul className="space-y-3 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/75">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: tier.accent }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3.5 rounded-xl font-semibold text-white text-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-auto"
                style={{
                  background: tier.featured
                    ? "linear-gradient(135deg, #EB8064, #D16678)"
                    : `${tier.accent}40`,
                  border: tier.featured ? "none" : `1px solid ${tier.accent}60`,
                  boxShadow: tier.featured ? "0 12px 32px rgba(235,128,100,0.25)" : "none",
                }}
              >
                {tier.cta} →
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.3)} className="text-center pt-4">
          <p className="text-white/40 text-sm">
            Not sure which is right for you?{" "}
            <Link href="/contact" className="text-white/70 hover:text-white underline underline-offset-4 transition-colors">
              Let's talk
            </Link>
            {" "}and we'll point you in the right direction.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

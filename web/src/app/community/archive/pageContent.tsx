"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { User, Video, MessageCircle, Sparkles, Check, Calendar, Clock, CreditCard } from "lucide-react";

const oneOnOneOffers = [
  {
    id: 1,
    icon: User,
    title: "Psychosomatic Session",
    duration: "60 min",
    price: "from 80€/session",
    description:
      "A 1:1 session focused on body-emotion integration. We work with nervous system patterns, emotional signals, and embodied tools to support regulation and clarity.",
    includes: [
      "Personal intake questionnaire",
      "60-min Zoom call",
      "Grounding and integration practices",
      "Post-session support notes",
    ],
    accent: "#EB8064",
    badge: "Most Personal",
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Creative Expression Session",
    duration: "75 min",
    price: "from 80€/session",
    description:
      "A guided 1:1 space to unlock creative flow, voice, and expression. Ideal when you feel blocked, in transition, or ready to share your work from a truer place.",
    includes: [
      "Creative check-in questionnaire",
      "75-min expression-focused session",
      "Personal integration prompts",
      "Follow-up reflection note",
    ],
    accent: "#D16678",
    badge: "Most Popular",
  },
  {
    id: 3,
    icon: MessageCircle,
    title: "Monthly Mentorship",
    duration: "4 × 45 min / month",
    price: "300€/month",
    description:
      "Ongoing accountability and guidance across a full month. Four weekly calls, unlimited voice messages in between, and direct access to your mentor's perspective.",
    includes: [
      "4 weekly 45-min calls",
      "Async voice messaging (unlimited)",
      "Monthly reflection review",
      "Priority access to support sessions",
    ],
    accent: "#D96B50",
    badge: "Best Value",
  },
];

const subscriptionFeatures = [
  "Weekly Community Journeys every Saturday at 11:00 AM",
  "Replay access and integration resources",
  "Priority invitations to upcoming online formats",
  "Special pricing for 1:1 guidance sessions",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.55, ease: "easeOut" as const },
});

export default function CommunityArchivePage() {
  const [activeTab, setActiveTab] = useState<"journeys" | "one-on-one" | "subscription">("journeys");

  return (
    <div className="px-6 py-20 space-y-32">
      <section className="max-w-4xl mx-auto text-center space-y-6 pt-10">
        <motion.div {...fadeUp(0)}>
          <span className="text-xs uppercase tracking-[0.3em] text-white/60 font-semibold">Community</span>
        </motion.div>
        <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none">
          Grow together.<br />
          <span className="gradient-text">Go further.</span>
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
          Community Journeys is one weekly online offering for now: somatic practice, integration circles, and replay included.
        </motion.p>
        <motion.div {...fadeUp(0.3)} className="flex justify-center pt-4">
          <div className="flex gap-1 p-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
            {(["journeys", "one-on-one", "subscription"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-250 ${
                  activeTab === tab ? "bg-white text-[#C85A3A] shadow-md" : "text-white/70 hover:text-white"
                }`}
              >
                {tab === "journeys" ? "Community Journeys" : tab === "one-on-one" ? "1:1 Guidance" : "Online Subscription"}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {activeTab === "one-on-one" && (
        <section className="max-w-6xl mx-auto space-y-12">
          <motion.div {...fadeUp()} className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">1:1 Sessions</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Your own <span className="gradient-text">guide.</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Personalised sessions with experienced facilitators. No templates, no scripts, just real guidance built around you.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {oneOnOneOffers.map((offer, idx) => (
              <motion.div key={offer.id} {...fadeUp(idx * 0.1)} className="glass glass-hover rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-5 right-5 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: `${offer.accent}60`, border: `1px solid ${offer.accent}80` }}>
                  {offer.badge}
                </div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${offer.accent}20`, border: `1px solid ${offer.accent}40` }}>
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
                <button className="w-full py-3 rounded-xl font-semibold text-white text-sm mt-auto" style={{ background: `linear-gradient(135deg, ${offer.accent}, ${offer.accent}99)` }}>
                  Book a Session
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "journeys" && (
        <section className="max-w-5xl mx-auto space-y-10">
          <motion.div {...fadeUp()} className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D16678] font-semibold">Community Journeys</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Always <span className="gradient-text">connected.</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              One weekly online space that combines somatic practice and integration circles, with replay included.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.08)} className="glass rounded-3xl p-8 md:p-10 border border-white/12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#D16678]/20 border border-[#D16678]/55">
                <Video className="w-5 h-5 text-[#D16678]" />
              </div>
              <div>
                <h3 className="text-2xl font-light text-white">Community Journeys</h3>
                <p className="text-white/50 text-sm flex items-center gap-2 mt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Every Saturday at 11:00 AM
                </p>
              </div>
            </div>
            <p className="text-white/65 leading-relaxed">
              A weekly live online journey where we gather for somatic practice and integration circles. If you cannot join live, replay is included so you can stay connected in your own time.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/75">
                <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#D16678]" />
                Weekly live session on Saturday at 11:00 AM
              </li>
              <li className="flex items-start gap-3 text-sm text-white/75">
                <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#D16678]" />
                Somatic practice + integration circle in one format
              </li>
              <li className="flex items-start gap-3 text-sm text-white/75">
                <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#D16678]" />
                Replay included after each session
              </li>
            </ul>
            <div className="pt-7">
              <Link
                href="/contact?topic=community-journeys"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[#D16678] to-[#EB8064]"
              >
                Join Community Journeys
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {activeTab === "subscription" && (
        <section className="max-w-5xl mx-auto space-y-10 pb-10">
          <motion.div {...fadeUp()} className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Online Subscription</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Coming <span className="gradient-text">soon.</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              A single online subscription to access Community Journeys and supportive practices in one place.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="glass rounded-3xl p-8 md:p-10 border border-white/12">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#EB8064]/20 border border-[#EB8064]/50">
                <CreditCard className="w-5 h-5 text-[#EB8064]" />
              </div>
              <div>
                <h3 className="text-2xl font-light text-white">Co-llab Online Subscription</h3>
                <p className="text-white/45 text-sm">Launching soon</p>
              </div>
            </div>
            <ul className="space-y-3">
              {subscriptionFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-white/75">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#EB8064]" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="pt-7">
              <Link
                href="/contact?topic=online-subscription"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[#EB8064] to-[#D16678]"
              >
                Join waitlist
              </Link>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Lightbulb, Globe, Zap } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Radical Inclusion",
    desc: "Every soul is welcome here. We hold space without judgment, building environments where authenticity thrives.",
    color: "#EB8064",
  },
  {
    icon: Globe,
    title: "Global Community",
    desc: "Boundaries are illusions. Our network spans continents, creating belonging wherever you land.",
    color: "#D16678",
  },
  {
    icon: Zap,
    title: "Co-Creation",
    desc: "We believe the best ideas emerge when diverse minds share the same table. Collaboration is our superpower.",
    color: "#D96B50",
  },
  {
    icon: Lightbulb,
    title: "Conscious Living",
    desc: "We make choices that honor ourselves, our communities, and the planet we call home.",
    color: "#C85A3A",
  },
];

const team = [
  { name: "Elena Sol", role: "Founder & Visionary", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
  { name: "Marcus Chen", role: "Head of Experience", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name: "Amara Osei", role: "Community Lead", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80" },
  { name: "Sofia Lenz", role: "Retreat Curator", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function AboutPage() {
  return (
    <div className="px-6 py-20 space-y-32">
      {/* Header */}
      <section className="max-w-5xl mx-auto text-center space-y-8 pt-10">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Our Story</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none"
        >
          Born from a desire<br />
          <span className="gradient-text">to belong.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed"
        >
          We asked a simple question: what if life could be designed around connection rather than isolation? Co-llab is the answer.
        </motion.p>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-white/60 text-lg leading-relaxed"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white">Why Co-llab Exists</h2>
          <p>
            It started with a few friends, a shared house, and the realization that everything flows better when you're surrounded by people who truly see you.
          </p>
          <p>
            From humble retreat gatherings to a global movement, Co-llab has grown into a network of spaces and experiences that honor the deep human need for community, creativity, and meaning.
          </p>
          <p>
            Today we curate retreats on five continents, co-living spaces in the world's most inspiring cities, and a member community that spans borders and backgrounds.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
            alt="Friends at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-5 border border-white/10">
            <p className="text-white font-medium italic text-sm leading-relaxed">
              "We don't just host retreats. We create the conditions for transformation."
            </p>
            <span className="text-[#EB8064] text-xs mt-2 block">— Elena Sol, Founder</span>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto space-y-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold block mb-4">What We Stand For</span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Our Core Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass glass-hover rounded-2xl p-8 space-y-4 cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${v.color}20`, border: `1px solid ${v.color}40` }}
              >
                <v.icon className="w-5 h-5" style={{ color: v.color }} />
              </div>
              <h3 className="text-xl font-bold text-white">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto space-y-16">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D16678] font-semibold block mb-4">The Humans Behind</span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Meet the Team</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group text-center space-y-4"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mx-auto">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div>
                <h3 className="font-bold text-white">{member.name}</h3>
                <p className="text-[#EB8064] text-xs uppercase tracking-wider mt-0.5">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center space-y-8 pb-10">
        <div className="line-glow mb-16" />
        <h2 className="text-4xl md:text-5xl font-black text-white">Ready to join?</h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Whether through a retreat, a co-living stay, or simply saying hi — we'd love to connect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/retreats"
            className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#EB8064] to-[#D16678] hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-xl shadow-[#EB8064]/20"
          >
            Find a Retreat ✦
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full font-semibold text-white glass border border-white/15 hover:border-white/30 transition-all duration-200"
          >
            Say Hi →
          </Link>
        </div>
      </section>
    </div>
  );
}

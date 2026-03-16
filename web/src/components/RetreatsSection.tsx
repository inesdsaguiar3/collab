"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Star, ArrowRight } from "lucide-react";

const retreats = [
  {
    id: 1,
    title: "Mountain Soul",
    location: "Swiss Alps",
    date: "Sep 2026",
    description: "Breathe deep amidst majestic peaks. Daily yoga, guided hikes, and fireside circles under the stars.",
    tags: ["Yoga", "Nature", "Luxury"],
    accent: "#EB8064",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
  },
  {
    id: 2,
    title: "Ocean Flow",
    location: "Uluwatu, Bali",
    date: "Nov 2026",
    description: "Surrender to the rhythm of the waves. Surf lessons, mindfulness workshops, and Balinese ceremony.",
    tags: ["Surf", "Wellness", "Culture"],
    accent: "#D16678",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  },
  {
    id: 3,
    title: "Desert Silence",
    location: "Joshua Tree, USA",
    date: "Jan 2027",
    description: "Find clarity in the stillness. Stargazing, sound baths, and expansive desert trekking.",
    tags: ["Sound Healing", "Silence", "Stars"],
    accent: "#D96B50",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80",
  },
];

export function RetreatsSection() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Upcoming</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
              Retreat <br />
              <span className="gradient-text">Experiences</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-xs text-sm leading-relaxed">
            Immersive escapes designed to ignite the soul and build lasting bonds with a global tribe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {retreats.map((retreat, idx) => (
            <motion.div
              key={retreat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass glass-hover rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={retreat.image}
                  alt={retreat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {retreat.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs rounded-full text-white/80 font-medium"
                      style={{ background: `${retreat.accent}25`, border: `1px solid ${retreat.accent}40` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-4 text-xs font-medium uppercase tracking-wider" style={{ color: retreat.accent }}>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{retreat.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{retreat.location}</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight group-hover:gradient-text transition-all">
                  {retreat.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                  {retreat.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold pt-2" style={{ color: retreat.accent }}>
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/retreats"
            className="px-8 py-4 glass rounded-full text-white font-semibold border border-white/10 hover:border-[#EB8064]/40 hover:bg-white/5 transition-all duration-200 flex items-center gap-2"
          >
            View all retreats <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

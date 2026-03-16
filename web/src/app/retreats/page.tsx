"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Star, ArrowRight, X } from "lucide-react";

const retreats = [
  {
    id: 1,
    title: "Mountain Soul: Alpine Immersion",
    location: "Zermatt, Switzerland",
    date: "Sep 15 – 22, 2026",
    price: "$2,800",
    spots: "8 spots left",
    rating: 4.9,
    tags: ["Yoga", "Nature", "Luxury"],
    accent: "#EB8064",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=85",
    description: "Nestled in the shadow of the Matterhorn, this retreat invites you to breathe deeply and reconnect with nature through daily yoga, guided alpine hikes, and fireside reflection circles.",
    includes: ["Daily yoga & meditation", "3 guided hikes", "Organic farm-to-table meals", "Private room accommodation", "Airport transfer"],
  },
  {
    id: 2,
    title: "Ocean Flow: Bali Surf & Soul",
    location: "Uluwatu, Bali",
    date: "Nov 5 – 12, 2026",
    price: "$2,200",
    spots: "5 spots left",
    rating: 4.8,
    tags: ["Surf", "Wellness", "Culture"],
    accent: "#D16678",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85",
    description: "Catch waves at sunrise, attend Balinese ceremonies at dusk. This retreat blends adventure and stillness in one of the world's most spiritually alive islands.",
    includes: ["Daily surf lessons", "Meditation & breathwork", "Balinese cooking class", "Temple ceremony visit", "Infinity pool villa"],
  },
  {
    id: 3,
    title: "Desert Silence: Stargazing & Sound",
    location: "Joshua Tree, USA",
    date: "Jan 10 – 15, 2027",
    price: "$1,950",
    spots: "12 spots left",
    rating: 5.0,
    tags: ["Sound Healing", "Silence", "Stars"],
    accent: "#D96B50",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=900&q=85",
    description: "There's a magic in the desert that strips everything down to what matters. Sound baths under 3,000 stars, desert trekking, and space to hear yourself again.",
    includes: ["Nightly sound baths", "Desert hike at dawn", "Breathwork sessions", "Plant-based meals", "Private casita lodging"],
  },
  {
    id: 4,
    title: "Forest Wisdom: Amazonian Journey",
    location: "Iquitos, Peru",
    date: "Mar 20 – 28, 2027",
    price: "$3,100",
    spots: "6 spots left",
    rating: 4.9,
    tags: ["Ceremony", "Spirituality", "Nature"],
    accent: "#C85A3A",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=900&q=85",
    description: "A deep dive into the living wisdom of the rainforest. Learn from indigenous elders, walk ancient jungle paths, and participate in sacred plant ceremonies.",
    includes: ["Ceremonial experiences", "Jungle survival skills", "Healing plant workshops", "Traditional Amazonian cuisine", "Shaman-led sessions"],
  },
];

export default function RetreatsPage() {
  const [selected, setSelected] = useState<(typeof retreats)[0] | null>(null);

  return (
    <div className="px-6 py-20">
      {/* Header */}
      <section className="max-w-5xl mx-auto text-center space-y-6 pt-10 mb-20">
        <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Upcoming Experiences</span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none">
          Retreat into <br />
          <span className="gradient-text">your best self.</span>
        </h1>
        <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
          Each retreat is a portal. Sacred spaces, curated community, transformative practices — designed to help you remember who you really are.
        </p>
      </section>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {retreats.map((retreat, idx) => (
          <motion.div
            key={retreat.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="glass glass-hover rounded-3xl overflow-hidden group cursor-pointer flex flex-col"
            onClick={() => setSelected(retreat)}
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={retreat.image}
                alt={retreat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              {/* Tags */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                {retreat.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full text-white font-medium backdrop-blur-sm"
                    style={{ background: `${retreat.accent}30`, border: `1px solid ${retreat.accent}50` }}>
                    {tag}
                  </span>
                ))}
              </div>
              {/* Rating */}
              <div className="absolute top-4 right-4 flex items-center gap-1 glass px-2.5 py-1.5 rounded-full text-white text-xs font-bold border border-white/10">
                <Star className="w-3 h-3" style={{ color: retreat.accent, fill: retreat.accent }} />
                {retreat.rating}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow space-y-5">
              <div className="flex justify-between items-start">
                <div className="space-y-1.5">
                  <h3 className="text-2xl font-black text-white group-hover:gradient-text transition-all leading-tight">{retreat.title}</h3>
                  <p className="flex items-center gap-1.5 text-white/45 text-sm">
                    <MapPin className="w-3.5 h-3.5" /> {retreat.location}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-xl font-black" style={{ color: retreat.accent }}>{retreat.price}</div>
                  <div className="text-xs text-white/40">per person</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg w-fit"
                style={{ background: `${retreat.accent}15`, color: retreat.accent }}>
                <Calendar className="w-3.5 h-3.5" /> {retreat.date}
              </div>

              <p className="text-white/50 text-sm leading-relaxed flex-grow line-clamp-2">{retreat.description}</p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-white/30 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> {retreat.spots}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:translate-x-1 duration-200" style={{ color: retreat.accent }}>
                  View details <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-3xl max-w-3xl w-full overflow-hidden border border-white/15 max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-72">
                <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 glass rounded-full flex items-center justify-center text-white/70 hover:text-white border border-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <h2 className="text-3xl font-black text-white">{selected.title}</h2>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-black" style={{ color: selected.accent }}>{selected.price}</div>
                    <div className="text-xs text-white/40">per person</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{selected.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{selected.date}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{selected.spots}</span>
                </div>

                <p className="text-white/60 leading-relaxed">{selected.description}</p>

                <div>
                  <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">What's Included</h4>
                  <ul className="space-y-2">
                    {selected.includes.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-white/60 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: selected.accent }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="w-full py-4 rounded-2xl font-semibold text-white text-base hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl"
                  style={{ background: `linear-gradient(135deg, ${selected.accent}, ${selected.accent}aa)`, boxShadow: `0 20px 40px ${selected.accent}30` }}
                >
                  Reserve Your Spot →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

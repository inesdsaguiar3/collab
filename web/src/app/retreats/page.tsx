"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, X, Check } from "lucide-react";
import Link from "next/link";

const featuredRetreats = [
  {
    id: "inner-peace-portugal",
    title: "Breathwork Retreat",
    subtitle: "A Somatic Journey into Inner Peace",
    location: "Óbidos, Portugal",
    date: "May 20 – 24, 2026",
    price: "from €727",
    spots: "12 spots",
    tags: ["Breathwork", "Somatic", "Healing"],
    accent: "#7F5AA1",
    image: "/images/retreats/innerpeace.jpg",
    href: "/retreats/inner-peace-portugal",
    includes: ["Daily breathwork sessions", "Somatic movement & yoga", "All meals included", "Accommodation options", "Integration toolkit"],
    description: "A transformative five-day journey through breath, body, and stillness. Set in the medieval hills of Óbidos, Portugal.",
  },
];

const retreats = [
  {
    id: 1,
    title: "Mountain Soul",
    location: "Zermatt, Switzerland",
    date: "Sep 15 – 22, 2026",
    price: "from €2,800",
    spots: "8 spots",
    tags: ["Yoga", "Nature", "Luxury"],
    accent: "#EB8064",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=85",
    description: "Nestled in the shadow of the Matterhorn. Daily yoga, guided alpine hikes, and fireside reflection circles.",
    includes: ["Daily yoga & meditation", "3 guided hikes", "Organic farm-to-table meals", "Private accommodation", "Airport transfer"],
  },
  {
    id: 2,
    title: "Ocean Flow",
    location: "Uluwatu, Bali",
    date: "Nov 5 – 12, 2026",
    price: "from €2,200",
    spots: "5 spots",
    tags: ["Surf", "Wellness", "Culture"],
    accent: "#D16678",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85",
    description: "Catch waves at sunrise, attend Balinese ceremonies at dusk.",
    includes: ["Daily surf lessons", "Meditation & breathwork", "Balinese cooking class", "Temple ceremony visit", "Infinity pool villa"],
  },
  {
    id: 3,
    title: "Desert Silence",
    location: "Joshua Tree, USA",
    date: "Jan 10 – 15, 2027",
    price: "from €1,950",
    spots: "12 spots",
    tags: ["Sound Healing", "Silence", "Stars"],
    accent: "#D96B50",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=900&q=85",
    description: "Sound baths under 3,000 stars, desert trekking, and space to hear yourself again.",
    includes: ["Nightly sound baths", "Desert hike at dawn", "Breathwork sessions", "Plant-based meals", "Private casita lodging"],
  },
  {
    id: 4,
    title: "Forest Wisdom",
    location: "Iquitos, Peru",
    date: "Mar 20 – 28, 2027",
    price: "from €3,100",
    spots: "6 spots",
    tags: ["Ceremony", "Spirituality", "Nature"],
    accent: "#C85A3A",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=900&q=85",
    description: "Learn from indigenous elders, walk ancient jungle paths, and participate in sacred plant ceremonies.",
    includes: ["Ceremonial experiences", "Jungle survival skills", "Healing plant workshops", "Traditional Amazonian cuisine", "Shaman-led sessions"],
  },
];

export default function RetreatsPage() {
  const [selected, setSelected] = useState<(typeof retreats)[0] | null>(null);

  return (
    <div className="min-h-screen">

      {/* ── PAGE HEADER ── editorial, Miraval-style */}
      <section className="max-w-4xl mx-auto px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="space-y-5">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40 font-light">
            Upcoming Experiences
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight">
            Retreats designed<br />for the whole you.
          </h1>
          <p className="text-white/45 text-base md:text-lg font-light max-w-lg leading-[1.85]">
            Sacred spaces, curated community, transformative practices — designed to help you remember who you really are.
          </p>
        </motion.div>
      </section>

      {/* Thin rule */}
      <div className="max-w-4xl mx-auto px-8">
        <div className="h-px bg-white/10" />
      </div>

      {/* ── FEATURED RETREAT — landscape card, Miraval destinations style ── */}
      <section className="max-w-5xl mx-auto px-8 py-20">
        <p className="text-xs uppercase tracking-[0.35em] text-white/30 font-light mb-10">
          Featured · Next retreat
        </p>

        {featuredRetreats.map((retreat, idx) => (
          <motion.div key={retreat.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}>
            <Link href={retreat.href} className="group block">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] rounded-3xl overflow-hidden glass border border-white/10 hover:border-white/20 transition-all duration-500">

                {/* Image — tall, cinematic */}
                <div className="relative h-72 md:h-auto md:min-h-[420px] overflow-hidden">
                  <img src={retreat.image} alt={retreat.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  {/* Tags on image */}
                  <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                    {retreat.tags.map(tag => (
                      <span key={tag}
                        className="px-3 py-1 rounded-full text-xs text-white/80 font-light backdrop-blur-sm"
                        style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-10 md:p-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-light text-white/35">
                      <MapPin className="w-3 h-3" /> {retreat.location}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-light text-white leading-[1.1] tracking-tight group-hover:text-white/80 transition-colors">
                      {retreat.title}
                    </h2>
                    <p className="text-white/45 font-light text-sm leading-[1.75]">{retreat.description}</p>
                  </div>

                  {/* Includes — Yoga Barn style */}
                  <div className="my-8 space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/30 font-light mb-4">What's included</p>
                    {retreat.includes.map(item => (
                      <div key={item} className="flex items-center gap-3 text-sm text-white/50 font-light">
                        <Check className="w-3 h-3 flex-shrink-0" style={{ color: retreat.accent }} />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Price + date + CTA */}
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-light text-white">{retreat.price}</p>
                        <div className="flex items-center gap-1.5 text-xs text-white/35 font-light mt-1">
                          <Calendar className="w-3 h-3" /> {retreat.date}
                        </div>
                      </div>
                      <span className="flex items-center gap-2 text-sm font-light group-hover:gap-3 transition-all"
                        style={{ color: retreat.accent }}>
                        Explore <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                    <p className="text-xs text-white/25 font-light flex items-center gap-1.5">
                      <Users className="w-3 h-3" /> Only {retreat.spots} available
                    </p>
                  </div>
                </div>

              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ── MORE RETREATS — Coming Soon ── */}
      <section className="max-w-5xl mx-auto px-8 pb-28">
        <div className="flex items-center gap-6 mb-10">
          <div className="h-px flex-1 bg-white/10" />
          <p className="text-xs uppercase tracking-[0.35em] text-white/25 font-light flex-shrink-0">More experiences</p>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {retreats.map((retreat, idx) => (
            <motion.div key={retreat.id}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="group cursor-pointer rounded-2xl overflow-hidden glass border border-white/10 hover:border-white/20 transition-all duration-300"
              onClick={() => setSelected(retreat)}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img src={retreat.image} alt={retreat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs text-white/60 font-light">{retreat.location}</span>
                </div>
              </div>
              {/* Content */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-base font-light text-white leading-tight">{retreat.title}</h3>
                  <p className="text-xs text-white/30 font-light mt-0.5">{retreat.date}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.07]">
                  <span className="text-sm font-light" style={{ color: retreat.accent }}>{retreat.price}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/25 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── DETAIL MODAL — Miraval/Yoga Barn clean style ── */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="glass rounded-3xl max-w-lg w-full overflow-hidden border border-white/12 max-h-[90vh] overflow-y-auto">

              {/* Image */}
              <div className="relative h-56">
                <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                <button onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 glass rounded-full flex items-center justify-center text-white/60 hover:text-white border border-white/10">
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-5 left-6">
                  <h2 className="text-2xl font-light text-white">{selected.title}</h2>
                  <p className="text-xs text-white/40 font-light mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />{selected.location} · <Calendar className="w-3 h-3" />{selected.date}
                  </p>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-white/50 text-sm leading-[1.8] font-light">{selected.description}</p>

                {/* What's included — Yoga Barn icon grid style */}
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/30 font-light mb-4">What&apos;s included</p>
                  <div className="space-y-2">
                    {selected.includes.map(item => (
                      <div key={item} className="flex items-center gap-3 text-sm text-white/50 font-light">
                        <Check className="w-3 h-3 flex-shrink-0" style={{ color: selected.accent }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xl font-light text-white">{selected.price}</p>
                    <p className="text-xs text-white/30 font-light">per person · {selected.spots} available</p>
                  </div>
                  <button
                    className="px-6 py-3 rounded-full text-sm font-light text-white transition-all hover:opacity-90"
                    style={{ background: selected.accent }}>
                    Join waitlist
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

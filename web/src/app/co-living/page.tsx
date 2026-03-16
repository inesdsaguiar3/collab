"use client";

import { motion } from "framer-motion";
import { MapPin, Wifi, Users, Leaf, Coffee, Moon, ArrowRight, Star } from "lucide-react";

const spaces = [
  {
    id: 1,
    title: "Alfama Creative House",
    city: "Lisbon, Portugal",
    tagline: "Where digital nomads find their tribe",
    description: "Perched above Lisbon's most storied neighbourhood, this sun-drenched villa brings together remote workers, artists, and wanderers in a space that feels instantly like home.",
    image: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=900&q=85",
    price: "€1,200/mo",
    features: ["Fiber Wifi", "Rooftop Terrace", "Weekly Dinners", "Co-working Space"],
    rating: 4.8,
    accent: "#EB8064",
  },
  {
    id: 2,
    title: "Ubud Rice Field Villa",
    city: "Ubud, Bali",
    tagline: "Deep work meets deep rest",
    description: "Overlooking endless rice terraces with the sound of cicadas as your background music. A sanctuary for deep work, daily yoga, and reconnection with the natural world.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85",
    price: "$900/mo",
    features: ["Infinity Pool", "Yoga Shala", "Organic Cafe", "Meditation Garden"],
    rating: 4.9,
    accent: "#D16678",
  },
  {
    id: 3,
    title: "Tulum Jungle Collective",
    city: "Tulum, Mexico",
    tagline: "Cenotes, ceremonies, and creation",
    description: "Hidden between ancient jungle and Caribbean shores, this compound is a home for curious souls. Minutes from secret cenotes and the world-famous Tulum beach strip.",
    image: "https://images.unsplash.com/photo-1543489816-c87b0f5f7f56?w=900&q=85",
    price: "$1,500/mo",
    features: ["Starlink Wifi", "Pool & Hammocks", "Wellness Programs", "Chef on Site"],
    rating: 4.8,
    accent: "#D96B50",
  },
  {
    id: 4,
    title: "Table Mountain Loft",
    city: "Cape Town, South Africa",
    tagline: "Ocean views, mountain energy",
    description: "Wake up to the most photogenic skyline on the planet. Cape Town's creative energy combined with our thoughtfully designed live/work space makes this one our most sought-after location.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?w=900&q=85",
    price: "$1,100/mo",
    features: ["Ocean View", "Gym Access", "Surf Storage", "Event Space"],
    rating: 4.7,
    accent: "#C85A3A",
  },
];

const testimonials = [
  {
    name: "Maya Chen",
    role: "Product Designer",
    quote: "I arrived as a solo nomad and left with a chosen family. The Lisbon house changed my life.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    location: "Lisbon",
  },
  {
    name: "Kai Hoffman",
    role: "Engineer & Founder",
    quote: "Most productive month of my career. Also the most connected I've felt in years. Doesn't get better.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    location: "Bali",
  },
  {
    name: "Amara Diallo",
    role: "Writer",
    quote: "I came to write a book. I wrote three. The Tulum house is magic — full stop.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    location: "Tulum",
  },
];

const features = [
  { icon: Wifi, title: "Always-on Connectivity", desc: "Fiber or Starlink in every location. We know your work depends on it." },
  { icon: Users, title: "Curated Community", desc: "Every resident is personally vetted. No cold corporate hubs — just real humans." },
  { icon: Leaf, title: "Sustainable by Design", desc: "Solar energy, composting kitchens, and low-impact architecture." },
  { icon: Coffee, title: "Shared Rituals", desc: "Weekly communal dinners, morning yoga, city explorations, skill-shares." },
  { icon: Moon, title: "Flexible Stays", desc: "From one month to a full year. Your pace, your journey." },
  { icon: Star, title: "Premium Comfort", desc: "Private rooms with high-quality beds, linens, and storage — hotel quality." },
];

export default function CoLivingPage() {
  return (
    <div className="px-6 py-20 space-y-32">
      {/* Header */}
      <section className="max-w-5xl mx-auto text-center space-y-6 pt-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D16678] font-semibold">Co-Living</span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none">
          Live where you<br />
          <span className="gradient-text">come alive.</span>
        </h1>
        <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
          Thoughtfully designed homes across the globe for remote workers, creators, and curious souls who want more from life.
        </p>
      </section>

      {/* Features grid */}
      <section className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className="glass glass-hover rounded-2xl p-7 space-y-4 cursor-default"
            >
              <div className="w-11 h-11 rounded-xl glass flex items-center justify-center border border-[#D16678]/30">
                <f.icon className="w-5 h-5 text-[#D16678]" />
              </div>
              <h3 className="font-bold text-white">{f.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Spaces */}
      <section className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#D16678] font-semibold block mb-3">Our Spaces</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Current Locations</h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs text-right hidden md:block">More cities launching throughout 2026 & 2027.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {spaces.map((space, idx) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass glass-hover rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-4 right-4 glass text-white text-sm font-bold px-3 py-1.5 rounded-full border border-white/10">
                  {space.price}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-xs text-white/70 border border-white/10">
                  <Star className="w-3 h-3" style={{ color: space.accent, fill: space.accent }} />
                  {space.rating}
                </div>
              </div>
              <div className="p-8 space-y-5">
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:gradient-text transition-all">{space.title}</h3>
                  <p className="flex items-center gap-1.5 text-white/45 text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {space.city}
                  </p>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{space.description}</p>
                <div className="flex flex-wrap gap-2">
                  {space.features.map((f) => (
                    <span key={f} className="text-xs px-3 py-1 rounded-full text-white/70"
                      style={{ background: `${space.accent}18`, border: `1px solid ${space.accent}35` }}>
                      {f}
                    </span>
                  ))}
                </div>
                <button
                  className="w-full py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  style={{ background: `linear-gradient(135deg, ${space.accent}dd, ${space.accent}88)`, boxShadow: `0 8px 20px ${space.accent}25` }}
                >
                  Check Availability →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto space-y-16 pb-10">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold block mb-4">From Our Community</span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">They showed up. <span className="gradient-text">Everything changed.</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="glass glass-hover rounded-2xl p-8 space-y-6"
            >
              <p className="text-white/70 text-base leading-relaxed italic">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#EB8064]/40" />
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-[#EB8064] text-xs">{t.role} · {t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

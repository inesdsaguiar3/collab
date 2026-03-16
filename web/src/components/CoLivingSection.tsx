"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Wifi, Users, Leaf } from "lucide-react";

const spaces = [
  {
    id: 1,
    city: "Lisbon",
    country: "Portugal",
    tagline: "Sun-drenched nomad hub",
    image: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800&q=80",
    price: "€1,200/mo",
  },
  {
    id: 2,
    city: "Ubud",
    country: "Bali",
    tagline: "Rice field sanctuary",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    price: "$900/mo",
  },
  {
    id: 3,
    city: "Tulum",
    country: "Mexico",
    tagline: "Jungle & ocean paradise",
    image: "https://images.unsplash.com/photo-1543489816-c87b0f5f7f56?w=800&q=80",
    price: "$1,500/mo",
  },
];

const features = [
  { icon: Wifi, label: "Reliable fiber internet" },
  { icon: Users, label: "Curated community events" },
  { icon: Leaf, label: "Sustainable living practices" },
];

export function CoLivingSection() {
  return (
    <section className="py-28 px-6 relative">
      {/* Section divider */}
      <div className="line-glow mb-28 max-w-7xl mx-auto" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D16678] font-semibold">Co-Living</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none">
                Your home <br />
                <span className="gradient-text">reimagined</span>
              </h2>
            </div>
            <p className="text-white/50 text-lg leading-relaxed max-w-md">
              Wake up in a space designed for deep work and deeper connection. Our co-living locations are portals to a life less ordinary.
            </p>

            <ul className="space-y-4">
              {features.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-4 text-white/70">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/10 flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#D16678]" />
                  </div>
                  {label}
                </li>
              ))}
            </ul>

            <Link
              href="/co-living"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#EB8064] to-[#D96B50] hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl shadow-[#EB8064]/20"
            >
              Discover Spaces <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right: cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {spaces.map((space, idx) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 }}
                className={`glass glass-hover rounded-2xl overflow-hidden cursor-pointer ${idx === 0 ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""}`}
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={space.image} alt={space.city} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 right-3 text-xs font-bold text-white/80 glass px-2.5 py-1 rounded-full border border-white/10">
                    {space.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white">{space.city}, <span className="text-white/50 font-normal">{space.country}</span></h3>
                  <p className="text-white/40 text-sm mt-1">{space.tagline}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

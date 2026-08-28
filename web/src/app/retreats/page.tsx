"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { UPCOMING_LABS, formatLabDateRange } from "@/lib/labs";

const featuredRetreats = [
  ...UPCOMING_LABS.map((lab) => ({
    id: lab.id,
    title: lab.title,
    subtitle: lab.subtitle,
    location: lab.location,
    date: formatLabDateRange(lab.startDate, lab.endDate),
    price: lab.priceLabel || "Explore",
    spots: lab.spotsLabel,
    tags: lab.tags,
    accent: lab.accent,
    image: lab.image,
    href: lab.href,
    includes: lab.includes,
    description: lab.description,
    kind: "Lab" as const,
  })),
  {
    id: "inner-peace-portugal",
    title: "Breathwork Retreat",
    subtitle: "A Somatic Journey into Inner Peace",
    location: "Óbidos, Portugal",
    date: "14 – 18 Oct 2026",
    price: "from €727",
    spots: "12 spots",
    tags: ["Breathwork", "Somatic", "Healing"],
    accent: "#7F5AA1",
    image: "/images/retreats/innerpeace.jpg",
    href: "/retreats/inner-peace-portugal",
    includes: ["Daily breathwork sessions", "Somatic movement & yoga", "All meals included", "Accommodation options", "Integration toolkit"],
    description: "A transformative five-day journey through breath, body, and stillness. Set in the medieval hills of Óbidos, Portugal.",
    kind: "Retreat" as const,
  },
];

export default function RetreatsPage() {
  return (
    <div className="min-h-screen">

      <section className="max-w-4xl mx-auto px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="space-y-5">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40 font-light">
            Upcoming Experiences
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight">
            Immersions designed<br />for the whole you.
          </h1>
          <p className="text-white/45 text-base md:text-lg font-light max-w-lg leading-[1.85]">
            Sacred spaces, curated community, transformative practices — designed to help you remember who you really are.
          </p>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-8">
        <div className="h-px bg-white/10" />
      </div>

      <section id="labs" className="max-w-5xl mx-auto px-8 py-20 scroll-mt-28">
        <p className="text-xs uppercase tracking-[0.35em] text-white/30 font-light mb-10">
          Upcoming · Labs & retreats
        </p>

        <div className="space-y-8 md:space-y-12">
        {featuredRetreats.map((retreat, idx) => (
          <motion.div key={retreat.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}>
            <Link href={retreat.href} className="group block">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] rounded-3xl overflow-hidden glass border border-white/10 hover:border-white/20 transition-all duration-500">

                <div className="relative h-72 md:h-auto md:min-h-[420px] overflow-hidden">
                  <img src={retreat.image} alt={retreat.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  <div className="absolute top-5 left-5">
                    <span
                      className="px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.2em] text-white/85 font-medium backdrop-blur-sm"
                      style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                      {retreat.kind}
                    </span>
                  </div>
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

                <div className="flex flex-col justify-between p-10 md:p-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-light text-white/35">
                      <MapPin className="w-3 h-3" /> {retreat.location}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-light text-white leading-[1.1] tracking-tight group-hover:text-white/80 transition-colors">
                      {retreat.title}
                    </h2>
                    <p className="text-sm text-white/40 font-light">{retreat.subtitle}</p>
                    <p className="text-white/45 font-light text-sm leading-[1.75]">{retreat.description}</p>
                  </div>

                  <div className="my-8 space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/30 font-light mb-4">What&apos;s included</p>
                    {retreat.includes.map(item => (
                      <div key={item} className="flex items-center gap-3 text-sm text-white/50 font-light">
                        <Check className="w-3 h-3 flex-shrink-0" style={{ color: retreat.accent }} />
                        {item}
                      </div>
                    ))}
                  </div>

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
                      <Users className="w-3 h-3" /> {retreat.spots}
                    </p>
                  </div>
                </div>

              </div>
            </Link>
          </motion.div>
        ))}
        </div>
      </section>

    </div>
  );
}

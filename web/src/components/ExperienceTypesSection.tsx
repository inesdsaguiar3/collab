"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const types = [
  {
    title: "Co-living",
    href: "/coliving" as const,
    image: "/images/casa.jpg",
    imageAlt: "Casa do Sol coliving home",
    imagePosition: "center center" as const,
    body: "Live together with space to work and breathe — choose how deep you go.",
  },
  {
    title: "Retreats",
    href: "/retreats" as const,
    image: "/images/retreats/DSC_4621.JPG",
    imageAlt: "Group circle during a retreat",
    imagePosition: "center 65%" as const,
    body: "Immersive days from morning to night — one shared journey with the collective.",
  },
  {
    title: "Creators' Lab",
    href: "/creators-club" as const,
    image: "/images/creators/writer.JPG",
    imageAlt: "The Creators' Lab — a weekly online ritual of creativity",
    imagePosition: "center center" as const,
    body: "A weekly online ritual. Declutter, create, and share — together.",
  },
  {
    title: "1:1",
    href: "/one-to-one" as const,
    image: "/images/INES-143.jpg",
    imageAlt: "Inês — somatic therapist in Portugal",
    imagePosition: "center 55%" as const,
    body: "Psychosomatic sessions for nervous system healing — in Portugal or online.",
  },
] as const;

export function ExperienceTypesSection() {
  return (
    <section className="py-20 px-6 relative">
      <div className="line-glow mb-16 max-w-7xl mx-auto" />

      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.08]"
          >
            Ways to <span className="gradient-text">gather</span>
          </motion.h2>
          <p className="text-sm text-white/45 leading-relaxed">
            Same community — different ways in.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {types.map(({ title, href, image, imageAlt, imagePosition, body }, i) => (
            <Link
              key={title}
              href={href}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB8064]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
            >
              <motion.article
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative overflow-hidden aspect-[5/3] sm:aspect-[4/3]"
              >
                <img
                  src={image}
                  alt={imageAlt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ objectPosition: imagePosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7 space-y-2">
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
                    {title}
                  </h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm">
                    {body}
                  </p>
                  <span className="text-white/40 text-xs tracking-wide pt-1 group-hover:text-white/70 transition-colors">
                    Explore →
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CommunitySection() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass rounded-3xl p-12 md:p-20 text-center overflow-hidden border border-white/10"
        >
          {/* Glow accent inside card */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#EB8064]/8 via-transparent to-[#D96B50]/8 rounded-3xl pointer-events-none" />

          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold block mb-6">
            The Movement
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mb-6">
            You were never meant<br />
            <span className="gradient-text">to do it alone.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Co-llab is a living, breathing community of creators, nomads, healers, and builders. We gather in sacred spaces around the world to remind each other what's possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#EB8064] to-[#D96B50] hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-xl shadow-[#EB8064]/20"
            >
              Our Story ✦
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full font-semibold text-white glass border border-white/15 hover:border-white/30 hover:bg-white/10 transition-all duration-200"
            >
              Get Involved →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

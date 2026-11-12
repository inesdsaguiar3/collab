"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const WORDS = [
  "mmunity",
  "operation",
  "Creation",
  "llaboration",
  "nnection",
  "nsciousness",
];

const LONGEST = "nsciousness";

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-start justify-center overflow-x-hidden px-6 pb-28 pt-2 sm:px-8 sm:pb-32 md:px-16 lg:px-24">
      {/* Spinning rings — own overflow so hero copy is never vertically clipped */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] rounded-full border border-white/[0.06] absolute animate-[spin_40s_linear_infinite]" />
        <div className="w-[600px] h-[600px] rounded-full border border-white/[0.08] absolute animate-[spin_28s_linear_infinite_reverse]" />
        <div className="w-[400px] h-[400px] rounded-full border border-white/[0.06] absolute animate-[spin_18s_linear_infinite]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex w-full min-w-0 max-w-5xl flex-shrink-0 flex-col items-start gap-6 sm:gap-8"
      >
        {/*
          Flex-baseline layout:
          - "Co-" is a normal flex item; its baseline comes from its text
          - The cycling container's baseline is provided by the hidden in-flow
            span inside it — same font → same relative baseline position
          - flex alignItems:"baseline" therefore aligns both tops exactly
        */}
        <h1
          className="max-w-full flex-shrink-0"
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: "clamp(2.75rem, 12vw, 7.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ color: "white" }}
          >
            Co-
          </motion.span>

          {/* Width locked to the longest word; height = 1em (lineHeight 1) */}
          <span
            style={{
              position: "relative",
              display: "inline-block",
              overflow: "hidden",
              height: "1em",
              width: `${LONGEST.length * 0.545}em`,
            }}
          >
            {/* In-flow hidden text → gives this flex item its correct baseline */}
            <span
              style={{
                display: "block",
                visibility: "hidden",
                lineHeight: 1,
                userSelect: "none",
              }}
              aria-hidden
            >
              {LONGEST}
            </span>

            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-105%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  lineHeight: 1,
                  color: "white",
                }}
              >
                {WORDS[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="max-w-lg flex-shrink-0 text-base leading-relaxed font-light text-white/85 sm:text-lg md:text-xl"
        >
          Immersions, coliving, 1:1, and a weekly ritual online.
          Come as you are. Leave transformed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex w-full max-w-lg flex-shrink-0 flex-col gap-4 sm:flex-row sm:max-w-none"
        >
          <Link
            href="/retreats"
            className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#EB8064] to-[#D16678] hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl shadow-[#EB8064]/25 text-base"
          >
            Explore immersions ✦
          </Link>
          <Link
            href="/coliving"
            className="px-8 py-4 rounded-full font-semibold text-white border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 text-base"
          >
            Find Coliving →
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-white/50 sm:bottom-10"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

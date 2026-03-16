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
    <section className="relative min-h-screen flex flex-col items-start justify-center px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* Spinning rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-white/[0.06] absolute animate-[spin_40s_linear_infinite]" />
        <div className="w-[600px] h-[600px] rounded-full border border-white/[0.08] absolute animate-[spin_28s_linear_infinite_reverse]" />
        <div className="w-[400px] h-[400px] rounded-full border border-white/[0.06] absolute animate-[spin_18s_linear_infinite]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-start gap-8 max-w-5xl"
      >
        {/*
          Flex-baseline layout:
          - "Co-" is a normal flex item; its baseline comes from its text
          - The cycling container's baseline is provided by the hidden in-flow
            span inside it — same font → same relative baseline position
          - flex alignItems:"baseline" therefore aligns both tops exactly
        */}
        <h1
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
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
          className="text-lg md:text-xl text-white/75 max-w-lg leading-relaxed font-light"
        >
          Curated retreats, co-living spaces, and a global community of conscious souls.
          Come as you are. Leave transformed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/retreats"
            className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#EB8064] to-[#D16678] hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl shadow-[#EB8064]/25 text-base"
          >
            Explore Retreats ✦
          </Link>
          <Link
            href="/co-living"
            className="px-8 py-4 rounded-full font-semibold text-white border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 text-base"
          >
            Find Co-Living →
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs tracking-widest uppercase"
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

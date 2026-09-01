"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = [
  "/images/img_9998.jpg",
  "/images/img_9971.jpg",
  "/images/img_6102.jpg",
  "/images/img_6119.jpg",
  "/images/img_9937.jpg",
  "/images/WOMEN.png",
  "/images/img_9887.jpg",
  "/images/dsc_4428.jpg",
  "/images/dsc_4366.jpg",
  "/images/img_5157.jpg",
  "/images/img_9957.jpg",
  "/images/img_0412.jpg",
];

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length)),
    []
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % IMAGES.length)),
    []
  );

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">
            Moments
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
            Life inside <span className="gradient-text">Co-llab.</span>
          </h2>
          <p className="text-white/50 max-w-sm mx-auto text-sm">
            Real people, real places, real magic.
          </p>
        </div>

        {/* Uniform grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {IMAGES.map((src, idx) => (
            <motion.button
              key={src}
              className="relative aspect-square overflow-hidden rounded-2xl group focus:outline-none"
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: idx * 0.06,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setLightbox(idx)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Co-llab moment ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center">
                  <span className="text-white text-xl leading-none">+</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center max-w-4xl w-full max-h-[88vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMAGES[lightbox]}
                  alt={`Co-llab moment ${lightbox + 1}`}
                  className="max-h-[88vh] max-w-full w-auto object-contain rounded-2xl"
                />

                {/* Counter pill */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/60 text-xs tabular-nums">
                  {lightbox + 1} / {IMAGES.length}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

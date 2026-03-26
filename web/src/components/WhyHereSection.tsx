"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";


const OPTIONS = [
  {
    id: "retreat",
    label: "A retreat",
    icon: "🌿",
    tagline: "Reset. Breathe. Return to yourself.",
    description:
      "Step away from the noise and into something sacred. Our retreats are five-day immersions into breathwork, movement, and stillness — set in beautiful spaces across Portugal and beyond.",
    href: "/retreats",
    cta: "Explore Retreats",
    accent: "#AE5F8F",
    images: [
      "/images/retreats/fairy.JPG",
      "/images/retreats/nadi.jpg",
      "/images/retreats/IMG_8349.JPG",
      "/images/retreats/IMG_7927.JPG",
      "/images/retreats/IMG_8185.JPG",
    ],
  },
  {
    id: "coliving",
    label: "A place to stay",
    icon: "🏡",
    tagline: "Live beautifully, together.",
    description:
      "Work from anywhere, live intentionally. Our co-living spaces in Óbidos, Ericeira, Koh Phangan and Amsterdam are built for slow mornings, deep conversations, and creative flow.",
    href: "/co-living",
    cta: "See Our Spaces",
    accent: "#EB8064",
    images: [
      "/images/casa.jpg",
      "/images/sunlounge.jpeg",
      "/images/library.jpeg",
      "/images/INES-61.jpg",
      "/images/INES-51.jpg",
    ],
  },
  {
    id: "community",
    label: "Connection",
    icon: "🫂",
    tagline: "You don't have to do this alone.",
    description:
      "Find your people. Our community is a global network of curious, growth-oriented humans. From 1:1 coaching to online circles — this is where belonging begins.",
    href: "/community",
    cta: "Join the Community",
    accent: "#7F5AA1",
    images: [
      "/images/WOMEN.png",
      "/images/img_9998.jpg",
      "/images/img_9971.jpg",
      "/images/img_9937.jpg",
      "/images/dsc_4366.jpg",
    ],
  },
  {
    id: "explore",
    label: "Just exploring",
    icon: "✦",
    tagline: "Start where you are.",
    description:
      "Not sure what you're looking for yet? That's the perfect place to begin. Browse our offerings, feel what resonates, and trust that you'll find what you need here.",
    href: "/about",
    cta: "Learn About Us",
    accent: "#D16678",
    images: [
      "/images/img_6102.jpg",
      "/images/img_9957.jpg",
      "/images/img_6119.jpg",
      "/images/img_0412.jpg",
      "/images/dsc_4428.jpg",
    ],
  },
];

export function WhyHereSection() {
  const [selectedId, setSelectedId] = useState("retreat");
  const [imgIndex, setImgIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selected = OPTIONS.find((o) => o.id === selectedId)!;

  const resetCarousel = useCallback(() => {
    setImgIndex(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setImgIndex((i) => (i + 1) % selected.images.length);
    }, 4000);
  }, [selected.images.length]);

  useEffect(() => {
    resetCarousel();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [selectedId, resetCarousel]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setDropdownOpen(false);
  };

  const prevImg = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setImgIndex((i) => (i - 1 + selected.images.length) % selected.images.length);
  };

  const nextImg = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setImgIndex((i) => (i + 1) % selected.images.length);
  };

  return (
    <section className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/45">Your path</p>
          <h2 style={{ lineHeight: 1.05 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
            What brings you here today?
          </h2>
        </div>

        {/* Custom dropdown */}
        <div className="flex justify-center mb-14" ref={dropdownRef}>
          <div className="relative">
            {/* Trigger */}
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="group flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(16px)",
                minWidth: "260px",
              }}
            >
              <span className="text-2xl">{selected.icon}</span>
              <span className="flex-1 text-left">
                <span className="text-white/40 text-xs uppercase tracking-[0.25em] block">
                  I&apos;m here for
                </span>
                <span className="text-white text-lg font-light">{selected.label}</span>
              </span>
              <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 text-white/50" />
              </motion.div>
            </button>

            {/* Dropdown panel */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50"
                  style={{
                    background: "rgba(30,15,50,0.92)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(24px)",
                  }}
                >
                  {OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      className="w-full flex items-center gap-4 px-6 py-4 text-left transition-all duration-150"
                      style={{
                        background: opt.id === selectedId ? `${opt.accent}20` : "transparent",
                        borderLeft: opt.id === selectedId ? `2px solid ${opt.accent}` : "2px solid transparent",
                      }}
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <div>
                        <p className="text-white font-light text-base">
                          {opt.label}
                        </p>
                        <p className="text-white/35 text-xs">
                          {opt.tagline}
                        </p>
                      </div>
                      {opt.id === selectedId && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: opt.accent }} />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-6 items-stretch">

          {/* ── Image carousel ── */}
          <div className="relative rounded-3xl overflow-hidden"
            style={{ minHeight: "480px", background: "rgba(0,0,0,0.2)" }}>

            {/* Images */}
            <AnimatePresence mode="wait">
              <motion.img
                key={`${selectedId}-${imgIndex}`}
                src={selected.images[imgIndex]}
                alt={selected.label}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Accent color top-left strip */}
            <div className="absolute top-0 left-0 w-1 h-full rounded-l-3xl"
              style={{ background: `linear-gradient(to bottom, ${selected.accent}, transparent)` }} />

            {/* Arrow controls */}
            <button onClick={prevImg}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button onClick={nextImg}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
              {selected.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === imgIndex ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "99px",
                    background: i === imgIndex ? selected.accent : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Text content ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col justify-between rounded-3xl p-8 md:p-10"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Top: icon + tagline */}
              <div className="space-y-5">
                <div className="text-4xl">{selected.icon}</div>

                {/* Accent rule */}
                <div className="h-px w-12 rounded-full" style={{ background: selected.accent }} />

                <h3 style={{ lineHeight: 1.15 }}
                  className="text-2xl md:text-3xl font-light text-white">
                  {selected.tagline}
                </h3>

                <p className="text-white/55 font-light text-base leading-[1.85]">
                  {selected.description}
                </p>
              </div>

              {/* Bottom: CTA */}
              <div className="mt-10">
                <Link
                  href={selected.href}
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-medium text-white transition-all duration-200 hover:gap-4"
                  style={{ background: selected.accent, boxShadow: `0 4px 24px ${selected.accent}40` }}
                >
                  {selected.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                {/* Option pills */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {OPTIONS.filter((o) => o.id !== selectedId).map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      className="px-4 py-1.5 rounded-full text-xs text-white/40 hover:text-white/70 transition-all duration-200"
                      style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

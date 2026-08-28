"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { ReviewItem } from "@/lib/reviews";

interface ReviewsCarouselProps {
  reviews: ReviewItem[];
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [index, setIndex] = useState(0);

  if (!reviews.length) return null;

  const getWrappedIndex = (value: number) =>
    (value + reviews.length) % reviews.length;

  const prevIndex = getWrappedIndex(index - 1);
  const nextIndex = getWrappedIndex(index + 1);
  const visible = [prevIndex, index, nextIndex];

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((i) => (i + 1) % reviews.length);

  const active = reviews[index];

  return (
    <div className="max-w-5xl mx-auto w-full min-w-0">
      {/* Mobile / small tablet: one readable card — 3-up was too cramped to read */}
      <div className="md:hidden w-full min-w-0 px-1">
        <div
          className="rounded-2xl p-5 sm:p-6 border border-white/20 bg-white/[0.08] backdrop-blur-md shadow-lg shadow-black/20"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <p className="text-white font-semibold text-base leading-snug pr-2">
              {active.author}
            </p>
            <div className="flex shrink-0 items-center gap-0.5 text-[#EB8064]" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
          <blockquote className="text-white/90 text-[15px] sm:text-base leading-[1.65] whitespace-pre-line">
            &ldquo;{active.text}&rdquo;
          </blockquote>
        </div>

        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            className="w-11 h-11 rounded-full border border-white/25 bg-white/10 text-white flex items-center justify-center shrink-0 active:scale-95 transition-transform"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs text-white/45 tabular-nums min-w-[3.5rem] text-center">
            {index + 1} / {reviews.length}
          </span>
          <button
            type="button"
            onClick={next}
            className="w-11 h-11 rounded-full border border-white/25 bg-white/10 text-white flex items-center justify-center shrink-0 active:scale-95 transition-transform"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-[#EB8064]" : "w-2 bg-white/25"
              }`}
              aria-label={`Show review ${i + 1}`}
              aria-pressed={i === index}
            />
          ))}
        </div>
      </div>

      {/* md+: side-by-side preview (more space than 3 tiny columns on phones) */}
      <div className="hidden md:flex items-stretch justify-center gap-3 md:gap-4 w-full min-w-0">
        <button
          type="button"
          onClick={prev}
          className="w-9 h-9 md:w-10 md:h-10 self-center rounded-full border border-white/20 bg-white/5 text-white/80 flex items-center justify-center shrink-0"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-3 gap-3 md:gap-4 flex-1 min-w-0 max-w-4xl">
          {visible.map((reviewIndex, position) => {
            const review = reviews[reviewIndex];
            const isCenter = position === 1;
            return (
              <div
                key={`${review.author}-${reviewIndex}-${position}`}
                className="rounded-2xl p-4 md:p-5 min-h-[220px] md:min-h-[260px] flex flex-col transition-all duration-200"
                style={{
                  background: isCenter ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)",
                  border: isCenter
                    ? "1px solid rgba(255,255,255,0.24)"
                    : "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(20px)",
                  opacity: isCenter ? 1 : 0.72,
                  transform: isCenter ? "scale(1)" : "scale(0.97)",
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-2 shrink-0">
                  <p className="text-white font-medium text-sm md:text-base line-clamp-2">
                    {review.author}
                  </p>
                  <div className="flex items-center gap-0.5 text-[#EB8064] shrink-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-white/80 leading-relaxed text-sm md:text-[15px] whitespace-pre-line overflow-y-auto pr-1 flex-1 min-h-0">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={next}
          className="w-9 h-9 md:w-10 md:h-10 self-center rounded-full border border-white/20 bg-white/5 text-white/80 flex items-center justify-center shrink-0"
          aria-label="Next review"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

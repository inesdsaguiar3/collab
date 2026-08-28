"use client";

import Image from "next/image";

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
            <div
              key={src}
              className="relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={src}
                alt={`Co-llab moment ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={idx < 4}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

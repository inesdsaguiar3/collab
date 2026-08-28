"use client";

import Script from "next/script";
import { Instagram } from "lucide-react";
import { useEffect } from "react";
import {
  getFeaturedReelUrls,
  INSTAGRAM_HANDLE,
  INSTAGRAM_PROFILE_URL,
  INSTAGRAM_REELS_URL,
  reelEmbedUrl,
} from "@/lib/instagramReels";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export function InstagramReelsSection() {
  const reels = getFeaturedReelUrls();
  const hasReels = reels.length > 0;

  useEffect(() => {
    if (!hasReels) return;
    window.instgrm?.Embeds.process();
  }, [hasReels, reels]);

  return (
    <section className="max-w-5xl mx-auto px-8 md:px-12">
      <div className="space-y-6">
        <div className="space-y-2 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.22em] text-[#EB8064] font-semibold">On Instagram</p>
          <h3 className="text-2xl md:text-3xl font-black text-white">A glimpse into the rhythm</h3>
          <p className="text-white/55 text-sm max-w-xl mx-auto md:mx-0">
            Reels from life at Casa do Sol — community days, practices, and slow living in Óbidos.
          </p>
        </div>

        {hasReels ? (
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {reels.map((url) => (
              <div
                key={url}
                className="snap-center shrink-0 w-[min(85vw,340px)] aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-xl"
              >
                <iframe
                  src={reelEmbedUrl(url)}
                  title={`Instagram reel from @${INSTAGRAM_HANDLE}`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-sm">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center space-y-5">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]">
                <Instagram className="h-7 w-7 text-[#EB8064]" aria-hidden />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-white">@{INSTAGRAM_HANDLE}</p>
                <p className="text-sm text-white/55 leading-relaxed">
                  Watch our latest reels for a feel of daily rhythm, community, and Casa do Sol.
                </p>
              </div>
              <a
                href={INSTAGRAM_REELS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#EB8064] to-[#D16678] shadow-lg shadow-[#EB8064]/20 hover:opacity-95 transition-opacity"
              >
                <Instagram className="h-4 w-4" />
                View reels on Instagram
              </a>
            </div>

            <blockquote
              className="instagram-media mt-6"
              data-instgrm-permalink={`${INSTAGRAM_PROFILE_URL}?utm_source=ig_embed&utm_campaign=loading`}
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: 0,
                borderRadius: 12,
                boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                margin: "0 auto",
                maxWidth: 540,
                minWidth: 326,
                padding: 0,
                width: "100%",
              }}
            />
          </div>
        )}

        {hasReels && (
          <div className="text-center md:text-left">
            <a
              href={INSTAGRAM_REELS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#EB8064] hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
              See all reels on @{INSTAGRAM_HANDLE}
            </a>
          </div>
        )}
      </div>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds.process()}
      />
    </section>
  );
}

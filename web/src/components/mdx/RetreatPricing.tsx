"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import { getStripeLinkForOffer, useRetreatBooking } from "./RetreatBookingContext";

interface PricingOptionProps {
  type: string;
  price: string | number;
  currency?: string;
  details?: string;
  imageUrl?: string;
  imageZoom?: number;
  earlyBirdDiscount?: string | number;
  stripeLink?: string;
  accentColor?: string;
  variant?: "default" | "simple";
}

const WARM_FILTER = "sepia(0.22) saturate(1.45) brightness(1.04) hue-rotate(-10deg) contrast(1.04)";

export function PricingOption({ type, price, currency = "EUR", details, imageUrl, imageZoom = 1, earlyBirdDiscount, stripeLink }: PricingOptionProps) {
  const booking = useRetreatBooking();
  const resolvedStripeLink = stripeLink || (booking ? getStripeLinkForOffer(booking.offers, type) : undefined);
  const slug = booking?.slug;

  const symbol = currency === "EUR" ? "€" : "$";
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  const numericEB = typeof earlyBirdDiscount === "string" ? parseFloat(earlyBirdDiscount) : earlyBirdDiscount;
  const displayPrice = numericEB ? (numericPrice || 0) - (numericEB || 0) : numericPrice;

  return (
    <div className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md min-h-[500px]"
      style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(127,90,161,0.15)", backdropFilter: "blur(8px)" }}>
      {imageUrl && (
        <div style={{ height: "230px", overflow: "hidden", flexShrink: 0, position: "relative" }}>
          <Image
            src={imageUrl}
            alt={type}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover", filter: WARM_FILTER, transform: `scale(${imageZoom})` }}
          />
        </div>
      )}
      <div className="flex-1 p-5 flex flex-col gap-2">
        <h3 className="font-semibold text-sm tracking-wide" style={{ color: "#4A3558" }}>{type}</h3>
        {details && <p className="text-sm leading-[1.75] font-light flex-1" style={{ color: "#7A6A8A" }}>{details}</p>}
        <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(127,90,161,0.12)" }}>
          {numericEB ? (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-light" style={{ color: "#EB8064" }}>{symbol}{displayPrice}</span>
              <span className="text-sm line-through" style={{ color: "#C0B0C8" }}>{symbol}{numericPrice}</span>
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#4949A3" }}>Early Bird</span>
            </div>
          ) : (
            <span className="text-3xl font-light" style={{ color: "#EB8064" }}>{symbol}{numericPrice}</span>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <a
            href={resolvedStripeLink || "#"}
            target={resolvedStripeLink ? "_blank" : undefined}
            rel={resolvedStripeLink ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all hover:opacity-90"
            style={{ background: "rgba(235,128,100,0.12)", color: "#EB8064", border: "1px solid rgba(235,128,100,0.25)" }}
            onClick={async (e) => {
              if (resolvedStripeLink) return;
              e.preventDefault();
              if (!slug) {
                window.location.href = "/contact";
                return;
              }
              try {
                const res = await fetch("/api/stripe/checkout", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ slug, offerName: type }),
                });
                const data = (await res.json()) as { url?: string; error?: string };
                if (data?.url) {
                  window.location.href = data.url;
                } else {
                  window.location.href = "/contact";
                }
              } catch {
                window.location.href = "/contact";
              }
            }}
          >
            Reserve
          </a>
          <span className="text-xs font-light" style={{ color: "#9A85B0" }}>
            Secure checkout
          </span>
        </div>
      </div>
    </div>
  );
}

interface RetreatPricingProps {
  title?: string;
  accentColor?: string;
  columns?: 2 | 3;
  children: ReactNode;
}

export function RetreatPricing({ title = "Accommodation Options", children }: RetreatPricingProps) {
  const items = React.Children.toArray(children);
  const firstRow = items.slice(0, 3);
  const secondRow = items.slice(3);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "#4949A3" }}>Investment</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight" style={{ color: "#4A3558" }}>{title}</h2>
        <div className="mx-auto mt-3 h-px max-w-xs rounded-full"
          style={{ background: "linear-gradient(to right, transparent, rgba(73,73,163,0.3), transparent)" }} />
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {firstRow}
        </div>
        {secondRow.length > 0 && (
          <div className="flex justify-center gap-4 flex-wrap">
            {secondRow.map((child, i) => (
              <div key={i} className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
                {child}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-center pt-2">
        <a
          href="/contact"
          className="inline-flex items-center justify-center text-sm font-light underline underline-offset-4 transition-opacity hover:opacity-80"
          style={{ color: "#4A3558" }}
        >
          Questions? Get in touch
        </a>
      </div>
    </div>
  );
}

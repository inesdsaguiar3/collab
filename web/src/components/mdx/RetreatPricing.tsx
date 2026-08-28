"use client";

import React, { ReactNode, useState } from "react";
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

function retreatSlugFromPath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const m = window.location.pathname.match(/^\/retreats\/([^/]+)/);
  return m?.[1];
}

export function PricingOption({
  type,
  price,
  currency = "EUR",
  details,
  imageUrl,
  imageZoom = 1,
  earlyBirdDiscount,
  stripeLink,
  accentColor = "#7F5AA1",
}: PricingOptionProps) {
  const booking = useRetreatBooking();
  const resolvedStripeLink = stripeLink || (booking ? getStripeLinkForOffer(booking.offers, type) : undefined);
  const slug = booking?.slug ?? retreatSlugFromPath();

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const symbol = currency === "EUR" ? "€" : "$";
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  const numericEB = typeof earlyBirdDiscount === "string" ? parseFloat(earlyBirdDiscount) : earlyBirdDiscount;
  const displayPrice = numericEB ? (numericPrice || 0) - (numericEB || 0) : numericPrice;

  async function handleReserve() {
    if (resolvedStripeLink) {
      window.location.href = resolvedStripeLink;
      return;
    }
    if (!slug) {
      window.alert("Could not open checkout. Refresh the page or try again.");
      return;
    }
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, offerName: type }),
      });
      const data = (await res.json()) as {
        paymentLinkUrl?: string;
        url?: string;
        error?: string;
        details?: string;
      };
      if (!res.ok) {
        window.alert(
          [data.error, data.details].filter(Boolean).join(" ") || "Payment could not start. Check Stripe keys in .env.local.",
        );
        return;
      }
      const payUrl = data.paymentLinkUrl || data.url;
      if (payUrl) {
        window.location.href = payUrl;
        return;
      }
      window.alert("No payment link returned. Is STRIPE_SECRET_KEY set?");
    } catch {
      window.alert("Network error. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <div
      className="group flex h-full w-full min-h-0 flex-col overflow-hidden transition-all duration-300 hover:shadow-md"
      style={{
        background: "rgba(255,255,255,0.6)",
        border: "1px solid rgba(127,90,161,0.15)",
        backdropFilter: "blur(8px)",
      }}
    >
      {imageUrl ? (
        <div className="relative h-[200px] w-full shrink-0 overflow-hidden">
          <Image
            src={imageUrl}
            alt={type}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            style={{ filter: WARM_FILTER, transform: `scale(${imageZoom})` }}
          />
        </div>
      ) : (
        <div
          className="h-[200px] w-full shrink-0"
          style={{ background: "linear-gradient(135deg, rgba(127,90,161,0.12), rgba(235,128,100,0.08))" }}
          aria-hidden
        />
      )}
      <div className="flex min-h-0 flex-1 flex-col p-5">
        <h3 className="shrink-0 font-semibold text-sm tracking-wide" style={{ color: "#4A3558" }}>
          {type}
        </h3>
        {details && (
          <p
            className="mt-2 min-h-[7rem] flex-1 text-sm leading-[1.75] font-light line-clamp-5"
            style={{ color: "#7A6A8A" }}
          >
            {details}
          </p>
        )}
        {/* Casa do Sol style: list price struck through, early-bird large, label under — right-aligned */}
        <div className="mt-auto shrink-0 pt-4 text-right" style={{ borderTop: "1px solid rgba(127,90,161,0.12)" }}>
          {numericEB ? (
            <div className="space-y-1">
              <p className="text-lg leading-tight line-through" style={{ color: "#9CA3AF" }}>
                {symbol}
                {numericPrice}
              </p>
              <p className="text-4xl font-bold tracking-tight" style={{ color: accentColor }}>
                {symbol}
                {displayPrice}
              </p>
              <p
                className="text-xs font-semibold uppercase tracking-wider pt-0.5 opacity-90"
                style={{ color: accentColor }}
              >
                Early Bird
              </p>
            </div>
          ) : (
            <p className="text-4xl font-bold tracking-tight" style={{ color: accentColor }}>
              {symbol}
              {numericPrice}
            </p>
          )}
        </div>

        <div className="mt-4 shrink-0">
          {resolvedStripeLink ? (
            <a
              href={resolvedStripeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 px-6 rounded-lg text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-95"
              style={{ backgroundColor: accentColor }}
            >
              Reserve
            </a>
          ) : (
            <button
              type="button"
              disabled={checkoutLoading}
              onClick={() => void handleReserve()}
              className="w-full text-center py-3 px-6 rounded-lg text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-95 disabled:opacity-60"
              style={{ backgroundColor: accentColor }}
            >
              {checkoutLoading ? "Opening checkout…" : "Reserve"}
            </button>
          )}
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

  return (
    <div id="investment" className="scroll-mt-28 space-y-12">
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "#4949A3" }}>
          Investment
        </p>
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl" style={{ color: "#4A3558" }}>
          {title}
        </h2>
        <div
          className="mx-auto mt-3 h-px max-w-xs rounded-full"
          style={{ background: "linear-gradient(to right, transparent, rgba(73,73,163,0.3), transparent)" }}
        />
      </div>
      <div className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((child, i) => (
          <div key={i} className="flex h-full min-h-[560px] w-full">
            {child}
          </div>
        ))}
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

"use client";

import React, { createContext, ReactNode, useContext } from "react";

export type RetreatOffer = {
  name?: string;
  price: number;
  priceCurrency: string;
  availability?: string;
  stripeLink?: string;
  earlyBirdDiscount?: number;
};

type BookingContextValue = {
  slug?: string;
  offers: RetreatOffer[];
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function RetreatBookingProvider({ slug, offers, children }: { slug?: string; offers?: RetreatOffer[]; children: ReactNode }) {
  return (
    <BookingContext.Provider value={{ slug, offers: offers || [] }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useRetreatBooking() {
  return useContext(BookingContext);
}

export function getStripeLinkForOffer(offers: RetreatOffer[], type: string): string | undefined {
  const match = offers.find((o) => (o.name || "").trim().toLowerCase() === type.trim().toLowerCase());
  return match?.stripeLink;
}


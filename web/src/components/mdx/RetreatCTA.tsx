"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

interface RetreatCTAProps {
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  calendarLink?: string;
  accentColor?: string;
  marginTop?: "none" | "sm" | "md" | "lg";
}

export function RetreatCTA({
  primaryText = "Reserve your place",
  primaryHref = "#investment",
  secondaryText, secondaryHref, calendarLink,
  marginTop = "none",
}: RetreatCTAProps) {
  const mt = { none: "", sm: "mt-6", md: "mt-10", lg: "mt-16" };

  return (
    <div className={`flex flex-col sm:flex-row gap-3 justify-center items-center ${mt[marginTop]}`}>
      <Link href={primaryHref}
        className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
        style={{ background: "#EB8064", boxShadow: "0 4px 20px rgba(235,128,100,0.35)" }}>
        {primaryText}
      </Link>
      {calendarLink && (
        <a href={calendarLink} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white"
          style={{ border: "1px solid rgba(127,90,161,0.3)", color: "#7F5AA1", background: "rgba(127,90,161,0.07)" }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Discovery Call
        </a>
      )}
      {secondaryText && secondaryHref && (
        <Link href={secondaryHref}
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white"
          style={{ border: "1px solid rgba(127,90,161,0.3)", color: "#7F5AA1" }}>
          {secondaryText}
        </Link>
      )}
    </div>
  );
}

interface FloatingCTAProps {
  text?: string;
  href: string;
  accentColor?: string;
}

export function FloatingCTA({ text = "Free Call", href }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const button = (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <a href={href} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white shadow-lg transition-all hover:opacity-90 hover:scale-[1.03]"
        style={{ background: "linear-gradient(135deg, #EB8064, #D96B50)", boxShadow: "0 4px 24px rgba(235,128,100,0.45)" }}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {text}
      </a>
    </div>
  );

  // Portal renders directly into document.body, escaping any ancestor
  // transform/stacking-context that would break position:fixed behaviour.
  return mounted ? createPortal(button, document.body) : null;
}

"use client";
import { ReactNode } from "react";

interface RetreatHighlightProps {
  children: ReactNode;
  accentColor?: string;
  background?: "light" | "accent" | "gradient";
}

export function RetreatHighlight({ children }: RetreatHighlightProps) {
  return (
    <div className="max-w-xl mx-auto text-center py-2">
      {/* Small decorative mark */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="h-px w-8 rounded-full" style={{ background: "linear-gradient(to right, transparent, #EB806450)" }} />
        <div className="w-1 h-1 rounded-full" style={{ background: "#AE5F8F" }} />
        <div className="h-px w-8 rounded-full" style={{ background: "linear-gradient(to left, transparent, #7F5AA150)" }} />
      </div>

      <div style={{ color: "#4A3F5C" }}
        className="text-sm md:text-base font-light leading-[1.85] tracking-wide">
        {children}
      </div>

      {/* Bottom mark */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <div className="h-px w-8 rounded-full" style={{ background: "linear-gradient(to right, transparent, #7F5AA150)" }} />
        <div className="w-1 h-1 rounded-full" style={{ background: "#AE5F8F" }} />
        <div className="h-px w-8 rounded-full" style={{ background: "linear-gradient(to left, transparent, #EB806450)" }} />
      </div>
    </div>
  );
}

import { ReactNode } from "react";

interface RetreatDisclaimerProps {
  children?: ReactNode;
  mainText?: string;
  localDiscount?: string;
  subText?: string;
  facilitatorNote?: boolean;
  showLocalDiscount?: boolean;
  accentColor?: string;
}

export function RetreatDisclaimer({
  children,
  mainText = "We have a commitment to keep our prices affordable and make the journeys available for the whole community.",
  localDiscount = "On top of it, we offer a 150€ standard discount for local portuguese community",
  subText,
  facilitatorNote = false,
  showLocalDiscount = true,
  accentColor = "#7F5AA1",
}: RetreatDisclaimerProps) {
  return (
    <div className="mt-10 max-w-2xl mx-auto text-center space-y-2 rounded-2xl px-8 py-6"
      style={{ background: "rgba(127,90,161,0.06)", border: "1px solid rgba(174,95,143,0.14)" }}>
      <p className="text-sm font-light leading-[1.8]" style={{ color: "#4A3F5C" }}>{mainText}</p>
      {showLocalDiscount && localDiscount && (
        <p className="text-sm font-light leading-[1.8]" style={{ color: "#4A3F5C" }}>{localDiscount}</p>
      )}
      {subText && <p className="text-xs mt-1" style={{ color: "#AE5F8F" }}>{subText}</p>}
      {facilitatorNote && (
        <p className="text-sm font-light mt-3" style={{ color: "#4A3F5C" }}>
          Want to join as a facilitator?{" "}
          <a href="/contact" className="underline hover:opacity-80" style={{ color: accentColor }}>
            Contact us
          </a>{" "}
          for details.
        </p>
      )}
      {children}
    </div>
  );
}

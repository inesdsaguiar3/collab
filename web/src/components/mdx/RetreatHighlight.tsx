import { ReactNode } from "react";

interface RetreatHighlightProps {
  children: ReactNode;
  accentColor?: string;
  background?: "light" | "accent" | "gradient";
}

export function RetreatHighlight({
  children,
  accentColor = "#AE5F8F",
}: RetreatHighlightProps) {
  return (
    <aside
      style={{ borderLeft: `2px solid ${accentColor}` }}
      className="pl-5 md:pl-6"
    >
      <div
        style={{ color: "#4A3F5C" }}
        className="text-base md:text-[1.1rem] font-light leading-[1.7] tracking-[0.01em] [&_p]:m-0"
      >
        {children}
      </div>
    </aside>
  );
}

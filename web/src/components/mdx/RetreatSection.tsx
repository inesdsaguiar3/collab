import { ReactNode } from "react";

interface RetreatSectionProps {
  children: ReactNode;
  background?: "white" | "gray" | "accent";
  className?: string;
  id?: string;
  compact?: boolean;
  tight?: boolean;
  tightest?: boolean;
}

export function RetreatSection({
  children,
  background = "white",
  className = "",
  id,
  compact = false,
  tight = false,
  tightest = false,
}: RetreatSectionProps) {
  const sectionStyle: Record<string, React.CSSProperties> = {
    white:  {},
    gray:   {
      background: "rgba(220, 210, 240, 0.45)",
      borderTop: "1px solid rgba(174,95,143,0.12)",
      borderBottom: "1px solid rgba(174,95,143,0.12)",
    },
    accent: {
      background: "rgba(200, 185, 235, 0.38)",
      borderTop: "1px solid rgba(127,90,161,0.14)",
      borderBottom: "1px solid rgba(127,90,161,0.14)",
    },
  };

  const paddingClass = tightest
    ? "pt-8 pb-2 md:pt-10 md:pb-3"
    : tight
      ? "py-5 md:py-6"
      : compact
        ? "py-10 md:py-12"
        : "py-24 md:py-32";

  return (
    <section id={id} className={paddingClass} style={sectionStyle[background]}>
      <div className={`mx-auto px-8 lg:px-12 max-w-4xl ${className}`}>
        {children}
      </div>
    </section>
  );
}

interface RetreatSectionTitleProps {
  children: ReactNode;
  accentColor?: string;
  centered?: boolean;
}

export function RetreatSectionTitle({ children, accentColor = "#7F5AA1", centered = true }: RetreatSectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight"
        style={{ color: accentColor }}>
        {children}
      </h2>
    </div>
  );
}

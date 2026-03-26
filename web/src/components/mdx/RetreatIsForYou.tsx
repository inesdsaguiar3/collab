import { ReactNode } from "react";

const ACCENT_COLORS = ["#EB8064", "#D16678", "#AE5F8F", "#7F5AA1", "#EB8064", "#D16678", "#AE5F8F", "#7F5AA1"];

interface IsForYouItemProps {
  icon?: string;
  children: ReactNode;
  index?: number;
}

export function IsForYouItem({ children, index = 0 }: IsForYouItemProps) {
  const num = String(index + 1).padStart(2, "0");
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "52px 1fr",
      gap: "20px",
      alignItems: "start",
      padding: "22px 0",
      borderBottom: "1px solid rgba(174,95,143,0.12)",
    }}>
      {/* Large gradient number */}
      <span style={{
        fontSize: "2rem",
        fontWeight: 200,
        lineHeight: 1,
        letterSpacing: "-0.04em",
        color,
        opacity: 0.55,
        paddingTop: "3px",
        userSelect: "none",
      }}>
        {num}
      </span>
      {/* Text */}
      <p style={{
        color: "#4A3F5C",
        fontWeight: 300,
        fontSize: "1rem",
        lineHeight: 1.85,
        margin: 0,
        paddingTop: "4px",
      }}>
        {children}
      </p>
    </div>
  );
}

interface RetreatIsForYouProps {
  title?: string;
  accentColor?: string;
  children: ReactNode;
}

export function RetreatIsForYou({ title = "This retreat is for you if...", children }: RetreatIsForYouProps) {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <p style={{
          fontSize: "0.68rem",
          textTransform: "uppercase",
          letterSpacing: "0.45em",
          color: "#AE5F8F",
          marginBottom: "12px",
        }}>
          Is this for you?
        </p>
        <h2 style={{
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          color: "#4A3558",
          lineHeight: 1.2,
          margin: 0,
        }}>
          {title}
        </h2>
        {/* Decorative line */}
        <div style={{
          width: "48px",
          height: "1px",
          background: "linear-gradient(to right, #EB806460, #7F5AA160)",
          margin: "20px auto 0",
        }} />
      </div>

      {/* Items — single column, typographic list */}
      <div>
        {children}
      </div>
    </div>
  );
}

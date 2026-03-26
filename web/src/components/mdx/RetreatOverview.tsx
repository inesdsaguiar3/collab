import { ReactNode } from "react";
import { FiWind, FiActivity, FiEdit3, FiLayers, FiFeather, FiCheck } from "react-icons/fi";
import { TbYoga, TbWaveSine } from "react-icons/tb";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  breathwork: FiWind,   wind: FiWind,
  somatic: FiActivity,  healing: FiActivity,
  meditation: TbYoga,   yoga: TbYoga,
  movement: FiFeather,
  journaling: FiEdit3,  journal: FiEdit3,
  integration: FiLayers,
  sound: TbWaveSine,    "sound healing": TbWaveSine,
};

// Icon accent colors — purples/violets only, no orange
const ACCENT_COLORS = ["#AE5F8F", "#7F5AA1", "#4949A3", "#7F5AA1", "#AE5F8F", "#4949A3", "#7F5AA1"];

// ── Practice row — editorial program-style ─────────────────────────────────

interface OverviewPracticeProps {
  icon?: string;
  title: string;
  children: ReactNode;
  index?: number;
}

export function OverviewPractice({ icon, title, children, index = 0 }: OverviewPracticeProps) {
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const IconComponent = icon ? (iconMap[icon] ?? FiWind) : FiWind;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "22px 1fr",
      gap: "0 16px",
      padding: "18px 0",
      borderBottom: "1px solid rgba(174,95,143,0.13)",
      alignItems: "start",
    }}>
      {/* Small icon in accent color */}
      <div style={{ color, paddingTop: "5px" }}>
        <IconComponent size={15} />
      </div>

      {/* Name + description */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <h3 style={{
          margin: 0,
          fontSize: "1.05rem",
          fontWeight: 400,
          letterSpacing: "0.01em",
          color: "#2E2440",
          lineHeight: 1.2,
        }}>
          {title}
        </h3>
        <p style={{
          margin: 0,
          fontSize: "0.82rem",
          fontWeight: 300,
          lineHeight: 1.7,
          color: "#6B5A80",
        }}>
          {children}
        </p>
      </div>
    </div>
  );
}

// ── Includes chip ──────────────────────────────────────────────────────────

interface OverviewIncludesProps {
  children: ReactNode;
}

export function OverviewIncludes({ children }: OverviewIncludesProps) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "rgba(255,255,255,0.2)",
      border: "1px solid rgba(255,255,255,0.38)",
      borderRadius: "100px",
      padding: "9px 16px",
    }}>
      <FiCheck size={11} style={{ color: "#7F5AA1", flexShrink: 0 }} />
      <span style={{ color: "#2E2440", fontWeight: 300, fontSize: "0.87rem" }}>
        {children}
      </span>
    </div>
  );
}

// ── Practices block ────────────────────────────────────────────────────────

interface RetreatPracticesProps {
  title?: string;
  children: ReactNode;
}

export function RetreatPractices({ title = "Practices & Modalities", children }: RetreatPracticesProps) {
  return (
    <div style={{ marginBottom: "52px" }}>
      <p style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.42em", color: "#7F5AA1", marginBottom: "4px", fontWeight: 400 }}>
        {title}
      </p>
      <div>{children}</div>
    </div>
  );
}

// ── Includes block — flowing chip cloud ────────────────────────────────────

interface RetreatIncludesProps {
  title?: string;
  children: ReactNode;
}

export function RetreatIncludes({ title = "Everything's Included", children }: RetreatIncludesProps) {
  return (
    <div>
      <p style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.42em", color: "#7F5AA1", marginBottom: "20px", fontWeight: 400 }}>
        {title}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "flex-start" }}>
        {children}
      </div>
    </div>
  );
}

// ── Top-level wrapper ──────────────────────────────────────────────────────

interface RetreatOverviewProps {
  title?: string;
  children: ReactNode;
}

export function RetreatOverview({ title = "Why This Retreat", children }: RetreatOverviewProps) {
  return (
    <div>
      {/* Heading */}
      <div style={{ marginBottom: "44px" }}>
        <p style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.45em", color: "#AE5F8F", marginBottom: "10px" }}>
          For you
        </p>
        <h2 style={{
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          fontWeight: 300,
          letterSpacing: "-0.025em",
          color: "#2E2440",
          margin: 0,
          lineHeight: 1.15,
        }}>
          {title}
        </h2>
        <div style={{ width: "44px", height: "1px", background: "linear-gradient(to right, #7F5AA155, #4949A355)", marginTop: "16px" }} />
      </div>

      {/* Two-column: practices | includes */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0 56px",
        alignItems: "start",
      }}
        className="retreat-overview-grid"
      >
        {children}
      </div>
    </div>
  );
}

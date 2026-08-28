import { Children, ReactNode, isValidElement, cloneElement } from "react";

interface IsForYouItemProps {
  children: ReactNode;
  index?: number;
}

export function IsForYouItem({ children }: IsForYouItemProps) {
  return (
    <li
      style={{
        listStyle: "none",
        margin: 0,
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
      }}
    >
      <span
        aria-hidden
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "999px",
          background: "linear-gradient(135deg, #EB8064, #7F5AA1)",
          marginTop: "0.55em",
          flexShrink: 0,
        }}
      />
      <p
        style={{
          color: "#4A3F5C",
          fontWeight: 300,
          fontSize: "0.9rem",
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        {children}
      </p>
    </li>
  );
}

interface RetreatIsForYouProps {
  title?: string;
  accentColor?: string;
  children: ReactNode;
}

export function RetreatIsForYou({
  title = "This retreat is for you if...",
  children,
}: RetreatIsForYouProps) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "22px" }}>
        <h2
          style={{
            fontSize: "clamp(1.25rem, 2.2vw, 1.65rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            color: "#4A3558",
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {title}
        </h2>
        <div
          style={{
            width: "36px",
            height: "1px",
            background: "linear-gradient(to right, #EB806460, #7F5AA160)",
            margin: "12px auto 0",
          }}
        />
      </div>

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px 28px",
          margin: 0,
          padding: 0,
        }}
        className="is-for-you-grid"
      >
        {items.map((child, index) =>
          cloneElement(child as React.ReactElement<IsForYouItemProps>, {
            index,
            key: index,
          }),
        )}
      </ul>

      <style>{`
        @media (max-width: 640px) {
          .is-for-you-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}

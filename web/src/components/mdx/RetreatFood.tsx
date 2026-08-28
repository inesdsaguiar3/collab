import { ReactNode } from "react";
import Image from "next/image";

const WARM_FILTER = "sepia(0.22) saturate(1.45) brightness(1.04) hue-rotate(-10deg) contrast(1.04)";

interface FoodImageProps {
  src: string;
  alt?: string;
  position?: string;
  priority?: boolean;
}

export function FoodImage({ src, alt = "", position = "center", priority = false }: FoodImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 50vw"
      style={{ objectFit: "cover", filter: WARM_FILTER, objectPosition: position }}
    />
  );
}

interface RetreatFoodProps {
  title?: string;
  children: ReactNode;
  /** Optional custom intro — replaces the default retreat meal copy when set */
  lead?: string;
  body?: string;
  note?: string;
}

export function RetreatFood({
  title = "Nourishment",
  children,
  lead,
  body,
  note,
}: RetreatFoodProps) {
  const images = Array.isArray(children)
    ? (children as React.ReactElement[])
    : [children as React.ReactElement];

  const hero = images[0];
  const rest = images.slice(1);

  const leadText =
    lead ??
    "Every meal at our retreat is a ritual in itself. Three times a day, our kitchen comes alive with the scent of whole foods, seasonal ingredients, and the quiet intention of nourishment.";
  const bodyText =
    body ??
    "Meals are thoughtfully designed to support your nervous system through the depth of the programme — light, grounding, and deeply satisfying. Vegetarian by default, always made with love.";
  const noteText =
    note === undefined
      ? "Fresh fruit, herbal infusions, and our water altar are always available between sessions — a quiet invitation to pause, hydrate, and return to yourself."
      : note;

  return (
    <div style={{ background: "rgba(255,255,255,0.55)", padding: "80px 0" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14 space-y-3">
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "#4949A3" }}>
            Included in your retreat
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight" style={{ color: "#2E2440" }}>
            {title}
          </h2>
          <div
            className="mx-auto h-px max-w-xs rounded-full"
            style={{
              background: "linear-gradient(to right, transparent, rgba(127,90,161,0.3), transparent)",
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
          <div style={{ height: "400px", overflow: "hidden", flexShrink: 0, position: "relative" }}>
            {hero}
          </div>
          <div className="space-y-5">
            <p className="text-base md:text-lg font-light leading-[1.85]" style={{ color: "#4A3F5C" }}>
              {leadText}
            </p>
            <p className="text-base font-light leading-[1.85]" style={{ color: "#4A3F5C" }}>
              {bodyText}
            </p>
            {noteText ? (
              <div className="pt-4" style={{ borderTop: "1px solid rgba(127,90,161,0.15)" }}>
                <p className="text-sm font-light leading-[1.9] italic" style={{ color: "#7A6A8A" }}>
                  {noteText}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {rest.length > 0 && (
          <div
            className={`grid gap-3 ${
              rest.length === 1
                ? "grid-cols-1"
                : rest.length === 2
                  ? "grid-cols-2"
                  : rest.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-2 md:grid-cols-4"
            }`}
          >
            {rest.map((img, i) => (
              <div
                key={i}
                style={{
                  height: rest.length <= 3 ? "220px" : "180px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {img}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

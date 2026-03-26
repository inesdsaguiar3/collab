import React from "react";
import Image from "next/image";

const WARM_FILTER = "sepia(0.22) saturate(1.45) brightness(1.04) hue-rotate(-10deg) contrast(1.04)";
const GAP = "3px";

interface VenueImageProps {
  src: string;
  alt?: string;
}

export function VenueImage({ src, alt = "Venue" }: VenueImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="transition-transform duration-700 hover:scale-[1.04]"
      style={{ objectFit: "cover", filter: WARM_FILTER }}
    />
  );
}

// Renders 3 children as a tall-left + two-stacked-right mosaic (same as RetreatPhotoMosaic)
function VenueMosaic3({ items }: { items: React.ReactNode[] }) {
  return (
    <div style={{ display: "flex", gap: GAP, height: "520px" }}>
      <div style={{ flex: "1.4", overflow: "hidden", position: "relative" }}>{items[0]}</div>
      <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: GAP }}>
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>{items[1]}</div>
        {items[2] && <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>{items[2]}</div>}
      </div>
    </div>
  );
}

interface RetreatVenueProps {
  name?: string;
  description?: string;
  children?: React.ReactNode;
  images?: string[];
  accentColor?: string;
}

export function RetreatVenue({ name, description, children, images = [] }: RetreatVenueProps) {
  const childItems = React.Children.toArray(children);
  const hasChildren = childItems.length > 0;

  // Split into groups of 3 for mosaic rows
  const rows: React.ReactNode[][] = [];
  const source = hasChildren ? childItems : [];
  for (let i = 0; i < source.length; i += 3) {
    rows.push(source.slice(i, i + 3));
  }

  return (
    <div className="space-y-10">
      {(name || description) && (
        <div className="text-center space-y-4 max-w-xl mx-auto">
          {name && (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "#AE5F8F" }}>The venue</p>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight" style={{ color: "#4A3558" }}>{name}</h2>
            </div>
          )}
          {description && (
            <p className="font-light text-base leading-[1.9] whitespace-pre-line" style={{ color: "#4A3F5C" }}>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Mosaic rows — each group of 3 gets the same editorial layout as RetreatPhotoMosaic */}
      {rows.map((row, i) => (
        <VenueMosaic3 key={i} items={row} />
      ))}

      {/* Legacy images[] fallback */}
      {!hasChildren && images.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: GAP }}>
          {images.map((img, i) => (
            <div key={i} style={{ flex: "1 1 30%", overflow: "hidden", height: "320px", position: "relative" }}>
              <Image
                src={img}
                alt={`${name || "Venue"} ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover", filter: WARM_FILTER }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

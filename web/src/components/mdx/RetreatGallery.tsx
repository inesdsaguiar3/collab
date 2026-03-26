import React from "react";

const WARM_FILTER = "sepia(0.22) saturate(1.45) brightness(1.04) hue-rotate(-10deg) contrast(1.04)";

interface GalleryImageProps {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
}

export function GalleryImage({ src, alt }: GalleryImageProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      style={{ filter: WARM_FILTER }}
    />
  );
}

interface RetreatGalleryProps {
  title?: string;
  accentColor?: string;
  children: React.ReactNode;
}

export function RetreatGallery({ title, children }: RetreatGalleryProps) {
  const items = React.Children.toArray(children);

  return (
    <div className="space-y-3">
      {title && (
        <div className="text-center space-y-2 mb-8">
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "#D16678" }}>Moments</p>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight" style={{ color: "#4A3558" }}>{title}</h2>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((child, i) => (
          <div key={i} className="overflow-hidden rounded-2xl group" style={{ height: "320px" }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

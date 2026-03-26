import React, { ReactNode } from "react";
import Image from "next/image";

const WARM_FILTER = "sepia(0.22) saturate(1.45) brightness(1.04) hue-rotate(-10deg) contrast(1.04)";

interface MosaicImageProps {
  src: string;
  alt?: string;
  position?: string;
  priority?: boolean;
}

export function MosaicImage({ src, alt = "", position = "center", priority = false }: MosaicImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 50vw"
      className="transition-transform duration-700 hover:scale-[1.04]"
      style={{ objectFit: "cover", filter: WARM_FILTER, objectPosition: position }}
    />
  );
}

interface RetreatPhotoMosaicProps {
  children: ReactNode;
}

export function RetreatPhotoMosaic({ children }: RetreatPhotoMosaicProps) {
  const items = React.Children.toArray(children);
  const count = items.length;
  const gap = "3px";

  // 2 images — equal halves
  if (count === 2) {
    return (
      <div style={{ display: "flex", gap, height: "520px" }}>
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>{items[0]}</div>
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>{items[1]}</div>
      </div>
    );
  }

  // 3 images — tall left, two stacked right
  if (count === 3) {
    return (
      <div style={{ display: "flex", gap, height: "600px" }}>
        <div style={{ flex: "1.4", overflow: "hidden", position: "relative" }}>{items[0]}</div>
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap }}>
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>{items[1]}</div>
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>{items[2]}</div>
        </div>
      </div>
    );
  }

  // 4 images — tall left, 2 top right, wide bottom right
  if (count >= 4) {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap,
        height: "600px",
      }}>
        <div style={{ overflow: "hidden", position: "relative", gridColumn: "1", gridRow: "1 / 3" }}>{items[0]}</div>
        <div style={{ overflow: "hidden", position: "relative", gridColumn: "2", gridRow: "1" }}>{items[1]}</div>
        <div style={{ overflow: "hidden", position: "relative", gridColumn: "3", gridRow: "1" }}>{items[2]}</div>
        <div style={{ overflow: "hidden", position: "relative", gridColumn: "2 / 4", gridRow: "2" }}>{items[3]}</div>
      </div>
    );
  }

  return <div>{children}</div>;
}

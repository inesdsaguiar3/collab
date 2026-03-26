import Image from "next/image";

const WARM_FILTER = "sepia(0.22) saturate(1.45) brightness(1.04) hue-rotate(-10deg) contrast(1.04)";

interface RetreatFullPhotoProps {
  src: string;
  alt?: string;
  height?: "sm" | "md" | "lg";
  priority?: boolean;
}

export function RetreatFullPhoto({ src, alt = "", height = "md", priority = false }: RetreatFullPhotoProps) {
  const heightMap = { sm: "45vh", md: "65vh", lg: "85vh" };
  return (
    <div style={{ position: "relative", height: heightMap[height], overflow: "hidden" }}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        style={{ objectFit: "cover", filter: WARM_FILTER }}
      />
      {/* Feather edges into the lavender sections above and below */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(237,232,255,0.35) 0%, transparent 18%, transparent 82%, rgba(237,232,255,0.35) 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

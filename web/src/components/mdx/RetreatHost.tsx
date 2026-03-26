import Image from "next/image";
import React, { ReactNode } from "react";

const ROLE_COLOR   = "#D16678";
const NAME_COLOR   = "#2E2440";
const BIO_COLOR    = "#4A3F5C";
const DIV_GRADIENT = "linear-gradient(to right, #AE5F8F, #7F5AA1)";

function parseMarkdownLinks(text: string, accentColor: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer"
        className="underline hover:opacity-80 transition-opacity" style={{ color: accentColor }}>
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length > 0 ? parts : text;
}

interface RetreatHostProps {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  accentColor?: string;
  reversed?: boolean;
}

export function RetreatHost({ name, role, bio, imageUrl, accentColor = "#7F5AA1", reversed = false }: RetreatHostProps) {
  return (
    <div className={`flex flex-col items-center gap-10 py-14 md:py-16 ${reversed ? "md:flex-row-reverse" : "md:flex-row"} md:items-start md:gap-16`}>
      {imageUrl && (
        <div className="flex-shrink-0">
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mx-auto"
            style={{ boxShadow: `0 0 0 1px ${ROLE_COLOR}25, 0 12px 40px ${ROLE_COLOR}18` }}>
            <Image src={imageUrl} fill style={{ objectFit: "cover", objectPosition: "top", filter: "sepia(0.22) saturate(1.45) brightness(1.04) hue-rotate(-10deg) contrast(1.04)" }} alt={name} />
          </div>
        </div>
      )}
      <div className={`flex-1 min-w-0 space-y-5 text-center ${imageUrl ? "md:text-left" : "md:text-center"}`}>
        <p className="text-xs uppercase tracking-[0.35em]" style={{ color: ROLE_COLOR }}>{role}</p>
        <h3 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05]"
          style={{ color: NAME_COLOR }}>{name}</h3>
        <div className="h-px w-10 rounded-full mx-auto md:mx-0" style={{ background: DIV_GRADIENT }} />
        <p className="font-light text-base md:text-[1.05rem] leading-[1.9] whitespace-pre-line max-w-xl"
          style={{ color: BIO_COLOR }}>
          {parseMarkdownLinks(bio, accentColor)}
        </p>
      </div>
    </div>
  );
}

interface RetreatHostsProps {
  title?: string;
  accentColor?: string;
  children: ReactNode;
}

export function RetreatHosts({ title = "Meet Your Facilitators", children }: RetreatHostsProps) {
  return (
    <div className="space-y-2">
      <div className="text-center space-y-3 pb-4">
        <p className="text-xs uppercase tracking-[0.4em]" style={{ color: ROLE_COLOR }}>Your guides</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight" style={{ color: NAME_COLOR }}>{title}</h2>
      </div>
      <div className="divide-y" style={{ borderColor: "#AE5F8F15" }}>{children}</div>
    </div>
  );
}

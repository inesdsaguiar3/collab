import type { Metadata } from "next";
import { Playfair_Display, Raleway } from "next/font/google";
import { embodiedVisionLab } from "@/content/embodied-vision-lab";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-evl-display",
  display: "swap",
});

const body = Raleway({
  subsets: ["latin"],
  variable: "--font-evl-body",
  display: "swap",
});

const { seo, name } = embodiedVisionLab;

export const metadata: Metadata = {
  title: `${name} — Editorial sketch`,
  description: seo.description,
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/embodied-vision-lab/editorial",
  },
};

export default function EmbodiedVisionLabEditorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#F7F3EB] text-[#2C2A26]`}
      style={{ fontFamily: "var(--font-evl-body), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}

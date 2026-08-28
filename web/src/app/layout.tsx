import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const BRAND_POSITIONING =
  "Coliving & Retreats in Portugal for community, creativity, and conscious living - Breathwork, Somatics, Art, Yoga & Meditation";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.collab.living"),
  title: {
    default: "Coliving & Retreats in Portugal | Co-llab",
    template: "%s | Co-llab",
  },
  description: BRAND_POSITIONING,
  keywords: [
    "coliving portugal",
    "retreats portugal",
    "community retreats portugal",
    "creative community portugal",
    "conscious living portugal",
    "breathwork retreat portugal",
    "somatics retreat portugal",
    "art retreat portugal",
    "yoga retreat portugal",
    "meditation retreat portugal",
    "wellness retreats portugal",
    "obidos retreat",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Coliving & Retreats in Portugal | Co-llab",
    description: BRAND_POSITIONING,
    url: "https://www.collab.living",
    siteName: "Co-llab",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coliving & Retreats in Portugal | Co-llab",
    description: BRAND_POSITIONING,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NZBHW69DSL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NZBHW69DSL');
          `}
        </Script>
      </head>
      <body className="min-h-screen antialiased">

        {/* ── Animated mesh gradient background ── */}
        <div id="animated-bg" className="fixed inset-0 z-[-1] overflow-hidden" aria-hidden="true">
          {/* Warm base */}
          <div className="absolute inset-0 bg-[#C06070]" />

          {/* Blob 1 — coral-orange, top-left */}
          <div className="absolute rounded-full" style={{
            width: "80vw", height: "80vw", top: "-20%", left: "-15%",
            background: "radial-gradient(circle, #F0956E 0%, #EB8064 40%, transparent 72%)",
            filter: "blur(70px)", opacity: 0.95, animation: "blob1 18s ease-in-out infinite",
          }} />
          {/* Blob 2 — rose-pink, top-right */}
          <div className="absolute rounded-full" style={{
            width: "70vw", height: "70vw", top: "-10%", right: "-20%",
            background: "radial-gradient(circle, #E8889A 0%, #D16678 50%, transparent 72%)",
            filter: "blur(80px)", opacity: 0.88, animation: "blob2 22s ease-in-out infinite",
          }} />
          {/* Blob 3 — orchid/lavender, center */}
          <div className="absolute rounded-full" style={{
            width: "75vw", height: "75vw", top: "20%", left: "15%",
            background: "radial-gradient(circle, #C882A8 0%, #AE5F8F 50%, transparent 72%)",
            filter: "blur(90px)", opacity: 0.80, animation: "blob3 26s ease-in-out infinite",
          }} />
          {/* Blob 4 — lavender-purple, bottom-right */}
          <div className="absolute rounded-full" style={{
            width: "80vw", height: "80vw", bottom: "-25%", right: "-10%",
            background: "radial-gradient(circle, #9878C0 0%, #7F5AA1 50%, transparent 72%)",
            filter: "blur(80px)", opacity: 0.90, animation: "blob4 20s ease-in-out infinite",
          }} />
          {/* Blob 5 — deep indigo, bottom-left */}
          <div className="absolute rounded-full" style={{
            width: "65vw", height: "65vw", bottom: "-15%", left: "-10%",
            background: "radial-gradient(circle, #5D5CC0 0%, #4949A3 55%, transparent 72%)",
            filter: "blur(90px)", opacity: 0.85, animation: "blob5 24s ease-in-out infinite",
          }} />
        </div>

        <Navbar />
        <main className="pt-20 min-w-0 overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

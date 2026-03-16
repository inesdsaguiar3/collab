import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Co-llab | Connect, Create, Collaborate",
  description: "A space for co-creation, community, and conscious living.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen antialiased">

        {/* ── Animated mesh gradient background ── */}
        <div className="fixed inset-0 z-[-1] overflow-hidden" aria-hidden="true">
          {/* Warm base */}
          <div className="absolute inset-0 bg-[#C06070]" />

          {/* Blob 1 — coral-orange, top-left */}
          <div
            className="absolute rounded-full"
            style={{
              width: "80vw",
              height: "80vw",
              top: "-20%",
              left: "-15%",
              background: "radial-gradient(circle, #F0956E 0%, #EB8064 40%, transparent 72%)",
              filter: "blur(70px)",
              opacity: 0.95,
              animation: "blob1 18s ease-in-out infinite",
            }}
          />

          {/* Blob 2 — rose-pink, top-right */}
          <div
            className="absolute rounded-full"
            style={{
              width: "70vw",
              height: "70vw",
              top: "-10%",
              right: "-20%",
              background: "radial-gradient(circle, #E8889A 0%, #D16678 50%, transparent 72%)",
              filter: "blur(80px)",
              opacity: 0.88,
              animation: "blob2 22s ease-in-out infinite",
            }}
          />

          {/* Blob 3 — orchid/lavender, center */}
          <div
            className="absolute rounded-full"
            style={{
              width: "75vw",
              height: "75vw",
              top: "20%",
              left: "15%",
              background: "radial-gradient(circle, #C882A8 0%, #AE5F8F 50%, transparent 72%)",
              filter: "blur(90px)",
              opacity: 0.80,
              animation: "blob3 26s ease-in-out infinite",
            }}
          />

          {/* Blob 4 — lavender-purple, bottom-right */}
          <div
            className="absolute rounded-full"
            style={{
              width: "80vw",
              height: "80vw",
              bottom: "-25%",
              right: "-10%",
              background: "radial-gradient(circle, #9878C0 0%, #7F5AA1 50%, transparent 72%)",
              filter: "blur(80px)",
              opacity: 0.90,
              animation: "blob4 20s ease-in-out infinite",
            }}
          />

          {/* Blob 5 — deep indigo, bottom-left anchor */}
          <div
            className="absolute rounded-full"
            style={{
              width: "65vw",
              height: "65vw",
              bottom: "-15%",
              left: "-10%",
              background: "radial-gradient(circle, #5D5CC0 0%, #4949A3 55%, transparent 72%)",
              filter: "blur(90px)",
              opacity: 0.85,
              animation: "blob5 24s ease-in-out infinite",
            }}
          />
        </div>

        <Navbar />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

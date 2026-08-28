import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stay Packages — Casa do Sol | Co-llab",
  robots: { index: false, follow: true },
};

export default function StayPackagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

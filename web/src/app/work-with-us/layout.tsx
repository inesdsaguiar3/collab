import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work with Us — Co-llab",
  description:
    "Volunteer artist positions and paid community manager roles at Co-llab in Portugal. Join our living community.",
  alternates: {
    canonical: "/work-with-us",
  },
  openGraph: {
    title: "Work with Us — Co-llab",
    description:
      "Volunteer artist positions and paid community manager roles. Join our community in Portugal.",
    url: "https://www.collab.living/work-with-us",
    type: "website",
  },
};

export default function WorkWithUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

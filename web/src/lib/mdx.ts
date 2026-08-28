import fs from "fs";
import path from "path";
import matter from "gray-matter";

const RETREATS_PATH = path.join(process.cwd(), "mdx-pages/retreats");

export interface RetreatFrontmatter {
  id: string;
  title: string;
  seoTitle?: string;
  subtitle?: string;
  startDate: string;
  endDate: string;
  location: string;
  status?: "draft";
  mainImageUrl: string;
  heroVideoUrl?: string;
  hideHeaderImage?: boolean;
  accentColor?: string;
  metaDescription?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  twitterTitle?: string;
  twitterDescription?: string;
  offers?: Array<{
    name?: string;
    price: number;
    priceCurrency: string;
    availability?: string;
    stripeLink?: string;
    /** Subtracted from `price` on the server when creating the Stripe Payment Link (same idea as Casa do Sol early bird). */
    earlyBirdDiscount?: number;
  }>;
  performers?: string[];
  maxAttendeeCapacity?: number;
}

export interface RetreatMDX {
  slug: string;
  frontmatter: RetreatFrontmatter;
  content: string;
}

export function formatRetreatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const dayWithSuffix = (day: number): string => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const startDay = dayWithSuffix(start.getDate());
  const endDay = dayWithSuffix(end.getDate());
  const startMonth = months[start.getMonth()];
  const endMonth = months[end.getMonth()];

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${startDay} to ${endDay} ${startMonth}`;
  }
  return `${startDay} ${startMonth} to ${endDay} ${endMonth}`;
}

export function getRetreatSlugs(): string[] {
  if (!fs.existsSync(RETREATS_PATH)) return [];
  return fs.readdirSync(RETREATS_PATH)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getRetreatBySlug(slug: string): RetreatMDX | null {
  const filePath = path.join(RETREATS_PATH, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return { slug, frontmatter: data as RetreatFrontmatter, content };
}

export function getAllRetreats(): RetreatMDX[] {
  return getRetreatSlugs()
    .map((slug) => getRetreatBySlug(slug))
    .filter((r): r is RetreatMDX => r !== null && r.frontmatter.status !== "draft");
}

export function isUpcoming(endDate: string): boolean {
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return end >= today;
}

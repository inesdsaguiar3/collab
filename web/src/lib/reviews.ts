import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const REVIEWS_FILE = path.join(process.cwd(), "mdx-pages/reviews/casadosol-reviews.mdx");

export interface ReviewItem {
  author: string;
  text: string;
}

interface ReviewsFrontmatter {
  reviews?: ReviewItem[];
}

export function getHomepageReviews(): ReviewItem[] {
  if (!fs.existsSync(REVIEWS_FILE)) return [];
  const source = fs.readFileSync(REVIEWS_FILE, "utf8");
  const { data } = matter(source);
  const frontmatter = data as ReviewsFrontmatter;
  return Array.isArray(frontmatter.reviews) ? frontmatter.reviews : [];
}

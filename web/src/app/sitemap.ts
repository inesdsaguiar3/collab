import type { MetadataRoute } from "next";
import { getRetreatSlugs } from "@/lib/mdx";

const BASE_URL = "https://www.collab.living";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/coliving`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/retreats`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/community`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/work-with-us`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/rates`, changeFrequency: "weekly", priority: 0.85 },
  ];

  const retreatPages: MetadataRoute.Sitemap = getRetreatSlugs().map((slug) => ({
    url: `${BASE_URL}/retreats/${slug}`,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticPages, ...retreatPages];
}

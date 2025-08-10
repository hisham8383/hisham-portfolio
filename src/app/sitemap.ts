import type { MetadataRoute } from "next";
import { posts } from "./blog/page";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.hisham-alhussain.com"; // adjust if using apex
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

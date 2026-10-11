import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { CASE_STUDIES } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.hisham-alhussain.dev";
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
    ...CASE_STUDIES.map((p) => ({
      url: `${base}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // optionally: { url: `${base}/feed.xml`, lastModified: now, priority: 0.3 },
  ];
}

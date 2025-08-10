import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.hisham-alhussain.com";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    // Later, add real routes like:
    // { url: `${base}/blog/rag-guardrails`, lastModified: "2025-07-28" }
  ];
}

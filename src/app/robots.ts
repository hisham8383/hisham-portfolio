import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://www.hisham-alhussain.com"; // update if you use apex/no-www
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // If you create private areas later, you can disallow them here:
        // disallow: ["/api/", "/drafts"]
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

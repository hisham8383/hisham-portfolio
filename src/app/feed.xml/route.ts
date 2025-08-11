import { NextResponse } from "next/server";
import { posts } from "../../content/posts"; // ← fixed path

export async function GET() {
  const site = "https://www.hisham-alhussain.dev";
  const items = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${site}/blog/${p.slug}</link>
      <guid>${site}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.summary}]]></description>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Hisham Alhussain</title>
      <link>${site}</link>
      <description>Writing on GenAI, RAG, and shipping ML.</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, { headers: { "Content-Type": "application/rss+xml" } });
}

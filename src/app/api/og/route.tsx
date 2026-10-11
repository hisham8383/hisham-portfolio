import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
export const runtime = "edge";

// Per-page social image for blog posts and case studies (/api/og?title=...).
// Matches the static public/og.png: navy background, blue accent, headshot footer.
// Space Grotesk Bold (SIL OFL), the site's heading font, bundled next to this route.
const displayFont = fetch(new URL("./SpaceGrotesk-Bold.ttf", import.meta.url)).then((r) => r.arrayBuffer());

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const title = searchParams.get("title") ?? "Hisham Alhussain";
  const size = title.length > 70 ? 52 : title.length > 40 ? 60 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#f8fafc",
          // Satori needs the color and gradient as separate properties.
          backgroundColor: "#080d1a",
          backgroundImage: "radial-gradient(circle at 90% 20%, rgba(59,130,246,0.25), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#60a5fa" }}>
          <div style={{ width: 36, height: 3, background: "#3b82f6" }} />
          hisham-alhussain.dev
        </div>

        <div style={{ display: "flex", fontFamily: "Space Grotesk", fontSize: size, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.02em", maxWidth: 1000 }}>
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${origin}/headshot.jpg`}
            width={72}
            height={72}
            alt=""
            style={{ borderRadius: 18, border: "2px solid rgba(59,130,246,0.5)" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Space Grotesk", fontSize: 26, fontWeight: 700 }}>Hisham Alhussain</div>
            <div style={{ fontSize: 20, color: "#94a3b8" }}>Senior Software, Cloud &amp; AI Engineer</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Space Grotesk", data: await displayFont, weight: 700, style: "normal" }],
    }
  );
}

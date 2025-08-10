import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Hisham Alhussain";
  return new ImageResponse(
    (<div
      style={{
        fontSize: 64, color: "white", background: "#0b0f19",
        width: "100%", height: "100%", display: "flex",
        alignItems: "center", justifyContent: "center", padding: "80px",
      }}
    >
      {title}
    </div>),
    { width: 1200, height: 630 }
  );
}

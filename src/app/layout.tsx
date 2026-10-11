// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import MouseGlow from "@/components/ui/mouse-glow";
// import { Analytics } from "@vercel/analytics/react"; // optional

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const display = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hisham-alhussain.dev"),
  title: "Hisham Alhussain · Senior Solutions Architect",
  description:
    "Hisham Alhussain builds AI agents, LLM systems and data platforms that hold up in production, from enterprise compliance at NEOM to bilingual WhatsApp agents.",
  openGraph: {
    type: "website",
    url: "https://www.hisham-alhussain.dev",
    title: "Hisham Alhussain · Senior Solutions Architect",
    description: "AI agents, LLM systems and data platforms that hold up in production.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // If you verify via meta tag later:
  // verification: { google: "PASTE_TOKEN" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${display.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <MouseGlow size={520} strength={0.28} />
          {/* <Analytics /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}

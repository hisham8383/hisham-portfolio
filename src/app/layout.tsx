// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
// import { Analytics } from "@vercel/analytics/react"; // optional

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hisham-alhussain.dev"), // or your *.vercel.app while testing
  title: "Hisham Alhussain · Senior Solutions Architect",
  description:
    "Portfolio of Hisham Alhussain – building GenAI assistants, AI/ML products, and data platforms.",
  openGraph: {
    type: "website",
    url: "https://www.hisham-alhussain.dev",
    title: "Hisham Alhussain · Senior Solutions Architect",
    description: "GenAI assistants, data platforms, and polished UIs.",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
  // If you choose the Search Console meta-tag method instead of HTML file:
  // verification: { google: "paste_your_token_here" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}

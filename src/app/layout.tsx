import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hisham-alhussain.com"), // or your *.vercel.app for now
  title: "Hisham Alhussain · Senior Solutions Architect",
  description: "Portfolio of Hisham Alhussain – building GenAI assistants, AI/ML products, and data platforms.",
  openGraph: {
    type: "website",
    url: "https://www.hisham-alhussain.com",
    title: "Hisham Alhussain · Senior Solutions Architect",
    description: "GenAI assistants, data platforms, and polished UIs.",
    images: [{ url: "/og.png", width: 1200, height: 630 }], // <-- OG image
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  // Favicons & Apple Touch
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // Optional (nice on mobile address bar)
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
// import { Analytics } from "@vercel/analytics/react"; // ← enable if you installed it

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hisham-alhussain.com"),
  title: "Hisham Alhussain · Senior Solutions Architect",
  description:
    "Portfolio of Hisham Alhussain – building GenAI assistants, AI/ML products, and data platforms.",
  openGraph: {
    type: "website",
    url: "https://www.hisham-alhussain.com",
    title: "Hisham Alhussain · Senior Solutions Architect",
    description: "GenAI assistants, data platforms, and polished UIs.",
    images: [{ url: "/og.png" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.hisham-alhussain.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning avoids transient class mismatches before next-themes hydrates
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"     // toggles a 'class' on <html>
          defaultTheme="dark"   // dark by default
          enableSystem={false}  // ignore OS preference (you control it)
        >
          {children}
        </ThemeProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"), // TODO: replace with your real domain
  title: "Hisham Alhussain · Senior Solutions Architect",
  description:
    "Portfolio of Hisham Alhussain – building GenAI assistants, AI/ML products, and data platforms.",
  openGraph: {
    type: "website",
    url: "https://your-domain.com",
    title: "Hisham Alhussain · Senior Solutions Architect",
    description: "GenAI assistants, data platforms, and polished UIs.",
    images: [{ url: "/og.png" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://your-domain.com" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

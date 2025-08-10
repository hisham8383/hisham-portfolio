import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Writing · Hisham Alhussain",
  description: "Articles and notes on GenAI, RAG, and shipping production-grade AI/ML systems.",
  alternates: { canonical: "https://www.hisham-alhussain.com/blog" },
  openGraph: {
    type: "website",
    title: "Writing · Hisham Alhussain",
    url: "https://www.hisham-alhussain.com/blog",
  },
};

export default function BlogIndex() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold mb-8">Writing</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((p) => (
          <Card key={p.slug} className="border-muted/60">
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/blog/${p.slug}`}
                  className="underline decoration-primary/30 underline-offset-8 hover:no-underline"
                >
                  {p.title}
                </Link>
              </CardTitle>
              <CardDescription>{p.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{p.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

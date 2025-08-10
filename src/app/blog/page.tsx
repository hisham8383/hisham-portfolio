import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;        // YYYY-MM-DD
  summary: string;
};

export const posts: BlogPostMeta[] = [
  {
    slug: "rag-guardrails",
    title: "RAG beyond the hype: production guardrails",
    date: "2025-07-28",
    summary:
      "A playbook for evaluation, retrieval quality, and observability when LLMs meet enterprise data.",
  },
  {
    slug: "hardening-ml-delivery",
    title: "From notebooks to platforms: hardening ML delivery",
    date: "2025-05-14",
    summary: "Pipelines, CI/CD, and model governance without slowing teams down.",
  },
];

export default function BlogIndex() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold mb-8">Writing</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((p) => (
          <Card key={p.slug} className="border-muted/60">
            <CardHeader>
              <CardTitle>
                <Link href={`/blog/${p.slug}`} className="underline decoration-primary/30 underline-offset-8 hover:no-underline">
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

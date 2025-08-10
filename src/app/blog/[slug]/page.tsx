import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, type BlogPostMeta } from "../page";

const contentBySlug: Record<string, React.ReactNode> = {
  "rag-guardrails": (
    <>
      <p className="mb-4">
        RAG in production is less about fancy retrieval tricks and more about guardrails:
        evals, observability, and deterministic fallbacks when retrieval is weak.
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Track retrieval quality (top-k hit rate, MRR) per index + query type.</li>
        <li>Use domain schemas and chunking strategies that mirror how SMEs think.</li>
        <li>Evaluate end-to-end with golden sets and regression tests.</li>
      </ul>
    </>
  ),
  "hardening-ml-delivery": (
    <>
      <p className="mb-4">
        Shipping ML means boring engineering: CI/CD, data contracts, and explicit ownership.
        The trick is to do it without slowing down discovery work.
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Separate labs vs. production repos; promote via PRs with checks.</li>
        <li>Automate tests for data drift and feature compatibility.</li>
        <li>Observability: traces from request → retrieval → model output.</li>
      </ul>
    </>
  ),
};

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const meta = posts.find((p) => p.slug === params.slug);
  if (!meta) return {};
  const base = "https://www.hisham-alhussain.com"; // update if you use apex/no-www
  return {
    title: `${meta.title} · Hisham Alhussain`,
    description: meta.summary,
    alternates: { canonical: `${base}/blog/${meta.slug}` },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.summary,
      url: `${base}/blog/${meta.slug}`,
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const meta: BlogPostMeta | undefined = posts.find((p) => p.slug === params.slug);
  if (!meta) return notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-12 prose prose-neutral dark:prose-invert">
      <h1 className="mb-2">{meta.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">{meta.date}</p>
      <article>{contentBySlug[meta.slug]}</article>
    </main>
  );
}

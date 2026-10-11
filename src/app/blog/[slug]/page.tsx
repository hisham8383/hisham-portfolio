// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
// Use a relative import to avoid alias issues on some builds
import { posts, formatPostDate, type BlogPostMeta } from "../../../content/posts";
import { postBodies } from "../../../content/post-bodies";
import { PostBody } from "../../../components/blog/post-body";
import { SubHeader } from "../../../components/site/sub-header";
import { readingMinutes } from "../../../content/reading-time";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// Next.js 15: params is a Promise; await it and return Metadata
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const meta = posts.find((p) => p.slug === slug);
  if (!meta) return {};

  const base = "https://www.hisham-alhussain.dev"; // update if you use apex/no-www or a preview URL
  return {
    title: `${meta.title} · Hisham Alhussain`,
    description: meta.summary,
    alternates: { canonical: `${base}/blog/${meta.slug}` },
    openGraph: {
      type: "article",
      publishedTime: meta.date,
      title: meta.title,
      description: meta.summary,
      url: `${base}/blog/${meta.slug}`,
      images: [{ url: `/api/og?title=${encodeURIComponent(meta.title)}` }], // ← dynamic OG image
    },
    twitter: {
      card: "summary_large_image",
      images: [`/api/og?title=${encodeURIComponent(meta.title)}`],
    },
  };
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const meta: BlogPostMeta | undefined = posts.find((p) => p.slug === slug);
  if (!meta) return notFound();

  return (
    <>
    <SubHeader />
    <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
        ← All posts
      </Link>
      <h1 className="mt-6 mb-2 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{meta.title}</h1>
      <p className="text-sm text-muted-foreground mb-10">
        <time dateTime={meta.date}>{formatPostDate(meta.date)}</time> · {readingMinutes(meta.slug)} min read
      </p>
      <article>
        <PostBody source={postBodies[meta.slug] ?? ""} />
      </article>
    </main>
    </>
  );
}

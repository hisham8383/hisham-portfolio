import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { CASE_STUDIES } from "@/content/projects";
import { SITE_URL } from "@/content/site";
import { PostBody } from "@/components/blog/post-body";
import { FlowDiagram } from "@/components/site/flow-diagram";
import { SubHeader } from "@/components/site/sub-header";

export function generateStaticParams() {
  return CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = CASE_STUDIES.find((x) => x.slug === slug);
  if (!p) return {};
  const og = `/api/og?title=${encodeURIComponent(p.title)}`;
  return {
    title: `${p.title} · Case study · Hisham Alhussain`,
    description: p.summary,
    alternates: { canonical: `${SITE_URL}/work/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.summary, url: `${SITE_URL}/work/${p.slug}`, images: [{ url: og }] },
    twitter: { card: "summary_large_image", images: [og] },
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = CASE_STUDIES.findIndex((x) => x.slug === slug);
  if (index === -1) return notFound();
  const p = CASE_STUDIES[index];
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];

  return (
    <>
      <SubHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <Link href="/#work" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All work
        </Link>

        <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-primary">Case study</p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{p.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{p.summary}</p>

        <dl className="mt-8 grid gap-4 rounded-2xl border bg-card/40 p-5 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">For</dt>
            <dd className="mt-1 font-medium">{p.org}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">My role</dt>
            <dd className="mt-1 font-medium">{p.role}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Stack</dt>
            <dd className="mt-1 font-medium">{p.tags.slice(0, 4).join(", ")}</dd>
          </div>
        </dl>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Problem", p.problem],
            ["What I built", p.built],
            ["Outcome", p.outcome],
          ].map(([label, text]) => (
            <div key={label} className="rounded-xl border p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">{label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        {p.metrics && (
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {p.metrics.map((m) => (
              <div key={m.label} className="rounded-xl bg-primary/10 p-4">
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold">{m.value}</span>
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        {p.flow && (
          <div className="mt-10">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest">Architecture</h2>
            <FlowDiagram steps={p.flow} qualities={p.qualities} />
          </div>
        )}

        <article className="mt-10">
          <PostBody source={p.body ?? ""} />
        </article>

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t pt-6">
          {p.links?.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              {l.label} <ArrowUpRight className="h-4 w-4" />
            </a>
          ))}
          {p.confidential && (
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" /> Internal NEOM work, shared at a high level without confidential data.
            </span>
          )}
        </div>

        <Link
          href={`/work/${next.slug}`}
          className="group mt-10 flex items-center justify-between rounded-2xl border p-5 transition hover:border-primary/40"
        >
          <span>
            <span className="block text-xs uppercase tracking-wider text-muted-foreground">Next case study</span>
            <span className="mt-1 block font-semibold group-hover:text-primary">{next.title}</span>
          </span>
          <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
        </Link>
      </main>
    </>
  );
}

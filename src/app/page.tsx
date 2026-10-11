// src/app/page.tsx
// Split layout: sticky profile rail (with headshot) on the left, scrolling content on the right.
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Briefcase, Download, Lock, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileHeader } from "@/components/site/mobile-header";
import { SectionNav } from "@/components/site/section-nav";
import { QuickView } from "@/components/site/quick-view";
import { Reveal } from "@/components/site/reveal";
import { SocialLinks } from "@/components/site/social-links";
import { GitHubHighlights } from "@/components/site/github-highlights";
import {
  ABOUT,
  CREDENTIALS,
  CV_URL,
  EMAIL,
  EXPERIENCE,
  NOW,
  PROFILE,
  SITE_URL,
  SKILLS,
  STATS,
  TESTIMONIALS,
} from "@/content/site";
import { PROJECTS, type Project } from "@/content/projects";
import { posts, formatPostDate } from "@/content/posts";
import { readingMinutes } from "@/content/reading-time";

function SectionHeading({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <h2 className="sticky top-[57px] z-20 -mx-4 mb-8 bg-background/85 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
      <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-foreground">
        <span className="font-mono text-primary">{index}</span>
        {children}
        <span className="h-px flex-1 bg-border" />
      </span>
    </h2>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          {t}
        </li>
      ))}
    </ul>
  );
}

const Rail = () => (
  // -ml/pl gives the headshot glow room inside the scroll container, which would otherwise clip it.
  <header className="pt-10 lg:sticky lg:top-0 lg:-ml-12 lg:flex lg:max-h-screen lg:w-[calc(44%+3rem)] lg:flex-col lg:justify-between lg:overflow-y-auto lg:py-20 lg:pl-12">
    <div>
      <div className="relative w-fit">
        <div aria-hidden className="absolute -inset-2 rounded-[2rem] bg-primary/25 blur-xl" />
        <Image
          src={PROFILE.headshot}
          alt={`Portrait of ${PROFILE.name}`}
          width={400}
          height={400}
          priority
          sizes="(min-width: 1024px) 144px, 112px"
          className="relative h-28 w-28 rounded-3xl object-cover ring-1 ring-primary/40 lg:h-36 lg:w-36"
        />
      </div>

      <p className="mt-6 inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        {PROFILE.availability}
      </p>

      <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">{PROFILE.name}</h1>
      <p className="mt-3 text-lg font-medium text-foreground/90">{PROFILE.title}</p>
      <p className="mt-1 text-sm text-primary">{PROFILE.focus}</p>
      <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">{PROFILE.tagline}</p>
      <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" /> {PROFILE.location}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Button asChild>
          <a href="#work">
            See my work <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
        <QuickView />
        {CV_URL && (
          <Button asChild variant="ghost" size="sm">
            <a href={CV_URL} download>
              <Download className="h-4 w-4" /> CV
            </a>
          </Button>
        )}
      </div>

      <div className="mt-14">
        <SectionNav />
      </div>
    </div>

    <div className="mt-8 lg:mt-10">
      <SocialLinks />
    </div>
  </header>
);

const About = () => (
  <Reveal id="about">
    <SectionHeading index="01">About</SectionHeading>

    <dl className="grid grid-cols-2 gap-3">
      {STATS.map((s) => (
        <div key={s.label} className="rounded-xl border bg-card/60 p-4">
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className="block font-display text-2xl font-bold text-foreground sm:text-3xl">{s.value}</span>
            <span className="mt-1 block text-xs leading-snug text-muted-foreground">{s.label}</span>
          </dd>
        </div>
      ))}
    </dl>

    <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
      {ABOUT.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>

    <div className="mt-6 flex flex-wrap gap-1.5">
      {[...CREDENTIALS, ...SKILLS].map((s, i) => (
        <span
          key={s}
          className={`rounded-full px-2.5 py-1 text-xs ${
            i < CREDENTIALS.length ? "bg-primary/10 font-medium text-primary" : "bg-muted text-muted-foreground"
          }`}
        >
          {s}
        </span>
      ))}
    </div>

    <div className="mt-8 rounded-xl border border-dashed p-5">
      <p className="flex items-baseline justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-foreground">Now</span>
        <span className="text-xs text-muted-foreground">Updated {NOW.updated}</span>
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {NOW.items.map((n) => (
          <li key={n.label} className="flex gap-3">
            <span className="w-20 shrink-0 font-medium text-primary">{n.label}</span>
            <span className="text-muted-foreground">{n.text}</span>
          </li>
        ))}
      </ul>
    </div>
  </Reveal>
);

const Experience = () => (
  <Reveal id="experience">
    <SectionHeading index="02">Experience</SectionHeading>
    <ol className="relative space-y-10 border-l border-border pl-6">
      {EXPERIENCE.map((job) => (
        <li key={job.role + job.org} className="relative">
          <span
            aria-hidden
            className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background"
          />
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{job.period}</p>
          <h3 className="mt-1 text-lg font-semibold leading-snug">
            {job.role} <span className="text-primary">· {job.org}</span>
          </h3>
          {job.location && <p className="text-xs text-muted-foreground">{job.location}</p>}
          <p className="mt-3 text-muted-foreground">{job.summary}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {job.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Tags items={job.tags} />
          </div>
        </li>
      ))}
    </ol>
  </Reveal>
);

function ProjectCard({ p }: { p: Project }) {
  const inner = (
    <>
      <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground/80">{p.org}</span>
        {p.year && <span>· {p.year}</span>}
      </p>
      <h3 className="mt-2 flex items-start justify-between gap-3 text-lg font-semibold leading-snug">
        {p.title}
        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
      {p.metrics && (
        <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {p.metrics.map((m) => (
            <div key={m.label} className="rounded-lg bg-muted/60 px-3 py-2">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-display text-base font-bold">{m.value}</span>
                <span className="block text-[11px] leading-tight text-muted-foreground">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      )}
      <div className="mt-4">
        <Tags items={p.tags.slice(0, 5)} />
      </div>
      <p className="mt-4 flex items-center justify-between text-xs">
        <span className="font-medium text-primary">Read case study →</span>
        {p.confidential && (
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Lock className="h-3 w-3" /> Internal work, shared at a high level
          </span>
        )}
      </p>
    </>
  );
  return (
    <li>
      <Link
        href={`/work/${p.slug}`}
        className="group block h-full rounded-2xl border bg-card/40 p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
      >
        {inner}
      </Link>
    </li>
  );
}

const Work = () => {
  const featured = PROJECTS.filter((p) => p.body);
  const more = PROJECTS.filter((p) => !p.body);
  return (
    <Reveal id="work">
      <SectionHeading index="03">Selected work</SectionHeading>
      <ul className="grid gap-4">
        {featured.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </ul>

      <h3 className="mt-12 text-sm font-semibold uppercase tracking-widest text-foreground">More work</h3>
      <ul className="mt-4 divide-y divide-border rounded-2xl border">
        {more.map((p) => (
          <li key={p.slug} className="p-5">
            <p className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold">{p.title}</span>
              <span className="text-xs text-muted-foreground">{p.org}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
            {p.outcome && (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground/80">Outcome: </span>
                {p.outcome}
              </p>
            )}
            <div className="mt-3">
              <Tags items={p.tags} />
            </div>
          </li>
        ))}
      </ul>

      <h3 className="mt-12 text-sm font-semibold uppercase tracking-widest text-foreground">Open source</h3>
      <div className="mt-4">
        <GitHubHighlights />
      </div>
    </Reveal>
  );
};

const Writing = () => {
  const [latest, ...rest] = posts;
  return (
    <Reveal id="writing">
      <SectionHeading index="04">Writing</SectionHeading>
      <Link
        href={`/blog/${latest.slug}`}
        className="group block rounded-2xl border bg-gradient-to-br from-primary/10 via-card/40 to-transparent p-6 transition hover:border-primary/40"
      >
        <p className="text-xs text-muted-foreground">
          Latest · <time dateTime={latest.date}>{formatPostDate(latest.date)}</time> · {readingMinutes(latest.slug)} min read
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug group-hover:text-primary">
          {latest.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{latest.summary}</p>
      </Link>
      <ul className="mt-2 divide-y divide-border">
        {rest.slice(0, 3).map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group flex items-baseline justify-between gap-4 py-4">
              <span className="font-medium group-hover:text-primary">{p.title}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatPostDate(p.date).replace(/ \d+,/, "")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/blog"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        All {posts.length} posts <ArrowRight className="h-4 w-4" />
      </Link>
    </Reveal>
  );
};

const Testimonials = () =>
  TESTIMONIALS.length === 0 ? null : (
    <Reveal id="testimonials">
      <SectionHeading index="05">Kind words</SectionHeading>
      <ul className="grid gap-4">
        {TESTIMONIALS.map((t) => (
          <li key={t.name} className="rounded-2xl border bg-card/40 p-6">
            <blockquote className="leading-relaxed">“{t.quote}”</blockquote>
            <p className="mt-4 text-sm">
              <span className="font-semibold">{t.name}</span>
              <span className="text-muted-foreground"> · {t.title}</span>
            </p>
          </li>
        ))}
      </ul>
    </Reveal>
  );

const Contact = () => (
  <Reveal id="contact">
    <SectionHeading index={TESTIMONIALS.length ? "06" : "05"}>Contact</SectionHeading>
    <p className="mb-6 text-muted-foreground">Two ways to work together. Pick the one that fits.</p>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col rounded-2xl border bg-card/40 p-6">
        <Briefcase className="h-5 w-5 text-primary" />
        <h3 className="mt-3 font-display text-lg font-semibold">Hiring?</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          I&apos;m open to senior AI engineering and solutions architecture roles where agents and data platforms
          need to work in production, not just in demos.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild size="sm">
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Opportunity for Hisham")}`}>
              <Mail className="h-4 w-4" /> Email me
            </a>
          </Button>
          {CV_URL && (
            <Button asChild size="sm" variant="outline">
              <a href={CV_URL} download>
                <Download className="h-4 w-4" /> CV
              </a>
            </Button>
          )}
          <Button asChild size="sm" variant="ghost">
            <a href="https://www.linkedin.com/in/hishamalhussain/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </Button>
        </div>
      </div>

      <div className="flex flex-col rounded-2xl border border-primary/30 bg-primary/5 p-6">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h3 className="mt-3 font-display text-lg font-semibold">Need an AI agent for your business?</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          I build WhatsApp front-desk agents that answer customers in Arabic and English, book appointments, send
          reminders and hand off to your team when it matters.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild size="sm">
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("WhatsApp AI agent for my business")}`}>
              <Mail className="h-4 w-4" /> Get in touch
            </a>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/work/whatsapp-ai-agent">See how it works</Link>
          </Button>
        </div>
      </div>
    </div>
  </Reveal>
);

const Footer = () => (
  <footer className="border-t pt-8 text-sm text-muted-foreground">
    <p>
      © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js and Tailwind, deployed on Vercel.
    </p>
  </footer>
);

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    url: SITE_URL,
    image: `${SITE_URL}${PROFILE.headshot}`,
    jobTitle: PROFILE.title,
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "King Abdullah University of Science and Technology (KAUST)" },
      { "@type": "CollegeOrUniversity", name: "University of Massachusetts Amherst" },
    ],
    address: { "@type": "PostalAddress", addressLocality: "Dammam", addressCountry: "SA" },
    sameAs: ["https://github.com/hisham8383", "https://www.linkedin.com/in/hishamalhussain/"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <MobileHeader />
      {/* Desktop theme toggle, pinned to the top-right corner */}
      <div className="fixed right-6 top-5 z-50 hidden h-9 w-9 rounded-full border bg-background/70 backdrop-blur lg:block">
        <ThemeToggle />
      </div>
      <div className="mx-auto min-h-screen max-w-6xl px-4 sm:px-6 lg:flex lg:justify-between lg:gap-16 lg:px-12">
        <Rail />
        <main className="space-y-24 pb-16 pt-20 lg:w-[56%] lg:py-20">
          <About />
          <Experience />
          <Work />
          <Writing />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}

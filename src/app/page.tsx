// src/app/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  Code2,
  Briefcase,
  PenTool,
  Award,
  MapPin,
  Star,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Script from "next/script";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// ----------
// Modern portfolio – Next.js (App Router) + Tailwind + shadcn/ui + Framer Motion
// Inspired by brittanychiang.com
// Owner: Hisham Alhussain
// ----------

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  pushed_at: string; // ISO timestamp
};

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://github.com/hisham8383", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/hishamalhussain/", label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:hisham83835@gmail.com", label: "Email", Icon: Mail },
];

const SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "LLMs",
  "RAG",
  "MLOps",
  "Palantir Foundry",
  "Docker",
  "Kubernetes",
];

const EXPERIENCE = [
  {
    role: "Senior Solutions Architect",
    company: "NEOM / TONOMUS",
    period: "2023 — Present",
    location: "Dammam, Saudi Arabia",
    bullets: [
      "Designed AI-powered data platforms and dashboards used by executive stakeholders.",
      "Built GenAI assistants (e.g., EnviroGPT) and automated ingestion/ontology pipelines.",
      "Led cross-functional teams delivering production-grade applications and DevOps/CD.",
    ],
    link: "#",
  },
  {
    role: "Software Engineer",
    company: "Palantir Solutions (projects)",
    period: "2021 — 2023",
    location: "Saudi Arabia",
    bullets: [
      "Implemented Foundry pipelines, data models, and operational apps for analytics at scale.",
      "Partnered with domain teams to translate requirements into working software.",
    ],
    link: "#",
  },
];

const FEATURED_PROJECTS = [
  {
    title: "EnviroGPT",
    description:
      "A domain-tuned assistant for environmental operations: compliance insights, diesel generator maps, incidents & inspections—all wired to an ontology.",
    tags: ["GenAI", "RAG", "Foundry", "Maps"],
    links: [
      { href: "#", label: "Case Study" },
      { href: "#", label: "GitHub" },
    ],
  },
  {
    title: "Presentation Parsing Pipeline",
    description:
      "End-to-end pipeline that extracts content from PowerPoints with OCR fallback (pytesseract), slide QA, and logging—productionized in Foundry.",
    tags: ["Python", "OCR", "Pillow", "Tesseract", "Foundry"],
    links: [{ href: "#", label: "Write-up" }],
  },
  {
    title: "NEV Environmental Dashboards",
    description:
      "Interactive dashboards: projects by status, compliance metrics, complaints & exceedances, regional breakdowns, and diesel generator locations.",
    tags: ["React", "Data Viz", "Maps"],
    links: [{ href: "#", label: "Demo" }],
  },
];

const POSTS = [
  {
    title: "RAG beyond the hype: production guardrails",
    date: "2025-07-28",
    summary: "A playbook for evaluation, retrieval quality, and observability when LLMs meet enterprise data.",
    href: "/blog/rag-guardrails",
  },
  {
    title: "From notebooks to platforms: hardening ML delivery",
    date: "2025-05-14",
    summary: "Pipelines, CI/CD, and model governance without slowing teams down.",
    href: "/blog/hardening-ml-delivery",
  },
];

const TESTIMONIALS = [
  { quote: "Delivers fast, thinks system-wide, and sweats the details—rare blend of architect and builder.", author: "Engineering Lead, NEOM" },
  { quote: "Turned ambiguous requirements into a production app our execs actually use.", author: "Program Manager" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) controls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } });
  }, [isInView, controls]);
  return { ref, controls };
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, controls } = useReveal();
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={controls}
      className={`mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.section>
  );
}

const Header = () => {
  const onClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="font-semibold tracking-tight">
          Hisham Alhussain
        </a>

        {/* Desktop nav + Theme toggle */}
        <nav className="hidden items-center gap-4 md:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => onClick(n.id)}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {n.label}
            </button>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile: toggle + Contact shortcut */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <a href="#contact" className="text-sm underline underline-offset-4">
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/40" />
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="secondary" className="rounded-2xl px-3 py-1">
          Open to opportunities
        </Badge>
        <span className="flex items-center gap-1">
          <MapPin className="h-4 w-4" /> Dammam, KSA
        </span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Hi, I’m <span className="underline decoration-primary/30 underline-offset-8">Hisham</span>.
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        Senior Solutions Architect building AI/ML and data products—GenAI assistants, scalable pipelines, and polished UIs. I love turning messy real-world data into useful, beautiful software.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          <a href="#projects">
            See my work <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="transition-opacity hover:opacity-80"
              target="_blank"
              rel="noreferrer"
            >
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 pt-4">
        {SKILLS.map((s) => (
          <Badge key={s} variant="outline" className="rounded-lg">
            {s}
          </Badge>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <Section id="about" className="py-16">
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <h2 className="mb-4 text-2xl font-semibold">About Me</h2>
        <p className="mb-4 text-muted-foreground">
          I’m a computer science graduate focused on state-of-the-art AI, ML, and LLM applications. I design systems end-to-end: ingestion, modeling, retrieval, UX, and ops. Recently I’ve been building domain-tuned assistants and data platforms for the NEOM ecosystem.
        </p>
        <p className="text-muted-foreground">
          Outside work, I write about practical AI patterns and experiment with multi-agent workflows for data teams.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Highlights</CardTitle>
          <CardDescription>Quick facts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4" /> Palantir Foundry certified
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4" /> GenAI + RAG in production
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> 7+ years building software
          </div>
        </CardContent>
      </Card>
    </div>
  </Section>
);

const Experience = () => (
  <Section id="experience" className="py-16">
    <h2 className="mb-8 text-2xl font-semibold">Experience</h2>
    <div className="grid gap-6">
      {EXPERIENCE.map((job) => (
        <Card key={job.role + job.company} className="border-muted/60">
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center justify-between gap-2">
              <span>
                {job.role} · <span className="text-primary/90">{job.company}</span>
              </span>
              <span className="text-sm font-normal text-muted-foreground">{job.period}</span>
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-xs">
              <MapPin className="h-4 w-4" /> {job.location}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="ml-5 list-disc space-y-2 text-muted-foreground">
              {job.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            {job.link && (
              <div className="pt-4">
                <a
                  href={job.link}
                  className="inline-flex items-center text-sm text-primary underline underline-offset-4 hover:no-underline"
                >
                  Details <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </Section>
);

function GitHubRepos({ username = "hisham8383" }: { username?: string }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
          signal: controller.signal,
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
        const data = (await res.json()) as Repo[];

        const filtered = data
          .filter((r) => !r.fork)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
          )
          .slice(0, 6);

        setRepos(filtered);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to load repositories.";
        setError(message);
      }
    })();
    return () => controller.abort();
  }, [username]);

  if (error) {
    return (
      <Card className="border-muted/60">
        <CardHeader>
          <CardTitle>Open Source Highlights</CardTitle>
          <CardDescription>Couldn’t load repos right now. Try refreshing.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!repos.length) {
    return (
      <Card className="border-muted/60">
        <CardHeader>
          <CardTitle>Open Source Highlights</CardTitle>
          <CardDescription>Public repositories will appear here automatically.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {repos.map((r) => (
        <Card key={r.id} className="group border-muted/60 transition hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <a
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-primary/30 underline-offset-8 hover:no-underline"
              >
                {r.name}
              </a>
              <GitBranch className="h-5 w-5 opacity-60" />
            </CardTitle>
            <CardDescription>{r.description || "No description provided."}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4" />
              {r.stargazers_count}
            </span>
            <span>{r.language || ""}</span>
            <a
              className="inline-flex items-center gap-1 underline underline-offset-4 hover:no-underline"
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
            >
              Repo <ExternalLink className="h-4 w-4" />
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const Projects = () => (
  <Section id="projects" className="py-16">
    <h2 className="mb-8 text-2xl font-semibold">Selected Projects</h2>
    <div className="grid gap-6 sm:grid-cols-2">
      {FEATURED_PROJECTS.map((p) => (
        <Card key={p.title} className="group border-muted/60 transition hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {p.title}
              <PenTool className="h-5 w-5 opacity-60" />
            </CardTitle>
            <CardDescription>{p.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <Badge key={t} variant="outline" className="rounded-lg">
                  {t}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {p.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="inline-flex items-center text-sm text-primary underline underline-offset-4 hover:no-underline"
                >
                  {l.label} <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <h3 className="mt-12 mb-4 text-xl font-semibold">Open Source Highlights</h3>
    <GitHubRepos username="hisham8383" />
  </Section>
);

const Blog = () => (
  <Section id="blog" className="py-16">
    <h2 className="mb-8 text-2xl font-semibold">Writing</h2>
    <div className="grid gap-6 sm:grid-cols-2">
      {POSTS.map((post) => (
        <Card key={post.title} className="border-muted/60">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>{post.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">{post.summary}</p>
            <Button asChild variant="secondary" size="sm">
              <a href={post.href}>Read</a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </Section>
);

const Testimonials = () => (
  <Section id="testimonials" className="py-16">
    <h2 className="mb-8 text-2xl font-semibold">Testimonials</h2>
    <div className="grid gap-6 sm:grid-cols-2">
      {TESTIMONIALS.map((t, i) => (
        <Card key={i} className="border-muted/60">
          <CardContent className="pt-6">
            <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
            <div className="pt-4 text-sm text-muted-foreground">{t.author}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  </Section>
);

const Contact = () => (
  <Section id="contact" className="py-20">
    <div className="rounded-2xl border bg-card p-10 shadow-sm">
      <h2 className="mb-4 text-2xl font-semibold">Get in touch</h2>
      <p className="mb-6 max-w-2xl text-muted-foreground">
        I’m open to discussing roles, consulting, or interesting side projects. The fastest way to reach me is by email.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Button asChild size="lg">
          <a href="mailto:hisham83835@gmail.com">
            <Mail className="mr-2 h-5 w-5" /> Email me
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="https://www.linkedin.com/in/hishamalhussain/" target="_blank" rel="noreferrer">
            <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
          </a>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <a href="https://github.com/hisham8383" target="_blank" rel="noreferrer">
            <Github className="mr-2 h-5 w-5" /> GitHub
          </a>
        </Button>
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="border-t py-10 text-center text-sm text-muted-foreground">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <p>© {new Date().getFullYear()} Hisham Alhussain. Built with Next.js & Tailwind.</p>
    </div>
  </footer>
);

export default function Page() {
  // Minimal active section highlight
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = document.querySelector(`nav button[aria-current]`);
          if (entry.isIntersecting) {
            if (link) link.removeAttribute("aria-current");
            const btn = Array.from(document.querySelectorAll("nav button")).find(
              (b) =>
                (b as HTMLButtonElement).textContent ===
                NAV.find((n) => n.id === (entry.target as HTMLElement).id)?.label
            );
            if (btn) btn.setAttribute("aria-current", "page");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Hisham Alhussain",
      url: "https://your-domain.com", // TODO: update to your real domain
      sameAs: [
        "https://github.com/hisham8383",
        "https://www.linkedin.com/in/hishamalhussain/",
        "mailto:hisham83835@gmail.com",
      ],
      worksFor: { "@type": "Organization", name: "NEOM / TONOMUS" },
      jobTitle: "Senior Solutions Architect",
    }),
    []
  );

  return (
    <>
      <Script id="ld-person" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <main className="min-h-screen bg-background text-foreground antialiased">
        <Header />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Blog />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

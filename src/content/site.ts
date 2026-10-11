// Site-wide profile content. Edit here; components read from this file.

export const SITE_URL = "https://www.hisham-alhussain.dev";
export const EMAIL = "hisham83835@gmail.com";

// Set to "/Hisham-Alhussain-CV.pdf" once the file is in public/. CV buttons stay hidden while null.
export const CV_URL: string | null = null;

export const PROFILE = {
  name: "Hisham Alhussain",
  title: "Senior Solutions Architect",
  focus: "AI agents · LLM systems · Data platforms",
  location: "Dammam, Saudi Arabia",
  headshot: "/headshot.jpg",
  tagline:
    "I build AI agents and data platforms that hold up in production, from enterprise compliance at NEOM to front-desk agents for small businesses on WhatsApp.",
  availability: "Open to senior AI roles & select consulting",
};

export const SOCIALS = [
  { href: "https://github.com/hisham8383", label: "GitHub" },
  { href: "https://www.linkedin.com/in/hishamalhussain/", label: "LinkedIn" },
  { href: `mailto:${EMAIL}`, label: "Email" },
] as const;

export const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const;

// Public, verifiable numbers only (from the open-source WhatsApp agent's eval results).
export const STATS = [
  { value: "138/138", label: "eval cases passed before every release" },
  { value: "~$0.003", label: "LLM cost per customer conversation" },
  { value: "2.8s", label: "median agent reply time" },
  { value: "7+ yrs", label: "shipping production software" },
];

export const ABOUT = [
  "I design systems end to end: ingestion, data modeling, retrieval, agents, UX, and the delivery platform underneath. Most of my work sits where messy real-world data meets people who need answers from it quickly.",
  "At NEOM / TONOMUS I lead architecture for AI and data platforms used in environmental compliance, procurement and executive reporting. On the side I build bilingual (Arabic/English) WhatsApp agents for clinics, salons and law firms, and I write a monthly post about what I'm learning.",
];

export const SKILLS = [
  "Python",
  "TypeScript",
  "LLM agents",
  "RAG",
  "Evals",
  "Claude API",
  "FastAPI",
  "PostgreSQL",
  "Palantir Foundry",
  "Next.js",
  "Docker",
  "Kubernetes",
  "CI/CD & IaC",
];

// Recruiter "quick view": the whole profile on one screen.
export const QUICK_FACTS = [
  "Lead architect for agent-based AI and data platforms at NEOM / TONOMUS, reused by other teams as reference architectures.",
  "Built and shipped an eval-gated bilingual WhatsApp agent: 138/138 eval runs, ~$0.003 per conversation.",
  "Hands-on across the stack: pipelines and ontologies, LLM agents and RAG, CI/CD, IaC and Kubernetes.",
];

export const CREDENTIALS = ["Palantir Foundry certified", "Computer Science graduate"];

export type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  location?: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export const EXPERIENCE: TimelineEntry[] = [
  {
    period: "2026 — Present",
    role: "Independent AI Engineer",
    org: "Independent · AI agents for small businesses",
    summary:
      "Design, build and run WhatsApp front-desk agents for clinics, salons and law firms in Saudi Arabia.",
    highlights: [
      "Bilingual agent tuned for Gulf Arabic: FAQs, bookings, reminders, lead follow-ups and human handoff.",
      "Eval-gated releases: 46 scripted conversations × 3 runs, 138/138 passing at ~$0.003 per conversation.",
      "Exactly-once reminder scheduler on Postgres, proven with concurrent-scheduler smoke tests.",
    ],
    tags: ["Claude API", "FastAPI", "PostgreSQL", "WhatsApp Cloud API"],
  },
  {
    period: "2023 — Present",
    role: "Senior Solutions Architect",
    org: "NEOM / TONOMUS",
    location: "Dammam, Saudi Arabia",
    summary:
      "Lead architect and hands-on builder for AI and data platforms across environmental compliance, procurement and executive reporting.",
    highlights: [
      "Designed EnviroGPT, an agent-based environmental intelligence platform later adopted as a reference architecture by other teams.",
      "Built Tender360, turning unstructured tender documents into decision-ready summaries for procurement committees.",
      "Replaced manual Excel consolidation for monthly compliance reporting with validated, automated pipelines and a single source of truth.",
    ],
    tags: ["GenAI", "Agents", "Palantir Foundry", "Ontology", "Dashboards"],
  },
  {
    period: "2021 — 2023",
    role: "Software Engineer",
    org: "Palantir Foundry projects",
    location: "Saudi Arabia",
    summary:
      "Built data pipelines, ontologies and operational apps on Palantir Foundry for analytics at scale.",
    highlights: [
      "Implemented Foundry pipelines, data models and operational applications for domain teams.",
      "Partnered with domain experts to turn ambiguous requirements into software people used daily.",
    ],
    tags: ["Foundry", "Python", "Data pipelines", "Operational apps"],
  },
];

// What I'm focused on right now. Update monthly so the site never looks stale.
export const NOW = {
  updated: "October 2026",
  items: [
    { label: "Building", text: "WhatsApp front-desk agents for clinics, salons and law firms." },
    { label: "Writing", text: "A monthly post on agents, evals and LLM engineering." },
    { label: "Exploring", text: "Voice agents that handle Gulf Arabic on real phone lines." },
  ],
};

export type Testimonial = { quote: string; name: string; title: string };

// Only named quotes, used with permission. The section is hidden while this is empty.
export const TESTIMONIALS: Testimonial[] = [];

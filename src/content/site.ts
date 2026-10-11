// Site-wide profile content. Edit here; components read from this file.

export const SITE_URL = "https://www.hisham-alhussain.dev";
export const EMAIL = "hisham83835@gmail.com";

// CV buttons render only when this is set.
export const CV_URL: string | null = "/Hisham-Alhussain-CV.pdf";

export const PROFILE = {
  name: "Hisham Alhussain",
  title: "Senior Software, Cloud & AI Engineer",
  focus: "AI agents · LLM systems · Data platforms",
  location: "Dammam, Saudi Arabia",
  headshot: "/headshot.jpg",
  tagline:
    "I build AI agents and data platforms that hold up in production, from compliance systems used by 800 contractors at NEOM to front-desk agents for small businesses on WhatsApp.",
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
  { id: "approach", label: "Approach" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const;

// Headline proof. Sources: CV (ESRA reporting, onboarding) and the public WhatsApp agent eval results.
export const STATS = [
  { value: "4 wks → 1 hr", label: "monthly compliance reporting with ESRA at NEOM" },
  { value: "800", label: "contractors adopted it as the standard procedure" },
  { value: "138/138", label: "eval runs passed before every agent release" },
  { value: "6 → 2 wks", label: "developer onboarding after automation" },
];

export const ABOUT = [
  "I design systems end to end: ingestion, data modeling, retrieval, agents, UX, and the cloud platform underneath. Most of my work sits where messy real-world data meets people who need answers from it quickly.",
  "I spent five years at NEOM, growing from DevOps to Senior Solution Architect and advising the Deputy CEO's Office on AI and data. Before that I built software at IBM in the US, and studied computer science at UMass Amherst and KAUST. Today I build bilingual (Arabic/English) WhatsApp agents for small businesses, and I write a monthly post about what I'm learning.",
];

export const SKILLS = [
  "Python",
  "TypeScript",
  "LLM agents",
  "RAG",
  "Evals",
  "Palantir Foundry",
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "GCP",
  "OCI",
  "Kubernetes",
  "OpenShift",
  "Terraform",
  "ArgoCD",
];

// Recruiter "quick view": the whole profile on one screen.
export const QUICK_FACTS = [
  "Built ESRA at NEOM: contractor compliance reporting cut from ~4 weeks to ~1 hour, adopted by all 800 contractors.",
  "Built EnviroGPT, a RAG chatbot over NEOM's environmental documentation for the environment teams.",
  "Advised NEOM's Deputy CEO's Office; led delivery from requirements through adoption across AI, data and DevOps.",
  "Shipped an eval-gated bilingual WhatsApp agent: 138/138 eval runs at ~$0.003 per conversation.",
  "7+ years across IBM, NEOM and EPAM. M.S. Computer Science (KAUST), B.S. (UMass Amherst).",
];

export const CREDENTIALS = [
  "M.S. Computer Science, KAUST",
  "B.S. Computer Science, UMass Amherst",
  "Palantir Foundry Data Engineer",
  "Palantir Foundry App Developer",
];

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
    org: "AI agents for small businesses",
    location: "Dammam, Saudi Arabia",
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
    period: "Jun 2026 — Sep 2026",
    role: "Senior Systems Engineer",
    org: "EPAM Systems",
    location: "Al Khobar, Saudi Arabia",
    summary:
      "Client-facing engineer on enterprise LLM agents: ran daily requirements sessions and turned them into technical solutions for the team.",
    highlights: [
      "Built an HR agent (Node.js/TypeScript, LLM + RAG) that answers policy questions, submits leave requests and generates certificates.",
      "Implemented Redis Streams as a durable event bus with consumer groups and lag monitoring, and exposed Prometheus metrics for analytics.",
      "Shipped a Speech-to-Text feature, debugging it on the client's network through to production on GCP and OpenShift via ArgoCD.",
      "Wrote Python connection tests early in the engagement that surfaced client-network issues before they could block deployment.",
    ],
    tags: ["LLM agents", "RAG", "Redis Streams", "PostgreSQL", "OpenShift", "ArgoCD"],
  },
  {
    period: "Jan 2024 — Jun 2026",
    role: "Senior Solution Architect",
    org: "NEOM",
    location: "Tabuk, Saudi Arabia",
    summary:
      "Trusted technical advisor to the Deputy CEO's Office: scoped AI and data solutions and presented designs and decision-intelligence tools to senior leadership.",
    highlights: [
      "Built ESRA, the app contractors use for monthly environmental submissions: reporting went from ~4 weeks to ~1 hour, adopted by all 800 contractors.",
      "Built EnviroGPT, a RAG chatbot that answers NEOM environment teams' questions from indexed environmental documentation.",
      "Built LLM and RAG solutions in Palantir Foundry and led design of an environmental data platform unifying multiple waste and compliance systems.",
      "Designed GCP networking and storage for enterprise data platforms and set DevOps and CI/CD standards across internal apps.",
    ],
    tags: ["GenAI", "RAG", "Palantir Foundry", "Ontology", "GCP"],
  },
  {
    period: "Jul 2021 — Dec 2023",
    role: "DevOps Specialist → Senior DevOps Specialist",
    org: "NEOM",
    location: "Tabuk, Saudi Arabia",
    summary:
      "Built the delivery and service platforms NEOM's internal teams ran on, and led a team of 10 consultants.",
    highlights: [
      "Delivered a centralized helpdesk platform that improved resolution times by 150%.",
      "Cut developer onboarding from 6 weeks to 2 and application publishing cycle times by 75%.",
      "Automated OCI provisioning, integrated CI/CD across teams, and ran licensing and compliance for 1,000+ users.",
    ],
    tags: ["CI/CD", "OCI", "Kubernetes", "Automation", "Team lead"],
  },
  {
    period: "2017 — 2019",
    role: "Software Developer",
    org: "IBM",
    location: "Austin, TX & Durham, NC, USA",
    summary:
      "Built enterprise reporting features and mobile apps, starting as an intern and returning full time.",
    highlights: [
      "Built React UI components and real-time analytics integrations for enterprise reporting.",
      "Automated compliance and security scans in IBM DevOps Insights, improving audit efficiency by 50%.",
      "As an intern, shipped IBM Connections mobile features in React Native and improved app performance by 50%.",
    ],
    tags: ["React", "React Native", "Analytics", "DevOps"],
  },
];

// "How I work": principles in my own voice, each backed by a verifiable result (CV / public repo).
export const PRINCIPLES = [
  {
    title: "Front-load the risk",
    text: "Under deadline pressure I go after the unknowns first, so surprises show up while there's still time to fix them.",
    proof: "At EPAM I wrote connection tests early in the engagement that surfaced client-network issues before they could block deployment.",
  },
  {
    title: "Quality is a release gate",
    text: "Testing isn't a phase at the end. If the checks don't pass, it doesn't ship, however close the deadline is.",
    proof: "My WhatsApp agent ships only when all 138 eval runs pass in Arabic and English, and its booking rules are enforced in code, not left to the prompt.",
  },
  {
    title: "Build for adoption, not the demo",
    text: "A system is done when people rely on it. I design with the end users from requirements through rollout.",
    proof: "ESRA became the standard reporting procedure for all 800 NEOM contractors and cut compliance reporting from ~4 weeks to ~1 hour.",
  },
  {
    title: "Make the next person faster",
    text: "Automation, documentation and clear standards compound. I leave teams quicker than I found them.",
    proof: "At NEOM I cut developer onboarding from 6 weeks to 2 and application publishing cycle times by 75%.",
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

// Only real quotes the person has approved for publication. The section is hidden while this is empty.
export const TESTIMONIALS: Testimonial[] = [];

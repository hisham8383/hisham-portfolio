// Selected work. Case-study bodies use the same markdown subset as blog posts
// (rendered by src/components/blog/post-body.tsx).

export type FlowStep = { title: string; detail: string };

export type Project = {
  slug: string;
  title: string;
  org: string;
  year?: string;
  role: string;
  /** One-line pitch shown on cards. */
  summary: string;
  // Required for case studies (projects with a body); optional for compact entries.
  problem?: string;
  built?: string;
  outcome?: string;
  metrics?: { value: string; label: string }[];
  tags: string[];
  /** Real external links only. Confidential work shows a label instead. */
  links?: { href: string; label: string }[];
  confidential?: boolean;
  /** Left-to-right architecture flow for the case-study diagram. */
  flow?: FlowStep[];
  qualities?: string[];
  /** Markdown body for /work/[slug]. Projects without one render as cards only. */
  body?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "whatsapp-ai-agent",
    title: "WhatsApp AI Front-Desk Agent",
    org: "Independent · clinics, salons, law firms",
    year: "2026",
    role: "Sole architect & engineer",
    summary:
      "A bilingual (Arabic/English) agent that runs a business's WhatsApp number like a front desk: answers, books, reminds, follows up, and hands off to staff.",
    problem:
      "Small businesses in the Gulf get most enquiries on WhatsApp, often late at night and in dialect. Missed replies mean missed bookings.",
    built:
      "A FastAPI + Postgres agent on the Claude API with code-enforced booking guardrails, an exactly-once reminder scheduler, a staff inbox and an eval gate on every release.",
    outcome:
      "Live-tested on a real WhatsApp Business number. Every release must pass 138/138 eval runs in both languages.",
    metrics: [
      { value: "138/138", label: "eval runs passed" },
      { value: "~$0.003", label: "per conversation" },
      { value: "2.8s", label: "median reply" },
      { value: "292", label: "unit & integration tests" },
    ],
    tags: ["Claude API", "Python", "FastAPI", "PostgreSQL", "Evals", "Arabic NLP"],
    links: [{ href: "https://github.com/hisham8383/whatsapp-ai-agent", label: "Source on GitHub" }],
    flow: [
      { title: "WhatsApp", detail: "Customer messages via Meta Cloud API" },
      { title: "Webhook API", detail: "HMAC check, dedupe, enqueue in ms" },
      { title: "Worker", detail: "Postgres job queue (SKIP LOCKED)" },
      { title: "Agent loop", detail: "Claude + booking & handoff tools" },
      { title: "Replies & reminders", detail: "24h-window guard, exactly-once sends" },
    ],
    qualities: ["Eval-gated", "Exactly-once", "PDPL-aware", "One Docker image"],
    body: `
## The problem

In Saudi Arabia and the Gulf, WhatsApp is how people contact a business. They expect an answer quickly, in their own dialect, often outside working hours. A small clinic or law firm can't staff that, so leads go cold and appointments slip.

I wanted an agent that could run the front desk end to end, and that a business owner could trust with real customers.

## What it does

- **Answers FAQs** from the business's knowledge base, mirroring the customer's language and register (formal Arabic when they use it, natural Gulf phrasing otherwise).
- **Books, reschedules and cancels** through a pluggable calendar (Postgres or Google Calendar), offering only slots that are really free as a WhatsApp list.
- **Confirms before acting.** Every change shows a code-written summary with Confirm / Change buttons.
- **Sends reminders** as approved templates with Confirm / Reschedule quick replies, and **follows up once** with leads who didn't book, respecting quiet hours and opt-outs.
- **Hands off to staff** when a customer is upset, asks for a person, or goes out of scope, with a web inbox for staff to reply and hand the chat back.

## Key engineering decisions

**Guardrails in code, not just the prompt.** Early evals caught the model saying "you're booked" before any booking existed. Instead of a longer prompt, a booking tool is now rejected unless the previous turn asked for confirmation, and all confirmation messages are written by code from the actual database result.

**Exactly-once messaging.** Reminders must never send twice, even with several workers or a crash mid-send. Each row is claimed with \`FOR UPDATE SKIP LOCKED\` and marked sent with the WhatsApp message id in the same transaction. A smoke test runs two schedulers concurrently against real Postgres, and it caught real double-sends before launch.

**Postgres as the queue.** One Docker image runs three roles (api, worker, scheduler). No Redis, no broker: fewer moving parts for a small business to pay for.

**Evaluation-driven development.** 46 scripted conversations (23 Arabic, 23 English) replay through the real production path. Grading is programmatic first (bookings, state, facts, language), with an LLM judge on a stronger model only for judgment calls like prompt-injection resistance and a Gulf-dialect rubric. Every case runs three times and releases are gated on 3/3.

**Cost control.** The knowledge base and an Arabic style guide sit in a cached system prompt, history is capped, and the cheapest model that passes the gate is used.

## Results

- **138/138** eval runs passing across both languages
- **~$0.003** per conversation and **2.8s** median reply time on the eval set
- **292** unit and integration tests, \`mypy --strict\` clean
- Live-tested end to end on a real WhatsApp Business number with approved templates
`,
  },
  {
    slug: "esra",
    title: "ESRA: Environmental & Social Responsibility Application",
    org: "NEOM",
    role: "Lead architect (40%) & hands-on builder (60%)",
    summary:
      "The application NEOM's contractors use to submit their monthly environmental sheets, feeding validated data straight into compliance dashboards.",
    problem:
      "Monthly compliance reporting depended on contractor spreadsheets, manual Excel consolidation and reconciliation, risking missed deadlines and inconsistent numbers in leadership meetings.",
    built:
      "Contractors submit monthly sheets through online forms into structured data objects, a standardized KPI model, validation pipelines and executive dashboards.",
    outcome:
      "Compliance reporting went from ~4 weeks to ~1 hour and became the standard procedure for all 800 contractors.",
    metrics: [
      { value: "4 wks → 1 hr", label: "monthly compliance reporting" },
      { value: "800", label: "contractors on the standard procedure" },
      { value: "~90%", label: "less analyst effort" },
      { value: "Template", label: "adopted by other sectors" },
    ],
    tags: ["Online forms", "Data pipelines", "Data quality", "KPI modeling", "Dashboards"],
    confidential: true,
    flow: [
      { title: "Contractor submissions", detail: "Monthly sheets via online forms" },
      { title: "Structured objects", detail: "Waste & environmental data" },
      { title: "Standard KPI model", detail: "One definition per metric" },
      { title: "Validation pipelines", detail: "Checks before anything is published" },
      { title: "Executive dashboards", detail: "Single source of truth" },
    ],
    qualities: ["Compliance-sensitive", "Validated", "Auditable", "Template for other sectors"],
    body: `
## The problem

Every month, NEOM's contractors report their environmental and waste data, and that reporting has a fixed deadline and a regulator behind it. It used to arrive as spreadsheets that analysts exported, consolidated and reconciled by hand in Excel. It took weeks, errors crept in, and different meetings sometimes saw different numbers.

## The approach

ESRA (Environmental & Social Responsibility Application) moved reporting from a people-driven process to a system-driven one:

- Contractors submit their monthly sheets through **online forms** that write straight into structured data objects.
- Those objects feed a **standardized environmental data model**, so every KPI has one definition across all submissions.
- **Automated pipelines** validate, transform and propagate the data, and validation checks stop bad data before it reaches leadership.
- The output is a set of **executive-ready dashboards** that serve as the authoritative view.

## My role

Architecture, end-to-end pipelines, KPI definition and standardization, and alignment with compliance and operations stakeholders so the system met regulatory expectations.

## Outcome

- Compliance reporting went from **~4 weeks to ~1 hour**
- Adopted as the **standard reporting procedure by all 800 contractors**
- Analyst effort dropped by **~90%**, with far fewer errors and inconsistencies
- Leadership trusted the numbers, and the process became auditable
- It became a dependency for other dashboards and a **template adopted by other sectors**

*Details are kept high-level because this is internal NEOM work.*
`,
  },
  {
    slug: "envirogpt",
    title: "EnviroGPT",
    org: "NEOM",
    year: "2024–2026",
    role: "Architect & builder",
    summary:
      "A chatbot for NEOM's environment teams that answers questions from the organization's environmental documentation, using retrieval-augmented generation.",
    problem:
      "NEOM's environment teams relied on a large body of environmental documentation, and finding the right answer meant searching through files by hand.",
    built:
      "A RAG chatbot on Palantir Foundry: the relevant environmental documents are indexed, and each answer is generated from the passages retrieved for the question.",
    outcome:
      "Environment teams get answers grounded in NEOM's own documentation directly in chat, instead of digging through files.",
    tags: ["GenAI", "RAG", "Chatbot", "Palantir Foundry"],
    confidential: true,
    flow: [
      { title: "Environmental docs", detail: "Relevant documentation collected" },
      { title: "Indexing", detail: "Documents indexed for search" },
      { title: "Retrieval", detail: "Most relevant passages per question" },
      { title: "LLM answer", detail: "Response generated from those passages" },
      { title: "Chat", detail: "Used by NEOM environment teams" },
    ],
    qualities: ["Grounded in NEOM documents", "Built on Foundry"],
    body: `
## The problem

NEOM's environment teams work with a large body of environmental documentation. Answering a question meant knowing which file to open and then searching through it by hand.

## What I built

EnviroGPT is a chatbot that answers those questions from the documentation itself:

- **Indexing.** The relevant environmental documents are indexed so they can be searched.
- **Retrieval.** For each question, the most relevant passages are pulled from the index.
- **Generation.** An LLM writes the answer in chat from those passages, so responses are grounded in NEOM's own documents rather than general knowledge.

It was built on Palantir Foundry alongside NEOM's other environmental data work.

## Who used it

NEOM's environment teams, as a faster way to get answers from their documentation.

*Details are kept high-level because this is internal NEOM work.*
`,
  },
  {
    slug: "tender360",
    title: "Tender360",
    org: "NEOM",
    role: "Lead architect (30%) & hands-on builder (70%)",
    summary:
      "Automated tender intelligence: unstructured bid documents become searchable data and executive-ready summaries of key points, risks and comparisons.",
    problem:
      "Procurement relied on manual review of PDFs and email threads, causing missed deadlines and poor visibility during busy tender cycles.",
    built:
      "An event-triggered document pipeline with chunking, embeddings and semantic search, plus an AI summarization layer feeding reports and dashboards.",
    outcome:
      "Tender processing went from weeks to hours with ~90% less manual effort. Other teams reused it as the reference workflow for document automation.",
    metrics: [
      { value: "Weeks → hours", label: "tender processing time" },
      { value: "~90%", label: "less manual effort" },
    ],
    tags: ["RAG", "Embeddings", "Semantic search", "LLM summarization", "Dashboards"],
    confidential: true,
    flow: [
      { title: "Tender documents", detail: "Uploads & central repositories" },
      { title: "Auto ingestion", detail: "Triggered as new files land" },
      { title: "Semantic processing", detail: "Chunking, embeddings, search" },
      { title: "AI summaries", detail: "Key points, risks, bid comparison" },
      { title: "Decisions", detail: "Reports & dashboards for committees" },
    ],
    qualities: ["Event-driven", "Auditable", "Repeatable each cycle"],
    body: `
## The problem

Tender evaluation is time-sensitive and business-critical. Before Tender360, teams reviewed bid documents by hand, worked out of PDFs and inboxes, and pieced together status from scattered files. During busy procurement periods that meant missed deadlines and little visibility for leadership.

## The approach

The flow is simple to say and took care to get right: **tender documents → automated ingestion → structured data → insights**.

- **Ingestion** is triggered automatically as documents and presentations land in uploads or central repositories.
- **Semantic processing** chunks and embeds the content and indexes it for semantic search, so it's queryable at scale instead of locked in PDFs.
- **AI summarization** produces executive-ready summaries that surface key points, risks and side-by-side comparisons across bids.
- **Delivery** happens through reports and dashboards that committees and leadership already use.

## My role

Mostly hands-on: I designed and built the ingestion pipeline, extraction and semantic indexing, and the workflow automation, while aligning with procurement teams, tender committees and leadership.

## Outcome

- Tender processing went from **weeks to hours**
- Manual effort dropped by **~90%**, and evaluations became more accurate and consistent
- It fed downstream analytics and became the **reference workflow** other teams reused for document-driven automation

*Details are kept high-level because this is internal NEOM work.*
`,
  },
  {
    slug: "delivery-platform",
    title: "Delivery Platform: CI/CD, IaC & Kubernetes",
    org: "NEOM",
    year: "2021–2023",
    role: "DevOps Specialist → Senior DevOps Specialist",
    summary:
      "Standardized pipelines, infrastructure as code and Kubernetes so teams ship on a predictable cadence with governance built in.",
    problem:
      "Manual deployments, drifting environments and long release cycles slowed product teams and raised operational risk.",
    built:
      "CI/CD with tests, image builds, security scanning and gated infra changes; declarative IaC for every environment; a shared Kubernetes runtime with central ingress, secrets, RBAC and observability.",
    outcome:
      "Releases went from every ~6 months to every 2 weeks, onboarding from 6 weeks to 2, publishing cycle times dropped 75%, and helpdesk resolution times improved 150%.",
    tags: ["CI/CD", "Infrastructure as Code", "Kubernetes", "Observability", "RBAC"],
    confidential: true,
  },
  {
    slug: "nev-dashboards",
    title: "NEV Environmental Dashboards",
    org: "NEOM",
    role: "Builder",
    summary:
      "Interactive dashboards covering projects by status, compliance metrics, complaints and exceedances, regional breakdowns, and diesel generator locations.",
    tags: ["React", "Data visualization", "Maps"],
    confidential: true,
  },
  {
    slug: "presentation-parsing",
    title: "Presentation Parsing Pipeline",
    org: "NEOM",
    role: "Builder",
    summary:
      "End-to-end pipeline that extracts content from PowerPoint files, with OCR fallback, slide quality checks, and logging, productionized in Foundry.",
    tags: ["Python", "pytesseract", "Tesseract", "Pillow", "Palantir Foundry"],
    confidential: true,
  },
  {
    slug: "capex-estimator",
    title: "CAPEX Estimator for the Line FM",
    org: "Palantir Foundry",
    role: "Builder",
    summary: "Foundry application for estimating capital expenditure (CAPEX) for the Line FM.",
    tags: ["Palantir Foundry"],
    confidential: true,
  },
  {
    slug: "pipeline-geomap",
    title: "Oil & Gas Pipeline Geomap",
    org: "Confidential energy-sector client",
    role: "Builder",
    summary:
      "Geospatial application mapping pipeline routes and stations, with operational dashboards. Client and project details withheld due to confidentiality.",
    tags: ["Palantir Foundry", "Maps", "Dashboards"],
    confidential: true,
  },
  {
    slug: "hr-agent",
    title: "Speech-to-Text for an Enterprise HR Agent",
    org: "EPAM Systems (client project)",
    year: "2026",
    role: "DevOps lead & STT feature developer",
    summary:
      "Developed the Speech-to-Text feature for a client's HR agent and owned its deployment to production on GCP and OpenShift.",
    tags: ["Speech-to-Text", "DevOps", "OpenShift", "ArgoCD"],
    confidential: true,
  },
];

export const CASE_STUDIES = PROJECTS.filter((p) => p.body);

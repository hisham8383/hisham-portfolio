export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;   // YYYY-MM-DD
  summary: string;
};

// Newest first. Post bodies live in ./post-bodies.ts so client components
// that only need the list (e.g. the home page) don't ship every article.
export const posts: BlogPostMeta[] = [
  {
    slug: "a-year-of-agentic-coding",
    title: "A year of coding with agents: what actually changed",
    date: "2026-10-01",
    summary:
      "Twelve months ago I was skeptical. Here's how my day-to-day workflow shifted, and what I still refuse to hand over.",
  },
  {
    slug: "shipping-agents-for-small-businesses",
    title: "Lessons from shipping AI agents to small businesses",
    date: "2026-09-01",
    summary:
      "Enterprise AI gets the headlines, but a clinic or a law firm on WhatsApp taught me more about reliability than any big project.",
  },
  {
    slug: "observability-for-agents",
    title: "You can't fix what you can't see: observability for agents",
    date: "2026-08-01",
    summary:
      "Traces, not logs. How I instrument agent runs so that \"why did it do that?\" takes minutes instead of an afternoon.",
  },
  {
    slug: "voice-agents-arabic",
    title: "Voice agents are finally good enough. Are they good enough in Arabic?",
    date: "2026-07-01",
    summary:
      "Realtime speech models changed what's possible on a phone line. Gulf dialect, code-switching, and latency are where it gets interesting.",
  },
  {
    slug: "one-agent-or-many",
    title: "One agent or many? My rule of thumb for multi-agent systems",
    date: "2026-06-01",
    summary:
      "Multi-agent diagrams look great on slides. Most of the time a single agent with good tools wins. Here's when it doesn't.",
  },
  {
    slug: "agent-security-prompt-injection",
    title: "Your agent will read something malicious. Plan for it.",
    date: "2026-05-01",
    summary:
      "Prompt injection isn't a bug you patch, it's a property of the system. How I scope tools and permissions so it can't do real damage.",
  },
  {
    slug: "small-models-big-savings",
    title: "Small models, big savings: routing for cost without losing quality",
    date: "2026-04-01",
    summary:
      "Not every request needs a frontier model. A practical look at routing, caching, and measuring cost per resolved task.",
  },
  {
    slug: "evals-as-ci",
    title: "Evals as CI: no green, no deploy",
    date: "2026-03-01",
    summary:
      "I stopped treating evals as a research exercise and started treating them like unit tests. It changed how fast I can ship.",
  },
  {
    slug: "building-bilingual-assistants",
    title: "Building Arabic-first assistants (not English ones with a translator bolted on)",
    date: "2026-02-01",
    summary:
      "Dialects, code-switching, RTL quirks, and tokenizer costs: what I've learned building assistants for Arabic-speaking users.",
  },
  {
    slug: "2025-the-year-agents-got-real",
    title: "2025: the year agents got real (and what I'm watching in 2026)",
    date: "2026-01-01",
    summary:
      "MCP everywhere, coding agents in every editor, and models that can work for hours. A look back, and a few predictions I'll probably regret.",
  },
  {
    slug: "picking-a-model-in-a-crowded-month",
    title: "Three frontier models in two weeks. How do you even choose?",
    date: "2025-12-01",
    summary:
      "GPT-5.1, Gemini 3, and Claude Opus 4.5 all landed in November. Benchmarks won't tell you which one fits your work. Your own evals will.",
  },
  {
    slug: "agent-builders-skills-agentkit",
    title: "AgentKit, Skills, and the agent platform rush",
    date: "2025-11-01",
    summary:
      "October was a busy month for agent tooling. What I tried, what stuck, and why I still reach for code over canvases.",
  },
  {
    slug: "agents-that-finish-the-job",
    title: "Building agents that actually finish the job",
    date: "2025-10-01",
    summary:
      "Models can now work on a task for hours. The hard part has moved to the harness: loops, verification, and knowing when to stop.",
  },
  {
    slug: "gpt-5-and-open-weights",
    title: "GPT-5 and gpt-oss in the same week: rethinking build vs. host",
    date: "2025-09-01",
    summary:
      "A frontier model and serious open-weight models arrived days apart. For teams with data-residency rules, that changes the conversation.",
  },
  {
    slug: "context-engineering",
    title: "Context engineering is the real job now",
    date: "2025-08-01",
    summary:
      "Prompt engineering was never really about clever wording. It's about deciding what the model gets to see, and that has a name now.",
  },
  {
    slug: "rag-guardrails",
    title: "RAG beyond the hype: production guardrails",
    date: "2025-07-01",
    summary:
      "Million-token context windows didn't kill RAG. Here's the playbook I use for retrieval quality, evals, and fallbacks on enterprise data.",
  },
  {
    slug: "mcp-tool-integrations",
    title: "Why I stopped writing custom tool integrations (hello, MCP)",
    date: "2025-06-01",
    summary:
      "OpenAI adopting MCP was the moment it stopped being one vendor's idea. What the protocol gets right, and where it still hurts.",
  },
  {
    slug: "hardening-ml-delivery",
    title: "From notebooks to platforms: hardening ML delivery",
    date: "2025-05-01",
    summary:
      "GPT-4.1, o3, and Llama 4 all shipped in April. If swapping a model scares your team, your delivery pipeline is the problem.",
  },
];

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

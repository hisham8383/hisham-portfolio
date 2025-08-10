export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;   // YYYY-MM-DD
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
    summary:
      "Pipelines, CI/CD, and model governance without slowing teams down.",
  },
];

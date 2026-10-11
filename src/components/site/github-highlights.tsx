import { ArrowUpRight, Star } from "lucide-react";

const USERNAME = "hisham8383";

// Curated public repos, in display order. Descriptions are a fallback if the API is unavailable.
const REPOS = [
  { name: "whatsapp-ai-agent", description: "Bilingual WhatsApp AI agent for small businesses.", language: "Python" },
  { name: "auto-exam-grader-2016", description: "OCR/OMR exam grading pipeline with a rubric engine.", language: "Python" },
  { name: "marine-buoy-sim", description: "IoT marine buoy network simulator with a Flask dashboard.", language: "Python" },
  { name: "seashell-shop", description: "Bilingual (EN/AR RTL) storefront for a seashell boutique.", language: "HTML" },
];

type RepoData = { name: string; description: string; language: string; stars: number; url: string };

async function loadRepos(): Promise<RepoData[]> {
  return Promise.all(
    REPOS.map(async (r) => {
      const fallback = { ...r, stars: 0, url: `https://github.com/${USERNAME}/${r.name}` };
      try {
        const res = await fetch(`https://api.github.com/repos/${USERNAME}/${r.name}`, {
          headers: { Accept: "application/vnd.github+json" },
          next: { revalidate: 86400 },
        });
        if (!res.ok) return fallback;
        const d = await res.json();
        return {
          name: r.name,
          description: d.description || r.description,
          language: d.language || r.language,
          stars: d.stargazers_count ?? 0,
          url: d.html_url || fallback.url,
        };
      } catch {
        return fallback;
      }
    })
  );
}

/** Server component: fetched at build time and revalidated daily, so visitors never see a loading or error state. */
export async function GitHubHighlights() {
  const repos = await loadRepos();
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {repos.map((r) => (
        <li key={r.name}>
          <a
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col rounded-xl border p-4 transition hover:border-primary/40 hover:bg-card"
          >
            <span className="flex items-center justify-between gap-2 font-mono text-sm font-semibold">
              {r.name}
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </span>
            <span className="mt-1 flex-1 text-sm text-muted-foreground line-clamp-2">{r.description}</span>
            <span className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span>{r.language}</span>
              {r.stars > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" /> {r.stars}
                </span>
              )}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

import { postBodies } from "./post-bodies";

// Server-only: pulls in every post body. Don't import from client components.
export function readingMinutes(slug: string): number {
  const words = (postBodies[slug] ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

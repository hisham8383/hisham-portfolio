import type { FlowStep } from "@/content/projects";

/**
 * Left-to-right architecture flow. Stacks vertically on small screens.
 * Pure HTML/CSS so it follows the theme tokens in light and dark mode.
 */
export function FlowDiagram({
  steps,
  qualities,
  caption,
}: {
  steps: FlowStep[];
  qualities?: string[];
  caption?: string;
}) {
  return (
    <figure className="rounded-2xl border bg-card/60 p-5 sm:p-6">
      <ol
        className="grid gap-3 md:gap-0"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="relative col-span-full flex md:col-span-1 md:flex-col md:items-stretch"
          >
            <div className="flex flex-1 flex-col rounded-xl border border-primary/25 bg-background/70 p-3 md:mx-2">
              <span className="font-mono text-[10px] font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-1 text-sm font-semibold leading-tight">{s.title}</span>
              <span className="mt-1 text-xs leading-snug text-muted-foreground">{s.detail}</span>
            </div>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute -bottom-3 left-6 text-primary/70 md:-right-1.5 md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2"
              >
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      {qualities && qualities.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2 border-t pt-4">
          {qualities.map((q) => (
            <li key={q} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {q}
            </li>
          ))}
        </ul>
      )}
      {caption && <figcaption className="mt-4 text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

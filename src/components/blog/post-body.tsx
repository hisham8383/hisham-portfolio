import React from "react";

// Minimal renderer for the markdown subset used in src/content/post-bodies.ts.
// Tailwind's typography plugin isn't installed, so styles are explicit here.

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

function renderInline(text: string): React.ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">{part.slice(1, -1)}</code>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const external = link[2].startsWith("http");
      return (
        <a
          key={i}
          href={link[2]}
          className="text-primary underline underline-offset-4 hover:no-underline"
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

export function PostBody({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/);

  return (
    <div className="space-y-5 text-base leading-7 text-foreground/90">
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines[0].startsWith("## ")) {
          return (
            <h2 key={i} className="pt-4 text-xl font-semibold text-foreground">
              {renderInline(lines[0].slice(3))}
            </h2>
          );
        }
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="ml-6 list-disc space-y-2 marker:text-primary/70">
              {lines.map((l, j) => <li key={j}>{renderInline(l.slice(2))}</li>)}
            </ul>
          );
        }
        if (lines.every((l) => l.startsWith("> "))) {
          return (
            <blockquote key={i} className="border-l-2 border-primary/50 pl-4 italic text-muted-foreground">
              {renderInline(lines.map((l) => l.slice(2)).join(" "))}
            </blockquote>
          );
        }
        return <p key={i}>{renderInline(lines.join(" "))}</p>;
      })}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/content/site";

/** Tracks which section is in view and returns its id. */
export function useActiveSection(): string {
  const [active, setActive] = useState<string>(NAV[0].id);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

/** Desktop rail navigation: the active item's line grows and the label brightens. */
export function SectionNav() {
  const active = useActiveSection();
  return (
    <nav aria-label="Sections" className="hidden lg:block">
      <ul className="space-y-1">
        {NAV.map((n) => {
          const isActive = active === n.id;
          return (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={isActive ? "location" : undefined}
                className="group flex items-center gap-4 py-2 text-xs font-semibold uppercase tracking-widest"
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    isActive
                      ? "w-16 bg-foreground"
                      : "w-8 bg-muted-foreground/50 group-hover:w-16 group-hover:bg-foreground"
                  }`}
                />
                <span
                  className={
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  }
                >
                  {n.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

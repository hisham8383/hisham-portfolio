"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV, PROFILE } from "@/content/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { QuickView } from "./quick-view";

/** Top bar with a slide-down menu, shown below the lg breakpoint. */
export function MobileHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="font-display font-semibold tracking-tight">
          {PROFILE.name}
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-full p-2 hover:bg-muted"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t px-4 pb-5 pt-2 sm:px-6"
      >
        <ul className="divide-y divide-border/60">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`/#${n.id}`}
                onClick={() => setOpen(false)}
                className="block py-3 text-base text-muted-foreground hover:text-foreground"
              >
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="block py-3 text-base text-muted-foreground hover:text-foreground"
            >
              Blog
            </Link>
          </li>
        </ul>
        <QuickView className="mt-3 w-full" />
      </div>
    </header>
  );
}

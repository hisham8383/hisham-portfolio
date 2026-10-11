"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Linkedin, Mail, ScanEye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CV_URL, EMAIL, PROFILE, QUICK_FACTS, SKILLS, CREDENTIALS } from "@/content/site";

/** "Recruiter mode": a one-screen summary of the profile in a modal dialog. */
export function QuickView({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <Button variant="outline" size="sm" className={className} onClick={() => setOpen(true)}>
        <ScanEye className="h-4 w-4" /> Quick view
      </Button>
      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === ref.current && setOpen(false)}
        aria-labelledby="quick-view-title"
        className="m-auto w-[min(92vw,40rem)] rounded-2xl border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-background/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-6 sm:p-8">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close quick view"
            className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-xs font-medium uppercase tracking-widest text-primary">Quick view</p>
          <h2 id="quick-view-title" className="mt-2 font-display text-2xl font-semibold">
            {PROFILE.name}
          </h2>
          <p className="text-muted-foreground">
            {PROFILE.title} · {PROFILE.location}
          </p>

          <ul className="mt-6 space-y-3">
            {QUICK_FACTS.map((f) => (
              <li key={f} className="flex gap-3 text-sm leading-6">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {[...CREDENTIALS, ...SKILLS].map((s) => (
              <span key={s} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {CV_URL && (
              <Button asChild>
                <a href={CV_URL} download>
                  <Download className="h-4 w-4" /> Download CV
                </a>
              </Button>
            )}
            <Button asChild variant={CV_URL ? "outline" : "default"}>
              <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Opportunity for Hisham")}`}>
                <Mail className="h-4 w-4" /> Email
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://www.linkedin.com/in/hishamalhussain/" target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}

import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIALS } from "@/content/site";

const ICONS = { GitHub: Github, LinkedIn: Linkedin, Email: Mail } as const;

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-5 ${className}`}>
      {SOCIALS.map(({ href, label }) => {
        const Icon = ICONS[label];
        const external = href.startsWith("http");
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              className="block text-muted-foreground transition hover:-translate-y-0.5 hover:text-primary"
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

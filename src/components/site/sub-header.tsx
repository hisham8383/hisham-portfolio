import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { PROFILE } from "@/content/site";

/** Compact header for inner pages (blog, case studies). */
export function SubHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-display font-semibold tracking-tight">
          <Image
            src={PROFILE.headshot}
            alt=""
            width={64}
            height={64}
            className="h-8 w-8 rounded-lg object-cover ring-1 ring-primary/30"
          />
          {PROFILE.name}
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/#work" className="rounded-md px-3 py-2 text-muted-foreground hover:text-foreground">
            Work
          </Link>
          <Link href="/blog" className="rounded-md px-3 py-2 text-muted-foreground hover:text-foreground">
            Blog
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

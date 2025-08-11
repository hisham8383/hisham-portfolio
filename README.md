# Hisham Alhussain — Portfolio

A modern, fast, dark-themed portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind**, **shadcn/ui**, and **Framer Motion**.  
Includes a blog, SEO metadata (sitemap/robots/OG), analytics, and performance optimizations.

---

## Live

- **Site:** https://www.hisham-alhussain.com  
- **Preview (Vercel):** your-project.vercel.app

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI:** Tailwind CSS + shadcn/ui + lucide-react icons
- **Animations:** Framer Motion (respects reduced motion)
- **Theming:** Dark mode default + theme toggle (next-themes)
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics (optional)
- **Blog:** File-based posts with dynamic routes
- **SEO:** `metadata` API, `/robots.txt`, `/sitemap.xml`, Open Graph image, RSS feed

---

## Features

- Responsive, accessible, and keyboard-friendly
- Dark theme with toggle
- Projects section + GitHub “Open Source Highlights” (lazy-loaded)
- Blog index and per-post pages
- RSS feed at `/feed.xml`
- SEO assets in `/public` (`og.png`, `favicon.ico`, `apple-touch-icon.png`)
- Performance tweaks:
  - Preconnect to GitHub API
  - Lazy load GitHub repos (breaks critical chain)
  - Optimized package imports for `lucide-react`
  - Modern browsers target via Browserslist

---

## Getting Started

### Prerequisites
- **Node.js:** 18 – 22  
- **npm** (or pnpm/yarn)

### Install
```bash
git clone https://github.com/hisham8383/hisham-portfolio
cd hisham-portfolio
npm i
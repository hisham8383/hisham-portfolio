export default function Head() {
  return (
    <>
      {/* SEO: page-level meta description for the homepage */}
      <meta
        name="description"
        content="Portfolio of Hisham Alhussain — GenAI assistants, data platforms, and polished UIs. Explore selected projects, writing, and ways to get in touch."
      />

      {/* Perf: early connection to GitHub for repos widget */}
      <link rel="preconnect" href="https://api.github.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://api.github.com" />
    </>
  );
}

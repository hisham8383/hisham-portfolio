/**
 * Section wrapper with a scroll-driven fade-up (see `.reveal` in globals.css).
 * Pure CSS progressive enhancement: content is always visible when the browser
 * lacks scroll-timeline support, JS hasn't loaded, or reduced motion is on.
 */
export function Reveal({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`reveal scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}

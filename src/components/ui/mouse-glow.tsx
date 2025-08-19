"use client";

import { useEffect, useRef, useState } from "react";

type MouseGlowProps = {
  /** Diameter of the glow in pixels */
  size?: number;
  /** Opacity of the inner color stop (0–1) */
  strength?: number;
};

/**
 * A GPU-friendly radial glow that follows the pointer.
 * Uses CSS variables + transform for smooth, cheap updates.
 * Doesn’t steal clicks (pointer-events: none).
 */
export default function MouseGlow({ size = 520, strength = 0.28 }: MouseGlowProps) {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const raf = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const onMove = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setPos({ x, y }));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduced]);

  if (reduced) return null;

  // Use your theme primary color via CSS var; falls back if not supported
  const gradient = `radial-gradient(${size}px circle at center,
    hsl(var(--primary) / ${strength}),
    transparent 60%)`;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ contain: "strict" }} // isolate painting
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-80 will-change-transform"
        style={{
          left: pos.x,
          top: pos.y,
          width: size,
          height: size,
          background: gradient,
          mixBlendMode: "screen", // nice on dark; try 'soft-light' or 'plus-lighter'
          filter: "saturate(120%)",
        }}
      />
    </div>
  );
}

/** Hook: respects the user's reduced-motion preference */
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setPrefers(m.matches);
    set();
    m.addEventListener("change", set);
    return () => m.removeEventListener("change", set);
  }, []);
  return prefers;
}

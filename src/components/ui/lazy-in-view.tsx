"use client";
import { useEffect, useRef, useState } from "react";

export function LazyInView({
  children,
  rootMargin = "200px",
}: {
  children: React.ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShow(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return <div ref={ref}>{show ? children : null}</div>;
}

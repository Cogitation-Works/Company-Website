"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Moves its children at a different rate to the page as the section scrolls
 * past, so foreground and background separate.
 *
 * `speed` is a multiplier on the scroll delta. Negative drifts against the
 * scroll (feels nearer), positive drifts with it (feels further). Anything past
 * about ±0.3 stops reading as depth and starts reading as a glitch, so the
 * value is clamped.
 *
 * Only `transform` is written, straight to the node, never through React state
 * — the 60fps path must not re-render. `will-change` is set once here rather
 * than in CSS because these elements genuinely transform for the whole time
 * they are on screen, which is the one case where a layer is worth its memory.
 */
export default function Parallax({
  children,
  speed = 0.12,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  as?: "div" | "span" | "figure";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const s = Math.max(-0.3, Math.min(0.3, speed));
    let raf = 0;
    let last = -9999;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Skip entirely when off screen — a page with a dozen of these should
      // cost nothing for the ones nobody can see.
      if (rect.bottom < -200 || rect.top > vh + 200) return;

      // 0 at the centre of the viewport, ±1 at the edges.
      const centre = (rect.top + rect.height / 2 - vh / 2) / vh;
      const y = centre * s * vh;
      if (Math.abs(y - last) < 0.25) return;
      last = y;
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };

    el.style.willChange = "transform";
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.style.willChange = "";
    };
  }, [speed, reduced]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

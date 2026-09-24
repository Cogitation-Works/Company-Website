"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/motion";
import type { SceneVariant } from "./Scene3D";

/* Three.js never enters the main bundle — it loads only for viewers who
   actually get the object. */
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

/**
 * The gate every 3D object on the site goes through. One place, three rules:
 *
 *  1. Desktop only. A WebGL context has no business loading on a mid-range
 *     phone for a decorative background.
 *  2. Reduced motion off.
 *  3. Not inside the magnifier's duplicate render. The Lens draws the page a
 *     second time; without this check every object would mount a second WebGL
 *     context for a copy nobody reads.
 *
 * When the gate closes, a CSS stand-in renders instead — so the layout is
 * identical and the section never collapses to an empty box.
 */
export default function Object3D({
  variant,
  accent = "#f0a500",
  className = "",
  transparent = true,
}: {
  variant: SceneVariant;
  accent?: string;
  className?: string;
  transparent?: boolean;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inLensCopy, setInLensCopy] = useState(false);
  const [near, setNear] = useState(false);

  useEffect(() => {
    setInLensCopy(!!ref.current?.closest(".lens-zoom"));
  }, []);

  /* Only start the canvas when it is close to the viewport. A page with three
     of these should not run three render loops while they are all off screen. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setNear(e.isIntersecting),
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const render = isDesktop && !reduced && !inLensCopy && near;

  return (
    <div ref={ref} className={className}>
      {render ? (
        <Scene3D
          variant={variant}
          accent={accent}
          transparent={transparent}
          className="h-full w-full"
        />
      ) : (
        <Fallback accent={accent} />
      )}
    </div>
  );
}

/** Static stand-in: the same shape language, no canvas. */
function Fallback({ accent }: { accent: string }) {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 60% at 50% 45%, color-mix(in oklab, ${accent} 26%, transparent), transparent 70%)`,
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: `color-mix(in oklab, ${accent} 42%, transparent)` }}
      />
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: accent, opacity: 0.55, filter: "blur(18px)" }}
      />
    </div>
  );
}

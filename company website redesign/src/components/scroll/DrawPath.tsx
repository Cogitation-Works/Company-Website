"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * An SVG path that draws itself as the section scrolls past.
 *
 * Kode draws with the cursor; Hashgraph assembles a mark from particles; Alche
 * constructs its logo from individual lines. The shared idea is that a line
 * arriving is more interesting than a line being present. This is our version:
 * a route through the page that draws as you descend, with a travelling pulse
 * on it so it reads as live rather than decorative.
 *
 * Implementation note: `stroke-dashoffset` is one of the very few properties
 * that animates on the compositor without promoting a layer, so this costs
 * essentially nothing even at full-page height.
 */
export default function DrawPath({
  d,
  viewBox,
  className = "",
  accent = "var(--color-live)",
  width = 1.5,
  pulse = true,
}: {
  d: string;
  viewBox: string;
  className?: string;
  accent?: string;
  width?: number;
  pulse?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const [len, setLen] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const p = pathRef.current;
    if (p) setLen(p.getTotalLength());
  }, [d]);

  useEffect(() => {
    if (!len) return;
    const path = pathRef.current;
    if (!path) return;

    if (reduced) {
      path.style.strokeDashoffset = "0";
      return;
    }

    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    let last = -1;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      // Draws from the moment the top enters the viewport to the moment the
      // bottom leaves it.
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      if (Math.abs(p - last) < 0.002) return;
      last = p;

      path.style.strokeDashoffset = String(len * (1 - p));
      if (dotRef.current && pathRef.current) {
        const pt = pathRef.current.getPointAtLength(len * p);
        dotRef.current.setAttribute("cx", String(pt.x));
        dotRef.current.setAttribute("cy", String(pt.y));
        dotRef.current.style.opacity = p > 0.01 && p < 0.99 ? "1" : "0";
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [len, reduced]);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <svg
        viewBox={viewBox}
        fill="none"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {/* Ghost of the full route, so the destination is implied. */}
        <path d={d} stroke="currentColor" strokeWidth={width} opacity={0.12} />
        <path
          ref={pathRef}
          d={d}
          stroke={accent}
          strokeWidth={width}
          strokeLinecap="round"
          style={{
            strokeDasharray: len || undefined,
            strokeDashoffset: len || undefined,
          }}
        />
        {pulse ? (
          <circle
            ref={dotRef}
            r={width * 2.6}
            fill={accent}
            style={{ opacity: 0, transition: "opacity 300ms" }}
          />
        ) : null}
      </svg>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/motion";

const LiquidBlob = dynamic(() => import("./LiquidBlob"), { ssr: false });

/**
 * The gate for the raymarched blob. Same three rules as `Object3D` — desktop,
 * reduced-motion off, not inside the magnifier's duplicate render — plus a
 * near-viewport check so the render loop is not running off screen.
 *
 * It gets its own gate rather than reusing `Object3D` because the blob is a
 * fill-rate-bound raymarch rather than a geometry scene: it needs a lower DPR
 * cap and its own fallback, and mixing the two would mean one set of tuning
 * dials for two very different costs.
 *
 * The fallback is a CSS approximation — a soft iridescent ring — so the hero
 * still has a centrepiece on a phone, where a per-pixel raymarch has no
 * business running.
 */
export default function BlobGate({
  className = "",
  accentA = "#3b82f6",
  accentB = "#f0a500",
  size = 0.48,
}: {
  className?: string;
  accentA?: string;
  accentB?: string;
  size?: number;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inLensCopy, setInLensCopy] = useState(false);
  const [near, setNear] = useState(false);

  useEffect(() => {
    setInLensCopy(!!ref.current?.closest(".lens-zoom"));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), {
      rootMargin: "300px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const render = isDesktop && !reduced && !inLensCopy && near;

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {render ? (
        <LiquidBlob
          className="h-full w-full"
          accentA={accentA}
          accentB={accentB}
          size={size}
        />
      ) : (
        <Fallback accentA={accentA} accentB={accentB} />
      )}
    </div>
  );
}

/** Static stand-in: a soft iridescent shell, transparent through the middle. */
function Fallback({ accentA, accentB }: { accentA: string; accentB: string }) {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[min(72vw,30rem)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `conic-gradient(from 210deg, ${accentA}00, ${accentA}cc 70deg, #ffffffcc 150deg, ${accentB}cc 250deg, ${accentA}00 360deg)`,
          // Ring only: the centre stays clear so the copy reads through it,
          // exactly as the shader version does.
          WebkitMask:
            "radial-gradient(circle, transparent 0 58%, #000 62%, #000 99%, transparent 100%)",
          mask: "radial-gradient(circle, transparent 0 58%, #000 62%, #000 99%, transparent 100%)",
          filter: "blur(14px)",
          opacity: 0.85,
        }}
      />
    </div>
  );
}

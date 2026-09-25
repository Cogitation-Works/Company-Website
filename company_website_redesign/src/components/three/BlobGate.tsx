"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/motion";

const LiquidBlob = dynamic(() => import("./LiquidBlob"), { ssr: false });

const HOLD_MS = 2000;

/**
 * The gate for the raymarched blob, and the small interaction around it.
 *
 * Behaviour:
 *   · it starts PARKED in the lower-right of the hero with a "touch and hold"
 *     label above it;
 *   · hold for two seconds and it wakes up and follows the cursor anywhere in
 *     the hero;
 *   · scroll the hero out of view and it resets, so returning to the top
 *     always gives the same starting state.
 *
 * Why hold rather than hover: the blob sits over the headline and the product
 * cards. If it chased the cursor immediately, every visitor crossing the hero
 * on their way to the navigation would drag a large refracting object over the
 * copy they were trying to read. Making it deliberate means it only moves for
 * someone who wants it to.
 *
 * Rendering rules are the same three as `Object3D` — desktop, reduced-motion
 * off, not inside the magnifier's duplicate render — plus a near-viewport
 * check so the loop is not running off screen. It gets its own gate rather
 * than reusing `Object3D` because a fill-rate-bound raymarch needs a lower DPR
 * cap than a geometry scene, and one set of dials for both would suit neither.
 */
export default function BlobGate({
  className = "",
  accentA = "#3b82f6",
  accentB = "#f0a500",
  size = 0.25,
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

  const [active, setActive] = useState(false);
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdRef = useRef<{ raf: number; start: number }>({ raf: 0, start: 0 });

  useEffect(() => {
    setInLensCopy(!!ref.current?.closest(".lens-zoom"));
  }, []);

  /* Near-viewport check, and the reset: once the hero leaves the screen the
     blob returns to its corner and the label comes back. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setNear(e.isIntersecting);
        if (!e.isIntersecting) {
          setActive(false);
          setHolding(false);
          setProgress(0);
        }
      },
      { rootMargin: "300px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cancelHold = useCallback(() => {
    cancelAnimationFrame(holdRef.current.raf);
    setHolding(false);
    setProgress(0);
  }, []);

  const beginHold = useCallback(() => {
    if (active) return;
    setHolding(true);
    holdRef.current.start = performance.now();
    const tick = () => {
      const p = Math.min(
        1,
        (performance.now() - holdRef.current.start) / HOLD_MS,
      );
      setProgress(p);
      if (p >= 1) {
        setActive(true);
        setHolding(false);
        return;
      }
      holdRef.current.raf = requestAnimationFrame(tick);
    };
    holdRef.current.raf = requestAnimationFrame(tick);
  }, [active]);

  useEffect(() => () => cancelAnimationFrame(holdRef.current.raf), []);

  const render = isDesktop && !reduced && !inLensCopy && near;
  const R = 17;
  const C = 2 * Math.PI * R;

  return (
    <div ref={ref} className={className}>
      {render ? (
        <LiquidBlob
          className="h-full w-full"
          accentA={accentA}
          accentB={accentB}
          size={size}
          active={active}
        />
      ) : (
        <Fallback accentA={accentA} accentB={accentB} />
      )}

      {/* The hold target, over the blob's parked position. `pointer-events`
          is enabled ONLY here — the canvas itself stays inert so it never
          steals clicks from the links underneath. */}
      {render && !active ? (
        <button
          type="button"
          onPointerDown={beginHold}
          onPointerUp={cancelHold}
          onPointerLeave={cancelHold}
          onPointerCancel={cancelHold}
          aria-label="Hold for two seconds to let the object follow your cursor"
          /* Positioned to sit on the blob's parked spot — see `park` in
             LiquidBlob. Change one and change the other. */
          className="group pointer-events-auto absolute right-[16%] top-[74%] flex -translate-y-1/2 flex-col items-center gap-3"
        >
          <span className="label-mono select-none whitespace-nowrap rounded-pill border border-white/25 bg-black/35 px-4 py-2 !text-white/85 backdrop-blur-md transition-colors group-hover:border-white/55">
            {holding ? "Keep holding…" : "Touch and hold"}
          </span>

          {/* Ring fills across the two seconds. */}
          <span className="relative block h-10 w-10" aria-hidden="true">
            <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90">
              <circle
                cx="20"
                cy="20"
                r={R}
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="2"
              />
              <circle
                cx="20"
                cy="20"
                r={R}
                fill="none"
                stroke={accentB}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress)}
                style={{
                  transition: holding ? "none" : "stroke-dashoffset 300ms",
                }}
              />
            </svg>
            <span
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: accentB }}
            />
          </span>
        </button>
      ) : null}
    </div>
  );
}

/** Static stand-in: a soft iridescent shell, transparent through the middle. */
function Fallback({ accentA, accentB }: { accentA: string; accentB: string }) {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
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

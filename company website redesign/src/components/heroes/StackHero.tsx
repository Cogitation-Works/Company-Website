"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * /services hero — four planes in perspective, one per pillar, that separate on
 * entry and tilt toward the pointer.
 *
 * The idea is literal: the four disciplines are four layers of one stack, so
 * the hero is a stack. Pure CSS 3D — no canvas, no WebGL, no assets — which
 * means it also runs on a phone, unlike the home page field.
 */
export default function StackHero({
  layers,
}: {
  layers: { name: string; accent: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      // Normalised to the viewport, so the stack answers the pointer anywhere
      // in the hero rather than only directly over itself.
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      el.style.transform = `rotateX(${58 - cur.y * 8}deg) rotateZ(${-38 + cur.x * 10}deg)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-6%] top-1/2 hidden -translate-y-1/2 lg:block"
      style={{ perspective: "1400px", width: "46rem", height: "34rem" }}
    >
      <div
        ref={ref}
        className="relative h-full w-full will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(58deg) rotateZ(-38deg)",
        }}
      >
        {layers.map((l, i) => (
          <div
            key={l.name}
            className="absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border"
            style={{
              borderColor: `color-mix(in oklab, ${l.accent} 55%, transparent)`,
              background: `linear-gradient(140deg, color-mix(in oklab, ${l.accent} 16%, transparent), transparent 62%)`,
              boxShadow: `0 0 70px -10px color-mix(in oklab, ${l.accent} 38%, transparent)`,
              transform: `translateZ(${(i - 1.5) * 76}px)`,
              animation: `stack-in 1100ms cubic-bezier(0.16,1,0.3,1) ${i * 110}ms both`,
            }}
          >
            {/* Fine grid on each plane so the perspective is readable. */}
            <span
              className="absolute inset-0 rounded-[1.5rem] opacity-25"
              style={{
                backgroundImage:
                  "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
                backgroundSize: "38px 38px",
              }}
            />
            <span
              className="absolute left-5 top-5 font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
              style={{ color: l.accent }}
            >
              {String(i + 1).padStart(3, "0")}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes stack-in {
          from { opacity: 0; transform: translateZ(0) scale(0.92); }
        }
      `}</style>
    </div>
  );
}

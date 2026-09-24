"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * The loading screen.
 *
 * Lusion counts to 100 at enormous size in the lower-left. Noomo pairs the word
 * LOADING with a ball sliding along a track and a percentage. Hashgraph draws a
 * wireframe mark while it waits. All three do the same job: they turn an
 * unavoidable wait into the first piece of design you see.
 *
 * Rules this one follows:
 *  - It shows ONCE per session. A loader on every navigation is an affectation
 *    that costs the visitor time; sessionStorage means the second page is
 *    instant.
 *  - It never waits longer than it has to. The counter tracks real progress
 *    (document readyState plus a floor so it always moves), and exits as soon
 *    as the page is usable.
 *  - Under `prefers-reduced-motion` it does not render at all.
 *  - It is `position: fixed` over the top rather than gating render, so the
 *    page behind is already painted and interactive the moment it lifts.
 */

const KEY = "cw-loaded";

export default function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();
  const rafRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* private mode — treat as first visit, the loader is harmless */
    }
    if (seen || reduced) {
      setDone(true);
      return;
    }

    const start = performance.now();
    let value = 0;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const elapsed = performance.now() - start;

      // Real signal: the document's own readiness. The floor guarantees the
      // counter always advances, because a counter that sits at 38 reads as a
      // broken page rather than a loading one.
      const real = document.readyState === "complete" ? 100 : 62;
      const floor = Math.min(96, (elapsed / 1400) * 100);
      const target = Math.max(floor, real);

      value += (target - value) * 0.09;
      setPct(Math.round(value));

      if (value > 99.2 && document.readyState === "complete" && elapsed > 900) {
        cancelAnimationFrame(rafRef.current);
        setPct(100);
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {
          /* ignore */
        }
        setTimeout(() => setDone(true), 420);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduced]);

  // Never render on the server, so the markup a crawler sees is the page.
  if (!mounted || reduced) return null;

  return (
    <div
      aria-hidden={done}
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-0 z-[300]"
      style={{
        // Wipes upward off the screen rather than fading — a fade leaves the
        // page looking washed out for 600ms, a wipe reveals it cleanly.
        transform: done ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 900ms cubic-bezier(0.83,0,0.17,1)",
      }}
    >
      <div className="relative flex h-full w-full flex-col justify-between bg-deep px-[var(--spacing-gutter)] py-10 text-on-deep">
        {/* Grid field, same language as the rest of the site. */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
            backgroundSize: "88px 88px",
          }}
        />

        <div className="relative flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
          </span>
          <span className="text-[0.9375rem] font-[560] tracking-[-0.02em]">
            Cogitation Works
          </span>
        </div>

        <div className="relative">
          <p className="label-mono !text-on-deep-muted">
            Loading the systems that run your operation
          </p>
          <div className="mt-5 flex items-end justify-between gap-8">
            <span className="num block text-[clamp(4.5rem,18vw,13rem)] leading-[0.82] tracking-[-0.055em]">
              {String(pct).padStart(3, "0")}
            </span>
            <span className="label-mono mb-4 !text-on-deep-muted">%</span>
          </div>

          {/* The rule fills as the number climbs. */}
          <div className="mt-6 h-px w-full bg-white/15">
            <div
              className="h-full origin-left bg-live"
              style={{
                transform: `scaleX(${pct / 100})`,
                transition: "transform 180ms linear",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

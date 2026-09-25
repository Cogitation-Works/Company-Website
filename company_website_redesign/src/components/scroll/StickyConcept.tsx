"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { MediaPlate, type Plate } from "@/components/media/MediaPlate";

/**
 * A visual that sticks while the copy scrolls past it, with the visual swapping
 * as each block of copy takes over.
 *
 * This is the pattern Terminal and Viture both use for feature walkthroughs,
 * and it is the right one for explaining a product: the reader controls the
 * pace, one idea is on screen at a time, and the image is never far from the
 * sentence describing it.
 *
 * Terminal's version stutters badly — it promotes every step to its own layer
 * and re-measures on each scroll event. This one measures once per frame in a
 * single rAF, writes nothing to React unless the active index actually changes,
 * and promotes only the sticky wrapper.
 */

export type ConceptStep = {
  kicker: string;
  title: string;
  body: string;
  /** Optional media for this step; falls back to the previous step's. */
  plate?: Plate;
};

export default function StickyConcept({
  steps,
  accent,
  side = "left",
}: {
  steps: ConceptStep[];
  accent: string;
  /** Which side the sticky visual sits on at lg and up. */
  side?: "left" | "right";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    let cur = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const blocks = wrap.querySelectorAll<HTMLElement>("[data-step]");
      const mid = window.innerHeight * 0.52;
      let next = 0;
      blocks.forEach((b, i) => {
        const r = b.getBoundingClientRect();
        if (r.top <= mid) next = i;
      });
      if (next !== cur) {
        cur = next;
        setActive(next);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  /* The plate shown is the most recent one defined at or before `active`, so a
     step without its own visual simply keeps the previous one on screen. */
  const plate = (() => {
    for (let i = active; i >= 0; i--) if (steps[i].plate) return steps[i].plate;
    return steps.find((s) => s.plate)?.plate;
  })();

  return (
    <div
      ref={wrapRef}
      className={`grid gap-10 lg:grid-cols-2 lg:gap-16 ${
        side === "right" ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* ---- Sticky visual */}
      <div className="lg:h-full">
        <div className="lg:sticky lg:top-[18vh]">
          <div className="relative">
            {plate ? <MediaPlate plate={plate} /> : null}

            {/* Step counter over the plate. */}
            <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2">
              <span
                className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]"
                style={{ color: accent }}
              >
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/35">
                / {String(steps.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Segmented progress under the plate. */}
          <div className="mt-5 flex gap-1.5">
            {steps.map((s, i) => (
              <span
                key={s.title}
                className="h-0.5 flex-1 rounded-full transition-colors duration-500"
                style={{
                  background:
                    i <= active ? accent : "color-mix(in oklab, currentColor 14%, transparent)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ---- Scrolling copy */}
      <div>
        {steps.map((s, i) => (
          <div
            key={s.title}
            data-step
            className="border-t border-line py-14 first:border-t-0 first:pt-0 lg:py-20"
          >
            <span
              className="label-mono transition-colors duration-500"
              style={{ color: i === active ? accent : undefined }}
            >
              {s.kicker}
            </span>
            <h3 className="mt-4 text-[clamp(1.5rem,3.2vw,2.25rem)] font-[560] leading-[1.08] tracking-[-0.03em]">
              {s.title}
            </h3>
            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

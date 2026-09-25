"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/motion";
import HeroTheme from "@/components/layout/HeroTheme";
import type { SphereControl } from "@/components/three/TileSphere";

const TileSphere = dynamic(() => import("@/components/three/TileSphere"), { ssr: false });

/**
 * Full-height hero: a glass-tile sphere over a giant wordmark, press and hold
 * to break it. The canvas is absolute and fills the section — it takes no
 * layout space of its own.
 *
 * The chrome around it follows the Noomo Labs recording: a round "Click and
 * hold" label that follows the cursor, and a thin progress line along the
 * bottom of the hero with a prompt on the left and the instruction on the
 * right. Both read the hold progress straight from a ref every frame rather
 * than through React state, so holding never re-renders the page.
 *
 * Gated like every other 3D object on the site: desktop only, reduced-motion
 * off, and not inside the magnifier's duplicate render. The fallback is the
 * plain headline, so the page still says what it is.
 */
export default function GlassSphereHero({
  word,
  prompt,
}: {
  word: string;
  prompt: string;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [inLensCopy, setInLensCopy] = useState(false);

  const control = useRef<SphereControl>({ down: false, progress: 0, bursting: false });
  const barRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    setInLensCopy(!!ref.current?.closest(".lens-zoom"));
  }, []);

  const live = isDesktop && !reduced && !inLensCopy;

  /* Progress line + cursor label, driven off the control ref. */
  useEffect(() => {
    if (!live) return;
    let raf = 0;
    const pos = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      pos.x = e.clientX - r.left;
      pos.y = e.clientY - r.top;
    };
    const C = 2 * Math.PI * 34;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const p = control.current.progress;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(C * (1 - p));
      cur.x += (pos.x - cur.x) * 0.2;
      cur.y += (pos.y - cur.y) * 0.2;
      if (cursorRef.current) {
        const s = control.current.down ? 0.86 : 1;
        cursorRef.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%,-50%) scale(${s})`;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [live]);

  /* Release anywhere — the pointer can leave the hero while held. */
  useEffect(() => {
    const up = () => (control.current.down = false);
    window.addEventListener("pointerup", up);
    window.addEventListener("blur", up);
    return () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("blur", up);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate h-[100svh] min-h-[640px] overflow-hidden"
      style={{ background: "#eceef3" }}
      onPointerDown={(e) => {
        if (!live || e.button !== 0) return;
        control.current.down = true;
      }}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => {
        setHovering(false);
        control.current.down = false;
      }}
    >
      <HeroTheme value="light" />

      {/* The real headline, for search engines and screen readers. When the
          3D wordmark is live this is visually hidden, not removed.

          The magnifier's copy takes the hidden form too. It cannot mount the
          sphere, but painting the fallback headline across the whole hero
          instead would put a full-bleed block of type over the section — so
          magnifying anything in this hero showed that headline rather than
          what was actually under the pointer. */}
      <h1
        className={
          live || inLensCopy
            ? "sr-only"
            : "absolute inset-0 flex items-center justify-center px-[var(--spacing-gutter)] text-center font-[560] uppercase leading-[0.86] tracking-[-0.04em] text-[clamp(3.5rem,14vw,11rem)]"
        }
      >
        {word}
      </h1>

      {/* Static chrome, drawn in the copy as well so the text the magnifier
          shows sits where the real text sits. */}
      {inLensCopy ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] px-[var(--spacing-gutter)] pb-7">
          <div className="container-page !px-0">
            <div className="flex items-end justify-between gap-6 pb-3">
              <span className="font-[560] uppercase tracking-[-0.01em] text-[clamp(0.9rem,1.3vw,1.15rem)] text-ink">
                {prompt}
              </span>
              <span className="font-[560] uppercase tracking-[-0.01em] text-[clamp(0.9rem,1.3vw,1.15rem)] text-ink">
                Click and hold
              </span>
            </div>
            <div className="h-[2px] w-full bg-ink/15" />
          </div>
        </div>
      ) : null}

      {live ? (
        <>
          <div className="absolute inset-0 select-none" style={{ cursor: hovering ? "none" : undefined }}>
            <TileSphere control={control} word={word} />
          </div>

          {/* Cursor label */}
          <div
            ref={cursorRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-[5] transition-opacity duration-300"
            style={{ opacity: hovering ? 1 : 0 }}
          >
            <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-[0_12px_30px_-12px_rgba(11,15,20,0.35)]">
              <svg viewBox="0 0 76 76" className="absolute inset-0 -rotate-90">
                <circle
                  ref={ringRef}
                  cx="38"
                  cy="38"
                  r="34"
                  fill="none"
                  stroke="#050608"
                  strokeWidth="1.5"
                  strokeDasharray={2 * Math.PI * 34}
                  strokeDashoffset={2 * Math.PI * 34}
                />
              </svg>
              <span className="text-center font-mono text-[0.5625rem] uppercase leading-tight tracking-[0.12em] text-ink">
                Click
                <br />
                and hold
              </span>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] px-[var(--spacing-gutter)] pb-7">
            <div className="container-page !px-0">
              <div className="flex items-end justify-between gap-6 pb-3">
                <span className="font-[560] uppercase tracking-[-0.01em] text-[clamp(0.9rem,1.3vw,1.15rem)] text-ink">
                  {prompt}
                </span>
                <span className="font-[560] uppercase tracking-[-0.01em] text-[clamp(0.9rem,1.3vw,1.15rem)] text-ink">
                  Click and hold
                </span>
              </div>
              <div className="h-[2px] w-full bg-ink/15">
                <div ref={barRef} className="h-full w-full origin-left bg-ink" style={{ transform: "scaleX(0)" }} />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}

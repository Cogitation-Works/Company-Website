"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { Tbc } from "@/components/layout/Blocks";

/**
 * The three blocks every detail page needs — on a product page and on a client
 * project page alike, so the two read as the same kind of document about two
 * different kinds of thing.
 *
 *   NextPhase   what ships next. A page with no answer to "is this finished?"
 *               reads as either abandoned or oversold.
 *   Variants    editions, limits and what can be customised.
 *   Reviews     the client or user, in their own words.
 */

/* --------------------------------------------------------------- reviews */

export type Review = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

function useTilt() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      // Small angles: past about 7deg the text shears visibly and the card
      // reads as broken rather than as tilted.
      el.style.setProperty("--rx", `${(0.5 - py) * 7}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 7}deg`);
      el.style.setProperty("--sx", `${px * 100}%`);
      el.style.setProperty("--sy", `${py * 100}%`);
    };
    const onLeave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return ref;
}

export function Reviews({
  reviews,
  accent,
  subject,
}: {
  reviews: Review[];
  accent: string;
  subject: string;
}) {
  if (reviews.length === 0) {
    return (
      <div
        className="relative max-w-[62ch] overflow-hidden rounded-card border border-dashed border-line-strong p-8 lg:p-10"
        style={{ "--accent": accent } as React.CSSProperties}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-12 select-none text-[11rem] leading-none"
          style={{ color: accent, opacity: 0.06 }}
        >
          &rdquo;
        </span>
        <p className="label-mono relative">Quote pending</p>
        <p className="relative mt-4 text-[1.0625rem] leading-relaxed text-muted">
          Nothing is published for {subject} yet. The testimonials on the old
          site cannot be used — the same three sentences appear on two pages
          attributed to six different people, so none can be verified. A real
          quote, with a real name and role, replaces this.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {reviews.map((r, i) => (
        <ReviewCard key={r.name + i} review={r} accent={accent} index={i} />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  accent,
  index,
}: {
  review: Review;
  accent: string;
  index: number;
}) {
  const ref = useTilt();
  return (
    <figure
      ref={ref as React.RefObject<HTMLElement>}
      className="group relative overflow-hidden rounded-card border border-line bg-surface p-8 transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_rgba(11,15,20,0.4)] lg:p-10"
      style={
        {
          "--accent": accent,
          transform:
            "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
          transition:
            "transform 420ms cubic-bezier(0.16,1,0.3,1), box-shadow 500ms",
        } as React.CSSProperties
      }
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-0 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
        style={{ background: accent }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-12 select-none text-[11rem] leading-none"
        style={{ color: accent, opacity: 0.08 }}
      >
        &rdquo;
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--sx,50%) var(--sy,50%), rgb(255 255 255 / 0.55), transparent 62%)",
        }}
      />
      <span className="label-mono relative" style={{ color: accent }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <blockquote className="relative mt-5 text-[clamp(1.0625rem,1.8vw,1.3125rem)] leading-[1.45] tracking-[-0.014em] text-ink-soft">
        {review.quote}
      </blockquote>
      <figcaption className="relative mt-7 flex items-center gap-3 border-t border-line pt-5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-medium text-white"
          style={{ background: accent }}
          aria-hidden="true"
        >
          {review.name.slice(0, 1)}
        </span>
        <span>
          <span className="block text-[0.9375rem] font-[560] tracking-[-0.014em]">
            {review.name}
          </span>
          <span className="block text-[0.8125rem] text-muted">
            {review.role} · {review.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------ next phase */

export function NextPhase({
  when,
  items,
  accent,
}: {
  when: string;
  items: string[];
  accent: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();

  /* The connecting rail grows downward as the list scrolls into view — the
     roadmap arriving rather than sitting there. */
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let last = -1;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height * 0.9)));
      if (Math.abs(p - last) < 0.004) return;
      last = p;
      el.style.setProperty("--rail", `${p * 100}%`);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div>
      <p className="label-mono">
        Target — {when.includes("⟨TBC⟩") ? <Tbc /> : when}
      </p>

      <ol
        ref={ref}
        className="relative mt-8 max-w-[62ch] pl-10"
        style={{ "--rail": "0%" } as React.CSSProperties}
      >
        {/* Ghost rail, then the live one drawn over it. */}
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-line"
        />
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-2 w-px origin-top"
          style={{ background: accent, height: "var(--rail)" }}
        />

        {items.map((item, i) => (
          <li key={item} className="relative pb-8 last:pb-0" data-reveal>
            <span
              aria-hidden="true"
              className="absolute -left-10 top-1 flex h-4 w-4 items-center justify-center rounded-full border bg-canvas"
              style={{ borderColor: accent }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: accent }}
              />
            </span>
            <span className="label-mono block">
              Phase {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink-soft">
              {item.includes("⟨TBC⟩") ? (
                <>
                  {item.replace("⟨TBC⟩", "").trim()} <Tbc />
                </>
              ) : (
                item
              )}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* --------------------------------------------------------------- variants */

export function Variants({
  variants,
  accent,
}: {
  variants: { name: string; detail: string; note?: string }[];
  accent: string;
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
      {variants.map((v, i) => (
        <div
          key={v.name}
          className="group relative bg-surface p-7 transition-colors duration-500 hover:bg-canvas lg:p-9"
          data-reveal
          style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-px w-0 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
            style={{ background: accent }}
          />
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-[1.1875rem] font-[560] tracking-[-0.02em]">
              {v.name.includes("⟨TBC⟩") ? <Tbc>Not defined</Tbc> : v.name}
            </h3>
            {v.note ? (
              <span
                className="rounded-pill border px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.1em]"
                style={{
                  borderColor: `color-mix(in oklab, ${accent} 45%, transparent)`,
                  color: accent,
                }}
              >
                {v.note.includes("⟨TBC⟩") ? "TBC" : v.note}
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
            {v.detail.includes("⟨TBC⟩") ? (
              <>
                {v.detail.replace("⟨TBC⟩", "").replace(/^\s*—\s*/, "").trim()}{" "}
                <Tbc />
              </>
            ) : (
              v.detail
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

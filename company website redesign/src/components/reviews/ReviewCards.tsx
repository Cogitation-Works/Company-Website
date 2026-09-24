"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/content/services";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Review cards, shown inside an expanded service.
 *
 * ⚠️ NOTHING HERE IS INVENTED. The company's existing testimonials are
 * unusable — the same three sentences appear on two pages attributed to six
 * different people, paired with stock photography (PROJECT.md §7). So when a
 * service has no real quote, this renders an *awaiting* card that states so on
 * its face, exactly like the media plates. A fabricated testimonial on a page
 * arguing that this company is trustworthy is the worst possible place to
 * invent something.
 *
 * The card design is deliberately not a box with a quote in it:
 *  - an oversized quote glyph is clipped by the card edge, so the card reads as
 *    a crop of something larger;
 *  - the whole card tilts toward the pointer in 3D with a specular sheen that
 *    tracks it, so a grid of them behaves like objects rather than divs;
 *  - the accent bar draws across the top on hover rather than sitting there.
 */

export default function ReviewCards({
  reviews,
  accent,
  serviceName,
}: {
  reviews: Review[];
  accent: string;
  serviceName: string;
}) {
  if (reviews.length === 0) {
    return <AwaitingCard accent={accent} serviceName={serviceName} />;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {reviews.map((r, i) => (
        <Card key={r.name + i} review={r} accent={accent} index={i} />
      ))}
    </div>
  );
}

function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      // Small angles on purpose — past about 7deg the text starts to shear
      // visibly and the card reads as broken rather than as tilted.
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

function Card({
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
      ref={ref}
      className="group relative overflow-hidden rounded-card border border-line bg-surface p-8 transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_rgba(11,15,20,0.4)] lg:p-10"
      style={{
        "--accent": accent,
        transform:
          "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
        transition: "transform 420ms cubic-bezier(0.16,1,0.3,1), box-shadow 500ms",
      } as React.CSSProperties}
    >
      {/* Accent rule draws across the top on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-0 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
        style={{ background: accent }}
      />
      {/* Oversized quote glyph, clipped by the card edge. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-12 select-none text-[11rem] leading-none"
        style={{ color: accent, opacity: 0.08 }}
      >
        &rdquo;
      </span>
      {/* Sheen tracks the pointer. */}
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
        {review.service ? ` — ${review.service}` : ""}
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

/**
 * The honest empty state. It looks deliberate, states what is missing, and
 * cannot be mistaken for a quote.
 */
function AwaitingCard({
  accent,
  serviceName,
}: {
  accent: string;
  serviceName: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-card border border-dashed border-line-strong p-8 lg:p-10"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-12 select-none text-[11rem] leading-none"
        style={{ color: accent, opacity: 0.06 }}
      >
        &rdquo;
      </span>
      <p className="label-mono relative">Client quote pending</p>
      <p className="relative mt-4 max-w-[54ch] text-[1.0625rem] leading-relaxed text-muted">
        We have not published a testimonial for {serviceName.toLowerCase()} yet.
        The quotes currently on the old site cannot be used — the same three
        sentences appear on two pages attributed to six different people, so
        none of them can be verified. Real quotes, with real names and roles,
        replace this card.
      </p>
      <p className="relative mt-5 text-[0.8125rem] text-faint">
        Add them to <code className="rounded bg-canvas px-1.5 py-0.5">reviews</code> in{" "}
        <code className="rounded bg-canvas px-1.5 py-0.5">src/content/services.ts</code>.
      </p>
    </div>
  );
}

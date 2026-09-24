"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * The blog index — a two-column table with a hover preview.
 *
 * This replaces a grid of cards, and the reference study is unambiguous about
 * why:
 *
 *   "Yambo — project index as a two-column table, name left, client and year
 *    right, with hover previews. Reads like a table of contents, not a card
 *    grid."
 *   "index as a two-column table with hover previews, NOT a card grid."
 *
 * A card grid was also the source of the ragged look: cards size to their own
 * content, so a three-word title and a twelve-word title produce boxes of
 * different heights and the whole block looks unfinished. A table has one row
 * height by construction — the alignment problem disappears rather than being
 * patched with min-heights.
 *
 * Two interactions, both taken from the study:
 *   · an arrow slides in from the LEFT ahead of the title (Lusion /projects);
 *   · a preview panel follows the cursor, offset from it (Fame Estate).
 */

export type Row = {
  title: string;
  angle: string;
  topic: string;
  accent: string;
  reader: string;
};

export default function IndexTable({ rows }: { rows: Row[] }) {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  /* The preview is positioned by writing transform straight to the node in a
     rAF — putting the pointer position in React state would re-render the
     whole table on every mouse move. */
  useEffect(() => {
    if (reduced) return;
    const el = previewRef.current;
    if (!el) return;

    const pos = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX + 28;
      pos.y = e.clientY - 40;
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      cur.x += (pos.x - cur.x) * 0.16;
      cur.y += (pos.y - cur.y) * 0.16;
      el.style.transform = `translate3d(${cur.x.toFixed(1)}px, ${cur.y.toFixed(1)}px, 0)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const row = active !== null ? rows[active] : null;

  return (
    <>
      <ul className="border-t border-line" onPointerLeave={() => setActive(null)}>
        {rows.map((r, i) => {
          const on = active === i;
          return (
            <li
              key={r.title}
              onPointerEnter={() => setActive(i)}
              className="border-b border-line"
              style={{ "--accent": r.accent } as React.CSSProperties}
            >
              <div
                className="group relative flex cursor-default items-baseline gap-5 py-5 transition-[padding,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:gap-8"
                style={{
                  paddingLeft: on ? "1.75rem" : 0,
                  background: on
                    ? `color-mix(in oklab, ${r.accent} 5%, transparent)`
                    : undefined,
                }}
              >
                {/* Arrow slides in from the left, ahead of the title. */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-[1.125rem] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    color: r.accent,
                    opacity: on ? 1 : 0,
                    transform: `translateY(-50%) translateX(${on ? 0 : -14}px)`,
                  }}
                >
                  →
                </span>

                <span className="min-w-0 flex-1 text-[clamp(1.0625rem,2.1vw,1.4375rem)] font-[560] leading-snug tracking-[-0.02em]">
                  {r.title}
                </span>

                <span
                  className="label-mono hidden shrink-0 text-right transition-colors duration-300 md:block md:w-56"
                  style={{ color: on ? r.accent : undefined }}
                >
                  {r.topic}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Cursor-following preview. Fixed, pointer-events off, so it never
          blocks the rows underneath it. */}
      {!reduced ? (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[150] w-[22rem] will-change-transform"
        >
          <div
            className="rounded-card border p-5 shadow-[0_30px_80px_-40px_rgba(11,15,20,0.45)] backdrop-blur-xl transition-[opacity,scale] duration-300"
            style={{
              opacity: row ? 1 : 0,
              scale: row ? "1" : "0.94",
              borderColor: row ? row.accent : "transparent",
              background: "color-mix(in oklab, var(--color-surface) 92%, transparent)",
            }}
          >
            {row ? (
              <>
                <span className="label-mono" style={{ color: row.accent }}>
                  {row.topic}
                </span>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {row.angle}
                </p>
                <p className="mt-4 border-t border-line pt-3 text-[0.8125rem] text-faint">
                  For — {row.reader}
                </p>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

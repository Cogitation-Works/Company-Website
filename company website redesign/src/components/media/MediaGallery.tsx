"use client";

import { useState } from "react";
import { MediaPlate, type Plate } from "@/components/media/MediaPlate";
import { ScrambleText } from "@/components/scroll/Effects";

/**
 * ONE gallery section for the whole company, filtered by category.
 *
 * The previous version gave About six consecutive plate grids — offices, expos,
 * achievements, client work, culture, film — one after another. That is a wall
 * of empty boxes with no writing between them, and it made the page feel like a
 * CMS rather than an argument.
 *
 * Everything now lives in one section behind a filter. The page gets its length
 * back from writing and motion instead of from repeated grids, and when the
 * real photography arrives this section gets better rather than longer.
 */

export type GalleryGroup = {
  id: string;
  label: string;
  blurb: string;
  plates: Plate[];
};

export default function MediaGallery({ groups }: { groups: GalleryGroup[] }) {
  const [active, setActive] = useState(groups[0]?.id);
  const group = groups.find((g) => g.id === active) ?? groups[0];
  const total = groups.reduce((n, g) => n + g.plates.length, 0);

  return (
    <div>
      {/* Filter row. Doubles as the section's table of contents. */}
      <div className="flex flex-wrap items-center gap-2 border-y border-line py-4">
        {groups.map((g) => {
          const on = g.id === active;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(g.id)}
              data-cursor
              aria-pressed={on}
              className={`rounded-pill border px-4 py-2 text-[0.875rem] transition-colors duration-300 ${
                on
                  ? "border-ink bg-ink text-white"
                  : "border-line text-muted hover:border-line-strong hover:text-ink"
              }`}
            >
              {g.label}
              <span className="ml-2 font-mono text-[0.6875rem] opacity-60">
                {String(g.plates.length).padStart(2, "0")}
              </span>
            </button>
          );
        })}
        <span className="label-mono ml-auto hidden sm:block">
          <ScrambleText text={`${total} SLOTS`} />
        </span>
      </div>

      <p className="mt-7 max-w-[56ch] text-[1.0625rem] leading-relaxed text-muted">
        {group.blurb}
      </p>

      {/* Keyed on the group so the whole grid re-mounts and re-reveals when the
          filter changes — a crossfade here would read as a glitch, a fresh
          stagger reads as a deliberate swap. */}
      <div
        key={group.id}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {group.plates.map((p, i) => (
          <div
            key={p.id}
            style={{
              animation: `gallery-in 620ms cubic-bezier(0.16,1,0.3,1) ${i * 70}ms both`,
            }}
          >
            <MediaPlate plate={p} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes gallery-in {
          from { opacity: 0; transform: translateY(18px); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes gallery-in { from { opacity: 1; transform: none; } }
        }
      `}</style>
    </div>
  );
}

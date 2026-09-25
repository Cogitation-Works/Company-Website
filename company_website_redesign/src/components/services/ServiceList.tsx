"use client";

import { useState } from "react";
import CapabilityVisual from "./CapabilityVisual";

/**
 * The capability list on a pillar page. Each row expands in place to show what
 * the capability involves and the reviews attached to it.
 *
 * An accordion rather than a grid of cards for a real reason: these pillars
 * now carry up to twelve capabilities, and twelve cards is a wall. A list is
 * scannable at a glance and only costs height for the one you opened.
 *
 * The row animates open with a grid-template-rows transition rather than
 * max-height. max-height forces you to guess a value — guess low and content
 * clips, guess high and the easing is wrong because most of the duration is
 * spent animating empty space. `grid-template-rows: 0fr → 1fr` animates to the
 * content's actual height.
 */
export default function ServiceList({
  services,
  accent,
}: {
  services: { name: string; detail: string }[];
  accent: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-line">
      {services.map((s, i) => {
        const isOpen = open === i;
        return (
          <li key={s.name} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              data-cursor
              className="group flex w-full items-center gap-5 py-6 text-left"
            >
              <span
                className="font-mono text-[0.6875rem] tracking-[0.14em] transition-colors duration-300"
                style={{ color: isOpen ? accent : undefined }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="flex-1 text-[clamp(1.125rem,2.2vw,1.5rem)] font-[560] tracking-[-0.024em]">
                {s.name}
              </span>

              {/* Plus that rotates into a minus. */}
              <span
                aria-hidden="true"
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300"
                style={{
                  borderColor: isOpen
                    ? accent
                    : "color-mix(in oklab, currentColor 18%, transparent)",
                }}
              >
                <span
                  className="absolute h-px w-3 transition-colors duration-300"
                  style={{ background: isOpen ? accent : "currentColor" }}
                />
                <span
                  className="absolute h-3 w-px transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    background: isOpen ? accent : "currentColor",
                    transform: isOpen ? "rotate(90deg) scaleX(0)" : "none",
                  }}
                />
              </span>
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="grid gap-10 pb-12 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-5">
                    <p className="text-[1.0625rem] leading-relaxed text-muted">
                      {s.detail}
                    </p>
                    <span
                      className="mt-6 inline-block h-px w-16"
                      style={{ background: accent }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* A diagram of the mechanism, not a testimonial. Somebody
                      reading a service page is deciding whether we understand
                      their problem; eleven identical quote cards answered
                      nothing, a picture of how the thing works does. */}
                  <div className="lg:col-span-7">
                    <p className="label-mono mb-5">How it works</p>
                    {isOpen ? (
                      <CapabilityVisual name={s.name} accent={accent} />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

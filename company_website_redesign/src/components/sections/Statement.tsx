"use client";

import { ScrubText } from "@/components/ui/Interactions";

/**
 * The positioning statement — words fill from faint to ink as the block moves
 * through the viewport, so reading pace is tied to scroll position.
 *
 * Mechanism borrowed from Terminal's contact headline; the copy, rhythm and
 * the amber emphasis are ours.
 */
export default function Statement() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-40">
      <div
        className="grid-field pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-canvas)_75%)]"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <p className="label-mono mb-10" data-reveal>
          What we actually do
        </p>

        <ScrubText
          as="h2"
          className="max-w-[24ch] text-[clamp(1.75rem,4.6vw,3.5rem)] font-[560] leading-[1.08] tracking-[-0.03em] text-ink"
          text="Most software looks fine in a demo and falls over on the shop floor. We build the layer underneath — the one that has to keep running when the factory, the clinic, the fleet and the farm all depend on it."
        />

        <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
          {[
            {
              k: "01",
              h: "We start at the operation",
              p: "Before any interface, we map how the work actually happens — stations, handoffs, exceptions, the workarounds people already use.",
            },
            {
              k: "02",
              h: "We build for load",
              p: "Real concurrency, real data volumes, real network conditions. Systems are tested against the worst day, not the demo day.",
            },
            {
              k: "03",
              h: "We stay after launch",
              p: "Telemetry, uptime and iteration. A platform that runs an operation is never finished at go-live.",
            },
          ].map((item, i) => (
            <div
              key={item.k}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
            >
              <span className="label-mono text-signal">{item.k}</span>
              <h3 className="mt-4 text-[1.25rem] font-[560] tracking-[-0.02em]">
                {item.h}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {item.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

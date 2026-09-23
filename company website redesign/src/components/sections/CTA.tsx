"use client";

import { useEffect, useState } from "react";
import { Magnetic } from "@/components/ui/Interactions";

/** Live clock for a hub. Two offices ticking makes the company feel real. */
function HubClock({
  city,
  timeZone,
}: {
  city: string;
  timeZone: string;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <div className="flex items-baseline gap-3">
      <span className="label-mono !text-white/45">{city}</span>
      {/* suppressHydrationWarning: server and client clocks differ by design */}
      <span className="num text-[0.9375rem] text-white/80" suppressHydrationWarning>
        {time ?? "--:--"}
      </span>
    </div>
  );
}

/**
 * Closing CTA — the one tonal flip on the page.
 *
 * Light → full-bleed dark. The mechanism is Lusion's; the execution is ours:
 * a technical grid, a live amber status line and the two hub clocks.
 */
export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-deep py-24 text-white lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-live) 0%, transparent 62%)",
        }}
        aria-hidden="true"
      />

      <div className="container-page relative">
        <p className="label-mono !text-white/40" data-reveal>
          Senior architecture consultation
        </p>

        <h2
          className="mt-6 max-w-[20ch] text-[clamp(2.25rem,6vw,4.5rem)] font-[560] leading-[0.98] tracking-[-0.035em]"
          data-reveal
          style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
        >
          Have a product in mind, or an operation that needs one?
        </h2>

        <p
          className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-white/55"
          data-reveal
          style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
        >
          Our senior architects evaluate your functional requirements, map the
          dependencies, and deliver a production-ready technical roadmap within
          48 hours.
        </p>

        <div
          className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center"
          data-reveal
          style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
        >
          <Magnetic>
            <a
              href="/contact"
              className="group inline-flex h-13 items-center gap-2 rounded-pill bg-white px-8 py-4
                         text-[0.9375rem] font-medium text-ink transition-colors hover:bg-live"
            >
              Schedule an architecture call
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="/products"
              className="inline-flex h-13 items-center rounded-pill border border-white/20 px-8 py-4
                         text-[0.9375rem] font-medium text-white transition-colors hover:border-white/60"
            >
              Browse the platforms
            </a>
          </Magnetic>
        </div>

        <div
          className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-8"
          data-reveal
          style={{ "--reveal-delay": "340ms" } as React.CSSProperties}
        >
          {/* IANA zone ids are technical identifiers, not labels — "Asia/Dubai"
              stays as-is while the visible label reads UAE. */}
          <HubClock city="UAE" timeZone="Asia/Dubai" />
          <HubClock city="Vellore" timeZone="Asia/Kolkata" />
          <span className="label-mono !text-white/40">
            NDA guaranteed · 45-minute consultation
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { CountUp, Marquee } from "@/components/ui/Interactions";

/**
 * Stats strip + capability marquee.
 *
 * ⚠️ Every figure here is a PLACEHOLDER pending real numbers from the client.
 * See PROJECT.md §2.2 and §7 — the live site says "50+ projects" while the
 * Products page says "10+". Do not ship these.
 */

const STATS = [
  { value: 10, suffix: "+", label: "Platforms delivered", note: "⟨TBC⟩" },
  { value: 6, suffix: "", label: "Sectors in production", note: "⟨TBC⟩" },
  { value: 2, suffix: "", label: "Engineering hubs", note: "Dubai · Vellore" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Platform uptime", note: "⟨TBC⟩" },
];

const CAPABILITIES = [
  "Custom Software", "ERP", "CRM", "Workforce & Payroll", "IoT Telemetry",
  "AI Automation", "Mobile Apps", "Cloud Migration", "E-commerce",
  "UI/UX", "SEO", "Digital Marketing",
];

export default function Stats() {
  return (
    <section className="relative border-y border-line bg-surface">
      <div className="container-page grid grid-cols-2 gap-px py-14 lg:grid-cols-4 lg:py-16">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="group relative px-2 lg:px-8"
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
          >
            {/* Hairline that draws in on hover */}
            <span className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-line lg:block" />
            <span
              className="absolute left-0 top-2 hidden h-0 w-px bg-signal transition-[height] duration-700
                         ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:h-[calc(100%-1rem)] lg:block"
            />
            <div className="text-[clamp(2.25rem,4.4vw,3.5rem)] font-[560] leading-none tracking-[-0.03em]">
              <CountUp
                to={s.value}
                suffix={s.suffix}
                decimals={s.decimals ?? 0}
              />
            </div>
            <p className="mt-3 text-[0.9375rem] text-muted">{s.label}</p>
            <p className="label-mono mt-1.5">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-line py-5">
        <Marquee speed={46}>
          {CAPABILITIES.map((c) => (
            <span
              key={c}
              className="label-mono mx-6 inline-flex shrink-0 items-center gap-6 text-faint"
            >
              {c}
              <span className="h-1 w-1 rounded-full bg-line-strong" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

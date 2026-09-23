"use client";

import { TiltCard, Magnetic } from "@/components/ui/Interactions";

/**
 * Selected work — the six real client platforms.
 *
 * Content is transcribed from the client's Products & Portfolio page
 * (PROJECT.md §2.3). Nothing here is invented. Each card carries the sector,
 * the challenge and the solution, and leads with what the system does rather
 * than the project name — the result-first pattern from Lazarev.
 *
 * Each card owns a colour, and hovering it tints the card's chrome — a
 * smaller version of Lusion's per-project theme inheritance.
 */

const WORK = [
  {
    client: "Fitings Zone",
    sector: "Fintech · Service ops",
    title: "One platform for a sales team and a service team that were working blind to each other",
    challenge: "Disjointed sales communication and siloed service workflows slowing customer turnaround.",
    solution: "Centralised CRM unifying pipeline management, service tickets, sales funnel and real-time client tracking.",
    tags: ["Unified service ops", "End-to-end pipeline", "Real-time"],
    accent: "#2563eb",
  },
  {
    client: "Elite Medical",
    sector: "Healthcare",
    title: "Invoice matching that stopped being done by hand across clinical accounts",
    challenge: "Manual invoice matching and fragmented customer transaction records across clinical accounts.",
    solution: "Centralised B2B portal automating the sales pipeline with integrated ledger, tax compliance and client dashboard.",
    tags: ["Automated billing", "B2B transactions", "Customer portal"],
    accent: "#0d9488",
  },
  {
    client: "Uthmal Machinery",
    sector: "Manufacturing",
    title: "Shop-floor visibility for a plant that couldn't see its own inventory in real time",
    challenge: "Siloed procurement, delayed fabrication stages, no real-time machine or inventory visibility.",
    solution: "Integrated manufacturing execution ERP connecting bill-of-materials, shop-floor stations and supply logs.",
    tags: ["BOM flow", "Multi-stage production", "Full visibility"],
    accent: "#ea580c",
  },
  {
    client: "Dynamic Solar",
    sector: "Energy · Production",
    title: "Technician scheduling and parts telemetry pulled into one control surface",
    challenge: "Manual production tracking for battery systems and uncoordinated technician scheduling across sites.",
    solution: "Tailored business suite for production milestone dispatch, parts telemetry and field job allocation.",
    tags: ["Structured workflows", "Production scheduling", "Field dispatch"],
    accent: "#ca8a04",
  },
  {
    client: "Mega Connect",
    sector: "Telecom · UAE",
    title: "A UAE enterprise presence for an Etisalat channel partner, built for trust and speed",
    challenge: "Establishing high-trust corporate positioning in competitive UAE enterprise connectivity markets.",
    solution: "Performant custom web architecture with fast load and clear service presentation.",
    tags: ["UAE presence", "< 0.4s load", "Telecom services"],
    accent: "#7c3aed",
  },
  {
    client: "RG Robotics",
    sector: "Elevators · IoT",
    title: "Making IoT sensor telemetry and vertical transport legible to industrial buyers",
    challenge: "Communicating sophisticated IoT sensor telemetry and vertical-transport hardware to industrial verticals.",
    solution: "Interactive solution breakdowns with rapid technical consultation enquiry flows.",
    tags: ["Engineering showcase", "IoT telemetry", "Technical UI"],
    accent: "#0891b2",
  },
];

export default function Work() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <p className="label-mono mb-4" data-reveal>
              Selected work
            </p>
            <h2
              className="max-w-[16ch] text-[clamp(2rem,4.6vw,3.25rem)] font-[560] leading-[1.02] tracking-[-0.03em]"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              Six systems, running in production.
            </h2>
          </div>
          <Magnetic>
            <a
              href="/work"
              className="link-wipe label-mono !text-ink"
              data-cursor
            >
              All case studies →
            </a>
          </Magnetic>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {WORK.map((w, i) => (
            <div
              key={w.client}
              data-reveal
              style={{ "--reveal-delay": `${(i % 2) * 110}ms` } as React.CSSProperties}
            >
              <TiltCard max={5}>
                <a
                  href={`/work/${w.client.toLowerCase().replace(/\s+/g, "-")}`}
                  data-cursor="lens"
                  className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line
                             bg-surface p-7 transition-[border-color,box-shadow] duration-500
                             hover:border-transparent hover:shadow-[0_28px_70px_-32px_rgba(11,15,20,0.3)] lg:p-9"
                  style={{ "--accent": w.accent } as React.CSSProperties}
                >
                  {/* Accent wash that fades in on hover */}
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500
                               group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(120% 90% at 100% 0%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 62%)",
                    }}
                    aria-hidden="true"
                  />
                  {/* Accent rule that draws across the top */}
                  <span
                    className="pointer-events-none absolute left-0 top-0 h-px w-0 transition-[width] duration-700
                               ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                    style={{ background: "var(--accent)" }}
                    aria-hidden="true"
                  />

                  <div className="relative flex items-center justify-between gap-4">
                    <span
                      className="label-mono transition-colors duration-300"
                      style={{ color: "var(--accent)" }}
                    >
                      {w.sector}
                    </span>
                    <span className="label-mono !text-faint">{w.client}</span>
                  </div>

                  <h3 className="relative mt-6 text-[1.375rem] font-[560] leading-[1.18] tracking-[-0.022em] lg:text-[1.5rem]">
                    {w.title}
                  </h3>

                  <dl className="relative mt-6 space-y-4 border-t border-line pt-5">
                    <div>
                      <dt className="label-mono">Challenge</dt>
                      <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-muted">
                        {w.challenge}
                      </dd>
                    </div>
                    <div>
                      <dt className="label-mono">What we built</dt>
                      <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-muted">
                        {w.solution}
                      </dd>
                    </div>
                  </dl>

                  <div className="relative mt-7 flex flex-wrap gap-2 pt-1">
                    {w.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-pill border border-line px-3 py-1.5 text-[0.75rem] text-muted
                                   transition-colors duration-300 group-hover:border-line-strong"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="relative mt-7 inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink">
                    View case study
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                </a>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

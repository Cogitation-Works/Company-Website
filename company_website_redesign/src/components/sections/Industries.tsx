"use client";

import { useState } from "react";

/**
 * Industries — the section that makes agriculture and IoT read as a
 * continuation of existing work rather than a new business.
 *
 * Each industry draws its own SVG "operations diagram": sensors feeding a
 * gateway, feeding services, feeding a dashboard. The paths animate on
 * selection. Pure inline SVG — no 3D, no images, a few KB, and it shows the
 * actual mechanism rather than decorating around it.
 *
 * ⚠️ Photography for each industry is pending (PROJECT.md §6.2).
 */

const INDUSTRIES = [
  { id: "manufacturing", name: "Manufacturing", line: "Shop-floor stations, BOM flow and supply logs in one execution layer.", nodes: ["Machines", "Stations", "MES", "Plant view"], live: true },
  { id: "healthcare", name: "Healthcare", line: "Clinical accounts, ledgers and billing without manual reconciliation.", nodes: ["Accounts", "Ledger", "Billing", "Portal"], live: true },
  { id: "fintech", name: "Fintech", line: "Service tickets and sales pipeline unified with real-time client tracking.", nodes: ["Leads", "Pipeline", "Tickets", "Dashboard"], live: true },
  { id: "telecom", name: "Telecom", line: "Enterprise connectivity positioning built for the UAE market.", nodes: ["Network", "Partners", "Services", "Enquiry"], live: true },
  { id: "elevators-iot", name: "Elevators & IoT", line: "Sensor telemetry from vertical transport, made legible to buyers.", nodes: ["Sensors", "Gateway", "Telemetry", "Portal"], live: true },
  { id: "agriculture", name: "Agriculture", line: "Field sensors, irrigation stages and yield — the same operational spine.", nodes: ["Field sensors", "Gateway", "Agronomy", "Yield view"], live: false },
];

function Diagram({ nodes, activeKey }: { nodes: string[]; activeKey: string }) {
  return (
    <svg
      /* Last node ends at x = 40 + 3*200 + 92 = 732 — the box must clear it. */
      viewBox="0 0 764 132"
      className="h-auto w-full"
      role="img"
      aria-label={`Data path: ${nodes.join(" to ")}`}
    >
      {nodes.map((n, i) => {
        const x = 40 + i * 200;
        return (
          <g key={`${activeKey}-${i}`}>
            {i < nodes.length - 1 && (
              <line
                x1={x + 46} y1={62} x2={x + 176} y2={62}
                stroke="var(--color-line-strong)" strokeWidth="1.5"
                strokeDasharray="130" strokeDashoffset="130"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="130" to="0" dur="0.5s"
                  begin={`${0.16 + i * 0.16}s`} fill="freeze"
                />
              </line>
            )}
            {/* Amber pulse travelling the path — the "live signal" */}
            {i < nodes.length - 1 && (
              <circle r="3" fill="var(--color-live)" opacity="0">
                <animate attributeName="opacity" values="0;1;1;0" dur="1.7s"
                  begin={`${0.7 + i * 0.22}s`} repeatCount="indefinite" />
                <animate attributeName="cx" from={x + 46} to={x + 176} dur="1.7s"
                  begin={`${0.7 + i * 0.22}s`} repeatCount="indefinite" />
                <animate attributeName="cy" values="62;62" dur="1.7s"
                  begin={`${0.7 + i * 0.22}s`} repeatCount="indefinite" />
              </circle>
            )}
            <rect
              x={x - 6} y={42} width="92" height="40" rx="8"
              fill="var(--color-surface)" stroke="var(--color-line-strong)" strokeWidth="1.5"
              opacity="0"
            >
              <animate attributeName="opacity" from="0" to="1" dur="0.4s"
                begin={`${i * 0.16}s`} fill="freeze" />
            </rect>
            <text
              x={x + 40} y={66} textAnchor="middle"
              className="fill-ink-soft" style={{ fontSize: 12, fontFamily: "var(--font-mono)" }}
              opacity="0"
            >
              {n}
              <animate attributeName="opacity" from="0" to="1" dur="0.4s"
                begin={`${0.1 + i * 0.16}s`} fill="freeze" />
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Industries() {
  const [active, setActive] = useState(INDUSTRIES[0]);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-page">
        <p className="label-mono mb-4" data-reveal>
          Where these systems run
        </p>
        <h2
          className="max-w-[20ch] text-[clamp(2rem,4.6vw,3.25rem)] font-[560] leading-[1.02] tracking-[-0.03em]"
          data-reveal
          style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
        >
          Different industry. Same operational spine.
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          {/* Selector */}
          <div className="flex flex-col" data-reveal>
            {INDUSTRIES.map((ind) => {
              const on = ind.id === active.id;
              return (
                <button
                  key={ind.id}
                  type="button"
                  onMouseEnter={() => setActive(ind)}
                  onFocus={() => setActive(ind)}
                  onClick={() => setActive(ind)}
                  aria-pressed={on}
                  data-cursor
                  className="group relative flex items-center gap-3 border-b border-line py-4 text-left"
                >
                  <span
                    className={`absolute left-0 h-px bg-signal transition-[width] duration-500
                                ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? "w-full" : "w-0"}`}
                    style={{ bottom: -1 }}
                  />
                  <span
                    className={`text-[1.0625rem] font-medium transition-colors duration-300
                                ${on ? "text-ink" : "text-muted group-hover:text-ink"}`}
                  >
                    {ind.name}
                  </span>
                  {!ind.live && (
                    <span className="rounded-pill bg-live-soft px-2 py-0.5 text-[0.6875rem] font-medium text-live">
                      New
                    </span>
                  )}
                  <span
                    className={`ml-auto transition-all duration-300 ${
                      on ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                    }`}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div className="min-w-0">
            <div
              key={active.id}
              className="rounded-card border border-line bg-surface p-7 lg:p-10"
              style={{ animation: "fade-rise 560ms var(--ease-out-expo) both" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
                </span>
                <span className="label-mono">
                  {active.live ? "In production" : "Now entering"}
                </span>
              </div>

              <p className="mt-5 max-w-[34ch] text-[1.25rem] font-[560] leading-snug tracking-[-0.02em] lg:text-[1.5rem]">
                {active.line}
              </p>

              <div className="mt-8 overflow-x-auto">
                <div className="min-w-[680px]">
                  <Diagram nodes={active.nodes} activeKey={active.id} />
                </div>
              </div>

              <a
                href={`/industries/${active.id}`}
                className="link-wipe mt-6 inline-block text-[0.875rem] font-medium"
                data-cursor
              >
                {active.name} solutions →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

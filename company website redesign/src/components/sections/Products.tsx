"use client";

import { useSyncExternalStore } from "react";
import { Magnetic } from "@/components/ui/Interactions";

/**
 * The four owned platforms, as an interactive index rather than a card grid.
 *
 * Hovering a row expands it and previews its detail — the hover-preview index
 * pattern from Yambo's project table, applied to products. Keyboard focus
 * drives the same state, so it works without a pointer.
 *
 * Content from PROJECT.md §2.4. Metrics marked ⟨TBC⟩ are placeholders.
 */

const PRODUCTS = [
  {
    id: "crm",
    name: "Cogitation CRM",
    kicker: "Integrated business & sales CRM",
    metric: "+38%",
    metricLabel: "pipeline velocity ⟨TBC⟩",
    desc: "Unified customer relationship and sales pipeline platform with multi-channel communications, deal tracking, lead scoring and automated service workflows.",
    features: ["360° customer timeline", "Automated trigger cadence", "Deal & stage tracking", "Service workflow automation"],
  },
  {
    id: "hrms",
    name: "HRMS Pro",
    kicker: "Workforce, attendance & payroll",
    metric: "50,000+",
    metricLabel: "staff at scale ⟨TBC⟩",
    desc: "Full lifecycle workforce platform: biometric and geofenced clock-in, multi-country tax compliance, dynamic shift scheduling and automated payroll.",
    features: ["Biometric & geofence clock-in", "1-click bank disbursement", "Dynamic shift rostering", "Encrypted employee records"],
  },
  {
    id: "erp",
    name: "Cogitation ERP",
    kicker: "Manufacturing & operations",
    metric: "99.3%",
    metricLabel: "resource precision ⟨TBC⟩",
    desc: "End-to-end resource planning centralising supply chain, procurement, inventory, production floor operations and financial auditing.",
    features: ["End-to-end visibility", "Warehouse & inventory control", "Multi-stage scheduling", "Real-time procurement audit"],
  },
  {
    id: "cogi-ai",
    name: "Cogi AI",
    kicker: "Automotive & cognitive agent",
    metric: "<120ms",
    metricLabel: "inference ⟨TBC⟩",
    desc: "Autonomous agent for automotive diagnostics, telemetry interpretation and intelligent workflow automation across unstructured data.",
    features: ["Automotive telemetry AI", "Context-aware orchestration", "RAG knowledge querying", "Autonomous workflow execution"],
  },
];

/**
 * Which row is open, held OUTSIDE React.
 *
 * The magnifier renders the whole page a second time, which means this
 * component is mounted twice. With `useState` the two copies each had their
 * own value: the real page opened HRMS Pro, the copy stayed on the default
 * CRM row, and magnifying an expanded row showed the collapsed version of it.
 * A module-level store is read by both mounts, so the duplicate always shows
 * what is actually on screen.
 *
 * The rule this is an instance of: any component whose state changes what is
 * PAINTED has to keep that state outside React, or the magnifier will show a
 * stale copy of it.
 */
let openId: string | null = PRODUCTS[0].id;
const listeners = new Set<() => void>();
const openStore = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
  get: () => openId,
  set(v: string | null) {
    if (v === openId) return;
    openId = v;
    listeners.forEach((l) => l());
  },
};

export default function Products() {
  const active = useSyncExternalStore(
    openStore.subscribe,
    openStore.get,
    openStore.get,
  );
  const setActive = openStore.set;

  return (
    <section className="relative border-t border-line bg-surface py-24 lg:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-mono mb-4" data-reveal>
              Ready-to-deploy engines
            </p>
            <h2
              className="max-w-[18ch] text-[clamp(2rem,4.6vw,3.25rem)] font-[560] leading-[1.02] tracking-[-0.03em]"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              Four platforms you can deploy, not build.
            </h2>
          </div>
          <p
            className="max-w-sm text-[0.9375rem] leading-relaxed text-muted"
            data-reveal
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            Pre-architected, cloud-native and high-concurrency. Customised to
            your operation, and the intellectual property is yours.
          </p>
        </div>

        <div className="mt-14 border-t border-line">
          {PRODUCTS.map((p, i) => {
            const open = active === p.id;
            return (
              <div
                key={p.id}
                className="group border-b border-line"
                onMouseEnter={() => setActive(p.id)}
                onFocusCapture={() => setActive(p.id)}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setActive(open ? null : p.id)}
                  className="flex w-full items-center gap-6 py-7 text-left"
                  data-cursor
                >
                  <span className="label-mono w-8 shrink-0 text-signal">
                    0{i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-[clamp(1.5rem,3.2vw,2.25rem)] font-[560] leading-tight tracking-[-0.028em]
                                  transition-colors duration-300 ${open ? "text-ink" : "text-ink/45"}`}
                    >
                      {p.name}
                    </span>
                    <span className="mt-1 block text-[0.875rem] text-muted">
                      {p.kicker}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-right sm:block">
                    <span className="num block text-[1.375rem] font-[560] text-live">
                      {p.metric}
                    </span>
                    <span className="label-mono">{p.metricLabel}</span>
                  </span>
                  <span
                    className={`shrink-0 text-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                                ${open ? "rotate-45" : ""}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {/* Grid-rows trick: animates height to auto without measuring. */}
                <div
                  className="grid transition-[grid-template-rows,opacity] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    gridTemplateRows: open ? "1fr" : "0fr",
                    opacity: open ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-8 pb-9 pl-0 sm:pl-14 md:grid-cols-[1.2fr_1fr]">
                      <p className="max-w-xl text-[0.9375rem] leading-relaxed text-muted">
                        {p.desc}
                      </p>
                      <ul className="space-y-2.5">
                        {p.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-3 text-[0.875rem] text-ink-soft"
                          >
                            <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-live" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-3 md:col-span-2">
                        <Magnetic>
                          <a
                            href={`/products/${p.id}`}
                            className="inline-flex h-11 items-center rounded-pill bg-ink px-6 text-[0.875rem]
                                       font-medium text-white transition-colors hover:bg-signal"
                          >
                            Product specs
                          </a>
                        </Magnetic>
                        <Magnetic>
                          <a
                            href="/contact"
                            className="inline-flex h-11 items-center rounded-pill border border-line-strong px-6
                                       text-[0.875rem] font-medium transition-colors hover:border-ink"
                          >
                            Request live demo
                          </a>
                        </Magnetic>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

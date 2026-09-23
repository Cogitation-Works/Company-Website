import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { NextLink } from "@/components/layout/Blocks";
import IndustriesField from "@/components/heroes/IndustriesField";
import { INDUSTRIES } from "@/content/industries";

export const metadata: Metadata = {
  title: "Industries — manufacturing, healthcare, fintech, telecom, energy, IoT, agriculture",
  description:
    "Enterprise software for the operations that run on it: factories, clinics, financial services, telecom networks, energy production, connected buildings and farms.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        tall
        figure={<IndustriesField />}
        eyebrow="Industries"
        title="Seven sectors. The same question in each one."
        lead="Where is the work right now, and what does the system do about it? The answer looks different on a shop floor than it does in a clinic, but the shape of the problem does not change."
        meta={[
          { label: "Sectors", value: "7" },
          { label: "Delivered in", value: "6" },
          { label: "New direction", value: "Agriculture" },
        ]}
      />

      <div className="container-page py-16 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              data-cursor="lens"
              className="group relative flex min-h-[19rem] flex-col justify-end overflow-hidden rounded-card border border-line bg-deep p-7 text-on-deep"
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
            >
              {ind.image ? (
                <picture>
                  {/* Cards are ~400–760px wide, so the smallest variant is the
                      right one — no need to ship the hero-sized file here. */}
                  <source
                    srcSet={`/industries/${ind.image}-${ind.imageWidths?.[0] ?? 1600}.avif`}
                    type="image/avif"
                  />
                  <img
                    src={`/industries/${ind.image}-${ind.imageWidths?.[0] ?? 1600}.webp`}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-55 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:opacity-70"
                  />
                </picture>
              ) : (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  style={{
                    background: `radial-gradient(130% 100% at 15% 0%, color-mix(in oklab, ${ind.accent} 40%, transparent), transparent 68%)`,
                  }}
                />
              )}

              {/* Legibility scrim — the type sits over photography. */}
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(6,9,13,0.92) 8%, rgba(6,9,13,0.35) 52%, transparent 78%)",
                }}
              />

              <div className="relative">
                {ind.isNew ? (
                  <span
                    className="mb-4 inline-flex items-center gap-2 rounded-pill border px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em]"
                    style={{ borderColor: `${ind.accent}80`, color: ind.accent }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    New direction
                  </span>
                ) : null}
                <h2 className="text-[1.5rem] font-[560] tracking-[-0.026em]">
                  {ind.name}
                </h2>
                <p className="mt-2 max-w-[28ch] text-[0.9375rem] leading-snug text-on-deep-muted">
                  {ind.headline}
                </p>
                <span className="label-mono mt-5 inline-flex items-center gap-2 !text-on-deep">
                  {ind.cases.length
                    ? `${ind.cases.length} case ${ind.cases.length === 1 ? "study" : "studies"}`
                    : "Capability"}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <NextLink
            kicker="Next"
            label="What we are building beyond software"
            href="/ventures"
          />
        </div>
      </div>
    </>
  );
}

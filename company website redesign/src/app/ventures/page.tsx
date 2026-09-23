import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { StatusChip, NextLink } from "@/components/layout/Blocks";
import OrbitHero from "@/components/heroes/OrbitHero";
import { VENTURES } from "@/content/ventures";

export const metadata: Metadata = {
  title: "Ventures — what we are building next",
  description:
    "Agriculture IoT and drone logistics, a Sunday delivery operation in the Vellore region, and the Readers Club community. In development — Cogitation Works sells IT services and software today.",
  alternates: { canonical: "/ventures" },
};

/**
 * Ventures index. See PROJECT.md §1.5.
 *
 * The disclaimer at the top is not decoration and must not be removed. A CTO
 * evaluating an ERP vendor has to be able to tell in one sentence that this is
 * where the company is going, not what it currently sells.
 */
export default function VenturesPage() {
  const commercial = VENTURES.filter((v) => v.kind === "venture");
  const community = VENTURES.filter((v) => v.kind === "community");

  return (
    <>
      <PageHero
        tall
        figure={
          <OrbitHero
            nodes={VENTURES.map((v) => ({ label: v.name, accent: v.accent }))}
          />
        }
        eyebrow="Ventures"
        title="What we are building next."
        lead="Cogitation Works sells IT services and software. Everything on this page is in development or upcoming — none of it is a service you can buy today. It is here because it is the honest answer to where this company is going."
        meta={[
          { label: "In development", value: "2 ventures" },
          { label: "Running now", value: "1 community" },
          { label: "Sold today", value: "Software & services only" },
        ]}
      />

      <div className="container-page py-16 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          {commercial.map((v, i) => (
            <Link
              key={v.slug}
              href={`/ventures/${v.slug}`}
              data-cursor="lens"
              className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface p-8 transition-[border-color,box-shadow] duration-500 hover:shadow-[0_28px_70px_-32px_rgba(11,15,20,0.3)] lg:p-10"
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-px w-0 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                style={{ background: v.accent }}
              />
              <div className="flex items-center justify-between gap-4">
                <span className="label-mono">{v.kicker}</span>
                <StatusChip status={v.status} accent={v.accent} />
              </div>
              <h2 className="mt-7 text-[clamp(1.625rem,3.2vw,2.25rem)] font-[560] leading-[1.06] tracking-[-0.03em]">
                {v.name}
              </h2>
              <p className="mt-4 max-w-[44ch] text-lead text-muted">{v.summary}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium">
                Read more
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        {community.map((v) => (
          <section
            key={v.slug}
            className="mt-16 rounded-card border border-line bg-deep p-8 text-on-deep lg:p-12"
            data-reveal
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="label-mono !text-on-deep-muted">{v.kicker}</span>
              <StatusChip status={v.status} accent={v.accent} />
            </div>
            <h2 className="mt-6 text-[clamp(1.625rem,3.2vw,2.25rem)] font-[560] tracking-[-0.03em]">
              {v.name}
            </h2>
            <p className="mt-4 max-w-[52ch] text-lead text-on-deep-muted">
              {v.summary}
            </p>
            <Link
              href={`/ventures/${v.slug}`}
              data-cursor
              className="link-wipe mt-8 inline-block text-[0.9375rem] font-medium !text-on-deep"
            >
              About the Readers Club →
            </Link>
          </section>
        ))}

        <div className="mt-16">
          <NextLink kicker="Back to" label="What we build today" href="/products" />
        </div>
      </div>
    </>
  );
}

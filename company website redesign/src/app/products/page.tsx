import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { NextLink, Tbc } from "@/components/layout/Blocks";
import { PRODUCTS } from "@/content/products";

export const metadata: Metadata = {
  title: "Products — ready-to-deploy enterprise software engines",
  description:
    "Four pre-architected platforms: Cogitation CRM, HRMS Pro, Cogitation ERP and Cogi AI. Cloud native, high concurrency, deployable without building from zero.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Four engines you do not have to build from zero."
        lead="Pre-architected, battle-tested platforms that are configured to an operation rather than written for it. Where a custom build is the right answer, we say so — but most of what companies ask us for has been built before."
        meta={[
          { label: "Platforms", value: "4" },
          { label: "Architecture", value: "Cloud native · High concurrency" },
          { label: "Deployment", value: "Managed or single-tenant" },
        ]}
      />

      <div className="container-page py-6 lg:py-10">
        {PRODUCTS.map((p, i) => (
          <article
            key={p.slug}
            className="group grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10 lg:py-20"
            data-reveal
            style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
          >
            <div className="lg:col-span-5">
              <span className="label-mono" style={{ color: p.accent }}>
                {p.kicker}
              </span>
              <h2 className="mt-4 text-[clamp(1.875rem,4vw,2.75rem)] font-[560] leading-[1.04] tracking-[-0.032em]">
                <Link href={`/products/${p.slug}`} className="link-wipe" data-cursor>
                  {p.name}
                </Link>
              </h2>
              <p className="mt-5 max-w-[42ch] text-lead text-muted">{p.summary}</p>

              <div className="mt-8 flex items-baseline gap-3">
                <span
                  className="num text-[2.5rem] leading-none tracking-[-0.04em]"
                  style={{ color: p.accent }}
                >
                  {p.metric}
                </span>
                <span className="label-mono">
                  {p.metricLabel} {p.metricTbc ? <Tbc /> : null}
                </span>
              </div>

              <Link
                href={`/products/${p.slug}`}
                data-cursor
                className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium"
              >
                Product specs
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>

            <ul className="grid gap-px self-start overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:col-span-7">
              {p.features.map((f) => (
                <li
                  key={f}
                  className="bg-surface px-6 py-5 text-[0.9375rem] text-ink-soft"
                >
                  {f}
                </li>
              ))}
            </ul>
          </article>
        ))}

        <NextLink
          kicker="Next"
          label="Where these platforms are running"
          href="/industries"
        />
      </div>
    </>
  );
}

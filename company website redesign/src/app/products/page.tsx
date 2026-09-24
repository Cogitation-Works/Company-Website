import type { Metadata } from "next";
import Link from "next/link";
import { NextLink, Tbc } from "@/components/layout/Blocks";
import { FanHero } from "@/components/heroes/Heroes";
import { ParallaxCards } from "@/components/scroll/Effects";
import { OWN_PRODUCTS, BY_STAGE, STAGE_LABEL } from "@/content/products";

export const metadata: Metadata = {
  title: "Products — what we have built for ourselves",
  description:
    "Everything Cogitation Works built for itself: HRMS Pro and the Readers Club running now, CRM, ERP and Cogi AI available to deploy, Sunday delivery in progress, agri-IoT and robotics upcoming.",
  alternates: { canonical: "/products" },
};

/**
 * Our own products — grouped by STAGE, not by category.
 *
 * This page used to hold only the four software engines while the meat shop,
 * Readers Club and agri work lived under a separate "ventures" section. Two
 * sections for one idea. They are all things this company built for itself;
 * what separates them is how far along they are. Client work is at /work and
 * does not appear here.
 */
export default function ProductsPage() {
  return (
    <>
      <FanHero
        cards={OWN_PRODUCTS.slice(0, 5).map((p) => ({
          name: p.name,
          accent: p.accent,
        }))}
        title="What we have built for ourselves."
        lead="Software we license, and operations we run. Two of these are live right now, three are deployable today, and the rest are honest about not being finished. Work we have delivered for clients is kept separate."
      />

      <div className="container-page py-16 lg:py-24">
        {BY_STAGE.filter((g) => g.items.length > 0).map((group, gi) => (
          <section key={group.stage} className={gi === 0 ? "" : "mt-20 lg:mt-28"}>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-5">
              <h2 className="text-[clamp(1.5rem,3vw,2.125rem)] font-[560] tracking-[-0.03em]">
                {STAGE_LABEL[group.stage]}
              </h2>
              <span className="label-mono">
                {String(group.items.length).padStart(2, "0")}{" "}
                {group.items.length === 1 ? "product" : "products"}
              </span>
            </div>

            <ParallaxCards
              className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              amount={34}
            >
              {group.items.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  data-cursor="lens"
                  className="group relative flex min-h-[20rem] flex-col justify-between overflow-hidden rounded-card border border-line bg-surface p-7 transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_rgba(11,15,20,0.35)]"
                  style={{ "--accent": p.accent } as React.CSSProperties}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 h-px w-0 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                    style={{ background: p.accent }}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: p.accent }}
                  />

                  <div className="relative">
                    <span className="label-mono" style={{ color: p.accent }}>
                      {p.kicker}
                    </span>
                    <h3 className="mt-4 text-[1.375rem] font-[560] leading-[1.14] tracking-[-0.024em]">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                      {p.summary}
                    </p>
                  </div>

                  <div className="relative mt-7 flex items-end justify-between gap-4 border-t border-line pt-5">
                    {p.metric ? (
                      <span className="flex items-baseline gap-2">
                        <span
                          className="num text-[1.5rem] leading-none tracking-[-0.03em]"
                          style={{ color: p.accent }}
                        >
                          {p.metric}
                        </span>
                        <span className="label-mono">
                          {p.metricTbc ? <Tbc /> : p.metricLabel}
                        </span>
                      </span>
                    ) : (
                      <span className="label-mono">{p.family}</span>
                    )}
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </ParallaxCards>
          </section>
        ))}

        <div className="mt-20">
          <NextLink
            kicker="Different thing"
            label="Work we have delivered for clients"
            href="/work"
          />
        </div>
      </div>
    </>
  );
}

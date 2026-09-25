import type { Metadata } from "next";
import Link from "next/link";
import { NextLink } from "@/components/layout/Blocks";
import { ChapterHero } from "@/components/heroes/Heroes";
import DrawPath from "@/components/scroll/DrawPath";
import { StackCards } from "@/components/scroll/Effects";
import { PILLARS } from "@/content/services";

export const metadata: Metadata = {
  title: "Services — software engineering, cloud, mobile, AI and IoT",
  description:
    "Four engineering pillars: Frontend & Edge, Backend & Cloud, Mobile Systems, and AI & Infrastructure. Custom software, web and mobile applications, e-commerce, cloud architecture, IoT and automation.",
  alternates: { canonical: "/services" },
};

/**
 * Services index — the Kode Immersive chapter pattern (research R1).
 *
 * Four numbered chapters rather than eleven service pages. Eleven thin pages
 * would compete with each other for the same searches; four substantial ones
 * do not. Every individual service still appears by name inside its pillar, so
 * nothing loses its landing point.
 */
export default function ServicesPage() {
  return (
    <>
      <ChapterHero
        chapters={PILLARS.map((p) => ({
          index: p.index,
          name: p.name,
          accent: p.accent,
          slug: p.slug,
        }))}
      />

      <div className="container-page relative py-6 lg:py-10">
        {/* A spine that draws itself down the four chapters as you scroll, with
            a pulse travelling on it. The route is the argument: four layers,
            one stack. */}
        <DrawPath
          /* z-20 clears the stacked cards, which carry z-index 1…6. Without it
             the spine was painted underneath them and only showed in the gaps,
             so the line it draws read as broken rather than continuous. It is
             pointer-events-none, so sitting on top costs no interaction. */
          className="pointer-events-none absolute left-[calc(var(--spacing-gutter)+0.5rem)] top-0 z-20 hidden h-full w-16 text-ink lg:block"
          viewBox="0 0 40 1000"
          d="M 20 0 C 4 120, 36 240, 20 360 C 4 480, 36 600, 20 720 C 4 840, 30 930, 20 1000"
          accent="var(--color-signal)"
          width={1.25}
        />

        {/* The four pillars stack: each card pins, the next slides over it, and
            the one underneath scales down and dims. A list of four would have
            been four scrolls of nothing happening. */}
        <StackCards
          items={PILLARS.map((p) => ({
            id: p.slug,
            node: (
              <article
                className="group grid gap-8 rounded-card border border-line bg-surface p-8 shadow-[0_30px_80px_-40px_rgba(11,15,20,0.35)] lg:grid-cols-12 lg:gap-10 lg:p-12"
                style={{ "--accent": p.accent } as React.CSSProperties}
              >
                <div className="lg:col-span-3">
                  <span
                    className="block text-[clamp(3rem,7vw,5rem)] font-[560] leading-none tracking-[-0.045em]"
                    style={{ color: p.accent }}
                  >
                    {p.index}
                  </span>
                  <span className="label-mono mt-3 block">{p.tagline}</span>
                </div>

                <div className="lg:col-span-6">
                  <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-[560] leading-[1.06] tracking-[-0.03em]">
                    <Link href={`/services/${p.slug}`} className="link-wipe" data-cursor>
                      {p.name}
                    </Link>
                  </h2>
                  <p className="mt-5 max-w-[52ch] text-lead text-muted">
                    {p.summary}
                  </p>
                  <Link
                    href={`/services/${p.slug}`}
                    data-cursor
                    className="mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-medium"
                  >
                    Explore {p.name}
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </Link>
                </div>

                <ul className="space-y-3 lg:col-span-3">
                  {p.services.map((s) => (
                    <li
                      key={s.name}
                      className="border-t border-line pt-3 text-[0.875rem] text-ink-soft"
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
              </article>
            ),
          }))}
        />

        {/* Custom build, said plainly and given its own block. It is what most
            enquiries are for, and it was previously one line inside pillar 002
            where nobody would find it. */}
        <section className="mt-16 rounded-card border border-line bg-deep p-8 text-on-deep lg:mt-20 lg:p-14">
          <p className="label-mono !text-on-deep-muted">Most of what we do</p>
          <h2 className="mt-5 max-w-[22ch] text-[clamp(1.75rem,4vw,2.75rem)] font-[560] leading-[1.06] tracking-[-0.03em]">
            If nothing off the shelf fits, we build it from scratch.
          </h2>
          <p className="mt-6 max-w-[62ch] text-lead text-on-deep-muted">
            Custom software is the majority of our work. A platform configured
            around someone else&rsquo;s assumptions is cheaper on the invoice and
            more expensive everywhere else — in the workarounds, the retraining,
            and the process that quietly bends to fit the tool.
          </p>
          <ul className="mt-9 grid gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              {
                t: "Written to your process",
                d: "We start from how the work is actually performed, not from how it is documented.",
              },
              {
                t: "You own all of it",
                d: "Code, infrastructure definitions and the deployment pipeline. Owning the app but not the means to ship it is not ownership.",
              },
              {
                t: "We will say when not to",
                d: "Where an existing platform genuinely fits, we say so. A custom build you did not need is the most expensive thing we could sell you.",
              },
            ].map((c) => (
              <li key={c.t} className="bg-deep p-6 lg:p-7">
                <h3 className="text-[1.0625rem] font-[560] tracking-[-0.018em]">
                  {c.t}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-on-deep-muted">
                  {c.d}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <NextLink
          kicker="Next"
          label="See what these look like in production"
          href="/work"
        />
      </div>
    </>
  );
}

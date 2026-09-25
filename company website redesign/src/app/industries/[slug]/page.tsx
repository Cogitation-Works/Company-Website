import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import { Section, NextLink } from "@/components/layout/Blocks";
import ScrollStory from "@/components/scroll/ScrollStory";
import { INDUSTRIES, getIndustry } from "@/content/industries";
import { WORK } from "@/content/work";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return {
    title: `${ind.name} software — ${ind.headline}`,
    description: ind.summary,
    alternates: { canonical: `/industries/${ind.slug}` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const idx = INDUSTRIES.findIndex((i) => i.slug === slug);
  const next = INDUSTRIES[(idx + 1) % INDUSTRIES.length];
  const cases = WORK.filter((w) => ind.cases.includes(w.slug));
  const widest = ind.imageWidths?.[ind.imageWidths.length - 1];

  return (
    <>
      <PageHero
        parent={{ label: "Industries", href: "/industries" }}
        eyebrow={ind.name}
        title={ind.headline}
        lead={ind.summary}
        accent={ind.accent}
        meta={[
          { label: "Platforms", value: ind.systems.slice(0, 2).join(" · ") },
          {
            label: "Case studies",
            value: cases.length ? String(cases.length) : "Capability",
          },
        ]}
      />

      {ind.image && widest ? (
        <figure className="relative aspect-[21/9] w-full overflow-hidden">
          <picture>
            <source
              srcSet={(ind.imageWidths ?? [widest])
                .map((w) => `/industries/${ind.image}-${w}.avif ${w}w`)
                .join(", ")}
              type="image/avif"
              sizes="100vw"
            />
            <img
              src={`/industries/${ind.image}-${widest}.webp`}
              alt={`${ind.name} operations`}
              className="h-full w-full object-cover"
            />
          </picture>
        </figure>
      ) : null}

      {/* Two columns from here down.
          The section headings used to sit in a 46ch block with the whole
          right-hand side of the page empty beside them. Now the left is a rail
          that stays with you — what the sector is, which platforms are
          involved, where the proof is and how to start — and the sections run
          down the right. Nothing in the rail is new copy: it is the same facts
          the page already states, put where the space was. */}
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <span
                className="inline-flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.12em]"
                style={{ color: ind.accent }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: ind.accent }}
                />
                {ind.name}
              </span>

              <p className="mt-6 text-[1.0625rem] leading-[1.5] tracking-[-0.012em] text-ink-soft">
                {ind.summary}
              </p>

              <dl className="mt-10 space-y-7 border-t border-line pt-7">
                <div>
                  <dt className="label-mono">What we bring</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {ind.systems.map((s) => (
                      <span
                        key={s}
                        className="rounded-pill border border-line-strong px-4 py-1.5 text-[0.8125rem] text-ink-soft"
                      >
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="label-mono">Delivered here</dt>
                  <dd className="mt-3 text-[0.9375rem] text-ink-soft">
                    {cases.length ? (
                      <ul className="space-y-1.5">
                        {cases.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/work/${c.slug}`}
                              className="link-wipe"
                              data-cursor
                            >
                              {c.client}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      // Honest: agriculture has no delivered case yet.
                      <span className="text-muted">
                        No case study in this sector yet — this is capability,
                        not a claim.
                      </span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="label-mono">Start here</dt>
                  <dd className="mt-3">
                    <Link
                      href="/contact"
                      className="inline-flex h-11 items-center rounded-pill bg-ink px-6 text-[0.875rem]
                                 font-medium text-white transition-colors hover:bg-signal"
                      data-cursor
                    >
                      Book an architecture call
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <p className="label-mono mb-4" data-reveal>
              The problem
            </p>
            <h2
              className="mb-10 text-[clamp(1.875rem,3.4vw,2.5rem)] font-[560] leading-[1.06] tracking-[-0.03em]"
              data-reveal
              style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
            >
              What we usually find in {ind.noun}
            </h2>
            <ol className="space-y-px overflow-hidden rounded-card border border-line bg-line">
              {ind.problems.map((p, i) => (
                <li
                  key={p}
                  className="bg-surface p-7"
                  data-reveal
                  style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                >
                  <span className="label-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-[1.0625rem] leading-[1.45] tracking-[-0.012em] text-ink-soft">
                    {p}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Video + stepped copy. Placeholder until the film lands — the prompt
          for each sector's film is ASSETS.md §4.7. */}
      {ind.story ? (
        <ScrollStory
          label={`${ind.name} — how it runs`}
          stages={ind.story}
          accent={ind.accent}
          note={ind.storyNote}
        />
      ) : null}

      {cases.length > 0 ? (
        <Section label="Proof" heading="Delivered in this sector">
          <div className="grid gap-6 md:grid-cols-2">
            {cases.map((c) => (
              <Link
                key={c.slug}
                href={`/work/${c.slug}`}
                data-cursor="lens"
                className="group rounded-card border border-line bg-surface p-8 transition-shadow duration-500 hover:shadow-[0_28px_70px_-32px_rgba(11,15,20,0.3)]"
                data-reveal
              >
                <span className="label-mono" style={{ color: c.accent }}>
                  {c.client}
                </span>
                <h3 className="mt-4 text-[1.25rem] font-[560] leading-[1.22] tracking-[-0.022em]">
                  {c.title}
                </h3>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-medium">
                  Read the case study
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <div className="container-page">
        <NextLink kicker="Next sector" label={next.name} href={`/industries/${next.slug}`} />
        <NextLink kicker="Or" label="Book an architecture call" href="/contact" />
      </div>
    </>
  );
}

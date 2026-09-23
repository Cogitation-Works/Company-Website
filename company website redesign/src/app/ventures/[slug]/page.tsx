import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import { Section, StatusChip, NextLink, Tbc } from "@/components/layout/Blocks";
import { VENTURES, getVenture } from "@/content/ventures";

export function generateStaticParams() {
  return VENTURES.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = getVenture(slug);
  if (!v) return {};
  return {
    title: `${v.name} — ${v.status}`,
    description: v.summary,
    alternates: { canonical: `/ventures/${v.slug}` },
  };
}

export default async function VenturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = getVenture(slug);
  if (!v) notFound();

  const idx = VENTURES.findIndex((x) => x.slug === slug);
  const next = VENTURES[(idx + 1) % VENTURES.length];

  return (
    <>
      <PageHero
        parent={{ label: "Ventures", href: "/ventures" }}
        eyebrow={v.kicker}
        title={v.name}
        lead={v.summary}
        accent={v.accent}
      >
        <div
          className="mt-8"
          data-reveal
          style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
        >
          <StatusChip status={v.status} accent={v.accent} />
        </div>
      </PageHero>

      <Section>
        <div className="max-w-[62ch] space-y-7">
          {v.body.map((para, i) => (
            <p
              key={i}
              className="text-[clamp(1.125rem,2.1vw,1.5rem)] leading-[1.48] tracking-[-0.016em] text-ink-soft"
              data-reveal
            >
              {para}
            </p>
          ))}
        </div>
      </Section>

      <Section tone="surface" label="Detail">
        <dl className="max-w-[72ch] divide-y divide-line border-y border-line">
          {v.facts.map((f) => (
            <div
              key={f.label}
              className="flex flex-wrap items-baseline justify-between gap-4 py-5"
            >
              <dt className="label-mono">{f.label}</dt>
              <dd className="text-[1.0625rem] tracking-[-0.014em]">
                {f.tbc ? <Tbc>{f.value}</Tbc> : f.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 max-w-[62ch] rounded-card border-l-2 bg-canvas p-7" style={{ borderColor: v.accent }}>
          <p className="label-mono">Why this is here</p>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
            {v.rationale}
          </p>
        </div>

        {v.relatedHref ? (
          <Link
            href={v.relatedHref.href}
            data-cursor
            className="link-wipe mt-10 inline-block text-[0.9375rem] font-medium"
          >
            Related — {v.relatedHref.label} →
          </Link>
        ) : null}
      </Section>

      <div className="container-page">
        <NextLink kicker="Next" label={next.name} href={`/ventures/${next.slug}`} />
        <NextLink kicker="What we sell today" label="Software & services" href="/services" />
      </div>
    </>
  );
}

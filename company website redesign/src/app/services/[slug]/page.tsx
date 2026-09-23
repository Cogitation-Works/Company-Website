import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import { Section, NumberedList, NextLink } from "@/components/layout/Blocks";
import { PILLARS, getPillar } from "@/content/services";

export function generateStaticParams() {
  return PILLARS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPillar(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.tagline}`,
    description: p.summary,
    alternates: { canonical: `/services/${p.slug}` },
  };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  const idx = PILLARS.findIndex((p) => p.slug === slug);
  const next = PILLARS[(idx + 1) % PILLARS.length];

  return (
    <>
      <PageHero
        parent={{ label: "Services", href: "/services" }}
        eyebrow={pillar.index}
        title={pillar.name}
        lead={pillar.summary}
        accent={pillar.accent}
        meta={[
          { label: "Capabilities", value: String(pillar.services.length) },
          { label: "Discipline", value: pillar.tagline },
        ]}
      />

      <Section label="What this covers" heading="Capabilities">
        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
          {pillar.services.map((s, i) => (
            <div
              key={s.name}
              className="bg-surface p-7 lg:p-9"
              data-reveal
              style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}
            >
              <h3 className="text-[1.25rem] font-[560] tracking-[-0.022em]">
                {s.name}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="surface"
        label="What you get"
        heading="What changes when this is done properly"
      >
        <NumberedList items={pillar.outcomes} />
      </Section>

      <div className="container-page">
        <NextLink kicker={`Next — ${next.index}`} label={next.name} href={`/services/${next.slug}`} />
        <NextLink kicker="Or" label="Talk to an architect" href="/contact" />
      </div>
    </>
  );
}

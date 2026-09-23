import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import { Section, StatusChip, NextLink, Tbc } from "@/components/layout/Blocks";
import ScrollStory from "@/components/scroll/ScrollStory";
import StickyConcept from "@/components/scroll/StickyConcept";
import Parallax from "@/components/scroll/Parallax";
import { PlateGrid } from "@/components/media/MediaPlate";
import { VENTURES, getVenture } from "@/content/ventures";
import { READERS, VENTURE_FILMS } from "@/content/media";

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

      {/* The scroll-scrubbed story. Runs on a designed holding plate until the
          footage arrives — the choreography, timing and copy are all live now,
          so only the pixels are missing. */}
      <ScrollStory
        label={`${v.name} — how it works`}
        stages={v.story}
        frames={v.frames}
        accent={v.accent}
        note={VENTURE_FILMS[v.slug]}
      />

      {/* Body copy drifts against the scroll so it separates from the section
          above and below it. Small value — past about 0.15 it stops reading as
          depth and starts reading as a glitch. */}
      <Section>
        <Parallax speed={-0.06} className="max-w-[62ch] space-y-7">
          {v.body.map((para, i) => (
            <p
              key={i}
              className="text-[clamp(1.125rem,2.1vw,1.5rem)] leading-[1.48] tracking-[-0.016em] text-ink-soft"
              data-reveal
            >
              {para}
            </p>
          ))}
        </Parallax>
      </Section>

      {/* The concept, step by step — visual sticks, copy scrolls past it. */}
      <Section
        tone="surface"
        label="The concept"
        heading="How it actually works"
      >
        <StickyConcept steps={v.concept} accent={v.accent} />
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

      {/* The Readers Club is the one venture with real photography to show —
          the meets already happen. The other two have nothing to photograph
          yet, and an empty gallery would say more than no gallery. */}
      {v.slug === "readers-club" ? (
        <Section
          tone="surface"
          label="The meets"
          heading="Chennai and Vellore"
          lead="Photographs from recent sessions."
        >
          <PlateGrid plates={READERS} cols="md:grid-cols-2" />
        </Section>
      ) : null}

      <div className="container-page">
        <NextLink kicker="Next" label={next.name} href={`/ventures/${next.slug}`} />
        <NextLink kicker="What we sell today" label="Software & services" href="/services" />
      </div>
    </>
  );
}

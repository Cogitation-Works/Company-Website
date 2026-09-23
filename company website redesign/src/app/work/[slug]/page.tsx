import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import { Section, NextLink } from "@/components/layout/Blocks";
import { MediaPlate, PlateGrid } from "@/components/media/MediaPlate";
import Parallax from "@/components/scroll/Parallax";
import { WORK, getCase } from "@/content/work";
import { getIndustry } from "@/content/industries";

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getCase(slug);
  if (!w) return {};
  return {
    title: `${w.client} — ${w.kind}`,
    description: w.summary,
    alternates: { canonical: `/work/${w.slug}` },
  };
}

/**
 * Case study template — challenge → solution → what we built → outcome.
 *
 * Structurally this follows the BMW page (research R13): the visual is
 * interrupted by flat editorial rather than running continuously, because the
 * evidence is the point and the atmosphere is the frame around it.
 *
 * The results block renders ONLY when real metrics exist. Every entry in
 * work.ts currently has `metrics: []`, so no case study currently claims an
 * outcome. That is deliberate — see PROJECT.md §7.
 */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = getCase(slug);
  if (!w) notFound();

  const idx = WORK.findIndex((c) => c.slug === slug);
  const next = WORK[(idx + 1) % WORK.length];
  const industry = getIndustry(w.industry);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Work", item: "/work" },
      { "@type": "ListItem", position: 2, name: w.client, item: `/work/${w.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <PageHero
        parent={{ label: "Work", href: "/work" }}
        eyebrow={w.client}
        title={w.title}
        lead={w.summary}
        accent={w.accent}
        meta={[
          { label: "Sector", value: w.sector },
          { label: "Engagement", value: w.kind },
          { label: "Status", value: "In production" },
        ]}
      />

      {/* Challenge / solution — the two halves stated plainly, side by side. */}
      <Section>
        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-2">
          <div className="bg-surface p-8 lg:p-12" data-reveal>
            <p className="label-mono">The challenge</p>
            <p className="mt-5 text-[clamp(1.125rem,2vw,1.4375rem)] leading-[1.42] tracking-[-0.016em] text-ink-soft">
              {w.challenge}
            </p>
          </div>
          <div
            className="bg-surface p-8 lg:p-12"
            data-reveal
            style={{ "--reveal-delay": "110ms" } as React.CSSProperties}
          >
            <p className="label-mono" style={{ color: w.accent }}>
              What we built
            </p>
            <p className="mt-5 text-[clamp(1.125rem,2vw,1.4375rem)] leading-[1.42] tracking-[-0.016em] text-ink-soft">
              {w.solution}
            </p>
          </div>
        </div>
      </Section>

      {/* The product itself. A case study without a picture of the thing is a
          press release — these are what turn it into evidence. */}
      <Section
        tone="surface"
        label="The product"
        heading="What we handed over"
      >
        <PlateGrid plates={w.screens} cols="md:grid-cols-3" />
      </Section>

      <Section label="How it works" heading="Inside the system">
        <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
          {w.build.map((b, i) => (
            <li
              key={b.label}
              className="bg-surface p-7 lg:p-9"
              data-reveal
              style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}
            >
              <span className="label-mono" style={{ color: w.accent }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[1.1875rem] font-[560] tracking-[-0.02em]">
                {b.label}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                {b.detail}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Results — rendered only when real, measured figures exist. */}
      {w.metrics.length > 0 ? (
        <Section label="Outcome" heading="What changed">
          <dl className="grid gap-10 sm:grid-cols-3">
            {w.metrics.map((m) => (
              <div key={m.label} data-reveal>
                <dt className="num block text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-[-0.04em]">
                  {m.value}
                </dt>
                <dd className="label-mono mt-4">{m.label}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      {/* The client, on camera. The most persuasive thing a case study can
          contain, and the one thing no amount of design substitutes for. */}
      <Section
        tone="surface"
        label="In their words"
        heading={`${w.client} on the result`}
        lead="Written testimonials are easy to produce and easy to discount. A person on camera is neither."
      >
        <Parallax speed={-0.05} className="mx-auto max-w-4xl">
          <MediaPlate plate={w.review} />
        </Parallax>
      </Section>

      <Section tone="deep">
        <div className="flex flex-wrap gap-3">
          {w.tags.map((t) => (
            <span
              key={t}
              className="rounded-pill border border-white/15 px-4 py-2 text-[0.8125rem] text-on-deep-muted"
            >
              {t}
            </span>
          ))}
        </div>
        {industry ? (
          <p className="mt-10 max-w-[52ch] text-lead text-on-deep-muted">
            More on how we work in{" "}
            <a
              href={`/industries/${industry.slug}`}
              className="link-wipe !text-on-deep"
            >
              {industry.name.toLowerCase()}
            </a>
            .
          </p>
        ) : null}
      </Section>

      <div className="container-page">
        <NextLink kicker="Next case study" label={next.client} href={`/work/${next.slug}`} />
        <NextLink kicker="Or" label="Start a conversation" href="/contact" />
      </div>
    </>
  );
}

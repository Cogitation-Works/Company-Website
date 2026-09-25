import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import { Section, NumberedList, NextLink, Tbc } from "@/components/layout/Blocks";
import { OWN_PRODUCTS, getProduct, STAGE_LABEL } from "@/content/products";
import SpecScroller from "@/components/products/SpecScroller";
import ScrollStory from "@/components/scroll/ScrollStory";
import StickyConcept from "@/components/scroll/StickyConcept";
import Parallax from "@/components/scroll/Parallax";
import Object3D from "@/components/three/Object3D";
import { Reviews, NextPhase, Variants } from "@/components/detail/DetailBlocks";

export function generateStaticParams() {
  return OWN_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.kicker}`,
    description: p.summary,
    alternates: { canonical: `/products/${p.slug}` },
  };
}

/**
 * A product page, front to back:
 *
 *   hero → scroll film → counting specs → overview (parallax) →
 *   sticky concept walkthrough → capabilities → built for →
 *   NEXT PHASE → VARIANTS → REVIEWS → FAQ
 *
 * The same shape as a client project page, because they are the same kind of
 * document about two different kinds of thing. The difference is only that a
 * project has a client and a product has a stage.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const idx = OWN_PRODUCTS.findIndex((x) => x.slug === slug);
  const next = OWN_PRODUCTS[(idx + 1) % OWN_PRODUCTS.length];

  const answered = p.faq.filter((f) => !f.a.includes("⟨TBC⟩"));
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {answered.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <PageHero
        parent={{ label: "Products", href: "/products" }}
        eyebrow={p.kicker}
        title={p.name}
        lead={p.summary}
        accent={p.accent}
        figure={
          <Object3D
            variant={p.family === "software" ? "glass" : "orbit"}
            accent={p.accent}
            className="pointer-events-none absolute right-0 top-0 h-full w-full lg:w-[52%]"
          />
        }
        meta={[
          { label: "Stage", value: STAGE_LABEL[p.stage] },
          { label: "Kind", value: p.family },
          { label: "Variants", value: String(p.variants.length) },
        ]}
      />

      <ScrollStory
        label={`${p.name} — the idea`}
        stages={p.story}
        frames={p.frames}
        accent={p.accent}
      />

      <SpecScroller specs={p.specs} accent={p.accent} name={p.name} />

      <Section label="Overview">
        <Parallax speed={-0.06}>
          <p className="max-w-[62ch] text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.42] tracking-[-0.02em] text-ink-soft">
            {p.description}
          </p>
        </Parallax>
      </Section>

      <Section
        tone="surface"
        label="Inside it"
        heading="What you are actually looking at"
      >
        <StickyConcept steps={p.concept} accent={p.accent} side="right" />
      </Section>

      <Section label="Capabilities" heading="What is in it">
        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
          {p.features.map((f, i) => (
            <div
              key={f}
              className="bg-surface p-7 lg:p-9"
              data-reveal
              style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}
            >
              <span className="label-mono" style={{ color: p.accent }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-[1.0625rem] leading-[1.42] tracking-[-0.014em]">
                {f.includes("⟨TBC⟩") ? <Tbc>Not defined</Tbc> : f}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface" label="Fit" heading="Built for">
        <NumberedList items={p.builtFor} />
      </Section>

      {/* ---- Next phase */}
      <Section
        label="Roadmap"
        heading="What ships next"
        lead="A page with no answer to whether something is finished reads as either abandoned or oversold."
      >
        <NextPhase when={p.nextPhase.when} items={p.nextPhase.items} accent={p.accent} />
      </Section>

      {/* ---- Variants */}
      <Section
        tone="surface"
        label="Options"
        heading="Editions, limits and custom builds"
      >
        <Variants variants={p.variants} accent={p.accent} />
      </Section>

      {/* ---- Reviews */}
      <Section label="In their words" heading="What people say about it">
        <Reviews reviews={p.reviews} accent={p.accent} subject={p.name} />
      </Section>

      <Section tone="surface" label="Questions" heading="Before you ask us">
        <dl className="max-w-[72ch] divide-y divide-line border-y border-line">
          {p.faq.map((f) => (
            <div key={f.q} className="py-7" data-reveal>
              <dt className="text-[1.125rem] font-[560] tracking-[-0.018em]">
                {f.q}
              </dt>
              <dd className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {f.a.includes("⟨TBC⟩") ? <Tbc>Answer pending</Tbc> : f.a}
              </dd>
            </div>
          ))}
        </dl>
        {p.relatedHref ? (
          <Link
            href={p.relatedHref.href}
            data-cursor
            className="link-wipe mt-10 inline-block text-[0.9375rem] font-medium"
          >
            Related — {p.relatedHref.label} →
          </Link>
        ) : null}
      </Section>

      <div className="container-page">
        <NextLink kicker="Next product" label={next.name} href={`/products/${next.slug}`} />
        <NextLink kicker="Or" label="Work delivered for clients" href="/work" />
      </div>
    </>
  );
}

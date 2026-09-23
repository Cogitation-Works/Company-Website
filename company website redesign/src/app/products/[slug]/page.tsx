import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import { Section, NumberedList, NextLink, Tbc } from "@/components/layout/Blocks";
import { PRODUCTS, getProduct } from "@/content/products";
import SpecScroller from "@/components/products/SpecScroller";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
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
 * Product page — the BMW M3 pattern (research R13).
 *
 * Object rotates on scroll, specs count up beside it, then the 3D is
 * interrupted by flat editorial rather than running for the whole page. The
 * object itself is pending (ASSETS.md §4.2); SpecScroller renders the specs
 * and a procedural stand-in until the frame sequence lands, so the page is
 * complete and the missing asset is a swap rather than a rebuild.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const idx = PRODUCTS.findIndex((x) => x.slug === slug);
  const next = PRODUCTS[(idx + 1) % PRODUCTS.length];

  /* FAQPage structured data — only for questions with a real answer. A ⟨TBC⟩
     answer must never be published as an answer to a search engine. */
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
      />

      <SpecScroller specs={p.specs} accent={p.accent} frames={p.frames} name={p.name} />

      <Section label="Overview">
        <p className="max-w-[62ch] text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.42] tracking-[-0.02em] text-ink-soft">
          {p.description}
        </p>
      </Section>

      <Section tone="surface" label="Capabilities" heading="What is in the box">
        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
          {p.features.map((f, i) => (
            <div
              key={f}
              className="bg-canvas p-7 lg:p-9"
              data-reveal
              style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}
            >
              <span className="label-mono" style={{ color: p.accent }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-[1.0625rem] leading-[1.42] tracking-[-0.014em]">
                {f}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Fit" heading="Built for">
        <NumberedList items={p.builtFor} />
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
      </Section>

      <div className="container-page">
        <NextLink kicker="Next platform" label={next.name} href={`/products/${next.slug}`} />
        <NextLink kicker="Or" label="Request a live demo" href="/contact?intent=demo" />
      </div>
    </>
  );
}

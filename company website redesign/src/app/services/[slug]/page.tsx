import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, NumberedList, NextLink, Tbc } from "@/components/layout/Blocks";
import HeroTheme from "@/components/layout/HeroTheme";
import Object3D from "@/components/three/Object3D";
import DrawPath from "@/components/scroll/DrawPath";
import Parallax from "@/components/scroll/Parallax";
import { ClipReveal } from "@/components/scroll/Effects";
import ServiceList from "@/components/services/ServiceList";
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

  const answered = pillar.faq.filter((f) => !f.a.includes("⟨TBC⟩"));
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

      {/* Hero — the chapter number is the artwork, with this pillar's own 3D
          object behind it. Each pillar gets a different variant. */}
      <HeroTheme value="dark" />
      <section
        className="relative isolate overflow-hidden bg-deep pb-16 pt-32 text-on-deep lg:min-h-[78svh] lg:pb-20 lg:pt-40"
        style={{ "--accent": pillar.accent } as React.CSSProperties}
      >
        <Object3D
          variant={pillar.object}
          accent={pillar.accent}
          className="pointer-events-none absolute right-0 top-0 h-full w-full lg:w-[58%]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, var(--color-deep) 10%, rgba(6,9,13,0.78) 44%, rgba(6,9,13,0.1) 80%)",
          }}
        />

        <div className="container-page relative">
          <p className="label-mono !text-on-deep-muted">
            <Link href="/services" className="link-wipe hover:!text-on-deep">
              Services
            </Link>
            <span className="mx-2 opacity-40">/</span>
            {pillar.index}
          </p>

          <ClipReveal from="bottom">
            <h1 className="mt-6 max-w-[16ch] text-[clamp(2.5rem,6.4vw,5rem)] font-[560] leading-[0.94] tracking-[-0.042em]">
              {pillar.name}
            </h1>
          </ClipReveal>

          <p className="mt-7 max-w-[52ch] text-lead text-on-deep-muted">
            {pillar.summary}
          </p>

          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t border-white/10 pt-7">
            <div>
              <dt className="label-mono !text-on-deep-muted">Capabilities</dt>
              <dd className="mt-1.5 text-[0.9375rem]">{pillar.services.length}</dd>
            </div>
            <div>
              <dt className="label-mono !text-on-deep-muted">Discipline</dt>
              <dd className="mt-1.5 text-[0.9375rem]">{pillar.tagline}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Positioning — drifts against the scroll, with a line drawing beside it. */}
      <Section>
        <div className="relative">
          <DrawPath
            className="pointer-events-none absolute -left-4 top-0 hidden h-full w-10 text-ink lg:block"
            viewBox="0 0 24 420"
            d="M 12 0 C 2 80, 22 170, 12 250 C 4 320, 20 380, 12 420"
            accent={pillar.accent}
            width={1.25}
          />
          <Parallax speed={-0.05} className="max-w-[62ch] lg:pl-12">
            <p className="text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.44] tracking-[-0.02em] text-ink-soft">
              {pillar.intro}
            </p>
          </Parallax>
        </div>
      </Section>

      {/* Capabilities — each one expands to show detail and its reviews. */}
      <Section
        tone="surface"
        label="What this covers"
        heading={`${pillar.services.length} capabilities`}
        lead="Open any one to see what it involves and how it actually works."
      >
        <ServiceList services={pillar.services} accent={pillar.accent} />
      </Section>

      <Section label="How it runs" heading="The engagement">
        <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {pillar.process.map((s, i) => (
            <li
              key={s.step}
              className="bg-surface p-7 lg:p-8"
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <span className="label-mono" style={{ color: pillar.accent }}>
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[1.1875rem] font-[560] tracking-[-0.02em]">
                {s.step}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                {s.detail}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface" label="What you get" heading="What changes">
        <NumberedList items={pillar.outcomes} />
      </Section>

      <Section label="Questions" heading="Before you ask us">
        <dl className="max-w-[72ch] divide-y divide-line border-y border-line">
          {pillar.faq.map((f) => (
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
        <NextLink
          kicker={`Next — ${next.index}`}
          label={next.name}
          href={`/services/${next.slug}`}
        />
        <NextLink kicker="Or" label="Talk to an architect" href="/contact" />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import { Section, NumberedList, NextLink } from "@/components/layout/Blocks";
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

      <Section
        label="The problem"
        heading={`What we usually find in ${ind.noun}`}
      >
        <NumberedList items={ind.problems} />
      </Section>

      <Section tone="surface" label="The answer" heading="What we bring to it">
        <ul className="flex flex-wrap gap-3">
          {ind.systems.map((s) => (
            <li
              key={s}
              className="rounded-pill border border-line-strong px-5 py-2.5 text-[0.9375rem] text-ink-soft"
              data-reveal
            >
              {s}
            </li>
          ))}
        </ul>
      </Section>

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

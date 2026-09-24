import type { Metadata } from "next";
import Link from "next/link";
import { NextLink, Section } from "@/components/layout/Blocks";
import GlassSphereHero from "@/components/heroes/GlassSphereHero";
import IndexTable from "@/components/blog/IndexTable";
import { PUBLISHED, POSTS, PILLARS, FORMATS } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog — notes on enterprise software, ERP, IoT and performance",
  description:
    "Working notes for the person who has to make the decision: plant managers, clinic administrators, and anyone about to commission a build. ERP, IoT, last-mile delivery, buying software, and getting found.",
  alternates: { canonical: "/blog" },
};

/**
 * The blog index.
 *
 * Built against the reference study rather than around it — the two things it
 * says explicitly for a page like this:
 *
 *   · the hero is a **cylindrically curved text band** (Noomo Labs), which the
 *     study calls "a genuinely novel alternative to a flat horizontal marquee,
 *     and pure geometry — no assets";
 *   · the index is a **two-column table with hover previews, NOT a card grid**
 *     (Yambo), with an arrow that slides in from the left (Lusion /projects).
 *
 * Earlier passes used a marquee, then an ink-trail canvas, then a grid of
 * cards — all three of which the study advises against, and the card grid is
 * also what produced the ragged unequal heights, because cards size to their
 * own content.
 */
export default function BlogPage() {
  const drafts = POSTS.length - PUBLISHED.length;

  const rows = PILLARS.flatMap((p) =>
    p.ideas.map((i) => ({
      title: i.title,
      angle: i.angle,
      topic: p.name,
      accent: p.accent,
      reader: p.reader,
    })),
  );

  return (
    <>
      {/* ---- Hero: the glass-tile sphere over the wordmark (Noomo Labs).
           Full height, canvas absolute, nothing else in it. */}
      <GlassSphereHero word="WORKING NOTES" prompt="Notes from doing the work" />

      {/* ---- The index: a table, with a preview that follows the cursor --- */}
      <Section
        label="In the pipeline"
        heading="What we are writing"
        lead="Only things we have actually learned doing the work. Hover any line to see the angle and who it is for."
      >
        <IndexTable rows={rows} />
      </Section>

      {/* ---- Pillars, as a dark counterweight to the light index ---------- */}
      <Section tone="deep" label="Why these" heading="Six pillars">
        <div className="grid gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <article
              key={p.id}
              /* `h-full` on a grid item plus flex-col is what keeps these equal
                 — the previous version let each card size to its own copy, so
                 a short pillar and a long one produced different heights. */
              className="group relative flex h-full flex-col bg-deep p-7 transition-colors duration-500 hover:bg-deep-raised lg:p-8"
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-px w-0 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                style={{ background: p.accent }}
              />
              <span className="label-mono" style={{ color: p.accent }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[1.1875rem] font-[560] tracking-[-0.02em]">
                {p.name}
              </h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-on-deep-muted">
                {p.why}
              </p>
              <p className="label-mono mt-5 border-t border-white/10 pt-4 !text-on-deep-muted">
                {p.ideas.length} planned
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* ---- Formats + cadence ---------------------------------------------- */}
      <Section tone="surface" label="How" heading="Formats to rotate through">
        <div>
          <div>
            <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
              {FORMATS.map((f) => (
                <div key={f.name} className="flex h-full flex-col bg-canvas p-6" data-reveal>
                  <h4 className="text-[1rem] font-[560] tracking-[-0.018em]">
                    {f.name}
                  </h4>
                  <p className="mt-2 text-[0.8125rem] leading-snug text-muted">
                    {f.detail}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted">
              <strong className="font-[560] text-ink">Cadence:</strong> one
              substantial piece a month beats four thin ones. Four thin ones is
              how a blog dies.
            </p>
          </div>
        </div>
      </Section>

      {/* ---- Published, or the honest empty state ------------------------- */}
      <Section label="Published" heading={PUBLISHED.length ? "Live now" : "Nothing live yet"}>
        {PUBLISHED.length === 0 ? (
          <p className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-muted">
            {drafts} article{drafts === 1 ? " is" : "s are"} drafted and awaiting
            review. They are written and the template is built — they are held
            back because nothing carrying the company&rsquo;s name should publish
            without a human reading it first. Set{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">draft: false</code>{" "}
            in <code className="rounded bg-surface px-1.5 py-0.5">src/content/blog.ts</code>{" "}
            to publish.
          </p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {PUBLISHED.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  data-cursor
                  className="group flex flex-col gap-4 py-8 md:flex-row md:items-baseline md:gap-10"
                >
                  <span className="label-mono md:w-44 md:shrink-0">
                    {p.topic} · {p.readingMinutes} min
                  </span>
                  <span className="flex-1">
                    <span className="block text-[clamp(1.25rem,2.8vw,1.75rem)] font-[560] leading-[1.16] tracking-[-0.024em]">
                      {p.title}
                    </span>
                    <span className="mt-2 block max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted">
                      {p.excerpt}
                    </span>
                  </span>
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <div className="container-page">
        <NextLink kicker="Next" label="See the work instead" href="/work" />
      </div>
    </>
  );
}

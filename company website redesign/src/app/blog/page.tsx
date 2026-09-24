import type { Metadata } from "next";
import Link from "next/link";
import { NextLink, Section } from "@/components/layout/Blocks";
import HeroTheme from "@/components/layout/HeroTheme";
import NotesHero from "@/components/heroes/NotesHero";
import { ClipReveal, ParallaxCards } from "@/components/scroll/Effects";
import { PUBLISHED, POSTS, PILLARS, FORMATS } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog — notes on enterprise software, ERP, IoT and performance",
  description:
    "Working notes from building systems that run operations: ERP rollouts, IoT telemetry, procurement of custom software, and web performance for enterprise audiences.",
  alternates: { canonical: "/blog" },
};

/**
 * Blog index.
 *
 * Only non-draft posts appear. Every post in content/blog.ts is currently
 * `draft: true`, so this renders its empty state — which is deliberate. An
 * empty blog is a smaller problem than four unreviewed articles carrying the
 * company's name. Flip `draft` per post once an editor has approved it.
 */
export default function BlogPage() {
  const drafts = POSTS.length - PUBLISHED.length;

  return (
    <>
      {/* Light, editorial, and the subject matter itself is the artwork —
          three marquees of the vocabulary, running in alternating directions
          BEHIND the headline rather than as a band above it. This is the one
          page where a 3D object would be showing off for no reason. */}
      {/* Light, editorial, and you write on it — see NotesHero. */}
      <HeroTheme value="light" />
      <section className="relative isolate min-h-[62svh] overflow-hidden bg-canvas pb-14 pt-36 lg:pb-20 lg:pt-44">
        <NotesHero />

        <div className="container-page relative">
          <ClipReveal from="left">
            <h1 className="max-w-[12ch] text-[clamp(3rem,10vw,8rem)] font-[560] leading-[0.86] tracking-[-0.05em]">
              Working notes.
            </h1>
          </ClipReveal>
          <p className="mt-9 max-w-[58ch] border-t border-line pt-7 text-[clamp(1.0625rem,1.9vw,1.4375rem)] leading-[1.5] text-muted">
            What we have learned building systems that other people&rsquo;s
            operations depend on. Written for the person who has to make the
            decision, not for the search engine.
          </p>
        </div>
      </section>

      <div className="container-page py-16 lg:py-24">
        {PUBLISHED.length === 0 ? (
          <div className="max-w-[56ch] rounded-card border border-dashed border-line-strong p-10">
            <p className="label-mono">Nothing published yet</p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
              {drafts} article{drafts === 1 ? " is" : "s are"} drafted and awaiting
              review. They are written and the template is built — they are held
              back because nothing carrying the company&rsquo;s name should publish
              without a human reading it first.
            </p>
            <p className="mt-6 text-[0.9375rem] text-faint">
              Drafts live in{" "}
              <code className="rounded bg-canvas px-1.5 py-0.5">
                src/content/blog.ts
              </code>
              . Set <code className="rounded bg-canvas px-1.5 py-0.5">draft: false</code>{" "}
              to publish.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {PUBLISHED.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  data-cursor
                  className="group flex flex-col gap-4 py-9 md:flex-row md:items-baseline md:gap-10"
                >
                  <span className="label-mono md:w-40 md:shrink-0">
                    {p.topic} · {p.readingMinutes} min
                  </span>
                  <span className="flex-1">
                    <span className="block text-[clamp(1.375rem,3vw,1.875rem)] font-[560] leading-[1.14] tracking-[-0.026em]">
                      {p.title}
                    </span>
                    <span className="mt-3 block max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted">
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

      </div>

      {/* ---- The editorial plan.
           An empty blog that says "nothing yet" wastes the page. This shows
           what is being written and why, which is useful to a reader deciding
           whether we understand their problem — and it is the brief the writer
           works from. Lives in src/content/blog.ts. */}
      <Section
        tone="surface"
        label="The plan"
        heading="What we are writing"
        lead="Five pillars, and only things we have actually learned doing the work. A post assembled from research anyone could do is worth nothing to a reader deciding whether to hire us."
      >
        <ParallaxCards className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" amount={34}>
          {PILLARS.map((p) => (
            <article
              key={p.id}
              className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-canvas p-7"
              style={{ "--accent": p.accent } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-px w-0 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                style={{ background: p.accent }}
              />
              <h3
                className="text-[1.25rem] font-[560] leading-[1.18] tracking-[-0.022em]"
                style={{ color: p.accent }}
              >
                {p.name}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {p.why}
              </p>
              <p className="label-mono mt-5">For — {p.reader}</p>

              <ul className="mt-5 space-y-3 border-t border-line pt-5">
                {p.ideas.map((idea) => (
                  <li key={idea.title}>
                    <span className="block text-[0.9375rem] font-[560] leading-snug tracking-[-0.012em]">
                      {idea.title}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-snug text-faint">
                      {idea.angle}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </ParallaxCards>

        <div className="mt-14">
          <p className="label-mono mb-5">Formats to rotate through</p>
          <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {FORMATS.map((f) => (
              <div key={f.name} className="bg-canvas p-6" data-reveal>
                <h4 className="text-[1rem] font-[560] tracking-[-0.018em]">
                  {f.name}
                </h4>
                <p className="mt-2 text-[0.8125rem] leading-snug text-muted">
                  {f.detail}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted">
            <strong className="font-[560] text-ink">Cadence:</strong> one
            substantial piece a month beats four thin ones. Four thin ones is how
            a blog dies.
          </p>
        </div>
      </Section>

      <div className="container-page">
        <NextLink kicker="Next" label="See the work instead" href="/work" />
      </div>
    </>
  );
}

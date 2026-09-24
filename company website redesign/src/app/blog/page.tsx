import type { Metadata } from "next";
import Link from "next/link";
import { NextLink } from "@/components/layout/Blocks";
import { Marquee } from "@/components/ui/Interactions";
import HeroTheme from "@/components/layout/HeroTheme";
import { ClipReveal } from "@/components/scroll/Effects";
import { PUBLISHED, POSTS } from "@/content/blog";

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
      <HeroTheme value="light" />
      <section className="relative isolate overflow-hidden bg-canvas pb-14 pt-36 lg:pb-20 lg:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-4 opacity-[0.055]"
        >
          {[
            ["ERP", "SHOP FLOOR", "PROCUREMENT", "BILL OF MATERIALS", "INVENTORY"],
            ["IoT", "TELEMETRY", "THRESHOLDS", "DISPATCH", "SENSORS"],
            ["PERFORMANCE", "FRAME PACING", "COMPOSITING", "DECODE ONCE"],
          ].map((row, i) => (
            <Marquee key={i} speed={92 + i * 28} reverse={i % 2 === 1}>
              <span className="mx-6 inline-flex shrink-0 items-center gap-6 whitespace-nowrap text-[clamp(2.5rem,7vw,5rem)] font-[560] tracking-[-0.04em] text-ink">
                {row.join(" · ")} ·&nbsp;
              </span>
            </Marquee>
          ))}
        </div>

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

        <div className="mt-16">
          <NextLink kicker="Next" label="See the work instead" href="/work" />
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { NextLink } from "@/components/layout/Blocks";
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
      <PageHero
        eyebrow="Blog"
        title="Working notes."
        lead="What we have learned building systems that other people's operations depend on. Written for the person who has to make the decision, not for the search engine."
        meta={[
          { label: "Published", value: String(PUBLISHED.length) },
          { label: "Topics", value: "ERP · IoT · Procurement · Performance" },
        ]}
      />

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

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import { NextLink } from "@/components/layout/Blocks";
import { PUBLISHED, getPost } from "@/content/blog";
import { SITE_URL, COMPANY } from "@/content/site";

/** Only published posts get a route. Drafts 404 rather than sitting live. */
export function generateStaticParams() {
  return PUBLISHED.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p || p.draft) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", publishedTime: p.date, title: p.title },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.draft) notFound();

  const idx = PUBLISHED.findIndex((p) => p.slug === slug);
  const next = PUBLISHED[(idx + 1) % PUBLISHED.length];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: COMPANY.name, url: SITE_URL },
    publisher: { "@type": "Organization", name: COMPANY.name, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <PageHero
        parent={{ label: "Blog", href: "/blog" }}
        eyebrow={post.topic}
        title={post.title}
        lead={post.excerpt}
        meta={[
          {
            label: "Published",
            value: new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          },
          { label: "Reading time", value: `${post.readingMinutes} minutes` },
        ]}
      />

      <article className="container-page py-16 lg:py-24">
        <div className="max-w-[68ch]">
          {post.body.map((block, i) =>
            block.startsWith("## ") ? (
              <h2
                key={i}
                className="mt-14 text-[clamp(1.375rem,2.8vw,1.875rem)] font-[560] leading-[1.12] tracking-[-0.026em] first:mt-0"
                data-reveal
              >
                {block.slice(3)}
              </h2>
            ) : (
              <p
                key={i}
                className="mt-6 text-[1.125rem] leading-[1.68] text-ink-soft"
                data-reveal
              >
                {block}
              </p>
            ),
          )}
        </div>

        <div className="mt-20">
          {next && next.slug !== post.slug ? (
            <NextLink kicker="Next article" label={next.title} href={`/blog/${next.slug}`} />
          ) : null}
          <NextLink kicker="Or" label="Talk to an architect" href="/contact" />
        </div>
      </article>
    </>
  );
}

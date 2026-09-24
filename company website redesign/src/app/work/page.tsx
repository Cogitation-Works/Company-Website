import type { Metadata } from "next";
import Link from "next/link";
import { NextLink } from "@/components/layout/Blocks";
import { IndexHero } from "@/components/heroes/Heroes";
import { ParallaxCards } from "@/components/scroll/Effects";
import { WORK } from "@/content/work";

export const metadata: Metadata = {
  title: "Work — six enterprise platforms in production",
  description:
    "Case studies from delivered client platforms across fintech, healthcare, manufacturing, energy, telecom and IoT — the challenge, what we built, and how it works.",
  alternates: { canonical: "/work" },
};

/**
 * Work index — the pattern both Lusion /projects and Noomo /work independently
 * arrive at (research R15, R7): caption above in mono caps, title below, arrow
 * sliding in from the left on hover.
 *
 * The media slot is a silent looping video of the real product once those
 * recordings exist (ASSETS.md Tier 0.4). Until then it renders an accent field
 * rather than a stock photograph — an honest empty state reads better than a
 * decorative lie, and it makes the missing asset visible rather than easy to
 * forget.
 */
export default function WorkPage() {
  return (
    <>
      <IndexHero
        title="WORK"
        count="06"
        lead="Every one of these replaced something that was working — a spreadsheet, a manual process, a tool that had been outgrown. That is the harder job, and it is the only one worth writing up."
      />

      <div className="container-page py-16 lg:py-24">
        {/* Each card drifts at its own rate, so the grid breathes instead of
            arriving as one slab. */}
        <ParallaxCards className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-y-24" amount={52}>
          {WORK.map((w, i) => (
            <article
              key={w.slug}
              data-reveal
              style={{ "--reveal-delay": `${(i % 2) * 110}ms` } as React.CSSProperties}
            >
              <Link
                href={`/work/${w.slug}`}
                className="group block"
                data-cursor="lens"
                style={{ "--accent": w.accent } as React.CSSProperties}
              >
                <p className="label-mono mb-4">
                  {w.sector.toUpperCase()} · {w.kind.toUpperCase()}
                </p>

                <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-deep">
                  {w.video ? (
                    <video
                      src={w.video}
                      poster={w.poster}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <span
                        className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                        style={{
                          background: `radial-gradient(120% 100% at 20% 0%, color-mix(in oklab, ${w.accent} 42%, transparent), transparent 66%)`,
                        }}
                        aria-hidden="true"
                      />
                      <span
                        className="absolute inset-0 opacity-[0.10]"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
                          backgroundSize: "56px 56px",
                        }}
                        aria-hidden="true"
                      />
                      <span className="label-mono absolute bottom-5 left-6 !text-white/45">
                        Recording pending
                      </span>
                    </>
                  )}
                </div>

                <h2 className="mt-6 flex items-start gap-3 text-[1.375rem] font-[560] leading-[1.18] tracking-[-0.024em] lg:text-[1.625rem]">
                  <span
                    className="mt-[0.35em] w-0 overflow-hidden text-[0.7em] transition-[width] duration-500
                               ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-[1.15em]"
                    aria-hidden="true"
                  >
                    →
                  </span>
                  <span>{w.title}</span>
                </h2>

                <p className="mt-3 text-[0.9375rem] text-muted">{w.client}</p>
              </Link>
            </article>
          ))}
        </ParallaxCards>

        <div className="mt-16">
          <NextLink
            kicker="Next"
            label="The platforms behind this work"
            href="/products"
          />
        </div>
      </div>
    </>
  );
}

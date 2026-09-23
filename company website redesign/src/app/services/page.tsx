import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { NextLink } from "@/components/layout/Blocks";
import StackHero from "@/components/heroes/StackHero";
import DrawPath from "@/components/scroll/DrawPath";
import { PILLARS } from "@/content/services";

export const metadata: Metadata = {
  title: "Services — software engineering, cloud, mobile, AI and IoT",
  description:
    "Four engineering pillars: Frontend & Edge, Backend & Cloud, Mobile Systems, and AI & Infrastructure. Custom software, web and mobile applications, e-commerce, cloud architecture, IoT and automation.",
  alternates: { canonical: "/services" },
};

/**
 * Services index — the Kode Immersive chapter pattern (research R1).
 *
 * Four numbered chapters rather than eleven service pages. Eleven thin pages
 * would compete with each other for the same searches; four substantial ones
 * do not. Every individual service still appears by name inside its pillar, so
 * nothing loses its landing point.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        tall
        figure={
          <StackHero
            layers={PILLARS.map((p) => ({ name: p.name, accent: p.accent }))}
          />
        }
        eyebrow="Services"
        title={
          <>
            Four disciplines.
            <br />
            One operating system for your business.
          </>
        }
        lead="We are usually brought in when something has outgrown the tool it started in — a spreadsheet, a generic CRM, a process held together by one person who knows it. These are the four layers we work across."
        meta={[
          { label: "Disciplines", value: "4 pillars" },
          { label: "Capabilities", value: "18 services" },
          { label: "Delivery", value: "UAE · India · Global" },
        ]}
      />

      <div className="container-page relative py-6 lg:py-10">
        {/* A spine that draws itself down the four chapters as you scroll, with
            a pulse travelling on it. The route is the argument: four layers,
            one stack. */}
        <DrawPath
          className="pointer-events-none absolute left-[calc(var(--spacing-gutter)+0.5rem)] top-0 hidden h-full w-16 text-ink lg:block"
          viewBox="0 0 40 1000"
          d="M 20 0 C 4 120, 36 240, 20 360 C 4 480, 36 600, 20 720 C 4 840, 30 930, 20 1000"
          accent="var(--color-signal)"
          width={1.25}
        />

        {PILLARS.map((p, i) => (
          <article
            key={p.slug}
            className="group grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10 lg:py-20"
            data-reveal
            style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
          >
            <div className="lg:col-span-3">
              <span
                className="block text-[clamp(3rem,7vw,5rem)] font-[560] leading-none tracking-[-0.045em]"
                style={{ color: p.accent }}
              >
                {p.index}
              </span>
              <span className="label-mono mt-3 block">{p.tagline}</span>
            </div>

            <div className="lg:col-span-6">
              <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-[560] leading-[1.06] tracking-[-0.03em]">
                <Link href={`/services/${p.slug}`} className="link-wipe" data-cursor>
                  {p.name}
                </Link>
              </h2>
              <p className="mt-5 max-w-[52ch] text-lead text-muted">{p.summary}</p>
              <Link
                href={`/services/${p.slug}`}
                data-cursor
                className="mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-medium"
              >
                Explore {p.name}
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>

            <ul className="space-y-3 lg:col-span-3">
              {p.services.map((s) => (
                <li
                  key={s.name}
                  className="border-t border-line pt-3 text-[0.875rem] text-ink-soft"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </article>
        ))}

        <NextLink
          kicker="Next"
          label="See what these look like in production"
          href="/work"
        />
      </div>
    </>
  );
}

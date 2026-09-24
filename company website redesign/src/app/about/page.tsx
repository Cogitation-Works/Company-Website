import type { Metadata } from "next";
import Link from "next/link";
import { Section, StatusChip, NextLink, Tbc } from "@/components/layout/Blocks";
import { SplitHero } from "@/components/heroes/Heroes";
import RouteHero from "@/components/heroes/RouteHero";
import DrawPath from "@/components/scroll/DrawPath";
import { MediaPlate, PlateGrid } from "@/components/media/MediaPlate";
import { COMPANY } from "@/content/site";
import { VENTURES } from "@/content/ventures";
import { PILLARS } from "@/content/services";
import {
  OFFICE,
  EXPO,
  ACHIEVEMENTS,
  READERS,
  SALES,
  COMPANY_FILM,
} from "@/content/media";

export const metadata: Metadata = {
  title: "About — engineering hubs in the UAE and Vellore, India",
  description:
    "Cogitation Works builds the systems that run operations. Founded 2024, with engineering hubs in the UAE and Vellore, India, working across manufacturing, healthcare, fintech, telecom, energy, IoT and agriculture.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const readers = VENTURES.find((v) => v.slug === "readers-club");

  return (
    <>
      <SplitHero
        figure={<RouteHero hubs={COMPANY.hubs} />}
        title="We build the systems that run the operation."
        lead="Not the brochure, and not the app on top. The thing the business actually runs on — where an order lives, what a shift costs, where the stock is, which machine is down."
        meta={[
          { label: "Founded", value: String(COMPANY.founded) },
          { label: "Hubs", value: "UAE · Vellore, India" },
          { label: "Disciplines", value: `${PILLARS.length} pillars` },
        ]}
      />

      {/* ---- Position ------------------------------------------------------ */}
      <Section>
        <div className="relative">
          <DrawPath
            className="pointer-events-none absolute -left-4 top-0 hidden h-full w-10 text-ink lg:block"
            viewBox="0 0 24 600"
            d="M 12 0 C 2 90, 22 200, 12 300 C 2 400, 22 510, 12 600"
            accent="var(--color-live)"
            width={1.25}
          />
          <div className="max-w-[62ch] space-y-7 lg:pl-12">
            <p className="text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.44] tracking-[-0.02em] text-ink-soft">
              Most software companies sell what is easy to demonstrate. We are
              usually called in for the opposite — the system that is
              load-bearing, that everyone depends on, and that nobody wants to be
              the one to replace.
            </p>
            <p className="text-[1.0625rem] leading-relaxed text-muted">
              That work has a particular shape. It starts with the process as it
              is actually performed, not as it is documented. It has to run on the
              hardware the staff already carry, in the places they already stand.
              And it has to keep working on the day it replaces something that,
              however badly, was working.
            </p>
            <p className="text-[1.0625rem] leading-relaxed text-muted">
              We work from two hubs — one in the UAE, one in Vellore, India —
              across manufacturing, healthcare, financial services, telecom,
              energy, connected buildings and, increasingly, agriculture.
            </p>
          </div>
        </div>
      </Section>

      {/* ---- Company film -------------------------------------------------- */}
      <Section tone="surface" label="Film" heading="Ninety seconds inside the company">
        <div className="mx-auto max-w-5xl" data-reveal>
          <MediaPlate plate={COMPANY_FILM} />
        </div>
      </Section>

      {/* ---- Offices ------------------------------------------------------- */}
      <Section
        label="Hubs"
        heading="Where we work from"
        lead="Two rooms, one company. The people in both are on the same projects."
      >
        <div className="mb-10 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
          {COMPANY.hubs.map((h) => (
            <div key={h.city} className="bg-surface p-8 lg:p-10" data-reveal>
              <h3 className="text-[1.75rem] font-[560] tracking-[-0.028em]">
                {h.city}
              </h3>
              <p className="mt-3 text-[0.9375rem] text-muted">
                {h.region ? `${h.region}, ` : ""}
                {h.country === "AE" ? "United Arab Emirates" : "India"}
              </p>
            </div>
          ))}
        </div>
        <PlateGrid plates={OFFICE} />
      </Section>

      {/* ---- Expos --------------------------------------------------------- */}
      <Section
        tone="surface"
        label="Out in the field"
        heading="Expos and events"
        lead="Where we have shown the platforms, and who we met doing it."
      >
        <PlateGrid plates={EXPO} cols="md:grid-cols-2" />
      </Section>

      {/* ---- Achievements -------------------------------------------------- */}
      <Section
        label="Recognition"
        heading="Certifications, partnerships and milestones"
        lead="Only what is genuine and can be evidenced — an invented badge is worse than an empty shelf."
      >
        <PlateGrid plates={ACHIEVEMENTS} />
      </Section>

      {/* ---- Client work --------------------------------------------------- */}
      <Section
        tone="surface"
        label="On the ground"
        heading="Working with clients"
        lead="Software for operations is designed where the operation happens, not in a meeting room."
      >
        <PlateGrid plates={SALES} />
      </Section>

      {/* ---- Culture ------------------------------------------------------- */}
      <Section label="Culture" heading="The Readers Club">
        {readers ? (
          <>
            <div className="max-w-[62ch]">
              <StatusChip status={readers.status} accent={readers.accent} />
              <p className="mt-6 text-[clamp(1.125rem,2.1vw,1.5rem)] leading-[1.48] tracking-[-0.016em] text-ink-soft">
                {readers.body[0]}
              </p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                {readers.body[1]}
              </p>
              <Link
                href="/ventures/readers-club"
                data-cursor
                className="link-wipe mt-8 inline-block text-[0.9375rem] font-medium"
              >
                More about the Readers Club →
              </Link>
            </div>
            <div className="mt-12">
              <PlateGrid plates={READERS.slice(0, 3)} />
            </div>
          </>
        ) : null}
      </Section>

      {/* ---- Ventures ------------------------------------------------------ */}
      <Section tone="deep" label="Next" heading="Where this is going">
        <div className="grid gap-6 md:grid-cols-2">
          {VENTURES.filter((v) => v.kind === "venture").map((v) => (
            <Link
              key={v.slug}
              href={`/ventures/${v.slug}`}
              data-cursor
              className="group rounded-card border border-white/10 p-7 transition-colors hover:border-white/25"
              data-reveal
            >
              <StatusChip status={v.status} accent={v.accent} />
              <h3 className="mt-5 text-[1.375rem] font-[560] tracking-[-0.024em]">
                {v.name}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-on-deep-muted">
                {v.summary}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-10 max-w-[56ch] text-[0.9375rem] text-on-deep-muted">
          Both are in development. What we sell today is software and engineering
          services — see{" "}
          <Link href="/services" className="link-wipe !text-on-deep">
            Services
          </Link>
          .
        </p>
      </Section>

      <div className="container-page">
        <p className="label-mono border-t border-line pt-8">
          <Tbc>Every plate above is a holding frame</Tbc> — real photography and
          film replace them without a layout change. Briefs are in{" "}
          <code className="rounded bg-surface px-1.5 py-0.5">
            src/content/media.ts
          </code>
          .
        </p>
        <NextLink kicker="Next" label="Talk to us" href="/contact" />
      </div>
    </>
  );
}

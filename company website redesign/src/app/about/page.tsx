import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { Section, StatusChip, NextLink, Tbc } from "@/components/layout/Blocks";
import { COMPANY } from "@/content/site";
import { VENTURES } from "@/content/ventures";
import { PILLARS } from "@/content/services";

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
      <PageHero
        eyebrow="About"
        title="We build the systems that run the operation."
        lead="Not the brochure, and not the app on top. The thing the business actually runs on — where an order lives, what a shift costs, where the stock is, which machine is down."
        meta={[
          { label: "Founded", value: String(COMPANY.founded) },
          { label: "Hubs", value: "UAE · Vellore, India" },
          { label: "Disciplines", value: `${PILLARS.length} pillars` },
        ]}
      />

      <Section label="Position">
        <div className="max-w-[62ch] space-y-7">
          <p className="text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.44] tracking-[-0.02em] text-ink-soft">
            Most software companies sell what is easy to demonstrate. We are
            usually called in for the opposite — the system that is load-bearing,
            that everyone depends on, and that nobody wants to be the one to
            replace.
          </p>
          <p className="text-[1.0625rem] leading-relaxed text-muted">
            That work has a particular shape. It starts with the process as it is
            actually performed, not as it is documented. It has to run on the
            hardware the staff already carry, in the places they already stand. And
            it has to keep working on the day it replaces something that, however
            badly, was working.
          </p>
          <p className="text-[1.0625rem] leading-relaxed text-muted">
            We work from two hubs — one in the UAE, one in Vellore, India — across
            manufacturing, healthcare, financial services, telecom, energy,
            connected buildings and, increasingly, agriculture.
          </p>
        </div>
      </Section>

      <Section tone="surface" label="Hubs" heading="Where we work from">
        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
          {COMPANY.hubs.map((h) => (
            <div key={h.city} className="bg-canvas p-8 lg:p-12" data-reveal>
              <h3 className="text-[1.75rem] font-[560] tracking-[-0.028em]">
                {h.city}
              </h3>
              <p className="mt-3 text-[0.9375rem] text-muted">
                {h.region ? `${h.region}, ` : ""}
                {h.country === "AE" ? "United Arab Emirates" : "India"}
              </p>
              <p className="label-mono mt-8">Photography</p>
              <p className="mt-2">
                <Tbc>Office photos pending</Tbc>
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Culture" heading="The Readers Club">
        {readers ? (
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
        ) : null}
      </Section>

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
        <NextLink kicker="Next" label="Talk to us" href="/contact" />
      </div>
    </>
  );
}

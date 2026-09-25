"use client";

import Link from "next/link";
import { ClipReveal, ScrambleText } from "@/components/scroll/Effects";
import { ScrubText, Marquee } from "@/components/ui/Interactions";
import HeroTheme from "@/components/layout/HeroTheme";
import Object3D from "@/components/three/Object3D";
import BlobGate from "@/components/three/BlobGate";

/**
 * One hero per page, and no two the same SHAPE.
 *
 * The previous version got this wrong: every page was a dark band with an
 * eyebrow, an h1, a lead and a meta row, and only the background visual
 * changed. That is one template with the words swapped, and it reads as one.
 *
 * These differ in layout, in tone and in what carries the page:
 *
 *   ChapterHero   flat saturated colour, chapter index down the left  (/services)
 *   IndexHero     LIGHT, oversized wordmark, no band at all           (/work)
 *   FanHero       exploded perspective fan of cards                   (/products)
 *   FrameHero     full-bleed photograph with copy inset               (/industries)
 *   CentreHero    centred, visual above, copy below                   (/ventures)
 *   SplitHero     two columns, full height, dark | figure             (/about)
 *   OpenHero      LIGHT, centred, content starts immediately          (/contact)
 *
 * Three of the seven are light. The research is clear that these sites animate
 * on dark and present on light — a site that is dark everywhere has given up
 * half its range.
 */

/* ---------------------------------------------------------------- services */

export function ChapterHero({
  chapters,
}: {
  chapters: { index: string; name: string; accent: string; slug: string }[];
}) {
  return (
    <>
      <HeroTheme value="dark" />
      <section className="relative isolate overflow-hidden pb-20 pt-32 lg:pb-24 lg:pt-40"
        style={{ background: "var(--color-signal)" }}
      >
        {/* A chrome ribbon turning slowly behind the type. Transparent canvas,
            so the flat blue reads through it. */}
        <Object3D
          variant="ribbon"
          accent="#ffffff"
          className="pointer-events-none absolute -right-[8%] top-[6%] hidden h-[34rem] w-[34rem] opacity-40 lg:block"
        />
        {/* Flat saturated colour, not black. Kode runs its whole hero on one
            orange; the colour IS the design, which is why it needs no texture. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="container-page relative grid gap-12 lg:grid-cols-12">
          {/* Chapter index runs down the left edge — the navigation IS the
              hero content, rather than sitting below it. */}
          <ol className="order-2 space-y-1 lg:order-1 lg:col-span-3">
            {chapters.map((c, i) => (
              <li key={c.slug}>
                <Link
                  href={`/services/${c.slug}`}
                  data-cursor
                  className="group flex items-baseline gap-4 border-t border-white/25 py-3.5 text-white/75 transition-colors hover:text-white"
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em]">
                    <ScrambleText text={c.index} />
                  </span>
                  <span className="text-[1.0625rem] tracking-[-0.018em]">
                    {c.name}
                  </span>
                  <span className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="order-1 text-white lg:order-2 lg:col-span-9">
            <ClipReveal from="bottom">
              <h1 className="text-[clamp(3rem,9vw,7.5rem)] font-[560] leading-[0.88] tracking-[-0.045em]">
                Six disciplines.
                <br />
                <span className="text-white/55">One operating system.</span>
              </h1>
            </ClipReveal>
            <p className="mt-9 max-w-[48ch] text-[clamp(1.0625rem,1.8vw,1.375rem)] leading-[1.45] text-white/80">
              We are usually brought in when something has outgrown the tool it
              started in — a spreadsheet, a generic CRM, a process held together
              by one person who knows it.
            </p>
            {/* Custom build stated in the hero, not buried in a capability
                list. It is the single thing most enquiries are actually for. */}
            <p className="mt-6 max-w-[48ch] text-[clamp(1rem,1.6vw,1.1875rem)] leading-[1.5] text-white">
              And if nothing off the shelf fits,{" "}
              <span className="rounded bg-white/15 px-1.5 py-0.5 font-[560]">
                we build it from scratch
              </span>{" "}
              — custom software written to your process rather than configured
              around someone else&rsquo;s.
            </p>
          </div>
        </div>

        {/* Oversized wordmark bleeding off the bottom edge — Kode and Alche
            both close on this; here it opens instead. */}
        <div className="relative mt-16 overflow-hidden lg:mt-24">
          <Marquee speed={74}>
            <span className="mx-8 inline-flex shrink-0 whitespace-nowrap text-[clamp(3rem,10vw,8rem)] font-[560] tracking-[-0.05em] text-white/12">
              FRONTEND · BACKEND · DEVOPS · MOBILE · DESKTOP · AI · IoT · MARKETING · MANAGED TEAMS ·&nbsp;
            </span>
          </Marquee>
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------- work */

export function IndexHero({
  title,
  count,
  lead,
}: {
  title: string;
  count: string;
  lead: string;
}) {
  return (
    <>
      <HeroTheme value="light" />
      <section className="relative overflow-hidden bg-canvas pb-10 pt-36 lg:pb-14 lg:pt-44">
        {/* Light, and no band at all — the type is the hero. Lusion's projects
            index does exactly this and it is the calmest page on that site.
            The shard field drifts behind the wordmark, faintly. */}
        <Object3D
          variant="shards"
          accent="#2563eb"
          className="pointer-events-none absolute right-[-6%] top-[-10%] hidden h-[38rem] w-[44rem] opacity-[0.5] lg:block"
        />
        <div className="container-page relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <ClipReveal from="bottom">
              <h1 className="text-[clamp(3.5rem,14vw,12rem)] font-[560] leading-[0.82] tracking-[-0.055em]">
                {title}
              </h1>
            </ClipReveal>
            <span className="num pb-3 text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.03em] text-faint">
              {count}
            </span>
          </div>
          <p className="mt-10 max-w-[58ch] border-t border-line pt-8 text-[clamp(1.0625rem,1.9vw,1.4375rem)] leading-[1.5] text-muted">
            {lead}
          </p>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- products */

export function FanHero({
  cards,
  title,
  lead,
}: {
  cards: { name: string; accent: string }[];
  title: React.ReactNode;
  lead: string;
}) {
  return (
    <>
      <HeroTheme value="dark" />
      <section className="relative isolate overflow-hidden bg-deep pb-20 pt-32 text-on-deep lg:min-h-[92svh] lg:pb-24 lg:pt-40">
        {/* The liquid glass blob sits IN FRONT of the card fan and behind the
            type, so the headline reads through it. Full-bleed: the shape is
            centred in its own canvas and the transparent centre lets the fan,
            the cursor trail and the copy all show through. */}
        <BlobGate
          className="pointer-events-none absolute inset-0 z-[2]"
          accentA="#3b82f6"
          accentB="#f0a500"
        />

        {/* An exploded fan of the four platforms in perspective — Peachweb
            fans ten device screens behind its headline, and it is the clearest
            way to say "these are four things" before a word is read. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[6%] flex justify-center lg:top-[2%]"
          style={{ perspective: "1600px" }}
        >
          <div className="relative h-[34rem] w-full max-w-6xl" style={{ transformStyle: "preserve-3d" }}>
            {cards.map((c, i) => {
              const offset = i - (cards.length - 1) / 2;
              return (
                <div
                  key={c.name}
                  className="absolute left-1/2 top-1/2 h-[26rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border"
                  style={{
                    borderColor: `color-mix(in oklab, ${c.accent} 60%, transparent)`,
                    background: `linear-gradient(165deg, color-mix(in oklab, ${c.accent} 26%, transparent), transparent 66%)`,
                    boxShadow: `0 40px 120px -30px color-mix(in oklab, ${c.accent} 55%, transparent)`,
                    transform: `translateX(${offset * 15}rem) rotateY(${offset * -17}deg) rotateZ(${offset * 3}deg) translateZ(${-Math.abs(offset) * 70}px)`,
                    animation: `fan-in 1200ms cubic-bezier(0.16,1,0.3,1) ${i * 120}ms both`,
                  }}
                >
                  <span
                    className="absolute inset-0 rounded-[1.75rem] opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
                      backgroundSize: "34px 34px",
                    }}
                  />
                  <span
                    className="absolute left-5 top-5 font-mono text-[0.625rem] uppercase tracking-[0.16em]"
                    style={{ color: c.accent }}
                  >
                    {c.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Copy anchored to the bottom-left, under the fan rather than beside
            it — a different axis to every other page. */}
        <div className="container-page relative flex h-full flex-col justify-end pt-[22rem] lg:pt-[26rem]">
          <ClipReveal from="bottom">
            <h1 className="max-w-[18ch] text-[clamp(2.5rem,6.5vw,5rem)] font-[560] leading-[0.94] tracking-[-0.042em]">
              {title}
            </h1>
          </ClipReveal>
          <p className="mt-7 max-w-[52ch] text-lead text-on-deep-muted">{lead}</p>
        </div>

        <style>{`
          @keyframes fan-in {
            from { opacity: 0; transform: translateX(0) rotateY(0) translateZ(-300px); }
          }
        `}</style>
      </section>
    </>
  );
}

/* -------------------------------------------------------------- industries */

export function FrameHero({
  image,
  width,
  title,
  lead,
  items,
}: {
  image: string;
  width: number;
  title: string;
  lead: string;
  items: { name: string; slug: string; isNew?: boolean }[];
}) {
  return (
    <>
      <HeroTheme value="dark" />
      <section className="relative isolate min-h-[92svh] overflow-hidden bg-deep text-on-deep">
        {/* Full-bleed photograph, not a flat band. The picture is the hero and
            the type is inset into it. */}
        <picture>
          <source srcSet={`/industries/${image}-${width}.avif`} type="image/avif" />
          <img
            src={`/industries/${image}-${width}.webp`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        </picture>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--color-deep) 6%, rgba(6,9,13,0.55) 46%, rgba(6,9,13,0.25) 100%)",
          }}
        />

        <div className="container-page relative grid h-full min-h-[92svh] content-end gap-10 pb-16 pt-40 lg:grid-cols-12 lg:pb-20">
          <div className="lg:col-span-7">
            <ClipReveal from="bottom">
              <h1 className="text-[clamp(2.5rem,6.2vw,4.75rem)] font-[560] leading-[0.96] tracking-[-0.04em]">
                {title}
              </h1>
            </ClipReveal>
            <p className="mt-7 max-w-[52ch] text-lead text-on-deep-muted">{lead}</p>
          </div>

          {/* Sector list runs down the right, inside the photograph. */}
          <ul className="lg:col-span-4 lg:col-start-9">
            {items.map((it) => (
              <li key={it.slug}>
                <Link
                  href={`/industries/${it.slug}`}
                  data-cursor
                  className="group flex items-center justify-between gap-4 border-t border-white/20 py-3 text-[1.0625rem] text-white/75 transition-colors hover:text-white"
                >
                  <span>
                    {it.name}
                    {it.isNew ? (
                      <span className="ml-2 align-middle font-mono text-[0.625rem] uppercase tracking-[0.14em] text-live">
                        New
                      </span>
                    ) : null}
                  </span>
                  <span className="translate-x-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- ventures */

export function CentreHero({
  figure,
  kicker,
  title,
  lead,
}: {
  figure: React.ReactNode;
  kicker: string;
  title: string;
  lead: string;
}) {
  return (
    <>
      <HeroTheme value="dark" />
      <section className="relative isolate flex min-h-[94svh] flex-col items-center justify-center overflow-hidden bg-deep pt-28 text-on-deep">
        {/* Centred, with the visual ABOVE the copy rather than behind it — a
            different axis again, and the only page where the type is centred. */}
        <div className="relative h-[42vh] w-full max-w-4xl">{figure}</div>

        <div className="container-page relative mt-4 text-center">
          <p className="label-mono !text-on-deep-muted">{kicker}</p>
          <ClipReveal from="bottom">
            <h1 className="mx-auto mt-5 max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)] font-[560] leading-[0.92] tracking-[-0.045em]">
              {title}
            </h1>
          </ClipReveal>
          <p className="mx-auto mt-7 max-w-[56ch] text-lead text-on-deep-muted">
            {lead}
          </p>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------- about */

export function SplitHero({
  figure,
  title,
  lead,
  meta,
}: {
  figure: React.ReactNode;
  title: string;
  lead: string;
  meta: { label: string; value: string }[];
}) {
  return (
    <>
      <HeroTheme value="dark" />
      {/* Two full-height columns rather than a band: copy left, figure right,
          hard edge between them. */}
      <section className="relative grid min-h-[92svh] lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-deep px-[var(--spacing-gutter)] pb-16 pt-36 text-on-deep lg:pl-[max(var(--spacing-gutter),calc((100vw-var(--container-page))/2))] lg:pr-16">
          <p className="label-mono !text-on-deep-muted">About</p>
          <ClipReveal from="bottom">
            <h1 className="mt-6 max-w-[14ch] text-[clamp(2.5rem,5.2vw,4.25rem)] font-[560] leading-[0.96] tracking-[-0.038em]">
              {title}
            </h1>
          </ClipReveal>
          <p className="mt-7 max-w-[46ch] text-lead text-on-deep-muted">{lead}</p>
          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-7">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="label-mono !text-on-deep-muted">{m.label}</dt>
                <dd className="mt-1.5 text-[0.9375rem]">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative min-h-[46svh] overflow-hidden bg-deep-raised lg:min-h-full">
          {figure}
        </div>
      </section>
    </>
  );
}

/* ----------------------------------------------------------------- contact */

export function OpenHero({
  figure,
  title,
  lead,
}: {
  figure: React.ReactNode;
  title: string;
  lead: string;
}) {
  return (
    <>
      <HeroTheme value="light" />
      {/* pb leaves room for the confetti pile below the copy — at a smaller
          value the shapes climbed over the lead paragraph. */}
      <section className="relative isolate overflow-hidden bg-canvas pb-44 pt-36 lg:pb-52 lg:pt-44">
        {/* Light and open — the form is visible almost immediately, because a
            contact page that makes you scroll to find the form is a bad
            contact page however good the hero is. */}
        {/* A slow wave field behind the headline — the only motion on an
            otherwise deliberately calm page. */}
        <Object3D
          variant="wave"
          accent="#2563eb"
          className="pointer-events-none absolute inset-x-0 top-[18%] mx-auto hidden h-[30rem] w-full max-w-5xl opacity-[0.35] lg:block"
        />
        <div className="container-page relative text-center">
          {/* The headline fills word by word as it scrubs into place — the
              colour-fill effect, used where it actually lands rather than
              buried in a body paragraph. */}
          <ScrubText
            as="h1"
            text={title}
            className="mx-auto max-w-[17ch] text-[clamp(2.75rem,8vw,6rem)] font-[560] leading-[0.9] tracking-[-0.048em]"
          />
          <p className="mx-auto mt-8 max-w-[54ch] text-lead text-muted">{lead}</p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56">
          {figure}
        </div>
      </section>
    </>
  );
}

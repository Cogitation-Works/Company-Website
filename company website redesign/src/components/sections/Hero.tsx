"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/motion";
import { Magnetic } from "@/components/ui/Interactions";
import { useHeroVariant, HeroSwitcher } from "@/components/hero/HeroCanvas";

// The interactive field sits BEHIND everything and never enters the main bundle.
const HeroCanvas = dynamic(() => import("@/components/hero/HeroCanvas"), {
  ssr: false,
});

// The frame sequence never enters the main bundle.
const CoreSequence = dynamic(() => import("@/components/hero/CoreSequence"), {
  ssr: false,
});

/**
 * Hero.
 *
 * The one compositional idea carried over from the reference study: the 3D
 * object sits BETWEEN the viewer and the headline, so the type is occluded.
 * Kode, ThoughtLab, Noomo, Elva and Alche all do a version of this — it buys
 * real depth from a single object instead of a whole scene.
 *
 * Layout note: that overlap only works where there is horizontal room for it.
 * Below lg the Core moves into normal flow ABOVE the copy and stacks, because
 * overlapping an object on a phone-width column buries the text.
 */

function CoreVisual({ render3D }: { render3D: boolean }) {
  if (render3D) {
    return (
      <CoreSequence className="h-[min(64vh,640px)] w-[min(64vh,640px)] -translate-y-[4%] lg:-translate-y-[6%]" />
    );
  }
  // Static poster: mobile, reduced-motion, or no WebGL.
  // AVIF first (~67KB at 900px), then WebP, then PNG.
  return (
    <picture>
      <source
        type="image/avif"
        srcSet="/hero/core-poster-900.avif 900w, /hero/core-poster-1400.avif 1400w"
        sizes="(max-width: 1023px) 58vw, 520px"
      />
      <source
        type="image/webp"
        srcSet="/hero/core-poster-900.webp 900w, /hero/core-poster-1400.webp 1400w"
        sizes="(max-width: 1023px) 58vw, 520px"
      />
      <img
        src="/hero/core-poster-900.png"
        alt=""
        width={900}
        height={893}
        decoding="async"
        fetchPriority="high"
        className="h-auto w-[min(58vw,300px)] select-none lg:w-[min(46vw,520px)]
                   drop-shadow-[0_40px_90px_rgba(11,15,20,0.2)]"
      />
    </picture>
  );
}

export default function Hero() {
  // The sequence is desktop-only: 60 frames is ~2MB, which has no business
  // downloading to a phone on a patchy connection. Phones get the poster.
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const [variant, setVariant] = useHeroVariant();

  /* The magnifier renders the page a SECOND time inside `.lens-zoom`. Without
     this guard that copy would mount a second WebGL context and a second copy
     of the 60-frame sequence — two of the most expensive things on the site,
     for a duplicate nobody reads. Inside the copy we fall back to the static
     poster, which magnifies perfectly well. */
  const rootRef = useRef<HTMLElement>(null);
  const [inLensCopy, setInLensCopy] = useState(false);
  useEffect(() => {
    setInLensCopy(!!rootRef.current?.closest(".lens-zoom"));
  }, []);

  const render3D = isDesktop && !reduced && !inLensCopy;

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden bg-deep pt-24 pb-16 text-on-deep lg:min-h-[100svh] lg:pt-28"
    >
      {/* Technical grid field, very faint */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.30]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-deep-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-deep-line) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />
      {/* --- Interactive field (A/B/C) — behind everything, cursor-reactive */}
      {render3D && (
        <HeroCanvas
          variant={variant}
          className="pointer-events-none absolute inset-0 z-[1]"
        />
      )}

      {/* Vignette so the grid fades out at the edges */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-deep)_80%)]"
        aria-hidden="true"
      />

      {/* --- The Core ------------------------------------------------------
          lg+ : absolutely placed right of centre, above the headline (z-20)
                but below the sub-copy and CTAs (z-30) — so it occludes the
                display type and never the things you need to read or click.
          <lg : normal flow, centred, above the copy. No overlap. */}
      <div
        className="pointer-events-none relative z-20 mb-2 flex justify-center
                   lg:absolute lg:inset-0 lg:mb-0 lg:items-center lg:justify-end lg:pr-[4vw]"
        aria-hidden="true"
      >
        <CoreVisual render3D={render3D} />
      </div>

      {/* --- Content ------------------------------------------------------- */}
      <div className="container-page relative z-10 flex flex-col justify-center lg:min-h-[calc(100svh-11rem)]">
        <p
          className="label-mono mb-6 flex items-center gap-2.5 !text-on-deep-muted lg:mb-8"
          data-reveal
          style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
          </span>
          UAE · Vellore — systems running in six sectors
        </p>

        <h1 className="max-w-[18ch] text-balance text-[clamp(2.5rem,7.2vw,5.5rem)] font-[560] leading-[0.94] tracking-[-0.035em] text-on-deep">
          <span
            className="block"
            data-reveal="blur"
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          >
            We build the systems
          </span>
          <span
            className="block"
            data-reveal="blur"
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
          >
            that run your
          </span>
          <span
            className="block text-signal"
            data-reveal="blur"
            style={{ "--reveal-delay": "340ms" } as React.CSSProperties}
          >
            operation.
          </span>
        </h1>

        {/* Sub-copy and CTAs sit above the Core so they are never obscured. */}
        <div className="relative z-30 mt-8 max-w-xl lg:mt-10">
          <p
            className="text-lead text-on-deep-muted"
            data-reveal
            style={{ "--reveal-delay": "460ms" } as React.CSSProperties}
          >
            Enterprise software for factories, clinics, fleets, networks and
            farms — ERP, CRM, workforce and AI platforms engineered to hold up
            under real operational load.
          </p>

          <div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-9"
            data-reveal
            style={{ "--reveal-delay": "560ms" } as React.CSSProperties}
          >
            <Magnetic>
              <a
                href="/contact"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-white px-7
                           text-[0.9375rem] font-medium text-ink transition-colors duration-[--duration-fast]
                           hover:bg-live"
              >
                Book an architecture call
                <span
                  className="transition-transform duration-[--duration-fast] group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/work"
                className="inline-flex h-12 items-center justify-center rounded-pill border border-white/25
                           px-7 text-[0.9375rem] font-medium text-on-deep transition-colors
                           duration-[--duration-fast] hover:border-white/70"
              >
                See the work
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* --- Scroll cue — desktop only; on mobile the content already fills it */}
      <div
        className="container-page absolute inset-x-0 bottom-7 z-30 hidden items-end justify-between lg:flex"
        data-reveal
        style={{ "--reveal-delay": "760ms" } as React.CSSProperties}
      >
        <span className="label-mono !text-on-deep-muted">Scroll</span>
        <span className="label-mono !text-on-deep-muted">Est. 2024 — UAE · India · Global</span>
      </div>

      {/* The hero is decided: A (Signal Field) here, C (Deform Grid) on
          /industries, B retired. The switcher stays for development only so
          the variants can still be compared side by side. */}
      {render3D && process.env.NODE_ENV === "development" && (
        <HeroSwitcher variant={variant} onChange={setVariant} />
      )}
    </section>
  );
}

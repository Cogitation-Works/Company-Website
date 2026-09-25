"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useMediaQuery, usePinProgress } from "@/lib/motion";
import { Tbc } from "@/components/layout/Blocks";

/* Three.js never enters the main bundle — it loads only for the viewers who
   actually get the 3D object. */
const GlassObject = dynamic(() => import("@/components/three/GlassObject"), {
  ssr: false,
});

/**
 * The BMW pattern (research R13): scroll rotates the object while the
 * specifications count up beside it.
 *
 * PERFORMANCE — the same rules as the hero's CoreSequence:
 *  - the scroll listener writes one number and nothing else;
 *  - drawing happens in a single rAF that exits early when nothing moved;
 *  - the section is `position: sticky`, not a GSAP pin, so there is no
 *    layout recalculation per frame and no pin-spacer to fight;
 *  - `will-change` is scoped to the one element that actually transforms.
 *
 * The object is currently PROCEDURAL — concentric rings drawn with CSS
 * transforms, tinted by the product accent. When the Flow frame sequences land
 * (ASSETS.md §4.2) the `frames` prop switches this to the same decode-once
 * canvas scrub the hero uses. Everything else on the page stays as it is.
 */

export default function SpecScroller({
  specs,
  accent,
  name,
}: {
  specs: { value: string; unit?: string; label: string; tbc?: boolean }[];
  accent: string;
  name: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [inLensCopy, setInLensCopy] = useState(false);

  /* Same guard as the home hero: the magnifier renders the page twice, and the
     copy must not mount a second WebGL context. */
  useEffect(() => {
    setInLensCopy(!!wrapRef.current?.closest(".lens-zoom"));
  }, []);

  const render3D = isDesktop && !reduced && !inLensCopy;

  /* Shared with the magnifier's duplicate: the copy mirrors this rather than
     measuring its own position inside the lens box, which would leave it
     showing a different spec than the one actually on screen. It also
     publishes the pinned child's offset for the copy to position against. */
  const scrollProgress = usePinProgress("spec", wrapRef, !reduced);
  const progress = reduced ? 1 : scrollProgress;

  useEffect(() => {
    if (objectRef.current) {
      objectRef.current.style.transform = `rotate(${progress * 360}deg)`;
    }
  }, [progress]);

  /* Each spec claims an equal slice of the scroll and reveals when crossed. */
  const revealed = (i: number) => progress >= (i + 0.5) / (specs.length + 0.5);

  return (
    <div
      ref={wrapRef}
      data-pin="spec"
      className="relative bg-deep text-on-deep"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Fixed diagonal accent band — the BMW M-stripe idea: the graphic stays
            put while the object moves against it, which is what sells the
            rotation as movement rather than as spin. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background: `linear-gradient(104deg, transparent 38%, ${accent} 38.4%, ${accent} 40%, transparent 40.4%, transparent 44%, color-mix(in oklab, ${accent} 60%, white) 44.4%, color-mix(in oklab, ${accent} 60%, white) 45.4%, transparent 45.8%)`,
          }}
        />

        <div className="container-page relative grid w-full items-center gap-12 lg:grid-cols-2">
          {/* ---- Specs */}
          <div className="order-2 lg:order-1">
            <p className="label-mono !text-on-deep-muted">{name} — at a glance</p>
            <dl className="mt-8 space-y-9">
              {specs.map((s, i) => (
                <div
                  key={s.label}
                  className="transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: revealed(i) ? 1 : 0.18,
                    transform: revealed(i) ? "none" : "translateY(12px)",
                  }}
                >
                  <dt className="num flex items-baseline text-[clamp(2.75rem,7vw,4.5rem)] leading-none tracking-[-0.045em]">
                    <span style={{ color: revealed(i) ? accent : undefined }}>
                      {s.value}
                    </span>
                    {s.unit ? (
                      <span className="ml-1 text-[0.42em] tracking-[-0.02em] text-on-deep-muted">
                        {s.unit}
                      </span>
                    ) : null}
                  </dt>
                  <dd className="label-mono mt-3 !text-on-deep-muted">
                    {s.label} {s.tbc ? <Tbc /> : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---- Object */}
          <div className="order-1 flex justify-center lg:order-2">
            <div
              ref={objectRef}
              className="relative aspect-square w-[min(78vw,30rem)] will-change-transform"
              aria-hidden="true"
            >
              {render3D ? (
                /* Refractive glass with an amber core — drei transmission,
                   using the values measured off Noomo's public playground.
                   Procedural geometry: no .glb, no textures, no HDRI. */
                <GlassObject accent={accent} className="h-full w-full" />
              ) : (
                <>
                  {[0, 1, 2, 3].map((r) => (
                    <span
                      key={r}
                      className="absolute rounded-full border"
                      style={{
                        inset: `${r * 11}%`,
                        borderColor: `color-mix(in oklab, ${accent} ${60 - r * 9}%, transparent)`,
                        borderWidth: r === 0 ? 2 : 1,
                        transform: `rotateX(${18 + r * 16}deg) rotateY(${r * 22}deg)`,
                      }}
                    />
                  ))}
                  {/* Amber core — the family resemblance with the hero Core. */}
                  <span
                    className="absolute left-1/2 top-1/2 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 38% 32%, #ffd88a, var(--color-live) 58%, #b87400)",
                      boxShadow: `0 0 90px 12px color-mix(in oklab, var(--color-live) 45%, transparent)`,
                    }}
                  />
                </>
              )}
            </div>
            {/* Note: the rotating object here is procedural. The scroll-scrubbed
                frame sequence lives in the ScrollStory above it, so this stays
                a cheap companion rather than a second heavy canvas. */}
          </div>
        </div>

        {/* Scroll progress rule along the bottom. */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
          <div
            className="h-full origin-left"
            style={{
              background: accent,
              transform: `scaleX(${progress})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

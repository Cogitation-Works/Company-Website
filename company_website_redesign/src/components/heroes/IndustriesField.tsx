"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/motion";

/**
 * /industries hero — hero variant C, the deforming wireframe grid.
 *
 * C was built as a home page candidate and rejected there in favour of the
 * Signal Field, but it is the right hero for this page specifically: a terrain
 * surface denting under the pointer is the honest metaphor for seven sectors we
 * work across, and it sits under still photography without competing with it.
 * Variant B is retired — two chrome objects on one site was one too many.
 *
 * Gated to desktop for the same reason the home field is: a WebGL context has
 * no business loading on a mid-range phone for a decorative background.
 */
const HeroCanvas = dynamic(() => import("@/components/hero/HeroCanvas"), {
  ssr: false,
});

export default function IndustriesField() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [inLensCopy, setInLensCopy] = useState(false);

  /* The magnifier renders the page twice; without this the copy would mount a
     second WebGL context. Same guard as the home hero. */
  useEffect(() => {
    setInLensCopy(!!rootRef.current?.closest(".lens-zoom"));
  }, []);

  const render = isDesktop && !reduced && !inLensCopy;

  return (
    <div ref={rootRef} className="absolute inset-0">
      {render ? (
        <HeroCanvas variant="c" className="pointer-events-none absolute inset-0" />
      ) : (
        /* Static stand-in: the same grid, not moving. */
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-deep-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-deep-line) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(90% 80% at 70% 50%, #000, transparent 74%)",
            WebkitMaskImage:
              "radial-gradient(90% 80% at 70% 50%, #000, transparent 74%)",
          }}
        />
      )}
    </div>
  );
}

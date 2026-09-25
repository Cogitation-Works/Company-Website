"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import {
  registerGsap,
  gsap,
  ScrollTrigger,
  usePrefersReducedMotion,
  useRevealObserver,
} from "@/lib/motion";

/**
 * Inertial smooth scrolling, driven on GSAP's ticker so ScrollTrigger and
 * Lenis share one RAF loop (two loops = judder).
 *
 * The easing target comes from the measured reference curves in
 * ../not for project/animated-websites-research.md §4:
 *   ~50% of the distance in the first 200ms, ~90% by 500ms, settle ~1.0s.
 * lerp 0.1 at 60fps lands almost exactly on that.
 *
 * Disabled entirely under prefers-reduced-motion — native scroll then.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  useRevealObserver();

  useEffect(() => {
    registerGsap();
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      smoothWheel: true,
      // Never smooth touch: it fights the OS and feels broken on mobile.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Expose progress for decorative CSS that wants it.
    const onScroll = ({ progress }: { progress: number }) => {
      document.documentElement.style.setProperty(
        "--scroll-progress",
        progress.toFixed(4),
      );
    };
    lenis.on("scroll", onScroll);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}

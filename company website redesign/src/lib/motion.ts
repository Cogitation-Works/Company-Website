"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Register GSAP plugins once, on the client only.
 * ScrollTrigger (and SplitText, Flip, MorphSVG) ship inside the main `gsap`
 * package and have been free since GSAP 3.13 — no separate install.
 */
let registered = false;
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };

/** True when the user has asked the system for reduced motion. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Matches a media query on the client. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/**
 * Decides whether the 3D layer may run at all.
 * Gate: desktop width, reduced-motion off, WebGL available, and not a
 * obviously low-powered device. Everything else gets the static poster.
 */
export function useCanRender3D() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduced = usePrefersReducedMotion();
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ??
        canvas.getContext("webgl");
      if (!gl) {
        setCapable(false);
        return;
      }
      // Very low core counts are a decent proxy for a budget device.
      const cores = navigator.hardwareConcurrency ?? 4;
      setCapable(cores >= 4);
    } catch {
      setCapable(false);
    }
  }, []);

  return isDesktop && !reduced && capable;
}

/**
 * Reveal-on-scroll primitive. Adds data-revealed="true" the first time an
 * element with [data-reveal] enters the viewport. CSS does the animation,
 * so this stays cheap and works without JS re-renders.
 */
export function useRevealObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.setAttribute("data-revealed", "true"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-revealed", "true");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

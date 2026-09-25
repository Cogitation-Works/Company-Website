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
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️ THIS USED TO BLANK WHOLE PAGES, and the reason is worth keeping written
 * down, because the shape of the mistake matters more than the fix.
 *
 * It ran ONCE, on mount, over whatever `[data-reveal]` nodes existed at that
 * instant. It is called from SmoothScroll, which lives in the root layout and
 * never remounts. So on a client-side navigation the new page's elements were
 * never observed, never got `data-revealed`, and sat at `opacity: 0` forever —
 * a fully rendered page that was completely invisible. Hard-reloading the same
 * URL worked, which is exactly why it read as "sometimes the page is blank".
 *
 * Two changes, and the second is the one that matters:
 *
 *   1. New nodes are picked up as they arrive (MutationObserver), so route
 *      changes work.
 *   2. The CSS only hides anything while `<html data-reveal-armed>` is set,
 *      which this hook sets and removes. **If this hook never runs, fails, or
 *      throws, nothing is hidden and the page is simply visible.** A
 *      decorative animation must never be able to hide the site; the default
 *      has to be "shown", with hiding as the thing that needs to be earned.
 *
 * There is also a sweep that reveals anything left unrevealed while sitting in
 * the viewport, as a net under both.
 * ──────────────────────────────────────────────────────────────────────────
 */
export function useRevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const reveal = (n: Element) => n.setAttribute("data-revealed", "true");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    // Only now that the observer is actually running may anything be hidden.
    root.setAttribute("data-reveal-armed", "");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    const seen = new WeakSet<Element>();
    const observe = (n: Element) => {
      if (seen.has(n)) return;
      seen.add(n);
      io.observe(n);
    };
    const scan = (r: ParentNode) =>
      r.querySelectorAll?.("[data-reveal]").forEach(observe);

    scan(document);

    // Route changes and any other late-rendered content.
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        for (const node of r.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches("[data-reveal]")) observe(node);
          scan(node);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    /* Net: anything unrevealed that is already on screen gets revealed anyway.
       Runs for a few seconds after mount and after each navigation, which is
       when the observers could plausibly miss something. */
    const sweep = () => {
      const vh = window.innerHeight;
      document
        .querySelectorAll("[data-reveal]:not([data-revealed])")
        .forEach((n) => {
          const r = n.getBoundingClientRect();
          if (r.top < vh && r.bottom > 0) reveal(n);
        });
    };
    const timer = window.setInterval(sweep, 1200);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearInterval(timer);
      root.removeAttribute("data-reveal-armed");
    };
  }, []);
}

"use client";

import { useEffect, useState } from "react";

/**
 * Tells the header what it is sitting on top of.
 *
 * The header renders white-on-transparent until the page scrolls. That was fine
 * while every page opened on a dark band — but a site where all eight pages
 * open the same way is one template with the words swapped, which is exactly
 * the criticism. Several pages now open LIGHT, and on those the header has to
 * be dark from the first pixel.
 *
 * React context cannot carry this, because the header lives in the layout and
 * the page is its child — the value would have to travel upward. So the page
 * sets an attribute on <html> and the header watches it. One attribute, one
 * observer, no provider tree.
 */
export default function HeroTheme({ value }: { value: "light" | "dark" }) {
  useEffect(() => {
    document.documentElement.dataset.heroTheme = value;

    /* ⚠️ DELIBERATELY NO CLEANUP.
     *
     * The magnifier renders the page a SECOND time, so on a light page there
     * are two of these mounted. Resetting on unmount meant that when the lens
     * copy went away — which happens the moment the pointer leaves the Lens
     * container, e.g. moving up to the navigation — its cleanup flipped the
     * theme back to "dark" while the original was still mounted. The header
     * turned white-on-white and the nav appeared blank. Measured: link colour
     * went rgb(11,15,20) → rgb(238,242,246) on exactly that move.
     *
     * Instead, every page claims its own theme on mount and simply overwrites
     * whatever the last one set. PageHero claims "dark" so the common case is
     * covered without each page remembering to.
     */
  }, [value]);

  return null;
}

/** Reads the current hero theme and re-reads it whenever the page changes it. */
export function useHeroTheme() {
  const get = () =>
    (typeof document !== "undefined" &&
      (document.documentElement.dataset.heroTheme as "light" | "dark")) ||
    "dark";

  const [theme, setTheme] = useState<"light" | "dark">(get);

  useEffect(() => {
    setTheme(get());
    const obs = new MutationObserver(() => setTheme(get()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-hero-theme"],
    });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return theme;
}

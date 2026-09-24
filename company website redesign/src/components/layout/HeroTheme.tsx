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
    return () => {
      // Back to the default so a page that does not declare one gets dark.
      document.documentElement.dataset.heroTheme = "dark";
    };
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

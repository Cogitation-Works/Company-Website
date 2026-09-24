"use client";

import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/ui/Interactions";
import { NAV } from "@/content/site";
import { useHeroTheme } from "@/components/layout/HeroTheme";

/**
 * Direction-aware header: hides on scroll down, returns on scroll up.
 * Pattern seen on Terminal, Corgi and Lazarev — it gives the content the
 * full viewport without ever making navigation hard to reach.
 *
 * Every nav item is a real <a href>. The current live site uses
 * <button onClick={navigate}>, which is why Google finds zero internal links.
 */

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  // Several pages now open on a LIGHT hero. On those the header has to be dark
  // from the first pixel, not only once the page scrolls.
  const heroTheme = useHeroTheme();
  const onLight = scrolled || heroTheme === "light";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Ignore tiny jitters, and never hide near the top.
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 160);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div
          className={`transition-colors duration-300 ${
            scrolled
              ? "border-b border-line bg-canvas/85 text-ink backdrop-blur-xl"
              : onLight
                ? "border-b border-transparent text-ink"
                : "border-b border-transparent text-on-deep"
          }`}
        >
          <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-20">
            <a
              href="/"
              className="group flex items-center gap-2.5 text-[0.9375rem] font-[560] tracking-[-0.02em]"
              data-cursor
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
              </span>
              Cogitation Works
            </a>

            <nav className="hidden items-center gap-8 lg:flex">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="link-wipe text-[0.9375rem] opacity-80 transition-opacity hover:opacity-100"
                  data-cursor
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Magnetic className="hidden lg:inline-block">
                <a
                  href="/contact"
                  className={`inline-flex h-10 items-center rounded-pill px-5 text-[0.875rem] font-medium
                              transition-colors ${onLight ? "bg-ink text-white hover:bg-signal" : "bg-white text-ink hover:bg-live"}`}
                >
                  Book a call
                </a>
              </Magnetic>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="flex h-10 w-10 items-center justify-center lg:hidden"
              >
                <span className="relative block h-3 w-5">
                  <span
                    className={`absolute left-0 block h-px w-full bg-current transition-all duration-400
                                ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "top-1.5 rotate-45" : "top-0"}`}
                  />
                  <span
                    className={`absolute left-0 block h-px w-full bg-current transition-all duration-400
                                ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "top-1.5 -rotate-45" : "top-3"}`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-canvas transition-[opacity,visibility] duration-400 lg:hidden
                    ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <nav className="container-page flex h-full flex-col justify-center gap-1">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-line py-5 text-[2rem] font-[560] tracking-[-0.03em] transition-all
                         duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(14px)",
                transitionDelay: `${menuOpen ? 90 + i * 60 : 0}ms`,
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-pill bg-ink px-7
                       font-medium text-white"
            style={{
              opacity: menuOpen ? 1 : 0,
              transition: "opacity 500ms",
              transitionDelay: `${menuOpen ? 90 + NAV.length * 60 : 0}ms`,
            }}
          >
            Book a call
          </a>
        </nav>
      </div>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * The second tier of scroll effects — the ones the site was missing.
 *
 * Everything here is written against the same three rules that keep the
 * reference sites from stuttering:
 *   1. one rAF per effect, with an early exit when nothing moved;
 *   2. transforms written straight to the node, never through React state;
 *   3. no `will-change` unless the element genuinely transforms continuously.
 */

/* ------------------------------------------------------------------------ */
/* ParallaxCards — a grid where every card moves at its own rate             */
/* ------------------------------------------------------------------------ */

/**
 * Cards drift at different speeds as the grid passes, so the block breathes
 * instead of arriving as one slab. Yambo and Fame both do a version of this on
 * their index pages.
 *
 * The speed pattern is deliberately irregular — a repeating fast/slow/fast
 * reads as a mistake, an irregular one reads as depth.
 */
export function ParallaxCards({
  children,
  className = "",
  amount = 46,
}: {
  children: React.ReactNode[];
  className?: string;
  /** Maximum travel in px for the fastest card. */
  amount?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const cards = Array.from(
      wrap.querySelectorAll<HTMLElement>("[data-pcard]"),
    );
    const rates = [0.42, 1, 0.66, 0.84, 0.3, 0.92];

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -200 || r.top > vh + 200) return;

      const centre = (r.top + r.height / 2 - vh / 2) / vh;
      cards.forEach((c, i) => {
        const y = centre * amount * rates[i % rates.length];
        c.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [amount, reduced]);

  return (
    <div ref={wrapRef} className={className}>
      {children.map((child, i) => (
        <div key={i} data-pcard className="will-change-transform">
          {child}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* StackCards — cards that pin and stack as you scroll through them          */
/* ------------------------------------------------------------------------ */

/**
 * Each card sticks at the top, and the next one slides over it. The card
 * underneath scales down and dims slightly, so the stack reads as depth rather
 * than as a pile.
 *
 * Pure CSS `position: sticky` plus one rAF for the scale — no pin-spacer, no
 * layout recalculation per frame, which is where GSAP-pinned versions of this
 * usually go wrong.
 */
/* Per-card state the real instance publishes for the magnifier's duplicate.
   Module level so both mounts of the component see the same array. */
const stackState: { stuck: number; scale: number; bright: number }[] = [];

export function StackCards({
  items,
  accentOf,
}: {
  items: { id: string; node: React.ReactNode }[];
  accentOf?: (i: number) => string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  /* ⚠️ These cards are `position: sticky`, and the magnifier renders the page
     a second time inside a clipping box where sticky resolves against that box
     rather than the page. Left alone, the duplicated cards sit at their
     unstuck flow positions — so magnifying the card you are actually looking
     at showed a card from further down the stack instead.

     Sticky cannot be made to work in there, so the real instance publishes
     each card's current displacement and appearance, and the duplicate simply
     applies them. The copy never measures: inside the lens its own
     measurements are meaningless. */
  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const cards = Array.from(wrap.querySelectorAll<HTMLElement>("[data-stack]"));
    const inCopy = !!wrap.closest(".lens-zoom");

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      if (inCopy) {
        cards.forEach((c, i) => {
          const s = stackState[i];
          if (!s) return;
          /* The duplicate's cards are forced to `position: relative` by the
             lens CSS, so THEIR `offsetTop` is the honest unstuck flow offset —
             which the real card's is not, because Chrome folds the sticky
             shift into it. So each side measures the one it can: the real card
             publishes where it is actually painted inside the wrapper, and the
             copy makes up the difference from its own flow position. */
          c.style.transform =
            `translateY(${s.stuck - c.offsetTop}px) scale(${s.scale})`;
          c.style.filter = `brightness(${s.bright})`;
        });
        return;
      }

      const vh = window.innerHeight;
      const wrapTop = wrap.getBoundingClientRect().top;
      cards.forEach((c, i) => {
        const last = i === cards.length - 1;
        let scale = 1;
        let bright = 1;
        if (!last) {
          const nr = cards[i + 1].getBoundingClientRect();
          // How far the NEXT card has covered this one, 0 → 1.
          const p = Math.min(1, Math.max(0, (vh - nr.top) / vh));
          scale = 1 - p * 0.07;
          bright = 1 - p * 0.22;
          c.style.transform = `scale(${scale.toFixed(4)})`;
          c.style.filter = `brightness(${bright.toFixed(3)})`;
        }
        // Where this card is actually painted, measured from the wrapper's
        // top. The duplicate turns that into a shift off its own flow spot.
        stackState[i] = {
          stuck: Math.round(c.getBoundingClientRect().top - wrapTop),
          scale: Number(scale.toFixed(4)),
          bright: Number(bright.toFixed(3)),
        };
      });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div ref={wrapRef} className="relative">
      {items.map((item, i) => (
        <div
          key={item.id}
          data-stack
          className="sticky top-[14vh] origin-top will-change-transform"
          style={{
            marginBottom: i === items.length - 1 ? 0 : "3vh",
            zIndex: i + 1,
            ...(accentOf ? ({ "--accent": accentOf(i) } as React.CSSProperties) : {}),
          }}
        >
          {item.node}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* ClipReveal — a wipe, not a fade                                          */
/* ------------------------------------------------------------------------ */

/**
 * Reveals its children behind a moving edge. Fame Estate reveals almost
 * everything this way and it is the reason that site feels cut rather than
 * faded — a fade says "content arrived", a wipe says "content was uncovered".
 */
export function ClipReveal({
  children,
  from = "bottom",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  from?: "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const hidden = {
    bottom: "inset(100% 0 0 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
  }[from];

  /**
   * ⚠️ The clip goes on an INNER element, and the observer watches the OUTER
   * one. They cannot be the same node: Chrome factors an element's own
   * `clip-path` into the intersection rectangle, so an element clipped to
   * `inset(100%)` has an intersection ratio of 0 and can never report itself as
   * intersecting. Observing the clipped node meant the reveal never fired and
   * the heading stayed invisible forever.
   */
  return (
    <div ref={ref} className={className}>
      <div
        style={{
          clipPath: shown ? "inset(0 0 0 0)" : hidden,
          transition: `clip-path 1100ms cubic-bezier(0.83,0,0.17,1) ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* ScrambleText — characters resolve into place                             */
/* ------------------------------------------------------------------------ */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|<>[]{}*+=";

/**
 * Resolves each character from noise. Alche and Active Theory both use this on
 * monospace labels, and it belongs on monospace only — proportional type
 * reflows on every frame as the glyph widths change, which looks like a bug.
 */
export function ScrambleText({
  text,
  className = "",
  speed = 34,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let id = 0;
    const run = () => {
      frame = 0;
      clearInterval(id);
      id = window.setInterval(() => {
        frame++;
        const resolved = Math.floor(frame / 2);
        setOut(
          text
            .split("")
            .map((ch, i) =>
              i < resolved || ch === " "
                ? ch
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            )
            .join(""),
        );
        if (resolved >= text.length) clearInterval(id);
      }, speed);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, [text, speed, reduced]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}

/* ------------------------------------------------------------------------ */
/* HorizontalRail — vertical scroll drives a horizontal track                */
/* ------------------------------------------------------------------------ */

/**
 * A pinned section whose contents travel sideways as you scroll down. Terminal
 * and Viture both do this; Terminal's stutters because it re-measures the track
 * width on every scroll event. This measures on resize only.
 */
export function HorizontalRail({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setTravel(Math.max(0, track.scrollWidth - window.innerWidth + 80));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [children]);

  useEffect(() => {
    if (reduced || !travel) return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let raf = 0;
    let last = -1;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = wrap.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -r.top / total));
      if (Math.abs(p - last) < 0.0012) return;
      last = p;
      track.style.transform = `translate3d(${-p * travel}px,0,0)`;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [travel, reduced]);

  /* Under reduced motion it degrades to an ordinary horizontal scroller, which
     is the honest fallback — the content is still all reachable. */
  if (reduced) {
    return (
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 px-[var(--spacing-gutter)]">{children}</div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} style={{ height: `${Math.max(100, travel / 6 + 100)}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {label ? (
          <p className="container-page label-mono mb-8">{label}</p>
        ) : null}
        <div
          ref={trackRef}
          className="flex gap-6 pl-[var(--spacing-gutter)] will-change-transform"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

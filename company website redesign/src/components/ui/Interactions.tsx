"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion, useMediaQuery } from "@/lib/motion";

/* ==========================================================================
   Shared interaction primitives.
   Every one is disabled under prefers-reduced-motion and on touch, where
   hover states don't exist and pointer tracking just costs battery.
   ========================================================================== */

/** Button/link that leans toward the cursor as it approaches. */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;
    let raf = 0;
    const cur = { x: 0, y: 0 };
    const tgt = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = Math.max(r.width, r.height) * 1.1;
      if (dist < radius) {
        tgt.x = dx * strength;
        tgt.y = dy * strength;
      } else {
        tgt.x = 0;
        tgt.y = 0;
      }
    };

    const tick = () => {
      cur.x += (tgt.x - cur.x) * 0.16;
      cur.y += (tgt.y - cur.y) * 0.16;
      el.style.transform = `translate3d(${cur.x.toFixed(2)}px,${cur.y.toFixed(2)}px,0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced, strength]);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className ?? ""}`}>
      {children}
    </span>
  );
}

/** Card that tilts in 3D toward the pointer, with a moving specular sheen. */
export function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--tilt-x", `${(0.5 - py) * max * 2}deg`);
      el.style.setProperty("--tilt-y", `${(px - 0.5) * max * 2}deg`);
      el.style.setProperty("--sheen-x", `${px * 100}%`);
      el.style.setProperty("--sheen-y", `${py * 100}%`);
    };
    const onLeave = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [fine, reduced, max]);

  return (
    <div ref={ref} className={`tilt-card ${className ?? ""}`}>
      {children}
    </div>
  );
}

/** Counts up when scrolled into view. Tabular figures, so digits don't jitter. */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1600,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setValue(to);
      setDone(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutExpo — fast start, long settle, matching the site's motion
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setValue(to * eased);
          if (t < 1) requestAnimationFrame(step);
          else setDone(true);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, reduced]);

  return (
    <span
      ref={ref}
      data-counting={!done}
      className={`num tabular-nums transition-colors duration-500 ${
        done ? "text-ink" : "text-live"
      } ${className ?? ""}`}
    >
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Word-by-word colour fill tied to scroll position through the block. */
export function ScrubText({
  text,
  className,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "div";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top hits 85% of the viewport, 1 when it hits 25%.
      const p = (vh * 0.85 - r.top) / (vh * 0.6);
      setProgress(Math.min(1, Math.max(0, p)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  // The ref lives on a plain wrapper so `as` stays freely polymorphic —
  // attaching a typed ref to a generic ElementType doesn't type-check.
  return (
    <div ref={ref}>
      <Tag className={className}>
        {words.map((w, i) => {
          const wp = Math.min(1, Math.max(0, progress * words.length - i));
          return (
            <span
              key={i}
              style={{
                opacity: 0.16 + wp * 0.84,
                transition: "opacity 120ms linear",
              }}
            >
              {w}{" "}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}

/** Infinite marquee. Pauses on hover, reverses with scroll direction. */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee ${className ?? ""}`} data-reverse={reverse}>
      <div
        className="marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

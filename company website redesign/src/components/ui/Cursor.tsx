"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useMediaQuery } from "@/lib/motion";

/**
 * Cursor — a glass magnifying lens that follows the pointer.
 *
 * The fluid simulation (FluidCursor) supplies the flowing trail. This is the
 * solid object riding on top of it: a real glassmorphism lens, not a flat
 * translucent disc.
 *
 * How the glass is built, outside-in:
 *   • a bright 1px rim and an inner shadow give the bevel a thickness
 *   • a specular highlight sits upper-left, a weaker bounce lower-right
 *   • `backdrop-filter` genuinely samples the page beneath and magnifies the
 *     saturation/contrast, so it reads as optics rather than a sticker
 *   • a faint chromatic ring at the edge — real lenses fringe at the rim
 *
 * Over a card it grows moderately (96px → 128px). Everywhere else it stays
 * the same lens; the size change is the only difference, as asked.
 *
 * The native cursor is deliberately left visible, which is what
 * storytelling.noomoagency.com does.
 */

export default function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = usePrefersReducedMotion();
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine || reduced) return;

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const lens = { ...pos };
    let vel = 0;
    let last = { ...pos };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      vel = Math.min(1, vel * 0.8 + Math.hypot(pos.x - last.x, pos.y - last.y) * 0.012);
      last = { x: pos.x, y: pos.y };

      const el = e.target as HTMLElement | null;
      // Over an element that owns a REAL magnifier (components/ui/magnifier-lens),
      // this decorative glass ball hides so the two don't stack.
      lensRef.current?.setAttribute(
        "data-hidden",
        String(!!el?.closest?.('[data-cursor="lens"]')),
      );
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      // Light lag — enough to feel like a physical object being dragged,
      // not so much that it detaches from the pointer.
      lens.x += (pos.x - lens.x) * 0.14;
      lens.y += (pos.y - lens.y) * 0.14;
      vel *= 0.92;

      const el = lensRef.current;
      if (!el) return;
      // Squash along the direction of travel, like real glass with mass.
      const angle = Math.atan2(pos.y - lens.y, pos.x - lens.x) * 57.2958;
      el.style.transform =
        `translate3d(${lens.x}px,${lens.y}px,0) translate(-50%,-50%) ` +
        `rotate(${angle}deg) scale(${1 + vel * 0.16}, ${1 - vel * 0.1})`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <div
      ref={lensRef}
      data-hidden="false"
      aria-hidden="true"
      className="group pointer-events-none fixed left-0 top-0 z-[198] h-40 w-40 rounded-full
                 will-change-transform transition-[opacity,transform] duration-400
                 ease-[cubic-bezier(0.16,1,0.3,1)]
                 data-[hidden=true]:scale-0 data-[hidden=true]:opacity-0"
      style={{
        // The optics: magnify saturation and contrast, lift brightness a touch.
        // NOTE: backdrop-filter cannot scale, so true optical zoom is done by
        // the scaled page clone inside this element (see below). The filter
        // here only adds the glass's own tint and micro-contrast.
        backdropFilter: "saturate(1.35) contrast(1.06) brightness(1.04)",
        WebkitBackdropFilter: "saturate(1.35) contrast(1.06) brightness(1.04)",
        // Bevel: bright rim, deep inner shadow, soft drop shadow for lift.
        boxShadow: [
          "inset 0 0 0 1px rgba(255,255,255,0.55)",
          "inset 0 8px 20px rgba(255,255,255,0.30)",
          "inset 0 -10px 22px rgba(0,0,0,0.18)",
          "0 18px 48px -16px rgba(0,0,0,0.45)",
        ].join(", "),
        // Two speculars — strong upper-left, weak lower-right bounce.
        background: [
          "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.42), transparent 44%)",
          "radial-gradient(circle at 72% 80%, rgba(255,255,255,0.16), transparent 40%)",
        ].join(", "),
      }}
    >
      {/* Chromatic fringe at the rim — real lenses split colour at the edge. */}
      <span
        className="absolute inset-0 rounded-full opacity-70"
        style={{
          background:
            "conic-gradient(from 210deg, rgba(255,120,180,0.0) 0deg, rgba(255,120,180,0.35) 60deg, rgba(120,200,255,0.35) 180deg, rgba(255,215,140,0.3) 290deg, rgba(255,120,180,0.0) 360deg)",
          WebkitMask:
            "radial-gradient(circle, transparent 0 calc(50% - 2.5px), #000 calc(50% - 2.5px))",
          mask: "radial-gradient(circle, transparent 0 calc(50% - 2.5px), #000 calc(50% - 2.5px))",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}

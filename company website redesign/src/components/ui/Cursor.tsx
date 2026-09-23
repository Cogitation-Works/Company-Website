"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useMediaQuery } from "@/lib/motion";
import { LENS_SIZE } from "./magnifier-lens";

/**
 * Cursor — exactly two circles. No more.
 *
 *   OUTER ring  large, thin, LAGS behind the pointer. Purely a cursor; it does
 *               not magnify anything. The lag is what gives it weight.
 *   INNER ring  sits exactly on the pointer and IS the magnifying glass. Its
 *               rim frames the zoomed pixels that magnifier-lens.tsx renders
 *               underneath at the same diameter (LENS_SIZE).
 *
 * magnifier-lens.tsx deliberately draws no ring of its own, so a third circle
 * cannot appear — an earlier version did, which is what stacked up on screen.
 * The inner circle here is the only rim.
 *
 * The native cursor stays visible, as on storytelling.noomoagency.com.
 */

export default function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = usePrefersReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine || reduced) return;

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const outer = { ...pos };
    let vel = 0;
    let last = { ...pos };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      vel = Math.min(1, vel * 0.8 + Math.hypot(pos.x - last.x, pos.y - last.y) * 0.012);
      last = { x: pos.x, y: pos.y };
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      // Outer lags. Inner is exact, so it stays registered with the zoom
      // window — any lag there and the rim would slide off the magnified area.
      outer.x += (pos.x - outer.x) * 0.13;
      outer.y += (pos.y - outer.y) * 0.13;
      vel *= 0.92;

      if (outerRef.current) {
        const angle = Math.atan2(pos.y - outer.y, pos.x - outer.x) * 57.2958;
        outerRef.current.style.transform =
          `translate3d(${outer.x}px,${outer.y}px,0) translate(-50%,-50%) ` +
          `rotate(${angle}deg) scale(${1 + vel * 0.22}, ${1 - vel * 0.14})`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform =
          `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%)`;
      }
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
    <>
      {/* ---- OUTER: plain trailing ring. Behaves normally, no magnification. */}
      <div
        ref={outerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[198] h-[10.5rem] w-[10.5rem] rounded-full
                   border border-white/30 mix-blend-difference will-change-transform"
      />

      {/* ---- INNER: the magnifying glass rim.
           Exactly LENS_SIZE across, so it frames the zoom window precisely. */}
      <div
        ref={innerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[199] rounded-full will-change-transform"
        style={{
          width: LENS_SIZE,
          height: LENS_SIZE,
          boxShadow: [
            "inset 0 0 0 1px rgba(255,255,255,0.70)",
            "inset 0 8px 22px rgba(255,255,255,0.26)",
            "inset 0 -12px 26px rgba(0,0,0,0.20)",
            "0 20px 52px -18px rgba(0,0,0,0.50)",
          ].join(", "),
          background: [
            "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.26), transparent 44%)",
            "radial-gradient(circle at 74% 82%, rgba(255,255,255,0.10), transparent 40%)",
          ].join(", "),
        }}
      >
        {/* Chromatic fringe ON the rim — part of the inner circle, not a
            separate one. */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 210deg, rgba(255,120,180,0) 0deg, rgba(255,120,180,.40) 60deg, rgba(120,200,255,.40) 180deg, rgba(255,215,140,.30) 290deg, rgba(255,120,180,0) 360deg)",
            WebkitMask:
              "radial-gradient(circle, transparent 0 calc(50% - 2.5px), #000 calc(50% - 2.5px))",
            mask: "radial-gradient(circle, transparent 0 calc(50% - 2.5px), #000 calc(50% - 2.5px))",
            mixBlendMode: "screen",
          }}
        />
      </div>
    </>
  );
}

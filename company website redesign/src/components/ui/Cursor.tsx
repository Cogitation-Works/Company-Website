"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useMediaQuery } from "@/lib/motion";

/**
 * Cursor — a lagging refractive orb, plus a magnifier over cards.
 *
 * Corrected against frame-by-frame inspection of
 * storytelling.noomoagency.com. What that site ACTUALLY does:
 *
 *  • It does NOT hide the native cursor. The OS arrow stays visible and sharp.
 *  • It adds a soft glowing ORB that trails a long way behind the pointer —
 *    a slow spring, so at speed the orb can be a third of the screen away and
 *    only catches up once you stop.
 *  • The orb REFRACTS what is under it and throws a faint chromatic halo —
 *    a pink/cyan fringe ring visible against their pastel artwork.
 *
 * Earlier attempts here used a crosshair reticle and a drawing trail. Neither
 * is what that site does; both are gone.
 *
 * Over a card ([data-cursor="magnify"]) the orb grows into a magnifier with a
 * "View" label — the one addition we keep on top of Noomo's behaviour.
 */

export default function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = usePrefersReducedMotion();
  const orbRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine || reduced) return;

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const orb = { ...pos };
    const halo = { ...pos };
    let vel = 0;
    let last = { ...pos };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      vel = Math.min(1, vel * 0.78 + Math.hypot(pos.x - last.x, pos.y - last.y) * 0.014);
      last = { x: pos.x, y: pos.y };

      const el = e.target as HTMLElement | null;
      const magnify = !!el?.closest?.('[data-cursor="magnify"]');
      orbRef.current?.setAttribute("data-magnify", String(magnify));
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);

      // Deliberately slow. This long lag is the whole character of the effect —
      // at speed the orb falls well behind and glides in afterwards.
      orb.x += (pos.x - orb.x) * 0.055;
      orb.y += (pos.y - orb.y) * 0.055;
      // The halo trails even further, which is what separates the colour
      // fringe from the core and reads as chromatic aberration.
      halo.x += (pos.x - halo.x) * 0.038;
      halo.y += (pos.y - halo.y) * 0.038;
      vel *= 0.93;

      if (orbRef.current)
        orbRef.current.style.transform =
          `translate3d(${orb.x}px,${orb.y}px,0) translate(-50%,-50%) ` +
          `scale(${1 + vel * 0.6})`;

      if (haloRef.current)
        haloRef.current.style.transform =
          `translate3d(${halo.x}px,${halo.y}px,0) translate(-50%,-50%) ` +
          `scale(${1.15 + vel * 0.9})`;
      if (haloRef.current)
        haloRef.current.style.opacity = String(0.25 + vel * 0.55);


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
      {/* Chromatic halo — trails furthest, so its colour fringe separates from
          the orb as you move. Pure decoration, no backdrop sampling. */}
      <div
        ref={haloRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[197] h-28 w-28 rounded-full
                   blur-[14px] will-change-transform"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(255,120,180,0.55), rgba(120,190,255,0.5), rgba(255,215,140,0.5), rgba(255,120,180,0.55))",
          mixBlendMode: "plus-lighter",
        }}
      />

      {/* The orb. backdrop-filter samples the real page beneath, so this layer
          must NOT be blend-isolated. */}
      <div
        ref={orbRef}
        data-magnify="false"
        aria-hidden="true"
        className="group pointer-events-none fixed left-0 top-0 z-[198] flex h-24 w-24 items-center
                   justify-center rounded-full will-change-transform
                   transition-[width,height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                   data-[magnify=true]:h-36 data-[magnify=true]:w-36"
        style={{
          backdropFilter: "saturate(1.6) brightness(1.06) contrast(1.04) blur(0.5px)",
          WebkitBackdropFilter: "saturate(1.6) brightness(1.06) contrast(1.04) blur(0.5px)",
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.35), inset 0 6px 26px rgba(255,255,255,0.28), 0 18px 50px -18px rgba(0,0,0,0.4)",
          background:
            "radial-gradient(circle at 36% 30%, rgba(255,255,255,0.32), rgba(255,255,255,0.05) 55%, transparent 72%)",
        }}
      >
        <span
          className="label-mono !text-[0.625rem] !text-white opacity-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]
                     transition-opacity duration-300 group-data-[magnify=true]:opacity-100"
        >
          View
        </span>
      </div>
    </>
  );
}

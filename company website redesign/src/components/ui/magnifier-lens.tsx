"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Lens — the magnification layer only.
 *
 * It genuinely ZOOMS, where a `backdrop-filter` disc cannot, because it renders
 * the children A SECOND TIME, scales that copy, and shows it through a small
 * circular window under the pointer. CSS filters can tint or blur what is
 * behind an element but can never magnify it — only a scaled re-render does.
 *
 * It draws NO ring, rim or glass of its own. The rim belongs to Cursor.tsx;
 * this file only supplies the zoomed pixels, aligned to that cursor's INNER
 * circle. Keep LENS_SIZE in sync with it.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️ WHY THIS WAS REWRITTEN — it could blank the entire page.
 *
 * The previous version rendered the zoom layer as `absolute inset-0`, so the
 * duplicate covered the WHOLE page — on a long page, 1440×2807px — with an
 * opaque `--color-canvas` background, held back from view *only* by a
 * `mask-image`. Two consequences:
 *
 *   1. If the mask failed to apply for even a frame — a hydration pass, a Fast
 *      Refresh, a style not yet committed — the result was a full-viewport
 *      opaque rectangle in exactly the page background colour. A blank page.
 *   2. `hovering` was driven by mouseenter/mouseleave alone. If the pointer
 *      left via a navigation, a window blur, or a tab switch, `mouseleave`
 *      never fired, so the flag stuck true and the layer persisted — including
 *      across a bfcache restore on back-navigation.
 *
 * Both were reported as "sometimes the page goes blank when I reload or go
 * back", and both are structural rather than cosmetic: a component whose
 * failure mode is *hide the entire site* is the wrong shape.
 *
 * Now the window is a LENS_SIZE×LENS_SIZE element positioned at the pointer.
 * The scaled copy lives inside it under `overflow: hidden`. If every style on
 * it failed simultaneously, the worst possible outcome is a 128px square in
 * the wrong place — never a blank page. The mask is now only there to soften
 * the circular edge, not to prevent a catastrophe.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const LENS_SIZE = 128;

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
}

export default function Lens({
  children,
  zoomFactor = 1.75,
  lensSize = LENS_SIZE,
}: LensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [box, setBox] = useState({ w: 0, h: 0 });

  /* The inner copy needs the container's real pixel size, because the window
     itself is only 128px and `inset-0` inside it would clip to 128px. */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () =>
      setBox({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Every way the pointer can leave without a mouseleave event. Without these
     the lens outlives the pointer and reappears on the next page. */
  useEffect(() => {
    const off = () => setActive(false);
    window.addEventListener("blur", off);
    window.addEventListener("pagehide", off);
    document.addEventListener("visibilitychange", off);
    return () => {
      window.removeEventListener("blur", off);
      window.removeEventListener("pagehide", off);
      document.removeEventListener("visibilitychange", off);
    };
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    // Activation happens on MOVE, never on ENTER. Entering sets no position,
    // so the old version could render the window at (0,0) for a frame.
    if (!active) setActive(true);
  };

  const half = lensSize / 2;
  const ready = active && box.w > 0;

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseMove={onMouseMove}
      onMouseLeave={() => setActive(false)}
    >
      {children}

      {ready ? (
        <div
          className="lens-zoom pointer-events-none absolute overflow-hidden rounded-full"
          style={{
            width: lensSize,
            height: lensSize,
            left: mouse.x - half,
            top: mouse.y - half,
            zIndex: 197, // under the cursor rings (198+), over the page
            // Softens the circular edge. `overflow: hidden` + border-radius
            // already does the clipping, so a mask failure is cosmetic now.
            maskImage: `radial-gradient(circle ${half}px at ${half}px ${half}px, #000 98%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${half}px at ${half}px ${half}px, #000 98%, transparent 100%)`,
          }}
        >
          {/* The second render of the children, offset so the point under the
              pointer lands at the centre of the window, then scaled about that
              same point so it stays there. */}
          <div
            className="absolute"
            style={{
              width: box.w,
              height: box.h,
              left: -(mouse.x - half),
              top: -(mouse.y - half),
              transform: `scale(${zoomFactor})`,
              transformOrigin: `${mouse.x}px ${mouse.y}px`,
            }}
          >
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}

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
  const lensRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  /* Viewport coordinates of the pointer, kept in a ref rather than state:
     the correction loop below reads it every frame and must not re-render. */
  const client = useRef({ x: 0, y: 0 });
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
    client.current = { x: e.clientX, y: e.clientY };
    // Activation happens on MOVE, never on ENTER. Entering sets no position,
    // so the old version could render the window at (0,0) for a frame.
    if (!active) setActive(true);
  };

  const half = lensSize / 2;
  const ready = active && box.w > 0;

  /* ──────────────────────────────────────────────────────────────────────
     GEOMETRY CORRECTION — the general answer to "the magnifier is showing
     the wrong thing".

     The copy is a second React render, and a surprising number of things
     refuse to land in the same place in it: `position: fixed` resolves
     against the scaled wrapper instead of the viewport, CSS marquees run at
     a different animation phase, anything that measures its own position in
     a rAF measures itself inside a 128px box, and `sticky` resolves against
     the lens. Each was fixed individually and each time a new one appeared.

     So this stops explaining and starts measuring. Only the handful of
     elements actually under the pointer matter — everything else in the copy
     is outside the window — so on each frame it takes that stack, finds each
     one's twin, compares where the two really are, and nudges the twin by
     the difference.

     Corrections go on the `translate` property, not `transform`, precisely
     so they compose with whatever transform the element already has (a
     marquee's animation, a parallax offset) instead of fighting it.
     ────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!ready) return;
    const container = containerRef.current;
    const copyRoot = copyRef.current;
    if (!container || !copyRoot) return;

    // How far each corrected twin is currently being pushed.
    const applied = new Map<HTMLElement, { x: number; y: number }>();
    let raf = 0;

    const pathOf = (el: Element) => {
      const path: number[] = [];
      let n: Element | null = el;
      while (n && n !== container) {
        const p: Element | null = n.parentElement;
        if (!p) return null;
        path.unshift(Array.prototype.indexOf.call(p.children, n));
        n = p;
      }
      return n === container ? path : null;
    };

    const atPath = (path: number[]) => {
      // The copy's root stands in for the container, so the first index is
      // resolved against it directly.
      let n: Element | undefined = copyRoot;
      for (const i of path) {
        n = n?.children[i];
        if (!n) return null;
      }
      return n as HTMLElement | undefined;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const lensEl = lensRef.current;
      if (!lensEl) return;
      const lr = lensEl.getBoundingClientRect();
      const cx = lr.left + lr.width / 2;
      const cy = lr.top + lr.height / 2;

      /* The lens is pointer-events:none, so this returns the REAL stack.
         REVERSED, so it runs outermost → innermost. Correcting a child before
         its parent double-counts: the child is nudged by the difference, then
         the parent is nudged by the same difference and carries the child
         along with it. Going outside-in means each element is measured after
         its ancestors have already been put right, so what is left to correct
         is only its own. */
      const stack = (
        document.elementsFromPoint(
          client.current.x,
          client.current.y,
        ) as HTMLElement[]
      )
        .slice(0, 18)
        .reverse();

      /* Marquees animate in CSS, so the copy's loop is at whatever phase it
         happened to start at. The corrector below cannot reach them — they are
         pointer-events:none, so elementsFromPoint never returns them — so
         their transform is mirrored straight across. Index matching is safe:
         both trees render the same components in the same order. */
      const realTracks = [
        ...container.querySelectorAll<HTMLElement>(".marquee-track"),
      ].filter((t) => !t.closest(".lens-zoom"));
      const copyTracks = [
        ...copyRoot.querySelectorAll<HTMLElement>(".marquee-track"),
      ];
      for (let i = 0; i < Math.min(realTracks.length, copyTracks.length); i++) {
        copyTracks[i].style.transform = getComputedStyle(realTracks[i]).transform;
      }

      const seen = new Set<HTMLElement>();
      for (const el of stack) {
        if (el.closest(".lens-zoom")) continue;
        const path = pathOf(el);
        if (!path) continue;
        const twin = atPath(path);
        if (!twin) continue;

        const ra = el.getBoundingClientRect();
        const rb = twin.getBoundingClientRect();
        if (!ra.width || !rb.width) continue;

        // Undo the zoom to compare like with like.
        const pageLeft = cx + (rb.left - cx) / zoomFactor;
        const pageTop = cy + (rb.top - cy) / zoomFactor;
        const cur = applied.get(twin) ?? { x: 0, y: 0 };
        const next = {
          x: cur.x + (ra.left - pageLeft),
          y: cur.y + (ra.top - pageTop),
        };
        seen.add(twin);
        if (Math.abs(next.x - cur.x) > 0.5 || Math.abs(next.y - cur.y) > 0.5) {
          applied.set(twin, next);
          twin.style.translate = `${next.x.toFixed(1)}px ${next.y.toFixed(1)}px`;
        }
      }

      // Release anything that has left the window, so a stale nudge cannot
      // outlive the reason for it.
      for (const [twin] of applied) {
        if (!seen.has(twin)) {
          twin.style.translate = "";
          applied.delete(twin);
        }
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      for (const [twin] of applied) twin.style.translate = "";
    };
  }, [ready, zoomFactor]);

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
          ref={lensRef}
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
            ref={copyRef}
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

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-scrubbed frame sequence — the Core opening.
 *
 * PERFORMANCE — written specifically to avoid the stutter you get on sites
 * that scrub video on scroll:
 *  1. NO VIDEO SEEKING. Seeking compressed video forces a keyframe decode per
 *     scroll event — that is the 1–5fps "stuck" feel. Here 60 stills decode
 *     ONCE into ImageBitmaps; scrubbing is then a pure blit.
 *  2. ADJACENT-FRAME CROSS-FADE, so 60 frames read as continuous motion even
 *     when scrolling slowly.
 *  3. DECOUPLED LOOP — the scroll listener only writes a number; drawing runs
 *     in one rAF and is skipped entirely when nothing moved.
 *
 * The frame cache is MODULE-LEVEL on purpose. React StrictMode mounts effects
 * twice in development; a per-instance cache plus a cleanup that closed the
 * bitmaps meant the second mount found an empty array and the sequence never
 * advanced past frame 0. Module scope makes the double-mount a no-op and lets
 * a remount reuse already-decoded frames.
 */

const FRAME_COUNT = 60;
const framePath = (i: number) =>
  `/hero/frames/f${String(i).padStart(3, "0")}.webp`;

type Frame = ImageBitmap | HTMLImageElement;

const cache: (Frame | undefined)[] = [];
let loadStarted = false;
let loadedCount = 0;

async function decode(i: number): Promise<Frame> {
  const res = await fetch(framePath(i));
  const blob = await res.blob();
  if ("createImageBitmap" in window) return createImageBitmap(blob);
  const img = new Image();
  img.src = URL.createObjectURL(blob);
  await img.decode();
  return img;
}

/** Kicks off decoding once per page load; safe to call repeatedly. */
function ensureLoaded(onFirst: () => void) {
  if (loadStarted) {
    if (cache[0]) onFirst();
    return;
  }
  loadStarted = true;

  (async () => {
    cache[0] = await decode(0);
    loadedCount = 1;
    onFirst();
    for (let s = 1; s < FRAME_COUNT; s += 8) {
      const n = Math.min(8, FRAME_COUNT - s);
      const batch = await Promise.all(
        Array.from({ length: n }, (_, k) => decode(s + k)),
      );
      batch.forEach((f, k) => {
        cache[s + k] = f;
      });
      loadedCount += n;
    }
  })().catch(() => {
    /* A failed frame just means the sequence holds on what it has. */
  });
}

export default function CoreSequence({
  className,
  onProgress,
  pinRef,
}: {
  className?: string;
  onProgress?: (p: number) => void;
  /**
   * The tall wrapper the hero is pinned inside. Scrolling through it is what
   * drives the sequence: frame 0 at the top, the last frame at the bottom,
   * and the page only moves off the hero once the sequence has finished.
   * Scrolling back up runs the same mapping backwards, so the shell closes
   * and the hero is handed back exactly as it was found.
   */
  pinRef?: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(() => !!cache[0]);

  useEffect(() => {
    ensureLoaded(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let current = 0;
    let target = 0;
    let lastDrawn = -1;

    // Size is read on resize only — never per frame, so no layout thrashing.
    const measure = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      lastDrawn = -1;
    };

    const paint = (frame: Frame, alpha: number) => {
      const scale = Math.min(
        canvas.width / frame.width,
        canvas.height / frame.height,
      );
      const dw = frame.width * scale;
      const dh = frame.height * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(
        frame,
        (canvas.width - dw) / 2,
        (canvas.height - dh) / 2,
        dw,
        dh,
      );
    };

    /** Nearest decoded frame, so gaps during loading never blank the canvas. */
    const nearest = (i: number) => {
      if (cache[i]) return i;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (cache[i - d]) return i - d;
        if (cache[i + d]) return i + d;
      }
      return -1;
    };

    const draw = (index: number) => {
      const i0 = nearest(Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(index))));
      if (i0 < 0) return;
      const a = cache[i0]!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      paint(a, 1);

      // Cross-fade into the next frame — this is what removes the stepping.
      const i1 = Math.min(FRAME_COUNT - 1, i0 + 1);
      const mix = index - Math.floor(index);
      if (i1 !== i0 && cache[i1] && mix > 0.01) paint(cache[i1]!, mix);
      ctx.globalAlpha = 1;
    };

    const onScroll = () => {
      let p: number;

      const pin = pinRef?.current;
      if (pin) {
        // Progress across the pinned range. The hero is stuck to the viewport
        // for exactly this distance, so the sequence is guaranteed to reach
        // its last frame before the page scrolls on — and to be back at frame
        // 0 by the time the hero is released upwards.
        const rect = pin.getBoundingClientRect();
        const travel = rect.height - window.innerHeight;
        p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      } else {
        // Unpinned fallback (mobile, or any other caller): one viewport of
        // scroll plays it once and it holds on the last frame.
        p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight || 1)));
      }

      // Clamp to what has actually decoded, so early scrolls still move.
      target = Math.min(p * (FRAME_COUNT - 1), Math.max(0, loadedCount - 1));
      onProgress?.(p);
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      onScroll(); // cheap: two reads, no layout
      const delta = target - current;
      current = Math.abs(delta) < 0.002 ? target : current + delta * 0.16;
      if (Math.abs(current - lastDrawn) < 0.01) return; // idle costs nothing
      lastDrawn = current;
      draw(current);
    };

    measure();
    window.addEventListener("resize", measure);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
      // NOTE: bitmaps are deliberately NOT closed — the cache is shared and
      // survives remounts.
    };
  }, [ready, onProgress, pinRef]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 500ms var(--ease-out-expo)",
      }}
    />
  );
}

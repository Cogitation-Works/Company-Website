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
    // Frame 0 first and on its own, so the hero has something to show
    // immediately rather than staying blank.
    cache[0] = await decode(0);
    onFirst();

    /* The rest through a worker pool rather than one awaited batch after
       another. Serial batches meant the last frames were still arriving long
       after the visitor had started scrolling, and a scrub over a half-loaded
       sequence holds on whatever frame is nearest — which looks exactly like a
       video that has frozen. A pool keeps the connection busy and closes that
       window as fast as the network allows. */
    let next = 1;
    const worker = async () => {
      for (let i = next++; i < FRAME_COUNT; i = next++) {
        try {
          cache[i] = await decode(i);
        } catch {
          /* One missing frame just means the nearest one is shown instead. */
        }
      }
    };
    await Promise.all(Array.from({ length: 10 }, worker));
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
    let lastDrawn = -1;

    /* Pin geometry, cached. Reading getBoundingClientRect() inside the frame
       loop forces the browser to flush layout on every tick, which is exactly
       the kind of per-frame cost that shows up as judder. Document-relative
       offsets only change on resize, so they are measured there instead and
       the loop does nothing but read scrollY. */
    let pinTop = 0;
    let pinTravel = 0;

    const measure = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);

      const pin = pinRef?.current;
      if (pin) {
        const r = pin.getBoundingClientRect();
        pinTop = r.top + window.scrollY;
        pinTravel = r.height - window.innerHeight;
      }
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

    /* Cross-fade WHILE MOVING, snap crisp AT REST.
       Fading frame N into N+1 fills the gaps between only 60 frames, which is
       what keeps fast scrolling continuous. But holding that fade once the
       page stops leaves two different renders superimposed on screen — a
       permanent double exposure that reads as a blurry, stalled video. So the
       blend is used only while the sequence is actually advancing, and the
       moment it settles the nearest single frame is drawn on its own. */
    const clamp = (i: number) => Math.max(0, Math.min(FRAME_COUNT - 1, i));

    const draw = (index: number, blend: boolean) => {
      if (!blend) {
        const i = nearest(clamp(Math.round(index)));
        if (i < 0) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint(cache[i]!, 1);
        return;
      }
      const i0 = nearest(clamp(Math.floor(index)));
      if (i0 < 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      paint(cache[i0]!, 1);
      const i1 = clamp(i0 + 1);
      const mix = index - Math.floor(index);
      if (i1 !== i0 && cache[i1] && mix > 0.01) paint(cache[i1]!, mix);
      ctx.globalAlpha = 1;
    };

    const progressNow = () => {
      if (pinRef?.current) {
        // Progress across the pinned range. The hero is stuck to the viewport
        // for exactly this distance, so the sequence is guaranteed to reach
        // its last frame before the page scrolls on — and to be back at frame
        // 0 by the time the hero is released upwards.
        if (pinTravel <= 0) return 0;
        return Math.min(1, Math.max(0, (window.scrollY - pinTop) / pinTravel));
      }
      // Unpinned fallback (mobile, or any other caller): one viewport of
      // scroll plays it once and it holds on the last frame.
      return Math.min(1, Math.max(0, window.scrollY / (window.innerHeight || 1)));
    };

    /* NO easing here. Lenis already smooths the scroll position itself, over
       roughly a second. Easing again on top of that stacked two lag curves:
       the sequence trailed the page, and kept animating for a while after the
       page had stopped. Mapping straight from scroll position means the frame
       on screen always matches where the page actually is, and everything
       stops the moment scrolling does. */
    let lastIndex = 0;
    let stillFor = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const p = progressNow();
      const index = p * (FRAME_COUNT - 1);

      // "Moving" means the sequence advanced by a meaningful fraction of a
      // frame this tick. A couple of quiet ticks in a row counts as stopped,
      // so a single dropped frame cannot flicker it between the two modes.
      const moved = Math.abs(index - lastIndex) > 0.01;
      stillFor = moved ? 0 : stillFor + 1;
      lastIndex = index;
      const blend = stillFor < 2;

      // Redraw only when what would be ON SCREEN changes: while blending that
      // is any small move, at rest it is a change of whole frame. An idle page
      // draws nothing at all.
      const key = blend ? Math.round(index * 20) : Math.round(index) * 20;
      if (key === lastDrawn) return;
      lastDrawn = key;
      draw(index, blend);
      onProgress?.(p);
    };

    measure();
    window.addEventListener("resize", measure);
    /* The pinned wrapper is sized in svh, and its box can settle after fonts
       and images land. Watching it keeps the scroll→frame mapping honest
       without measuring anything inside the frame loop. */
    const ro = pinRef?.current ? new ResizeObserver(measure) : null;
    if (ro && pinRef?.current) ro.observe(pinRef.current);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
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

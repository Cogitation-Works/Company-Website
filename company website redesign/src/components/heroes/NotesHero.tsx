"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * The blog hero — you write on it.
 *
 * The page is called "Working notes", so the interaction is a pen: moving the
 * pointer lays down a tapered ink stroke on the page, and the strokes fade out
 * over a few seconds like something drying. Kode Immersive does a version of
 * this ("SCRATCH AROUND", persistent orange marks); this is the quieter,
 * editorial reading of the same idea.
 *
 * It is deliberately a DIFFERENT mechanism from everything else on the site.
 * The home hero is a GPU particle field, the products hero is a raymarched
 * shader, the fluid cursor is a Navier-Stokes simulation — this is plain
 * canvas 2D with a velocity-tapered quadratic stroke. A blog does not need a
 * GPU, and it runs on a phone.
 *
 * Nib behaviour worth knowing: stroke width is inversely proportional to
 * pointer speed. Move slowly and the line is fat, flick and it thins to a
 * hairline. That single rule is most of what makes a drawn line feel like ink
 * rather than like a mouse trail.
 */

type Pt = { x: number; y: number; w: number; t: number };

const LIFETIME = 5200; // ms before a point has fully faded
const MAX_POINTS = 420;

export default function NotesHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const [drawn, setDrawn] = useState(false);
  /* Mirrored in a ref so the draw loop can check it WITHOUT `drawn` being an
     effect dependency. It was: the first stroke flipped the state, the effect
     re-ran, and the point buffer was wiped — so nothing ever appeared. */
  const drawnRef = useRef(false);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let pts: Pt[] = [];
    let last: { x: number; y: number; t: number } | null = null;
    let dpr = 1;

    const measure = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) {
        last = null;
        return;
      }
      const now = performance.now();

      /* Width from speed — a real nib lays down less ink the faster it moves.
         Without this the line is a uniform tube and reads as a mouse trail. */
      let w = 7;
      if (last) {
        const dt = Math.max(1, now - last.t);
        const speed = Math.hypot(x - last.x, y - last.y) / dt; // px per ms
        w = Math.max(1.1, 7.5 - speed * 7);
      }

      pts.push({ x, y, w, t: now });
      if (pts.length > MAX_POINTS) pts = pts.slice(-MAX_POINTS);
      last = { x, y, t: now };
      if (!drawnRef.current) {
        drawnRef.current = true;
        setDrawn(true);
      }
    };

    const onLeave = () => {
      last = null;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      pts = pts.filter((p) => now - p.t < LIFETIME);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      if (pts.length < 2) return;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      /* Drawn as short segments rather than one path, because each segment
         needs its own width and its own age-based opacity.
         Midpoint smoothing: each segment runs from the midpoint BEFORE the
         current point to the midpoint AFTER it, using the point itself as the
         control. Segments then share endpoints and the line is continuous.
         (Using the start point as its own control — which is what this did
         first — draws only half of each gap, so the stroke came out dashed.) */
      for (let i = 1; i < pts.length - 1; i++) {
        const prev = pts[i - 1];
        const cur = pts[i];
        const next = pts[i + 1];

        /* A large jump means the pointer left and re-entered somewhere else —
           joining those would rule a line across the page. 180px rather than
           90: a fast flick easily covers 100px between two pointermove events,
           and at 90 those strokes silently vanished. */
        if (
          Math.hypot(cur.x - prev.x, cur.y - prev.y) > 180 ||
          Math.hypot(next.x - cur.x, next.y - cur.y) > 180
        )
          continue;

        const age = (now - cur.t) / LIFETIME;
        const alpha = Math.pow(1 - age, 1.8) * 0.62;
        if (alpha <= 0.002) continue;

        ctx.beginPath();
        ctx.moveTo((prev.x + cur.x) / 2, (prev.y + cur.y) / 2);
        ctx.quadraticCurveTo(
          cur.x,
          cur.y,
          (cur.x + next.x) / 2,
          (cur.y + next.y) / 2,
        );
        ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
        ctx.lineWidth = cur.w;
        ctx.stroke();
      }
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <>
      {/* Faint ruled paper, so there is something for the ink to sit on. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 39px, var(--color-line) 39px 40px)",
          maskImage: "linear-gradient(to bottom, #000 40%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 40%, transparent 92%)",
        }}
      />

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* The invitation. Disappears the moment you actually draw. */}
      {!reduced ? (
        <span
          aria-hidden="true"
          className="label-mono pointer-events-none absolute bottom-8 right-[var(--spacing-gutter)] transition-opacity duration-700"
          style={{ opacity: drawn ? 0 : 1 }}
        >
          Move to write
        </span>
      ) : null}
    </>
  );
}

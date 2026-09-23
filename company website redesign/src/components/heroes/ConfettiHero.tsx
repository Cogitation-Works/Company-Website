"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * /contact hero — flat 2D shapes falling under gravity and piling along the
 * bottom edge, scattering away from the pointer.
 *
 * Lusion closes `/projects` with exactly this (research R15): hundreds of small
 * primitives piled under physics beneath "Let's work together!". It is the one
 * moment on a site of this register where being cheerful is correct, and it
 * costs no assets at all — every shape is drawn by the canvas.
 *
 * The physics is deliberately naive: gravity, floor and wall restitution,
 * neighbour separation and pointer repulsion. Real collision solving for 120
 * bodies is not worth a physics engine here, and a simple separation pass looks
 * identical once they have settled.
 */

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  rot: number;
  vr: number;
  shape: 0 | 1 | 2 | 3;
  color: string;
};

const COLORS = [
  "#0b0f14",
  "#2563eb",
  "#f0a500",
  "#0d9488",
  "#e2e6eb",
  "#dc2626",
  "#7c3aed",
  "#8b95a3",
];

export default function ConfettiHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const pointer = { x: -9999, y: -9999 };
    const bodies: Body[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      bodies.length = 0;
      // Scaled to width so a phone does not run 120 bodies.
      const n = Math.round(Math.min(120, Math.max(38, w / 12)));
      for (let i = 0; i < n; i++) {
        const r = 7 + Math.random() * 13;
        bodies.push({
          x: Math.random() * w,
          // Stacked above the viewport so they rain in rather than appear.
          y: -Math.random() * h * 1.6,
          vx: (Math.random() - 0.5) * 1.2,
          vy: Math.random() * 2,
          r,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.08,
          shape: Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const step = () => {
      raf = requestAnimationFrame(step);
      ctx.clearRect(0, 0, w, h);

      for (const b of bodies) {
        b.vy += 0.34; // gravity
        b.vx *= 0.995;

        // Pointer pushes bodies out of the way, falling off with distance.
        const dx = b.x - pointer.x;
        const dy = b.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 22000 && d2 > 0.01) {
          const f = (1 - d2 / 22000) * 2.4;
          const d = Math.sqrt(d2);
          b.vx += (dx / d) * f;
          b.vy += (dy / d) * f;
        }

        b.x += b.vx;
        b.y += b.vy;
        b.rot += b.vr;

        // Floor and walls, with energy loss so the pile settles.
        if (b.y + b.r > h) {
          b.y = h - b.r;
          b.vy *= -0.32;
          b.vx *= 0.86;
          b.vr *= 0.86;
        }
        if (b.x - b.r < 0) {
          b.x = b.r;
          b.vx *= -0.5;
        }
        if (b.x + b.r > w) {
          b.x = w - b.r;
          b.vx *= -0.5;
        }
      }

      // One separation pass. Enough to stop overlap without a real solver.
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i];
          const c = bodies[j];
          const dx = c.x - a.x;
          const dy = c.y - a.y;
          const min = a.r + c.r;
          const d2 = dx * dx + dy * dy;
          if (d2 < min * min && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const push = (min - d) / 2;
            const nx = dx / d;
            const ny = dy / d;
            a.x -= nx * push;
            a.y -= ny * push;
            c.x += nx * push;
            c.y += ny * push;
          }
        }
      }

      for (const b of bodies) {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.fillStyle = b.color;
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 2;
        switch (b.shape) {
          case 0: // disc
            ctx.beginPath();
            ctx.arc(0, 0, b.r, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 1: // ring
            ctx.beginPath();
            ctx.arc(0, 0, b.r - 1.5, 0, Math.PI * 2);
            ctx.stroke();
            break;
          case 2: // triangle
            ctx.beginPath();
            ctx.moveTo(0, -b.r);
            ctx.lineTo(b.r, b.r * 0.8);
            ctx.lineTo(-b.r, b.r * 0.8);
            ctx.closePath();
            ctx.fill();
            break;
          default: // chevron
            ctx.beginPath();
            ctx.moveTo(-b.r, -b.r * 0.3);
            ctx.lineTo(0, b.r * 0.5);
            ctx.lineTo(b.r, -b.r * 0.3);
            ctx.stroke();
        }
        ctx.restore();
      }
    };

    resize();
    spawn();
    if (reduced) {
      // Settle it instantly and stop: the pile is the picture, the fall is not.
      for (let i = 0; i < 260; i++) step();
      cancelAnimationFrame(raf);
      return;
    }

    const onResize = () => {
      resize();
      spawn();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

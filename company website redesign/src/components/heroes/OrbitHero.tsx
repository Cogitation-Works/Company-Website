"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * /ventures hero — three nodes orbiting a core on tilted rings, with a live
 * link drawn from the core to each one.
 *
 * Three ventures, three orbits, all still bound to the same centre. The nodes
 * carry each venture's own accent so the hero and the cards below agree.
 *
 * Canvas 2D rather than WebGL: three dots and three ellipses do not justify a
 * GL context, and this way it runs everywhere including phones.
 */
export default function OrbitHero({
  nodes,
}: {
  nodes: { label: string; accent: string }[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    const pointer = { x: 0.5, y: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.y = (e.clientY - r.top) / r.height;
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;

      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      // Pointer nudges the whole system rather than any single node, so it
      // reads as parallax rather than as a cursor toy.
      const px = (pointer.x - 0.5) * 26;
      const py = (pointer.y - 0.5) * 18;

      if (!reduced) t += 0.0042;

      nodes.forEach((n, i) => {
        const rx = Math.min(w, h) * (0.19 + i * 0.105);
        const ry = rx * 0.34;
        const angle = t * (1.5 - i * 0.32) + i * 2.3;
        const ox = cx + px + Math.cos(angle) * rx;
        const oy = cy + py + Math.sin(angle) * ry;

        // Orbit ring
        ctx.beginPath();
        ctx.ellipse(cx + px, cy + py, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Link from the core out to the node
        ctx.beginPath();
        ctx.moveTo(cx + px, cy + py);
        ctx.lineTo(ox, oy);
        ctx.strokeStyle = n.accent + "44";
        ctx.stroke();

        // Node, with a glow that breathes slightly out of phase per node
        const pulse = 1 + Math.sin(t * 9 + i * 2) * 0.13;
        ctx.beginPath();
        ctx.arc(ox, oy, 7 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.accent;
        ctx.shadowColor = n.accent;
        ctx.shadowBlur = 26;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // The core
      ctx.beginPath();
      ctx.arc(cx + px, cy + py, 11, 0, Math.PI * 2);
      const g = ctx.createRadialGradient(cx + px, cy + py, 0, cx + px, cy + py, 34);
      g.addColorStop(0, "#ffd88a");
      g.addColorStop(0.45, "#f0a500");
      g.addColorStop(1, "rgba(240,165,0,0)");
      ctx.fillStyle = g;
      ctx.fill();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [nodes, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
    />
  );
}

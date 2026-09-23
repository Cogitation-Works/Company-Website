"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Lens — a real magnifying glass.
 *
 * Based on the 21st.dev magnifier-lens component. The reason it genuinely
 * ZOOMS, where a `backdrop-filter` disc cannot, is that it renders the
 * children A SECOND TIME, scales that copy with a transform, and masks it to
 * a circle under the pointer. CSS filters can tint and blur what is behind an
 * element but can never magnify it — only a scaled re-render can.
 *
 * Glass treatment on top of the original: a bright rim, an inner bevel
 * shadow, two speculars and a chromatic fringe, so it reads as thick liquid
 * glass rather than a plain circular crop.
 */

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  position?: { x: number; y: number };
  isStatic?: boolean;
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
  /** Hide the OS cursor while inside. Off by default — the site has its own. */
  hideCursor?: boolean;
}

/** The glass shell: rim, bevel, speculars, chromatic fringe. */
function GlassRing({ size, x, y }: { size: number; x: number; y: number }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="pointer-events-none absolute z-[60] rounded-full"
        style={{
          left: x - size / 2,
          top: y - size / 2,
          width: size,
          height: size,
          boxShadow: [
            "inset 0 0 0 1px rgba(255,255,255,0.65)",
            "inset 0 10px 26px rgba(255,255,255,0.32)",
            "inset 0 -14px 30px rgba(0,0,0,0.22)",
            "0 22px 60px -18px rgba(0,0,0,0.55)",
          ].join(", "),
          background: [
            "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.40), transparent 42%)",
            "radial-gradient(circle at 74% 82%, rgba(255,255,255,0.18), transparent 38%)",
          ].join(", "),
        }}
      />
      {/* Chromatic fringe — real lenses split colour at the rim. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        exit={{ opacity: 0 }}
        className="pointer-events-none absolute z-[61] rounded-full"
        style={{
          left: x - size / 2,
          top: y - size / 2,
          width: size,
          height: size,
          background:
            "conic-gradient(from 210deg, rgba(255,120,180,0) 0deg, rgba(255,120,180,.45) 60deg, rgba(120,200,255,.45) 180deg, rgba(255,215,140,.35) 290deg, rgba(255,120,180,0) 360deg)",
          WebkitMask:
            "radial-gradient(circle, transparent 0 calc(50% - 3px), #000 calc(50% - 3px))",
          mask: "radial-gradient(circle, transparent 0 calc(50% - 3px), #000 calc(50% - 3px))",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}

export default function Lens({
  children,
  zoomFactor = 2.0,
  lensSize = 200,
  isStatic = false,
  position = { x: 200, y: 150 },
  hovering,
  setHovering,
  hideCursor = false,
}: LensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [localHovering, setLocalHovering] = useState(false);
  const isHovering = hovering !== undefined ? hovering : localHovering;
  const setIsHovering = setHovering || setLocalHovering;
  const [mouse, setMouse] = useState({ x: 100, y: 100 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const p = isStatic ? position : mouse;

  const zoomLayer = (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="lens-zoom absolute inset-0 overflow-hidden"
        style={{
          maskImage: `radial-gradient(circle ${lensSize / 2}px at ${p.x}px ${p.y}px, black 100%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${p.x}px ${p.y}px, black 100%, transparent 100%)`,
          transformOrigin: `${p.x}px ${p.y}px`,
          zIndex: 50,
        }}
      >
        {/* The second render of the children, scaled about the pointer.
            This is the actual magnification. */}
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoomFactor})`,
            transformOrigin: `${p.x}px ${p.y}px`,
          }}
        >
          {children}
        </div>
      </motion.div>
      <GlassRing size={lensSize} x={p.x} y={p.y} />
    </>
  );

  return (
    <div
      ref={containerRef}
      className={`relative z-20 overflow-hidden rounded-card ${hideCursor ? "cursor-none" : ""}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={onMouseMove}
    >
      {children}
      {isStatic ? zoomLayer : <AnimatePresence>{isHovering && <div>{zoomLayer}</div>}</AnimatePresence>}
    </div>
  );
}

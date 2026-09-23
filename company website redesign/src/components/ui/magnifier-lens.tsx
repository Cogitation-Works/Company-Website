"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Lens — the magnification layer only.
 *
 * Based on the 21st.dev magnifier-lens component. It genuinely ZOOMS, where a
 * `backdrop-filter` disc cannot, because it renders the children A SECOND TIME,
 * scales that copy with a transform, and masks it to a circle under the
 * pointer. CSS filters can tint or blur what is behind an element but can never
 * magnify it — only a scaled re-render does that.
 *
 * IMPORTANT: this component draws NO ring, rim or glass of its own. The
 * original 21st.dev version did, which meant a third circle appeared on top of
 * the two the cursor already has. The rim belongs to Cursor.tsx — this file
 * only supplies the zoomed pixels, aligned to that cursor's INNER circle.
 *
 * Keep LENS_SIZE in sync with the inner circle in Cursor.tsx.
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
  const [hovering, setHovering] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={onMouseMove}
    >
      {children}

      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lens-zoom absolute inset-0 overflow-hidden"
            style={{
              // Circular window exactly the size of the cursor's inner ring.
              maskImage: `radial-gradient(circle ${lensSize / 2}px at ${mouse.x}px ${mouse.y}px, black 99%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${mouse.x}px ${mouse.y}px, black 99%, transparent 100%)`,
              zIndex: 197, // under the cursor rings (198+), over the page
            }}
          >
            {/* The second render of the children, scaled about the pointer.
                This is the actual magnification. */}
            <div
              className="absolute inset-0"
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${mouse.x}px ${mouse.y}px`,
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

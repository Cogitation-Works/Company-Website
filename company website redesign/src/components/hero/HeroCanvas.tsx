"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import SignalField from "./fields/SignalField";
import ChromeBlob from "./fields/ChromeBlob";
import DeformGrid from "./fields/DeformGrid";

export type HeroVariant = "a" | "b" | "c" | "off";

export const VARIANTS: { id: HeroVariant; label: string; note: string }[] = [
  { id: "a", label: "A", note: "Signal Field" },
  { id: "b", label: "B", note: "Liquid Chrome" },
  { id: "c", label: "C", note: "Deforming Grid" },
  { id: "off", label: "—", note: "Core sequence only" },
];

/**
 * Shared pointer state for every hero field.
 *
 * Tracks POSITION in normalised device coords AND VELOCITY. Velocity is the
 * important one: the reference bundles show the "alive" feeling comes from
 * springs reacting to how fast the cursor moves, not merely where it is
 * (Yambo ships 94 spring terms and 185 pointer handlers and no fluid sim).
 */
function usePointerVelocity() {
  const ref = useRef({ x: 0, y: 0, vel: 0 });

  useEffect(() => {
    let lastX = 0, lastY = 0, lastT = performance.now();
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(16, now - lastT);
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      const speed = Math.hypot(nx - lastX, ny - lastY) / (dt / 1000);
      ref.current.x = nx;
      ref.current.y = ny;
      // Clamped so a flick across the screen doesn't blow the effect apart.
      ref.current.vel = Math.min(1.4, ref.current.vel * 0.55 + speed * 0.28);
      lastX = nx; lastY = ny; lastT = now;
    };

    // Velocity decays continuously, so the field settles when the cursor stops.
    const decay = () => {
      ref.current.vel *= 0.94;
      raf = requestAnimationFrame(decay);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(decay);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

export default function HeroCanvas({
  variant,
  className,
}: {
  variant: HeroVariant;
  className?: string;
}) {
  const pointer = usePointerVelocity();
  if (variant === "off") return null;

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.75]}
        style={{ background: "transparent" }}
      >
        {variant === "a" && <SignalField pointer={pointer} />}
        {variant === "b" && <ChromeBlob pointer={pointer} />}
        {variant === "c" && <DeformGrid pointer={pointer} />}
      </Canvas>
    </div>
  );
}

/**
 * Floating A/B/C switcher. Temporary — this exists so the three hero options
 * can be compared on a real GPU, and comes out once one is chosen.
 * The choice persists in localStorage and via ?hero=a|b|c.
 */
export function HeroSwitcher({
  variant,
  onChange,
}: {
  variant: HeroVariant;
  onChange: (v: HeroVariant) => void;
}) {
  return (
    <div className="pointer-events-auto fixed bottom-5 left-1/2 z-[150] -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-pill border border-line bg-surface/90 p-1 shadow-[0_10px_40px_-12px_rgba(11,15,20,0.25)] backdrop-blur-xl">
        <span className="label-mono px-3">Hero</span>
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => onChange(v.id)}
            title={v.note}
            className={`rounded-pill px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors ${
              variant === v.id
                ? "bg-ink text-white"
                : "text-muted hover:bg-canvas hover:text-ink"
            }`}
          >
            {v.label}
          </button>
        ))}
        <span className="label-mono px-3 !text-ink">
          {VARIANTS.find((v) => v.id === variant)?.note}
        </span>
      </div>
    </div>
  );
}

/** Reads ?hero= then localStorage; defaults to A. */
export function useHeroVariant(): [HeroVariant, (v: HeroVariant) => void] {
  const [variant, setVariant] = useState<HeroVariant>("a");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("hero");
    const stored =
      typeof localStorage !== "undefined" ? localStorage.getItem("cw-hero") : null;
    const v = (fromUrl || stored) as HeroVariant | null;
    if (v && ["a", "b", "c", "off"].includes(v)) setVariant(v);
  }, []);

  const set = (v: HeroVariant) => {
    setVariant(v);
    try {
      localStorage.setItem("cw-hero", v);
    } catch {
      /* private mode — the choice just won't persist */
    }
  };

  return [variant, set];
}

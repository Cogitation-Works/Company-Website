"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A slot for a photo or a video that does not exist yet.
 *
 * The rule this follows: a placeholder must be obviously a placeholder. Stock
 * photography of somebody else's office standing in for ours would look
 * finished, and would quietly become permanent. These plates are designed —
 * they hold the layout, they respond to the pointer, they state the aspect
 * ratio and what belongs there — and nobody could mistake one for a photograph.
 *
 * When the real asset arrives, pass `src` (or `poster` + `video`) and the plate
 * is replaced with no layout change.
 */

export type Plate = {
  id: string;
  kind: "photo" | "video";
  label: string;
  /** What to shoot or supply. Shown on the plate. */
  brief: string;
  src?: string;
  video?: string;
  accent?: string;
  /** Tailwind aspect utility, e.g. "aspect-[4/3]". */
  aspect?: string;
};

export function MediaPlate({
  plate,
  className = "",
  priority = false,
}: {
  plate: Plate;
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const accent = plate.accent ?? "var(--color-signal)";

  /* Pointer-tracked sheen. Only the hovered plate ever gets a layer, and only
     while the pointer is inside it. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--px", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--py", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <figure
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={`group relative overflow-hidden rounded-card border border-line bg-deep ${plate.aspect ?? "aspect-[4/3]"} ${className}`}
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {plate.src ? (
        <img
          src={plate.src}
          alt={plate.label}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      ) : plate.video ? (
        <video
          src={plate.video}
          poster={plate.src}
          muted
          loop
          playsInline
          autoPlay
          className="h-full w-full object-cover"
        />
      ) : (
        <Holding plate={plate} accent={accent} hovered={hovered} />
      )}

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        <span className="label-mono !text-white/70">{plate.label}</span>
        {!plate.src && !plate.video ? (
          <span className="rounded-pill border border-white/20 px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.1em] text-white/45">
            {plate.kind}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

function Holding({
  plate,
  accent,
  hovered,
}: {
  plate: Plate;
  accent: string;
  hovered: boolean;
}) {
  return (
    <div className="absolute inset-0">
      {/* Two washes rather than one: a bright accent bloom from the top-left
          and a cool lift across the whole plate. A single gradient on the deep
          base left these reading as near-black voids rather than as designed
          holding frames. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(155deg, var(--color-deep-raised), #131c25 55%, var(--color-deep))",
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(130% 110% at 14% -8%, color-mix(in oklab, ${accent} 62%, transparent), transparent 62%)`,
          opacity: hovered ? 1 : 0.8,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Sheen follows the pointer across the plate. */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--px,50%) var(--py,50%), rgb(255 255 255 / 0.14), transparent 62%)",
        }}
      />
      {plate.kind === "video" ? (
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25">
          <span className="ml-1 border-y-[7px] border-l-[11px] border-y-transparent border-l-white/55" />
        </span>
      ) : null}
      <p className="absolute inset-x-6 top-6 text-[0.8125rem] leading-snug text-white/55">
        {plate.brief}
      </p>
    </div>
  );
}

/** Grid of plates with a staggered reveal. */
export function PlateGrid({
  plates,
  cols = "md:grid-cols-3",
}: {
  plates: Plate[];
  cols?: string;
}) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${cols}`}>
      {plates.map((p, i) => (
        <div
          key={p.id}
          data-reveal
          style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
        >
          <MediaPlate plate={p} />
        </div>
      ))}
    </div>
  );
}

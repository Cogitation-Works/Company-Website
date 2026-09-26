"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, usePinProgress } from "@/lib/motion";

/**
 * Scroll-scrubbed video story — the Peachweb dive (research R12) crossed with
 * the BMW spec sequence (R13).
 *
 * A tall section pins its contents while scroll drives a frame sequence and
 * steps the copy through a set of stages. This is the pattern used for the
 * venture pages: you scroll, the footage advances, the story advances with it.
 *
 * WHY FRAMES AND NOT A <video>
 * Scrubbing a compressed video against scroll forces a keyframe decode on every
 * scroll event. That is the exact 1–5fps juddering the client flagged on
 * terminal-industries.com. Here the stills decode ONCE into ImageBitmaps and
 * scrubbing is a pure blit. So the deliverable from Flow is an .mp4, which gets
 * sliced to ~60 webp frames before it ships — never played back directly.
 *
 * PLACEHOLDER MODE
 * With no `frames` prop the component still runs the whole choreography: the
 * stages advance, the progress rule fills, a scan line sweeps the plate. That
 * means the timing and the copy can be judged now and the footage is a drop-in
 * later, with no layout change. The plate says so on its face, so a placeholder
 * can never be mistaken for finished work.
 */

export type Stage = {
  /** Small label above the line. */
  kicker: string;
  title: string;
  body?: string;
};

type Frames = { path: string; count: number };

/* Module-level cache: React StrictMode mounts effects twice in development, and
   a per-instance cache would be wiped by the second mount. */
const caches = new Map<string, (ImageBitmap | undefined)[]>();
const loading = new Set<string>();

function loadFrames({ path, count }: Frames, onFirst: () => void) {
  if (loading.has(path)) {
    if (caches.get(path)?.[0]) onFirst();
    return;
  }
  loading.add(path);
  const cache: (ImageBitmap | undefined)[] = [];
  caches.set(path, cache);

  (async () => {
    const at = (i: number) => `${path}${String(i).padStart(3, "0")}.webp`;
    const decode = async (i: number) => {
      const res = await fetch(at(i));
      return createImageBitmap(await res.blob());
    };
    cache[0] = await decode(0);
    onFirst();
    // Batched so the network is not hit with 60 parallel requests.
    for (let s = 1; s < count; s += 8) {
      const n = Math.min(8, count - s);
      const batch = await Promise.all(
        Array.from({ length: n }, (_, k) => decode(s + k)),
      );
      batch.forEach((f, k) => (cache[s + k] = f));
    }
  })().catch(() => {
    /* A failed frame just holds the sequence on what it already has. */
  });
}

export default function ScrollStory({
  label,
  stages,
  frames,
  accent = "var(--color-live)",
  aspect = 16 / 9,
  note,
}: {
  label: string;
  stages: Stage[];
  frames?: Frames;
  accent?: string;
  aspect?: number;
  /** Shown on the placeholder plate — what footage is expected here. */
  note?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = usePrefersReducedMotion();

  /* Shared with the magnifier's duplicate: the copy mirrors this instead of
     measuring its own position inside the lens box, which would leave it
     showing a different stage than the one actually on screen. It also
     publishes the pinned child's offset for the copy to position against. */
  const scrollProgress = usePinProgress("story", wrapRef, !reduced);
  const progress = reduced ? 1 : scrollProgress;

  useEffect(() => {
    if (!frames || reduced) return;
    loadFrames(frames, () => setReady(true));
  }, [frames, reduced]);


  /* Draw the current frame. Separate from the scroll loop so a missing or
     still-decoding sequence never stalls the copy. */
  useEffect(() => {
    if (!frames || !ready) return;
    const canvas = canvasRef.current;
    const cache = caches.get(frames.path);
    if (!canvas || !cache) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(canvas.clientWidth * dpr)) {
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
    }

    const idx = Math.min(frames.count - 1, Math.floor(progress * (frames.count - 1)));
    // Nearest decoded frame, so gaps while loading never blank the canvas.
    let f = cache[idx];
    for (let d = 1; !f && d < frames.count; d++) f = cache[idx - d] ?? cache[idx + d];
    if (!f) return;

    const scale = Math.max(canvas.width / f.width, canvas.height / f.height);
    const dw = f.width * scale;
    const dh = f.height * scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(f, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
  }, [progress, ready, frames]);

  const active = Math.min(
    stages.length - 1,
    Math.floor(progress * stages.length * 0.999),
  );

  return (
    <div
      ref={wrapRef}
      data-pin="story"
      className="relative bg-deep text-on-deep"
      /* 75vh per stage, not 100. The films are 60 frames, and the scroll
         distance divided by the frame count is what sets how finely the
         footage steps: at 100vh per stage a three-stage story spent ~46px of
         scroll on every frame, which reads as a slideshow. At 75vh it is
         ~30px, and the page is a quarter shorter into the bargain. If a film
         ever ships with many more frames, this can go back up. */
      style={{ height: `${(stages.length + 1) * 75}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* ---- Media plate */}
        <div className="container-page">
          <div
            className="relative mx-auto w-full overflow-hidden rounded-card border border-white/10 bg-deep-raised"
            style={{ aspectRatio: String(aspect), maxWidth: "min(96vw, 68rem)" }}
          >
            {frames ? (
              <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
            ) : (
              <PlaceholderPlate accent={accent} progress={progress} note={note} />
            )}

            {/* Copy sits over the lower third of the plate, always legible. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(6,9,13,0.94) 4%, rgba(6,9,13,0.4) 42%, transparent 66%)",
              }}
            />

            <div className="absolute inset-x-0 bottom-0 p-7 lg:p-12">
              <p className="label-mono !text-on-deep-muted">{label}</p>
              {/* A GRID STACK, not absolute children inside a guessed
                  min-height. Every stage occupies the same cell, so the block
                  is as tall as the TALLEST of them and nothing can overflow.
                  With a fixed min-height, a two-line title pushed its body
                  past the plate's edge and `overflow-hidden` cut the last line
                  off — which is what "Telemetry meets the production order"
                  did on /industries/energy. */}
              <div className="mt-5 grid">
                {stages.map((s, i) => (
                  <div
                    key={s.title}
                    className="[grid-area:1/1] transition-[opacity,transform] duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform:
                        i === active
                          ? "none"
                          : `translateY(${i < active ? -18 : 18}px)`,
                    }}
                  >
                    <span
                      className="label-mono"
                      style={{ color: accent }}
                    >
                      {String(i + 1).padStart(2, "0")} — {s.kicker}
                    </span>
                    <h3 className="mt-3 max-w-[24ch] text-[clamp(1.5rem,3.6vw,2.5rem)] font-[560] leading-[1.06] tracking-[-0.03em]">
                      {s.title}
                    </h3>
                    {s.body ? (
                      <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-on-deep-muted">
                        {s.body}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {/* Stage ticks along the bottom edge of the plate. */}
            <div className="absolute inset-x-0 bottom-0 flex h-px">
              {stages.map((s, i) => (
                <span key={s.title} className="relative h-full flex-1 bg-white/12">
                  <span
                    className="absolute inset-y-0 left-0 origin-left"
                    style={{
                      background: accent,
                      width: "100%",
                      transform: `scaleX(${Math.min(1, Math.max(0, progress * stages.length - i))})`,
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The placeholder plate. Deliberately looks like a designed holding frame —
 * registration marks, a sweeping scan line, the aspect ratio stated — so it
 * reads as "footage goes here", never as finished art.
 */
function PlaceholderPlate({
  accent,
  progress,
  note,
}: {
  accent: string;
  progress: number;
  note?: string;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(155deg, var(--color-deep-raised), #141e28 52%, var(--color-deep))",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(130% 110% at 20% -6%, color-mix(in oklab, ${accent} 52%, transparent), transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Scan line tied to scroll, so the plate responds while you move. */}
      <div
        className="absolute inset-y-0 w-px"
        style={{
          left: `${progress * 100}%`,
          background: `linear-gradient(to bottom, transparent, ${accent}, transparent)`,
          boxShadow: `0 0 28px 2px color-mix(in oklab, ${accent} 50%, transparent)`,
        }}
      />
      {/* Corner registration marks */}
      {[
        "left-5 top-5 border-l border-t",
        "right-5 top-5 border-r border-t",
        "left-5 bottom-5 border-b border-l",
        "right-5 bottom-5 border-b border-r",
      ].map((c) => (
        <span key={c} className={`absolute h-6 w-6 border-white/25 ${c}`} />
      ))}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="label-mono !text-white/45">Footage pending</p>
        {note ? (
          <p className="mt-2 max-w-[34ch] text-[0.8125rem] leading-snug text-white/30">
            {note}
          </p>
        ) : null}
      </div>
    </div>
  );
}

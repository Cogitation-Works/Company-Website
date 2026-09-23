"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Sound, off by default.
 *
 * Two of the fifteen recordings gate entry on audio — Hashgraph offers
 * "ENTER WITH AUDIO / enter without audio", Alche the same in Japanese. Both
 * default to silence, and that is the only defensible default: autoplaying
 * audio is the fastest way to lose a visitor, and on a site sold to operations
 * directors it reads as unserious.
 *
 * NO AUDIO FILES YET. Rather than ship a dead button, the tones are synthesised
 * with the Web Audio API — a soft low drone plus a short click on interactive
 * elements. That is a few lines of oscillator code and zero bytes of download.
 * When a real ambient bed is recorded (ASSETS.md §5.2) it replaces `startDrone`
 * and the rest is unchanged.
 *
 * The context is created on the click that enables sound, never before —
 * browsers require a user gesture, and creating one speculatively leaves a
 * suspended context running for every visitor who never asked for audio.
 */

const KEY = "cw-sound";

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const reduced = usePrefersReducedMotion();

  /* Remember the choice per browser. Wrapped because storage throws in private
     windows and in some embedded contexts. */
  useEffect(() => {
    setReady(true);
    try {
      if (localStorage.getItem(KEY) === "on") setOn(true);
    } catch {
      /* storage unavailable — stay off */
    }
  }, []);

  const teardown = useCallback(() => {
    gainRef.current?.gain.setTargetAtTime(0, ctxRef.current?.currentTime ?? 0, 0.3);
    const ctx = ctxRef.current;
    setTimeout(() => {
      ctx?.close().catch(() => {});
    }, 800);
    ctxRef.current = null;
    gainRef.current = null;
  }, []);

  const startDrone = useCallback(() => {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    gainRef.current = master;

    // Two detuned sines a fifth apart, through a low-pass. Deliberately dull —
    // it should sit under the page, not on top of it.
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    filter.connect(master);

    [55, 82.5].forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.5 : 0.22;
      osc.connect(g).connect(filter);
      osc.start();

      // Very slow amplitude drift so it never sits perfectly still.
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.045 + i * 0.017;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = i === 0 ? 0.18 : 0.08;
      lfo.connect(lfoGain).connect(g.gain);
      lfo.start();
    });

    master.gain.setTargetAtTime(0.055, ctx.currentTime, 1.4);
  }, []);

  /* A short click on interactive elements, only while sound is on. */
  useEffect(() => {
    if (!on) return;
    const click = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t?.closest("a,button")) return;
      const ctx = ctxRef.current;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 660;
      g.gain.value = 0.0001;
      g.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
      osc.connect(g).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    };
    document.addEventListener("pointerdown", click);
    return () => document.removeEventListener("pointerdown", click);
  }, [on]);

  const toggle = () => {
    const next = !on;
    setOn(next);
    try {
      localStorage.setItem(KEY, next ? "on" : "off");
    } catch {
      /* ignore */
    }
    if (next) startDrone();
    else teardown();
  };

  useEffect(() => () => teardown(), [teardown]);

  // Reduced-motion users have asked for less, not more. Honour it for audio too.
  if (!ready || reduced) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      data-cursor
      className="fixed bottom-5 left-5 z-[190] flex items-center gap-2.5 rounded-pill border border-ink/15
                 bg-canvas/80 px-4 py-2.5 backdrop-blur-xl transition-colors hover:border-ink/35"
    >
      <span className="flex h-3 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[2px] rounded-full bg-ink transition-[height] duration-300"
            style={{
              height: on ? `${[6, 11, 8, 4][i]}px` : "2px",
              animation: on
                ? `sound-bar 900ms ease-in-out ${i * 120}ms infinite alternate`
                : undefined,
            }}
          />
        ))}
      </span>
      <span className="label-mono !text-ink">{on ? "Sound on" : "Sound off"}</span>

      <style>{`
        @keyframes sound-bar {
          from { transform: scaleY(0.45); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </button>
  );
}

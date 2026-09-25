"use client";

import { useEffect, useState } from "react";
import { FLUID } from "./FluidCursor";

/**
 * Live tuning panel for the cursor water effect.
 *
 * Exists because this look cannot be tuned blind — you have to watch it move
 * on a real GPU. Noomo ship exactly this publicly (playground.noomoagency.com)
 * for their glass material.
 *
 * Mutates the shared FLUID object in place; the render loop reads it every
 * frame, so changes apply instantly with no re-render and no shader rebuild.
 *
 * Press `F` to show or hide. "Copy values" puts the current settings on the
 * clipboard so they can be pasted back as the new defaults.
 *
 * TEMPORARY — remove once the numbers are settled.
 */

type Row = { key: keyof typeof FLUID; label: string; min: number; max: number; step: number; hint: string };

const GROUPS: { title: string; rows: Row[] }[] = [
  {
    title: "Magic tail",
    rows: [
      { key: "densityDissipation", label: "Tail length", min: 0.95, max: 0.9995, step: 0.0005, hint: "higher = ink lingers longer" },
      { key: "splatRadius", label: "Tail thickness", min: 0.0005, max: 0.012, step: 0.0002, hint: "" },
      { key: "brightness", label: "Ink brightness", min: 0.04, max: 0.8, step: 0.01, hint: "" },
    ],
  },
  {
    title: "Flow",
    rows: [
      { key: "velocityDissipation", label: "Flow life", min: 0.95, max: 0.9995, step: 0.0005, hint: "how long it keeps moving after you stop" },
      { key: "curl", label: "Swirliness", min: 0, max: 60, step: 1, hint: "vorticity — higher makes tighter eddies" },
      { key: "splatForce", label: "Push strength", min: 1000, max: 16000, step: 200, hint: "" },
    ],
  },
];

export default function FluidTuner() {
  const [open, setOpen] = useState(false);
  const [, force] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el && /INPUT|TEXTAREA/.test(el.tagName)) return;
      if (e.key.toLowerCase() === "f") setOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const copy = () => {
    const body = Object.entries(FLUID)
      .map(([k, v]) => `  ${k}: ${typeof v === "number" ? +v.toFixed(4) : v},`)
      .join("\n");
    navigator.clipboard?.writeText(`export const FLUID = {\n${body}\n};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[220] rounded-pill border border-line bg-surface/90 px-4 py-2
                   label-mono !text-ink shadow-[0_10px_34px_-12px_rgba(0,0,0,0.4)] backdrop-blur-xl"
      >
        Tune water · F
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-[220] max-h-[86vh] w-[310px] overflow-y-auto rounded-2xl border
                 border-line bg-surface/95 p-4 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="label-mono !text-ink">Water tuning</span>
        <button type="button" onClick={() => setOpen(false)} className="label-mono !text-muted">
          close · F
        </button>
      </div>

      {GROUPS.map((g) => (
        <div key={g.title} className="mb-4">
          <p className="label-mono mb-2 !text-signal">{g.title}</p>
          {g.rows.map((r) => (
            <label key={r.key} className="mb-3 block" title={r.hint}>
              <span className="flex items-baseline justify-between">
                <span className="text-[0.8125rem] text-ink-soft">{r.label}</span>
                <span className="num text-[0.75rem] text-muted">
                  {(FLUID[r.key] as number).toFixed(r.step < 0.01 ? 4 : 2)}
                </span>
              </span>
              <input
                type="range"
                min={r.min}
                max={r.max}
                step={r.step}
                defaultValue={FLUID[r.key] as number}
                onChange={(e) => {
                  FLUID[r.key] = parseFloat(e.target.value);
                  force((n) => n + 1);
                }}
                className="mt-1 w-full accent-[var(--color-signal)]"
              />
            </label>
          ))}
        </div>
      ))}

      <button
        type="button"
        onClick={copy}
        className="w-full rounded-pill bg-ink py-2.5 text-[0.8125rem] font-medium text-white"
      >
        {copied ? "Copied — paste it to me" : "Copy values"}
      </button>
    </div>
  );
}

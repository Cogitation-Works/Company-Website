"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * A small animated diagram for each capability, in place of the review cards
 * that used to sit here.
 *
 * Reviews were the wrong content for this slot. A service page is read by
 * somebody deciding whether we understand their problem, and eleven identical
 * "quote pending" cards down one page answered nothing. A diagram of the actual
 * mechanism does.
 *
 * Each is drawn from the capability's name, so a new capability gets a sensible
 * visual without anyone wiring one up. Pure SVG with CSS animation — no canvas,
 * no WebGL, so these run everywhere including phones, and a dozen of them on
 * one page costs nothing.
 */

type Kind =
  | "funnel"
  | "network"
  | "layers"
  | "signal"
  | "flow"
  | "grid"
  | "search"
  | "people";

/** Maps a capability name to the diagram that explains it best. */
function kindFor(name: string): Kind {
  const n = name.toLowerCase();
  if (/(seo|search|analytic|report|optimis)/.test(n)) return "search";
  if (/(social|influencer|email|content|video|advertis|campaign)/.test(n)) return "funnel";
  if (/(cloud|devops|deploy|migration|saas|architecture)/.test(n)) return "layers";
  if (/(iot|telemetry|sensor|ai|automation|agent)/.test(n)) return "signal";
  if (/(integration|workflow|data|pipeline|crm)/.test(n)) return "flow";
  if (/(team|sales|partner|channel|support|process)/.test(n)) return "people";
  if (/(mobile|desktop|device|offline|hardware)/.test(n)) return "grid";
  return "network";
}

export default function CapabilityVisual({
  name,
  accent,
}: {
  name: string;
  accent: string;
}) {
  const kind = kindFor(name);
  const ref = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();

  /* Start the animation only once the row is open and on screen — a closed
     accordion row should not be running animations nobody can see. */
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => el.classList.toggle("cv-run", e.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div className="relative overflow-hidden rounded-card border border-line bg-canvas">
      <svg
        ref={ref}
        viewBox="0 0 320 180"
        className="h-auto w-full"
        style={{ "--a": accent } as React.CSSProperties}
        role="img"
        aria-label={`Diagram illustrating ${name}`}
      >
        <defs>
          <linearGradient id={`fade-${kind}`} x1="0" x2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0" />
            <stop offset="50%" stopColor={accent} stopOpacity="1" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {kind === "funnel" && <Funnel accent={accent} />}
        {kind === "network" && <Network accent={accent} />}
        {kind === "layers" && <Layers accent={accent} />}
        {kind === "signal" && <Signal accent={accent} />}
        {kind === "flow" && <Flow accent={accent} />}
        {kind === "grid" && <Grid accent={accent} />}
        {kind === "search" && <SearchViz accent={accent} />}
        {kind === "people" && <People accent={accent} />}
      </svg>

      <style>{`
        .cv-run .cv-draw { animation: cv-draw 2.6s cubic-bezier(0.83,0,0.17,1) infinite; }
        .cv-run .cv-pulse { animation: cv-pulse 2.4s ease-in-out infinite; }
        .cv-run .cv-drift { animation: cv-drift 4.2s ease-in-out infinite alternate; }
        .cv-run .cv-rise { animation: cv-rise 3s cubic-bezier(0.83,0,0.17,1) infinite; }
        @keyframes cv-draw {
          0%   { stroke-dashoffset: 300; opacity: 0; }
          18%  { opacity: 1; }
          70%  { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes cv-pulse {
          0%,100% { opacity: 0.25; transform: scale(1); }
          50%     { opacity: 1;    transform: scale(1.35); }
        }
        @keyframes cv-drift { from { transform: translateY(-4px); } to { transform: translateY(4px); } }
        @keyframes cv-rise {
          0%   { transform: scaleY(0.2); opacity: 0.3; }
          60%  { transform: scaleY(1);   opacity: 1; }
          100% { transform: scaleY(1);   opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cv-draw, .cv-pulse, .cv-drift, .cv-rise { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

/* Each diagram is deliberately schematic — it explains a mechanism, it is not
   decoration, and it must read at 320px wide. */

function Funnel({ accent }: { accent: string }) {
  return (
    <g fill="none" stroke={accent} strokeWidth="1.25">
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M ${40 + i * 22} ${36 + i * 28} H ${280 - i * 22}`}
          strokeDasharray="300"
          className="cv-draw"
          style={{ animationDelay: `${i * 220}ms` }}
        />
      ))}
      <circle cx="160" cy="150" r="5" fill={accent} stroke="none" className="cv-pulse" style={{ transformOrigin: "160px 150px" }} />
    </g>
  );
}

function Network({ accent }: { accent: string }) {
  const nodes = [
    [60, 50], [160, 34], [262, 62], [104, 116], [210, 130], [160, 86],
  ] as [number, number][];
  return (
    <g>
      <g stroke={accent} strokeWidth="1" opacity="0.4" fill="none">
        {nodes.slice(0, 5).map(([x, y], i) => (
          <line key={i} x1={x} y1={y} x2={nodes[5][0]} y2={nodes[5][1]}
            strokeDasharray="300" className="cv-draw"
            style={{ animationDelay: `${i * 180}ms` }} />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 5 ? 6 : 3.5} fill={accent}
          className="cv-pulse" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 200}ms` }} />
      ))}
    </g>
  );
}

function Layers({ accent }: { accent: string }) {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="cv-drift" style={{ animationDelay: `${i * 300}ms` }}>
          <path
            d={`M 160 ${40 + i * 30} l 86 22 l -86 22 l -86 -22 Z`}
            fill={accent}
            fillOpacity={0.08 + i * 0.05}
            stroke={accent}
            strokeWidth="1"
          />
        </g>
      ))}
    </g>
  );
}

function Signal({ accent }: { accent: string }) {
  return (
    <g fill="none" stroke={accent} strokeWidth="1.25">
      <path d="M 20 100 Q 70 40 120 100 T 220 100 T 300 100"
        strokeDasharray="300" className="cv-draw" />
      <line x1="20" y1="140" x2="300" y2="140" opacity="0.25" />
      {[70, 140, 210, 265].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="140" x2={x} y2="112" opacity="0.4" />
          <circle cx={x} cy="108" r="4" fill={accent} stroke="none"
            className="cv-pulse" style={{ transformOrigin: `${x}px 108px`, animationDelay: `${i * 260}ms` }} />
        </g>
      ))}
    </g>
  );
}

function Flow({ accent }: { accent: string }) {
  return (
    <g fill="none" stroke={accent} strokeWidth="1.25">
      {[52, 132, 212].map((x, i) => (
        <rect key={x} x={x} y="68" width="56" height="44" rx="6"
          fillOpacity="0.06" fill={accent} />
      ))}
      {[108, 188].map((x, i) => (
        <path key={x} d={`M ${x} 90 H ${x + 24}`} strokeDasharray="300"
          className="cv-draw" style={{ animationDelay: `${i * 400}ms` }} />
      ))}
      <circle cx="80" cy="90" r="3.5" fill={accent} stroke="none" className="cv-pulse" style={{ transformOrigin: "80px 90px" }} />
      <circle cx="240" cy="90" r="3.5" fill={accent} stroke="none" className="cv-pulse" style={{ transformOrigin: "240px 90px", animationDelay: "800ms" }} />
    </g>
  );
}

function Grid({ accent }: { accent: string }) {
  return (
    <g>
      <rect x="112" y="34" width="96" height="112" rx="10" fill="none" stroke={accent} strokeWidth="1.25" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1].map((c) => (
          <rect key={`${r}-${c}`} x={126 + c * 38} y={50 + r * 24} width="30" height="16" rx="3"
            fill={accent} fillOpacity="0.16" className="cv-pulse"
            style={{ transformOrigin: `${141 + c * 38}px ${58 + r * 24}px`, animationDelay: `${(r * 2 + c) * 160}ms` }} />
        )),
      )}
    </g>
  );
}

function SearchViz({ accent }: { accent: string }) {
  return (
    <g fill="none" stroke={accent} strokeWidth="1.25">
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={48 + i * 46} y={130 - i * 18} width="28" height={18 + i * 18}
          rx="3" fill={accent} fillOpacity="0.16" stroke="none"
          className="cv-rise" style={{ transformOrigin: `${62 + i * 46}px 148px`, animationDelay: `${i * 200}ms` }} />
      ))}
      <line x1="30" y1="150" x2="290" y2="150" opacity="0.3" />
      <path d="M 40 60 Q 150 20 280 44" strokeDasharray="300" className="cv-draw" opacity="0.7" />
    </g>
  );
}

function People({ accent }: { accent: string }) {
  const people = [90, 130, 170, 210, 250];
  return (
    <g>
      <path d="M 70 120 H 270" stroke={accent} strokeWidth="1" opacity="0.3" fill="none" />
      {people.map((x, i) => (
        <g key={x} className="cv-pulse" style={{ transformOrigin: `${x}px 96px`, animationDelay: `${i * 220}ms` }}>
          <circle cx={x} cy="76" r="7" fill="none" stroke={accent} strokeWidth="1.25" />
          <path d={`M ${x - 11} 104 a 11 11 0 0 1 22 0`} fill="none" stroke={accent} strokeWidth="1.25" />
        </g>
      ))}
      <circle cx="170" cy="40" r="6" fill={accent} />
      {people.map((x) => (
        <line key={x} x1="170" y1="46" x2={x} y2="66" stroke={accent} strokeWidth="1" opacity="0.28" />
      ))}
    </g>
  );
}

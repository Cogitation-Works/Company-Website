"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * /about hero — an arc drawn between the two hubs, with a packet travelling
 * along it and the local time ticking at each end.
 *
 * Two countries is the most concrete thing about this company, so the About
 * page opens with the distance itself rather than with a statement. The arc
 * draws once on entry; the packet then runs continuously, which is the only
 * animation on the page that never stops — deliberately, because the point is
 * that the two hubs are always connected.
 */
export default function RouteHero({
  hubs,
}: {
  hubs: { city: string; timeZone: string }[];
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const reduced = usePrefersReducedMotion();
  const [times, setTimes] = useState<string[]>(() => hubs.map(() => "--:--"));

  /* Local clocks. Minute resolution is enough — a ticking second hand on a
     corporate page is noise, and it forces a re-render every second. */
  useEffect(() => {
    const update = () =>
      setTimes(
        hubs.map((h) =>
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: h.timeZone,
          }).format(new Date()),
        ),
      );
    update();
    const id = setInterval(update, 20_000);
    return () => clearInterval(id);
  }, [hubs]);

  /* Draw the arc, then run the packet along it forever. */
  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);

    if (reduced) {
      path.style.strokeDashoffset = "0";
      return;
    }

    path.style.strokeDashoffset = String(len);
    path.style.transition = "stroke-dashoffset 1800ms cubic-bezier(0.16,1,0.3,1)";
    requestAnimationFrame(() => {
      path.style.strokeDashoffset = "0";
    });

    let raf = 0;
    let t = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t = (t + 0.0032) % 1;
      // Ease so the packet slows at each end — it feels like arrival rather
      // than a marker sliding at constant speed.
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const p = path.getPointAtLength(len * eased);
      dot.setAttribute("cx", String(p.x));
      dot.setAttribute("cy", String(p.y));
    };
    const start = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 1500);

    return () => {
      clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    /* Fills its container. It used to be clamped to 54% of the viewport width
       because it shared space with the copy; now SplitHero gives it a column of
       its own, so clamping it again just made it tiny. */
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 460"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Latitude lines — just enough to read as a map without being one. */}
        {[120, 190, 260, 330].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="1200"
            y2={y}
            stroke="#fff"
            strokeOpacity="0.05"
          />
        ))}
        <path
          ref={pathRef}
          d="M 300 330 Q 600 90 900 250"
          stroke="var(--color-live)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle ref={dotRef} r="5" fill="var(--color-live)" cx="300" cy="330">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>

        {[
          { x: 300, y: 330, i: 0 },
          { x: 900, y: 250, i: 1 },
        ].map(({ x, y, i }) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="#fff" />
            <circle cx={x} cy={y} r="16" stroke="#fff" strokeOpacity="0.25" />
            <text
              x={x}
              y={y - 32}
              textAnchor="middle"
              className="fill-white/70 font-mono"
              style={{ fontSize: 13, letterSpacing: "0.12em" }}
            >
              {hubs[i]?.city.toUpperCase()}
            </text>
            <text
              x={x}
              y={y + 42}
              textAnchor="middle"
              className="fill-white/45 font-mono"
              style={{ fontSize: 15 }}
            >
              {times[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

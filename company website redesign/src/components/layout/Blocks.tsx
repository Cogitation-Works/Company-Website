import Link from "next/link";

/**
 * Small shared page blocks. Server components — none of these need state, so
 * none of them ship JavaScript.
 */

/** Section wrapper with an optional label/heading pair. */
export function Section({
  label,
  heading,
  lead,
  tone = "canvas",
  children,
  className = "",
}: {
  label?: string;
  heading?: React.ReactNode;
  lead?: string;
  tone?: "canvas" | "surface" | "deep";
  children: React.ReactNode;
  className?: string;
}) {
  const tones = {
    canvas: "",
    surface: "border-t border-line bg-surface",
    deep: "bg-deep text-on-deep",
  } as const;

  return (
    <section className={`relative py-20 lg:py-28 ${tones[tone]} ${className}`}>
      <div className="container-page">
        {label || heading ? (
          <div className="max-w-[46ch]">
            {label ? (
              <p
                className={`label-mono mb-4 ${tone === "deep" ? "!text-on-deep-muted" : ""}`}
                data-reveal
              >
                {label}
              </p>
            ) : null}
            {heading ? (
              <h2
                className="text-[clamp(1.875rem,4.2vw,3rem)] font-[560] leading-[1.04] tracking-[-0.03em]"
                data-reveal
                style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
              >
                {heading}
              </h2>
            ) : null}
            {lead ? (
              <p
                className={`mt-5 text-lead ${tone === "deep" ? "text-on-deep-muted" : "text-muted"}`}
                data-reveal
                style={{ "--reveal-delay": "130ms" } as React.CSSProperties}
              >
                {lead}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className={label || heading ? "mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}

/** Numbered list with a rule above each item — used for problems and outcomes. */
export function NumberedList({
  items,
  tone = "canvas",
}: {
  items: string[];
  tone?: "canvas" | "deep";
}) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
      {items.map((item, i) => (
        <li
          key={item}
          className={`p-7 ${tone === "deep" ? "bg-deep-raised" : "bg-surface"}`}
          data-reveal
          style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
        >
          <span className="label-mono">{String(i + 1).padStart(2, "0")}</span>
          <p
            className={`mt-4 text-[1.0625rem] leading-[1.45] tracking-[-0.012em] ${
              tone === "deep" ? "text-on-deep" : "text-ink-soft"
            }`}
          >
            {item}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** The status chip used on every venture surface. Never optional there. */
export function StatusChip({
  status,
  accent,
}: {
  status: string;
  accent?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-pill border px-3 py-1.5 text-[0.75rem] font-medium"
      style={{
        borderColor: accent ? `color-mix(in oklab, ${accent} 45%, transparent)` : undefined,
        color: accent,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: accent ?? "currentColor" }}
      />
      {status}
    </span>
  );
}

/**
 * Marks a value that has not been confirmed yet. Renders visibly so an
 * unconfirmed number can never quietly ship as a real one.
 */
export function Tbc({ children }: { children?: React.ReactNode }) {
  return (
    <span
      className="rounded border border-dashed border-line-strong px-1.5 py-0.5 text-[0.8125rem] text-faint"
      title="Unconfirmed — must be replaced before launch"
    >
      {children ?? "TBC"}
    </span>
  );
}

/** Full-width link row used between sections. */
export function NextLink({
  label,
  href,
  kicker,
}: {
  label: string;
  href: string;
  kicker?: string;
}) {
  return (
    <Link
      href={href}
      data-cursor
      className="group flex items-center justify-between gap-6 border-t border-line py-9 transition-colors hover:border-line-strong"
    >
      <span>
        {kicker ? <span className="label-mono block mb-2">{kicker}</span> : null}
        <span className="text-[clamp(1.5rem,3.4vw,2.25rem)] font-[560] tracking-[-0.03em]">
          {label}
        </span>
      </span>
      <span className="text-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
        →
      </span>
    </Link>
  );
}

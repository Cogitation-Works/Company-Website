import Link from "next/link";

/**
 * The standard top band for every inner page.
 *
 * It is DARK on purpose, for two reasons:
 *
 *  1. The design system's rule — animate on dark, present work on light. Every
 *     inner page opens with a moment of atmosphere and then drops into calm
 *     light content.
 *  2. The header renders white-on-transparent until the page scrolls (see
 *     Header.tsx). A light page hero would put white text on a near-white
 *     background for the first 12px of scroll. A dark band removes the problem
 *     at the source rather than adding a theme-detection mechanism.
 *
 * The eyebrow doubles as a breadcrumb when `parent` is supplied, which is also
 * what feeds BreadcrumbList JSON-LD on nested routes.
 */

export default function PageHero({
  eyebrow,
  parent,
  title,
  lead,
  meta,
  accent,
  figure,
  tall = false,
  children,
}: {
  eyebrow: string;
  parent?: { label: string; href: string };
  title: React.ReactNode;
  lead?: string;
  /** Small key/value pairs shown along the bottom rule. */
  meta?: { label: string; value: string }[];
  accent?: string;
  /**
   * The page's own hero visual, absolutely positioned behind the copy. Every
   * page gets a different one — a shared hero across eight pages made the site
   * feel like one template with the words swapped.
   */
  figure?: React.ReactNode;
  /** Gives the figure room to breathe on pages where it is the point. */
  tall?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`relative isolate overflow-hidden bg-deep text-on-deep ${
        tall ? "pb-20 pt-36 lg:min-h-[86svh] lg:pb-28 lg:pt-48" : "pb-16 pt-32 lg:pb-20 lg:pt-44"
      }`}
      style={accent ? ({ "--accent": accent } as React.CSSProperties) : undefined}
    >
      {/* Faint technical grid, and an accent bloom anchored to the top-right.
          Both are pure CSS — no canvas, so this costs nothing on mobile. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(120% 90% at 50% 0%, #000, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 0%, #000, transparent 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent, var(--color-live)), transparent 68%)",
        }}
      />

      {/* The page's own visual. Sits behind the copy, never over it. */}
      {figure ? <div className="absolute inset-0 z-0">{figure}</div> : null}

      {/* Scrim so the headline stays legible whatever the figure is doing. */}
      {figure ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(100deg, var(--color-deep) 6%, rgba(6,9,13,0.72) 42%, rgba(6,9,13,0.15) 78%)",
          }}
        />
      ) : null}

      <div className="container-page relative z-[2]">
        <p className="label-mono !text-on-deep-muted" data-reveal>
          {parent ? (
            <>
              <Link href={parent.href} className="link-wipe hover:!text-on-deep">
                {parent.label}
              </Link>
              <span className="mx-2 opacity-40">/</span>
            </>
          ) : null}
          {eyebrow}
        </p>

        <h1
          className="mt-6 max-w-[20ch] text-[clamp(2.5rem,6.4vw,4.75rem)] font-[560] leading-[0.98] tracking-[-0.035em]"
          data-reveal
          style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
        >
          {title}
        </h1>

        {lead ? (
          <p
            className="mt-7 max-w-[56ch] text-lead text-on-deep-muted"
            data-reveal
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            {lead}
          </p>
        ) : null}

        {children}

        {meta?.length ? (
          <dl
            className="mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t border-white/10 pt-7"
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="label-mono !text-on-deep-muted">{m.label}</dt>
                <dd className="mt-1.5 text-[0.9375rem] text-on-deep">{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}

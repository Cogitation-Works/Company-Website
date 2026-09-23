import Link from "next/link";
import { StatusChip } from "@/components/layout/Blocks";
import { VENTURES } from "@/content/ventures";

/**
 * Home page ventures strip — see PROJECT.md §1.5.
 *
 * Placed deliberately LOW on the page, after the work and the products, so the
 * proof lands before the ambition. Every card carries its status chip; the
 * qualifying sentence above them is not optional.
 */
export default function Ventures() {
  return (
    <section className="relative border-t border-line py-24 lg:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div className="max-w-[46ch]">
            <p className="label-mono mb-4" data-reveal>
              Ventures
            </p>
            <h2
              className="text-[clamp(2rem,4.6vw,3.25rem)] font-[560] leading-[1.02] tracking-[-0.03em]"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              What we&rsquo;re building next.
            </h2>
            <p
              className="mt-5 text-[1.0625rem] leading-relaxed text-muted"
              data-reveal
              style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
            >
              Software and engineering services are what we sell today.
              These are in development.
            </p>
          </div>
          <Link href="/ventures" className="link-wipe label-mono !text-ink" data-cursor>
            All ventures →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {VENTURES.map((v, i) => (
            <Link
              key={v.slug}
              href={`/ventures/${v.slug}`}
              data-cursor="lens"
              className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface p-7 transition-[border-color,box-shadow] duration-500 hover:shadow-[0_28px_70px_-32px_rgba(11,15,20,0.3)]"
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-px w-0 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                style={{ background: v.accent }}
              />
              <StatusChip status={v.status} accent={v.accent} />
              <h3 className="mt-6 text-[1.25rem] font-[560] leading-[1.2] tracking-[-0.022em]">
                {v.name}
              </h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                {v.summary}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-medium">
                Read more
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

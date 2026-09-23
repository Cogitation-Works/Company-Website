import { Marquee } from "@/components/ui/Interactions";
import { COMPANY } from "@/content/site";
import { PILLARS } from "@/content/services";
import { PRODUCTS } from "@/content/products";
import { INDUSTRIES } from "@/content/industries";

/**
 * Every column is derived from the content modules, so a footer link can never
 * point at a route that does not exist. The previous hand-written list had
 * eight dead links in it — six old service slugs, /insights and /privacy — all
 * of which a crawler would have found before a visitor did.
 */
const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Services",
    links: PILLARS.map((p) => [p.name, `/services/${p.slug}`]),
  },
  {
    title: "Platforms",
    links: PRODUCTS.map((p) => [p.name, `/products/${p.slug}`]),
  },
  {
    title: "Industries",
    links: INDUSTRIES.map((i) => [i.name, `/industries/${i.slug}`]),
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Work", "/work"],
      ["Ventures", "/ventures"],
      ["Blog", "/blog"],
      ["Contact", "/contact"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="border-b border-line py-8">
        <Marquee speed={64} reverse>
          <span className="mx-8 inline-flex shrink-0 items-center gap-8 text-[clamp(2rem,6vw,4.5rem)] font-[560] tracking-[-0.035em] text-ink/8">
            UAE · Vellore · Global —&nbsp;
          </span>
        </Marquee>
      </div>

      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <a href="/" className="flex items-center gap-2.5 text-[0.9375rem] font-[560]">
              <span className="h-2 w-2 rounded-full bg-live" />
              Cogitation Works
            </a>
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-muted">
              We build the systems that run operations — ERP, CRM, workforce,
              IoT and AI platforms for factories, clinics, fleets, networks and
              farms.
            </p>
            <div className="mt-6 space-y-1.5 text-[0.875rem]">
              <a
                href="mailto:info@cogitationworks.com"
                className="link-wipe block text-ink-soft"
              >
                info@cogitationworks.com
              </a>
              <a href="https://wa.me/919360889434" className="link-wipe block text-ink-soft">
                +91 93608 89434
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="label-mono mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="link-wipe text-[0.875rem] text-muted transition-colors hover:text-ink"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono">
            © {new Date().getFullYear()} Cogitation Works — UAE · India · Global
          </p>
          <div className="flex gap-6">
            {/* A privacy link belongs here, but pointing at a page that does
                not exist is worse than not linking it. Add it back with the
                route. */}
            {[
              ["LinkedIn", COMPANY.linkedin],
              ["Instagram", COMPANY.instagram],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="link-wipe label-mono !text-muted"
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

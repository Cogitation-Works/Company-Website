import { Marquee } from "@/components/ui/Interactions";

const COLUMNS = [
  {
    title: "Services",
    links: [
      ["Custom software", "/services/custom-software"],
      ["Web & mobile apps", "/services/web-mobile"],
      ["Cloud & DevOps", "/services/cloud"],
      ["IoT & telemetry", "/services/iot"],
      ["AI & automation", "/services/ai-automation"],
      ["SEO & digital marketing", "/services/seo"],
    ],
  },
  {
    title: "Platforms",
    links: [
      ["Cogitation CRM", "/products/crm"],
      ["HRMS Pro", "/products/hrms"],
      ["Cogitation ERP", "/products/erp"],
      ["Cogi AI", "/products/cogi-ai"],
    ],
  },
  {
    title: "Industries",
    links: [
      ["Manufacturing", "/industries/manufacturing"],
      ["Healthcare", "/industries/healthcare"],
      ["Fintech", "/industries/fintech"],
      ["Telecom", "/industries/telecom"],
      ["Elevators & IoT", "/industries/elevators-iot"],
      ["Agriculture", "/industries/agriculture"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Work", "/work"],
      ["Insights", "/insights"],
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
            Dubai · Vellore · Global —&nbsp;
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
            © {new Date().getFullYear()} Cogitation Works — Dubai · India · Global
          </p>
          <div className="flex gap-6">
            {[
              ["LinkedIn", "https://www.linkedin.com/in/cogitation-works/"],
              ["Instagram", "https://www.instagram.com/cogitation_works/"],
              ["Privacy", "/privacy"],
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

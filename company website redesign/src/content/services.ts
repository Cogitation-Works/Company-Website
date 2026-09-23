/**
 * Services, grouped into the four pillars the company already uses for its
 * own tech-stack matrix (PROJECT.md §2.5).
 *
 * Eleven separate service pages would be eleven thin pages competing with each
 * other for the same searches. Four pillars, each with its own page and its own
 * sculptural object, is the Kode Immersive chapter pattern (reference R1) — and
 * it is also the better SEO structure, because each pillar page can be
 * substantial enough to rank.
 *
 * The individual services remain addressable within their pillar page, so
 * "desktop application development" still has somewhere to point.
 */

export type Pillar = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  summary: string;
  /** Matte graphite object — see ASSETS.md §4.3. */
  object?: string;
  services: { name: string; detail: string }[];
  outcomes: string[];
  accent: string;
};

export const PILLARS: Pillar[] = [
  {
    slug: "frontend-edge",
    index: "001",
    name: "Frontend & Edge",
    tagline: "Pixel-perfect, accessible and reactive user experiences.",
    summary:
      "The layer your customers and your staff actually touch. Static sites, web applications, storefronts and the interface design that decides whether a system gets used or worked around.",
    services: [
      { name: "Static & dynamic websites", detail: "Marketing and corporate sites built for speed and search, not for a page builder." },
      { name: "Web applications", detail: "Interfaces for systems people use all day — built to stay fast as the data grows." },
      { name: "E-commerce", detail: "Storefronts, catalogue, checkout and the operational tail behind them." },
      { name: "UI/UX design", detail: "Interface and flow design grounded in how the work is actually done." },
      { name: "SEO optimisation", detail: "Technical SEO from the first commit — structure, metadata, structured data, speed." },
      { name: "Digital marketing", detail: "Campaign infrastructure and measurement that ties spend to a real outcome." },
    ],
    outcomes: [
      "A site that loads fast on a mid-range phone on a patchy connection",
      "Interfaces staff stop building spreadsheets to avoid",
      "Pages search engines can actually crawl and understand",
    ],
    accent: "#2563eb",
  },
  {
    slug: "backend-cloud",
    index: "002",
    name: "Backend & Cloud",
    tagline: "High-throughput microservices and streaming pipelines.",
    summary:
      "The part nobody sees and everything depends on. Custom software, SaaS platforms, cloud architecture and the consulting that decides what to build before anything is built.",
    services: [
      { name: "Custom software development", detail: "Systems built to one operation's actual process, not to a generic template." },
      { name: "SaaS platforms", detail: "Multi-tenant products with the billing, roles and isolation that implies." },
      { name: "Cloud architecture", detail: "Infrastructure sized to real load, with the cost model understood up front." },
      { name: "IT consulting", detail: "Architecture review, dependency analysis and a roadmap you can act on." },
      { name: "Idea to concept", detail: "Turning an operational problem into a defined, buildable product." },
    ],
    outcomes: [
      "A system that holds up when the load is real, not when it is demoed",
      "Infrastructure cost you can predict before you commit to it",
      "A roadmap that survives contact with your existing stack",
    ],
    accent: "#0d9488",
  },
  {
    slug: "mobile-systems",
    index: "003",
    name: "Mobile Systems",
    tagline: "Fluid native platform apps deployed to iOS and Android.",
    summary:
      "Applications for people who are not at a desk — field technicians, drivers, shop-floor staff, site managers. Where the phone is the interface to the operation, not a companion to it.",
    services: [
      { name: "iOS & Android applications", detail: "Native platform apps, built for the device they run on." },
      { name: "Desktop applications", detail: "Where a workstation, not a browser, is the right tool." },
      { name: "Offline-capable field tools", detail: "Systems that keep working when the signal does not." },
    ],
    outcomes: [
      "Field staff reporting from where the work happens",
      "Data captured once, at the source, instead of re-keyed later",
      "Applications that degrade gracefully instead of failing offline",
    ],
    accent: "#ea580c",
  },
  {
    slug: "ai-infrastructure",
    index: "004",
    name: "AI & Infrastructure",
    tagline: "Autonomous cognitive agents and CI/CD pipelines.",
    summary:
      "Automation with a reason to exist. Agents grounded in your own records, IoT telemetry from real hardware, and the delivery pipeline that keeps all of it shippable.",
    services: [
      { name: "AI & automation", detail: "Agents grounded in your documents and data — retrieval before generation." },
      { name: "IoT", detail: "Sensor telemetry from real hardware, into a system that acts on it." },
      { name: "CI/CD & delivery", detail: "Pipelines that make deploying a non-event." },
      { name: "Data & integration", detail: "Connecting the systems that already exist rather than replacing them all." },
    ],
    outcomes: [
      "Automation that cites its source instead of improvising",
      "Telemetry that triggers an action, not just a dashboard",
      "Releases that ship on a Tuesday afternoon without ceremony",
    ],
    accent: "#7c3aed",
  },
];

export const getPillar = (slug: string) => PILLARS.find((p) => p.slug === slug);

/** Flat list, for the footer and for sitemap coverage of individual terms. */
export const ALL_SERVICES = PILLARS.flatMap((p) =>
  p.services.map((s) => ({ ...s, pillar: p.name, href: `/services/${p.slug}` })),
);

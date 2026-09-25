/**
 * Services, grouped into six pillars.
 *
 * Expanded 24 Sep from the client's own list, which added a whole marketing
 * practice (12 capabilities), DevOps and deployments as a named discipline,
 * desktop applications, and — the one nobody would guess from the old site —
 * **managed teams**: a client asked for a sales team to be built and then run
 * for them, and that is now a service. It is also the most differentiated thing
 * on this page, because almost no software company will do it.
 *
 * Six pillars rather than forty service pages. Forty thin pages compete with
 * each other for the same searches; six substantial ones do not, and every
 * individual capability still appears by name inside its pillar so nothing
 * loses its landing point.
 *
 * `reviews` is deliberately EMPTY on every pillar. See PROJECT.md §7 — the
 * existing testimonials are unusable (the same three sentences appear on two
 * pages attributed to six different people). The UI renders an awaiting-quote
 * card rather than inventing one.
 */

export type Review = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Which capability inside the pillar this speaks to. */
  service?: string;
};

export type Pillar = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  summary: string;
  /** Longer positioning paragraph for the pillar page. */
  intro: string;
  /** 3D object variant for this pillar's hero. */
  object: "glass" | "lattice" | "ribbon" | "shards" | "orbit" | "wave";
  services: { name: string; detail: string }[];
  outcomes: string[];
  /** How an engagement actually runs. */
  process: { step: string; detail: string }[];
  faq: { q: string; a: string }[];
  reviews: Review[];
  accent: string;
};

export const PILLARS: Pillar[] = [
  {
    slug: "frontend-edge",
    index: "001",
    name: "Frontend & Edge",
    tagline: "Pixel-perfect, accessible and reactive user experiences.",
    summary:
      "The layer your customers and your staff actually touch. Websites, storefronts, web applications — and the interface design that decides whether a system gets used or worked around.",
    intro:
      "Most of what gets called a website is a brochure. The interesting work starts when the site has a job: convert, explain something technical, or serve as the front of a system people use all day. That is where interface decisions stop being taste and start being operational.",
    object: "ribbon",
    services: [
      { name: "Static & dynamic websites", detail: "Marketing and corporate sites built for speed and search, not for a page builder." },
      { name: "3D, animated & scroll-based websites", detail: "WebGL, scroll choreography and motion systems — the kind of site this one is. Built to hold 60fps on a mid-range phone, which is the part most studios skip." },
      { name: "Web applications", detail: "Interfaces for systems people use all day, built to stay fast as the data grows." },
      { name: "E-commerce", detail: "Storefronts, catalogue, checkout and the operational tail behind them." },
      { name: "UI/UX design", detail: "Interface and flow design grounded in how the work is actually done." },
      { name: "Website & landing page optimisation", detail: "Conversion work on pages that already exist — structure, speed, clarity, and what the page asks for." },
      { name: "Accessibility", detail: "Keyboard paths, contrast, reduced-motion and screen-reader support as a requirement, not a retrofit." },
    ],
    outcomes: [
      "A site that loads fast on a mid-range phone on a patchy connection",
      "Interfaces staff stop building spreadsheets to avoid",
      "Pages search engines can actually crawl and understand",
    ],
    process: [
      { step: "Audit", detail: "What the current page or interface actually does, measured rather than described." },
      { step: "Structure", detail: "Information architecture and flow before any visual design." },
      { step: "Build", detail: "Implementation against a performance budget agreed up front." },
      { step: "Measure", detail: "Real-device testing and frame timing, not a lab score." },
    ],
    faq: [
      { q: "Can you work on a site we already have?", a: "Yes. Optimisation of an existing site is often the higher-return job, and we will say so if that is the case." },
      { q: "Do animated sites hurt performance?", a: "Badly built ones do. Ours are budgeted — decode once, no unnecessary compositing layers, and everything gated on device capability and reduced-motion." },
      { q: "Which platforms do you build on?", a: "Next.js by default. We will work in an existing stack where replacing it is not worth the disruption." },
    ],
    reviews: [],
    accent: "#2563eb",
  },
  {
    slug: "backend-cloud",
    index: "002",
    name: "Backend, Cloud & DevOps",
    tagline: "High-throughput services, and the pipeline that ships them.",
    summary:
      "The part nobody sees and everything depends on. Custom software, SaaS platforms, cloud architecture, deployments and the consulting that decides what to build before anything is built.",
    intro:
      "Every system we are asked to replace was once someone's good idea under deadline. The job is rarely to write something clever — it is to understand what the business actually does, and then build something that will still be legible to whoever inherits it.",
    object: "lattice",
    services: [
      { name: "Custom software development", detail: "Systems built to one operation's actual process, not to a generic template." },
      { name: "SaaS platforms", detail: "Multi-tenant products with the billing, roles and isolation that implies." },
      { name: "Cloud architecture", detail: "Infrastructure sized to real load, with the cost model understood up front." },
      { name: "DevOps & deployments", detail: "Pipelines that make releasing a non-event, and infrastructure defined as code rather than as tribal knowledge." },
      { name: "Migrations", detail: "Moving a live system without a weekend of downtime and a rollback nobody has tested." },
      { name: "IT consulting", detail: "Architecture review, dependency analysis and a roadmap you can act on." },
      { name: "Idea to concept", detail: "Turning an operational problem into a defined, buildable product." },
    ],
    outcomes: [
      "A system that holds up when the load is real, not when it is demoed",
      "Infrastructure cost you can predict before you commit to it",
      "Releases that ship on a Tuesday afternoon without ceremony",
    ],
    process: [
      { step: "Discovery", detail: "The process as performed, not as documented. Usually this is where the surprises are." },
      { step: "Architecture", detail: "A written design with the trade-offs stated, including what we deliberately left out." },
      { step: "Build", detail: "Shipped in slices that each do something useful on their own." },
      { step: "Handover", detail: "Runbooks, infrastructure as code, and a team that can operate it without us." },
    ],
    faq: [
      { q: "Who owns the code?", a: "You do, including the repository, the infrastructure definitions and the deployment pipeline. Owning the application but not the means to deploy it is not ownership." },
      { q: "What happens if we stop working together?", a: "There is a handover process and a running system another team can pick up. That is a condition of the engagement, not a favour." },
      { q: "Can you take over an existing codebase?", a: "Yes, and we will give you an honest assessment of it before committing." },
    ],
    reviews: [],
    accent: "#0d9488",
  },
  {
    slug: "mobile-desktop",
    index: "003",
    name: "Mobile & Desktop Systems",
    tagline: "Applications for people who are not at a desk.",
    summary:
      "Field technicians, drivers, shop-floor staff, site managers — and the workstation applications that a browser is the wrong tool for.",
    intro:
      "A system used on a phone in a warehouse has almost nothing in common with the same system used at a desk, however similar the requirements document makes them look. Signal drops, gloves, glare and one free hand are functional requirements.",
    object: "shards",
    services: [
      { name: "iOS & Android applications", detail: "Native platform apps, built for the device they run on." },
      { name: "Cross-platform applications", detail: "Where one codebase genuinely serves both, and we will tell you when it does not." },
      { name: "Desktop applications", detail: "Windows, macOS and Linux, where a workstation rather than a browser is the right tool." },
      { name: "Offline-capable field tools", detail: "Systems that keep working when the signal does not, and reconcile when it returns." },
      { name: "Device & hardware integration", detail: "Scanners, biometric readers, printers, sensors — the hardware already on site." },
    ],
    outcomes: [
      "Field staff reporting from where the work happens",
      "Data captured once, at the source, instead of re-keyed later",
      "Applications that degrade gracefully instead of failing offline",
    ],
    process: [
      { step: "Go and look", detail: "We watch the job being done before designing the screen for it." },
      { step: "Prototype", detail: "On the actual device, in the actual place, early." },
      { step: "Build", detail: "Against the real hardware, not a simulator." },
      { step: "Roll out", detail: "Staged, with the people who will use it involved before launch." },
    ],
    faq: [
      { q: "Native or cross-platform?", a: "Cross-platform where the app is mostly forms and lists; native where it touches hardware, runs in the background, or has to feel instant." },
      { q: "Can it work with no signal?", a: "Yes, and for anything used away from a desk we treat that as a requirement rather than an edge case." },
      { q: "Do you handle app store submission?", a: "Yes, including the review process and the accounts, if you want us to." },
    ],
    reviews: [],
    accent: "#ea580c",
  },
  {
    slug: "ai-infrastructure",
    index: "004",
    name: "AI, IoT & Automation",
    tagline: "Automation with a reason to exist.",
    summary:
      "Agents grounded in your own records, sensor telemetry from real hardware, and the integration work that connects the systems you already run.",
    intro:
      "Most automation projects end at a dashboard somebody checks. The value starts one step after that — when a reading becomes a scheduled job, or a question is answered from your own documents with a citation attached.",
    object: "orbit",
    services: [
      { name: "AI & automation", detail: "Agents grounded in your documents and data — retrieval before generation, so the answer cites a source." },
      { name: "IoT & telemetry", detail: "Sensor data from real hardware, into a system that acts on it rather than displays it." },
      { name: "Workflow automation", detail: "The rule-based processes that are currently a person copying between two screens." },
      { name: "Data & integration", detail: "Connecting the systems that already exist rather than replacing them all." },
      { name: "Marketing automation", detail: "CRM, WhatsApp, email and lead workflows wired together so a lead cannot fall through." },
      { name: "Analytics & reporting", detail: "Google Analytics, campaign tracking and performance reporting that ties spend to an outcome." },
    ],
    outcomes: [
      "Automation that cites its source instead of improvising",
      "Telemetry that triggers an action, not just a dashboard",
      "One number everyone agrees on, instead of four reports",
    ],
    process: [
      { step: "Find the decision", detail: "What decision is this supposed to change, and who makes it? If the answer is 'we will know more', it will produce a screen." },
      { step: "Ground it", detail: "Connect the real records before any model is involved." },
      { step: "Wire the action", detail: "The output has to land somewhere that can act on it." },
      { step: "Prove it", detail: "Measured against the manual process it replaces." },
    ],
    faq: [
      { q: "Does our data go to a public model provider?", a: "Not necessarily. Orchestration supports self-hosted models where residency or confidentiality requires it." },
      { q: "How do you stop an AI inventing answers?", a: "Retrieval first. The agent finds the passage in your own records and answers from it, showing the source." },
      { q: "We already have dashboards. What is different?", a: "A dashboard needs someone looking at it. We connect the reading to the system that can act on it." },
    ],
    reviews: [],
    accent: "#7c3aed",
  },
  {
    slug: "growth-marketing",
    index: "005",
    name: "Growth & Marketing",
    tagline: "Demand, measured — not impressions.",
    summary:
      "Social, paid, search, content and email, run as one system with the analytics wired in from the start rather than bolted on at reporting time.",
    intro:
      "Marketing goes wrong for software companies in a predictable way: the channels are run by different people, the tracking is added last, and nobody can say which spend produced which conversation. We run it as one system because that is the only way the reporting means anything.",
    object: "wave",
    services: [
      { name: "Social media marketing", detail: "Instagram, Facebook, LinkedIn and X — strategy and creative, per platform rather than cross-posted." },
      { name: "Social media management", detail: "Content planning, scheduling, posting and engagement, run on a calendar you can see." },
      { name: "Paid advertising", detail: "Meta Ads, Google Ads and LinkedIn Ads, with the conversion tracking built before the first pound is spent." },
      { name: "SEO", detail: "On-page, technical, local and off-page. Technical SEO from the first commit rather than as a retrofit." },
      { name: "Content marketing", detail: "Blogs, articles, website copy and newsletters written by people who understand the product." },
      { name: "Email marketing", detail: "Campaigns, automation and lead nurturing tied to the CRM record." },
      { name: "Influencer marketing", detail: "Collaborations and campaigns, with the brief and the measurement agreed up front." },
      { name: "Google Business Profile & local SEO", detail: "Local visibility for businesses whose customers search by place." },
      { name: "Video marketing", detail: "Reels, YouTube and promotional video — produced for the platform it will run on." },
      { name: "Landing page optimisation", detail: "The page the campaign points at, which is usually where the money is lost." },
      { name: "Marketing automation", detail: "CRM, WhatsApp, email and lead workflows connected end to end." },
      { name: "Analytics & reporting", detail: "Google Analytics, campaign tracking and performance reports that attribute honestly." },
    ],
    outcomes: [
      "Spend you can trace to a conversation, not to an impression count",
      "One calendar and one report instead of five agencies and five decks",
      "Tracking that was designed in, so the numbers survive scrutiny",
    ],
    process: [
      { step: "Instrument first", detail: "Tracking and attribution before the campaign, because it cannot be added retrospectively." },
      { step: "Position", detail: "What the offer actually is, in the words the buyer uses." },
      { step: "Run", detail: "Channels operated together, on one calendar." },
      { step: "Report", detail: "Honest attribution, including the channels that did not work." },
    ],
    faq: [
      { q: "Do you take over existing ad accounts?", a: "Yes, and you keep ownership of them. We will not move spend into an account you do not control." },
      { q: "Can you do this without also building the site?", a: "Yes. We will flag it if the site is the reason the campaigns underperform." },
      { q: "What reporting do we get?", a: "A regular report tied to conversions rather than impressions, and access to the raw analytics." },
    ],
    reviews: [],
    accent: "#db2777",
  },
  {
    slug: "managed-teams",
    index: "006",
    name: "Managed Teams",
    tagline: "A team built, run and answerable to you.",
    summary:
      "Sometimes the thing a client needs is not software but people — a sales team recruited, trained, given a process, and then actually managed. We do that too.",
    intro:
      "This started with a client who did not need another platform. They needed a sales team, and then they needed somebody to run it properly rather than hand over a spreadsheet and wish them luck. It is an unusual thing for a software company to offer, and it works for the same reason the software works: the process is defined, the system supports it, and somebody is accountable for the number.",
    object: "glass",
    services: [
      { name: "Sales team build-out", detail: "Recruiting, onboarding and training a team against a defined process rather than a job title." },
      { name: "Ongoing team management", detail: "Targets, pipeline reviews, coaching and reporting — the part that decides whether the team works." },
      { name: "Process design", detail: "The pipeline, the stages and the definitions, written down so performance can be discussed factually." },
      { name: "CRM enablement", detail: "The team runs on Cogitation CRM, so the reporting is a by-product of the work rather than extra admin." },
      { name: "Support & maintenance retainers", detail: "Ongoing operation of the systems we build, with agreed response times." },
      { name: "Partner & channel programmes", detail: "Structuring and running reseller or partner relationships." },
    ],
    outcomes: [
      "A working team, not a hiring brief",
      "A pipeline whose numbers mean the same thing every week",
      "One accountable party for the system and the people using it",
    ],
    process: [
      { step: "Define the motion", detail: "Who buys, why, and what the steps actually are — before anyone is hired." },
      { step: "Build the team", detail: "Recruit and onboard against that process." },
      { step: "Run it", detail: "Targets, reviews and coaching, reported openly." },
      { step: "Hand over or keep running", detail: "Either outcome is fine, and both are planned for from the start." },
    ],
    faq: [
      { q: "Is this outsourcing or recruitment?", a: "Closer to a managed function. The team works to your goals and your brand; we run the process and are accountable for it." },
      { q: "Can we take the team in-house later?", a: "Yes, and that is a normal outcome. The process and the CRM come with it." },
      { q: "What does engagement look like commercially?", a: "⟨TBC⟩ — confirm the commercial model before publishing." },
    ],
    reviews: [],
    accent: "#ca8a04",
  },
];

export const getPillar = (slug: string) => PILLARS.find((p) => p.slug === slug);

/** Flat list, for the footer and for sitemap coverage of individual terms. */
export const ALL_SERVICES = PILLARS.flatMap((p) =>
  p.services.map((s) => ({ ...s, pillar: p.name, href: `/services/${p.slug}` })),
);

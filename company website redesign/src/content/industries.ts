/**
 * One page per industry — the single highest-leverage SEO decision on the site
 * (PROJECT.md §4). Each maps to real delivered work where it exists, so no
 * industry page makes a claim the /work section cannot support.
 *
 * `image` points at a processed still in /public/industries. All seven are in
 * place: generated to the §4.1 prompts, cropped to 2400×1350 (the crop also
 * removes the generator's corner watermark) and exported as AVIF + WebP at two
 * widths. See ASSETS.md §4.1.
 */

export type Industry = {
  slug: string;
  name: string;
  /** Shown as a small chip — the noun the buyer uses for their own site. */
  noun: string;
  headline: string;
  summary: string;
  problems: string[];
  systems: string[];
  /** Slugs from work.ts. Empty is honest — not every industry has a case yet. */
  cases: string[];
  image?: string;
  /** Widths actually present in /public/industries, largest last. */
  imageWidths?: number[];
  isNew?: boolean;
  accent: string;
  /**
   * The scroll-scrubbed sequence on the industry page: three stages of copy
   * that the footage advances through. Runs in placeholder mode until the
   * film lands, so the timing and the words can be judged now. The prompt for
   * each film is in ASSETS.md §4.7, one per industry, and its three beats are
   * these three stages in order.
   */
  story?: { kicker: string; title: string; body?: string }[];
  /** What footage belongs here — printed on the placeholder plate. */
  storyNote?: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    noun: "the plant",
    headline: "The floor reports to the system, not to a clipboard",
    summary:
      "Procurement, bill of materials, fabrication stages and inventory in one platform, so the state of an order is a fact rather than a phone call.",
    problems: [
      "Inventory that is accurate only on the day it is counted",
      "Procurement buying to a schedule instead of to demand",
      "No answer to where an order is right now",
    ],
    systems: ["Cogitation ERP", "HRMS Pro", "Custom MES integration"],
    cases: ["uthmal-machinery"],
    image: "manufacturing",
    imageWidths: [1600, 2400],
    accent: "#ea580c",
    storyNote: "Plant film — order intake to dispatch, 12s",
    story: [
      {
        kicker: "Intake",
        title: "The order arrives as data, once",
        body: "Bill of materials, routing and procurement are entered a single time and referenced by every stage that follows.",
      },
      {
        kicker: "The floor",
        title: "Each stage reports as it closes",
        body: "Fabrication checks in against the order, so inventory reflects what has actually been consumed rather than what was counted last.",
      },
      {
        kicker: "The answer",
        title: "Where the order is, right now",
        body: "The state of a job stops being a phone call to the floor and becomes something the system can be asked.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    noun: "the clinic",
    headline: "Billing that reconciles itself",
    summary:
      "B2B portals, ledgers and clinical account management where invoice matching stops being a monthly manual exercise.",
    problems: [
      "Invoice matching done by hand across clinical accounts",
      "Transaction records fragmented between systems",
      "Compliance applied at filing time rather than at transaction time",
    ],
    systems: ["Cogitation CRM", "Custom B2B billing portal"],
    cases: ["elite-medical"],
    image: "healthcare",
    imageWidths: [1600, 2400],
    accent: "#0d9488",
    storyNote: "Clinic film — one transaction through to reconciliation, 12s",
    story: [
      {
        kicker: "Capture",
        title: "Every transaction lands in one ledger",
        body: "Clinical accounts, B2B portals and billing write to the same record instead of to systems that have to be compared later.",
      },
      {
        kicker: "Matching",
        title: "Invoices reconcile against it",
        body: "The monthly exercise of matching by hand becomes a rule that runs as the transactions arrive.",
      },
      {
        kicker: "Compliance",
        title: "Checked at the transaction, not at filing",
        body: "Rules apply when the record is written, so the filing deadline stops being the moment problems are discovered.",
      },
    ],
  },
  {
    slug: "fintech",
    name: "Fintech",
    noun: "the operation",
    headline: "The deal and the service ticket share one customer",
    summary:
      "Unified CRM and service operations for businesses where sales and support currently work from different records.",
    problems: [
      "Sales and service holding two versions of the same customer",
      "Turnaround time invisible end to end",
      "Real-time status nobody outside one team can see",
    ],
    systems: ["Cogitation CRM", "Cogi AI"],
    cases: ["fitings-zone"],
    image: "fintech",
    imageWidths: [1600, 2400],
    accent: "#2563eb",
    storyNote: "Operations film — one customer across sales and service, 12s",
    story: [
      {
        kicker: "One record",
        title: "Sales and service read the same customer",
        body: "Two teams stop holding two versions of the same account, because there is only one for them to hold.",
      },
      {
        kicker: "In flight",
        title: "Turnaround becomes visible end to end",
        body: "Each hand-off is a timestamp, so the time a case actually takes can be seen rather than estimated.",
      },
      {
        kicker: "Status",
        title: "Anyone who needs the state can see it",
        body: "Real-time status stops living inside one team's tooling and becomes something the whole operation can read.",
      },
    ],
  },
  {
    slug: "telecom",
    name: "Telecom",
    noun: "the network",
    headline: "Enterprise credibility that loads in under half a second",
    summary:
      "Corporate platforms for connectivity providers and channel partners, where trust is established before a sales conversation starts.",
    problems: [
      "High-trust positioning in a crowded enterprise market",
      "Technical services explained in language buyers do not use",
      "Slow sites losing enterprise visitors before the first section",
    ],
    systems: ["Custom web architecture", "SEO & technical performance"],
    cases: ["mega-connect"],
    image: "telecom",
    imageWidths: [1600, 2400],
    accent: "#7c3aed",
    storyNote: "Network film — masts at dawn into the platform loading, 12s",
    story: [
      {
        kicker: "First contact",
        title: "The platform loads before the pitch does",
        body: "Enterprise buyers judge credibility in the first seconds. Performance is the first thing the site says about the engineering behind it.",
      },
      {
        kicker: "Translation",
        title: "Capability in the buyer's language",
        body: "Connectivity and channel services described in the terms the buyer already uses, rather than in the terms the network team uses.",
      },
      {
        kicker: "Qualified",
        title: "The technical conversation starts warmer",
        body: "By the time someone makes contact, the technical ground has been covered, so the first call starts further along.",
      },
    ],
  },
  {
    slug: "energy",
    name: "Energy",
    noun: "production",
    headline: "Production milestones dispatch the work",
    summary:
      "Production and field operations management for manufacturers whose sites, technicians and parts are each tracked separately today.",
    problems: [
      "Production tracked manually across multiple sites",
      "Technician scheduling uncoordinated between locations",
      "Parts telemetry disconnected from the production order",
    ],
    systems: ["Cogitation ERP", "HRMS Pro", "Field dispatch"],
    cases: ["dynamic-solar"],
    image: "energy",
    imageWidths: [1600, 2400],
    accent: "#ca8a04",
    storyNote: "Production film — a milestone dispatching a technician, 12s",
    story: [
      {
        kicker: "Production",
        title: "Every site reports into one plan",
        body: "Production tracked across multiple sites in one place, instead of separately and then reconciled.",
      },
      {
        kicker: "Dispatch",
        title: "A milestone assigns the work",
        body: "Reaching a production stage is what schedules the technician, so scheduling stops being coordinated by hand between locations.",
      },
      {
        kicker: "Parts",
        title: "Telemetry meets the production order",
        body: "Parts data and the order it belongs to stop being two separate records that somebody has to join.",
      },
    ],
  },
  {
    slug: "elevators-iot",
    name: "Elevators & IoT",
    noun: "the building",
    headline: "Telemetry that industrial buyers can actually read",
    summary:
      "Vertical transport and connected-hardware platforms, where sensor data has to become a decision rather than a dashboard.",
    problems: [
      "Sophisticated telemetry presented as an unreadable spec sheet",
      "Engineering capability that does not survive translation to the web",
      "Long path from technical interest to a technical conversation",
    ],
    systems: ["IoT telemetry platform", "Interactive technical UI"],
    cases: ["rg-robotics"],
    image: "elevators-iot",
    imageWidths: [1600, 2400],
    accent: "#0891b2",
    storyNote: "Building film — sensor to shaft to a read-out, 12s",
    story: [
      {
        kicker: "Sensors",
        title: "The building reports continuously",
        body: "Vertical transport and connected hardware producing a stream rather than a monthly inspection note.",
      },
      {
        kicker: "Reading",
        title: "Telemetry has to become a decision",
        body: "Sophisticated data presented as a spec sheet is unreadable. The interface's job is to turn the stream into the one thing worth acting on.",
      },
      {
        kicker: "Response",
        title: "Engineering that survives the web",
        body: "The technical capability reaches the buyer intact, so the path from interest to a technical conversation is short.",
      },
    ],
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    noun: "the field",
    headline: "Sensors in the field, decisions in the system",
    summary:
      "Precision agriculture, IoT telemetry and the logistics layer around it. This is where the company is heading next — see Ventures.",
    problems: [
      "Field conditions known only when somebody drives out to look",
      "Irrigation and input decisions made on memory rather than measurement",
      "Harvest logistics planned separately from the data that should drive it",
    ],
    systems: ["IoT telemetry", "Cogitation ERP", "Drone logistics ⟨in development⟩"],
    cases: [],
    image: "agriculture",
    imageWidths: [1600, 2400],
    isNew: true,
    accent: "#16a34a",
    storyNote: "Field film — sunrise over the rows, sensor to decision, 12s",
    story: [
      {
        kicker: "The field",
        title: "Conditions are measured, not driven out to",
        body: "Field sensors report continuously, so the state of a block is known without somebody going to look at it.",
      },
      {
        kicker: "Decisions",
        title: "Irrigation and inputs follow the measurement",
        body: "The decision is made against what was recorded rather than against what is remembered from last season.",
      },
      {
        kicker: "Logistics",
        title: "Harvest planning reads the same data",
        body: "The movement of the crop is planned from the measurements that produced it. Drone logistics is in development, not deployed.",
      },
    ],
  },
];

export const getIndustry = (slug: string) =>
  INDUSTRIES.find((i) => i.slug === slug);

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
  },
];

export const getIndustry = (slug: string) =>
  INDUSTRIES.find((i) => i.slug === slug);

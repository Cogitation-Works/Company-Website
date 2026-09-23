/**
 * The six delivered client platforms.
 *
 * Transcribed from the client's Products & Portfolio page (PROJECT.md §2.3).
 * Nothing here is invented. `outcome` is deliberately absent on every entry
 * because no real outcome figures have been supplied yet — rather than fill it
 * with a plausible-sounding number, the case study template simply omits the
 * results block until `metrics` exists.
 *
 * This is the single source for both the home page strip and /work.
 */

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  industry: string;
  /** Result-first headline — what the system does, not the project name. */
  title: string;
  kind: string;
  summary: string;
  challenge: string;
  solution: string;
  tags: string[];
  accent: string;
  /** What we actually built, step by step. */
  build: { label: string; detail: string }[];
  /** ⟨TBC⟩ — real, measured outcomes. Block is not rendered while empty. */
  metrics: { value: string; label: string }[];
  /** Silent loop of the real product. See ASSETS.md Tier 0.4. */
  video?: string;
  poster?: string;
  /**
   * Screens from the delivered platform. A case study without a picture of the
   * thing is a press release — these are what make it evidence.
   */
  screens: {
    id: string;
    kind: "photo" | "video";
    label: string;
    brief: string;
    src?: string;
    video?: string;
    accent?: string;
    aspect?: string;
  }[];
  /** The client on camera. The single most persuasive asset a case study has. */
  review: {
    id: string;
    kind: "video";
    label: string;
    brief: string;
    video?: string;
    src?: string;
    accent?: string;
    aspect?: string;
  };
};

/** Every case study gets the same three-screen shape plus a review. */
const screensFor = (slug: string, accent: string, a: string, b: string, c: string) => [
  { id: `${slug}-s1`, kind: "photo" as const, label: a, brief: `Screenshot from the delivered platform — ${a.toLowerCase()}.`, accent, aspect: "aspect-[16/10]" },
  { id: `${slug}-s2`, kind: "photo" as const, label: b, brief: `Screenshot — ${b.toLowerCase()}.`, accent, aspect: "aspect-[16/10]" },
  { id: `${slug}-s3`, kind: "video" as const, label: c, brief: `20–40s silent screen recording — ${c.toLowerCase()} in use.`, accent, aspect: "aspect-[16/10]" },
];

const reviewFor = (slug: string, client: string, accent: string) => ({
  id: `${slug}-review`,
  kind: "video" as const,
  label: `${client} — on camera`,
  brief:
    "30–60s. Landscape plus a vertical crop, clean audio, subtitles. Real name and job title on screen.",
  accent,
  aspect: "aspect-[16/9]",
});

export const WORK: CaseStudy[] = [
  {
    slug: "fitings-zone",
    client: "Fitings Zone",
    sector: "Fintech · Service ops",
    industry: "fintech",
    title:
      "One platform for a sales team and a service team that were working blind to each other",
    kind: "Integrated Business & Sales CRM",
    summary:
      "A unified CRM and service hub. Customised software solving the integration of service management and sales operations into a single platform — streamlining the sales process, service workflows and customer management so the business coordinates as one.",
    challenge:
      "Disjointed sales communication and siloed service workflows slowing customer turnaround.",
    solution:
      "Centralised CRM unifying pipeline management, service tickets, sales funnel and real-time client tracking.",
    tags: ["Unified service ops", "End-to-end pipeline", "Real-time"],
    accent: "#2563eb",
    build: [
      { label: "Pipeline", detail: "Deal stages, lead scoring and forecast rollup in one board." },
      { label: "Service desk", detail: "Tickets bound to the same customer record as the deal." },
      { label: "Client tracking", detail: "Real-time status visible to both teams simultaneously." },
      { label: "Communications", detail: "Multi-channel history against the customer timeline." },
    ],
    metrics: [],
    screens: screensFor("fitings-zone", "#2563eb", "Unified customer view", "Service ticket queue", "Pipeline in use"),
    review: reviewFor("fitings-zone", "Fitings Zone", "#2563eb"),
  },
  {
    slug: "elite-medical",
    client: "Elite Medical",
    sector: "Healthcare",
    industry: "healthcare",
    title:
      "Invoice matching that stopped being done by hand across clinical accounts",
    kind: "B2B Sales & Billing Software",
    summary:
      "A centralised portal with automated billing. A B2B sales and billing management system simplifying sales processes, billing, customer transactions and day-to-day B2B activity through one platform.",
    challenge:
      "Manual invoice matching and fragmented customer transaction records across clinical accounts.",
    solution:
      "Centralised B2B portal automating the sales pipeline with integrated ledger, tax compliance and client sales dashboard.",
    tags: ["Automated billing", "B2B transactions", "Customer portal"],
    accent: "#0d9488",
    build: [
      { label: "Ledger", detail: "Integrated accounts with automatic invoice reconciliation." },
      { label: "Tax compliance", detail: "Rules applied at transaction time, not at filing time." },
      { label: "Client dashboard", detail: "Each account sees its own sales and billing position." },
      { label: "Pipeline", detail: "B2B sales stages tied directly to the billing record." },
    ],
    metrics: [],
    screens: screensFor("elite-medical", "#0d9488", "B2B client portal", "Automated invoice run", "Billing reconciliation"),
    review: reviewFor("elite-medical", "Elite Medical", "#0d9488"),
  },
  {
    slug: "uthmal-machinery",
    client: "Uthmal Machinery",
    sector: "Manufacturing",
    industry: "manufacturing",
    title:
      "Shop-floor visibility for a plant that couldn't see its own inventory in real time",
    kind: "End-to-End ERP",
    summary:
      "Shop-floor visibility across a full manufacturing ERP. Comprehensive resource planning covering business and manufacturing operations, bringing multiple processes into a centralised platform and improving operational visibility and workflow management.",
    challenge:
      "Siloed procurement, delayed fabrication stages, no real-time machine or inventory visibility.",
    solution:
      "Integrated manufacturing execution ERP connecting bill-of-materials, shop-floor stations and supply logs.",
    tags: ["BOM flow", "Multi-stage production", "Full visibility"],
    accent: "#ea580c",
    build: [
      { label: "Bill of materials", detail: "Multi-level BOM driving procurement automatically." },
      { label: "Shop-floor stations", detail: "Each station reports stage completion as it happens." },
      { label: "Supply logs", detail: "Inbound material tied to the production order consuming it." },
      { label: "Procurement", detail: "Purchase triggered by real demand rather than by schedule." },
    ],
    metrics: [],
    screens: screensFor("uthmal-machinery", "#ea580c", "Shop-floor station view", "Bill of materials", "Production scheduling"),
    review: reviewFor("uthmal-machinery", "Uthmal Machinery", "#ea580c"),
  },
  {
    slug: "dynamic-solar",
    client: "Dynamic Solar",
    sector: "Energy · Production",
    industry: "energy",
    title:
      "Technician scheduling and parts telemetry pulled into one control surface",
    kind: "Production & Business Management",
    summary:
      "Production control for a battery systems manufacturer. Custom software supporting production and operational processes, organising workflows and providing a structured system for managing business activity.",
    challenge:
      "Manual production tracking for battery systems and uncoordinated technician scheduling across sites.",
    solution:
      "Tailored business suite for production milestone dispatch, parts telemetry and field job allocation.",
    tags: ["Structured workflows", "Production scheduling", "Field dispatch"],
    accent: "#ca8a04",
    build: [
      { label: "Milestones", detail: "Production dispatched by stage completion, not by calendar." },
      { label: "Parts telemetry", detail: "Component movement tracked through assembly." },
      { label: "Field allocation", detail: "Technicians assigned against real site workload." },
      { label: "Workflow", detail: "One structured process replacing per-site spreadsheets." },
    ],
    metrics: [],
    screens: screensFor("dynamic-solar", "#ca8a04", "Production milestones", "Field job allocation", "Parts telemetry"),
    review: reviewFor("dynamic-solar", "Dynamic Solar", "#ca8a04"),
  },
  {
    slug: "mega-connect",
    client: "Mega Connect",
    sector: "Telecom · UAE",
    industry: "telecom",
    title:
      "A UAE enterprise presence for an Etisalat channel partner, built for trust and speed",
    kind: "Corporate Website",
    summary:
      "A professional UAE corporate presence for a channel partner associated with Etisalat, establishing digital credibility and communicating networking and telecom solutions clearly.",
    challenge:
      "Establishing high-trust corporate positioning in competitive UAE enterprise connectivity markets.",
    solution:
      "Performant custom web architecture with fast load and clear service presentation.",
    tags: ["UAE presence", "< 0.4s load", "Telecom services"],
    accent: "#7c3aed",
    build: [
      { label: "Architecture", detail: "Custom front end built for first-paint speed." },
      { label: "Service presentation", detail: "Connectivity products explained without jargon." },
      { label: "Trust signals", detail: "Partner positioning made legible to enterprise buyers." },
      { label: "Enquiry flow", detail: "Short path from service page to a qualified conversation." },
    ],
    metrics: [],
    screens: screensFor("mega-connect", "#7c3aed", "Homepage", "Service presentation", "The site scrolling"),
    review: reviewFor("mega-connect", "Mega Connect", "#7c3aed"),
  },
  {
    slug: "rg-robotics",
    client: "RG Robotics",
    sector: "Elevators · IoT",
    industry: "elevators-iot",
    title:
      "Making IoT sensor telemetry and vertical transport legible to industrial buyers",
    kind: "Corporate Website & Digital Presence",
    summary:
      "A modern corporate presence for elevator solutions, IoT technologies and related engineering services — presenting real technical capability clearly rather than burying it.",
    challenge:
      "Communicating sophisticated IoT sensor telemetry and vertical-transport hardware to industrial verticals.",
    solution:
      "Interactive solution breakdowns with rapid technical consultation enquiry flows.",
    tags: ["Engineering showcase", "IoT telemetry", "Technical UI"],
    accent: "#0891b2",
    build: [
      { label: "Solution breakdowns", detail: "Each system explained interactively, layer by layer." },
      { label: "Telemetry story", detail: "Sensor data presented as capability, not as spec sheet." },
      { label: "Technical UI", detail: "An interface that signals engineering competence." },
      { label: "Consultation flow", detail: "Fast route from interest to a technical conversation." },
    ],
    metrics: [],
    screens: screensFor("rg-robotics", "#0891b2", "Solution breakdown", "IoT telemetry showcase", "The site scrolling"),
    review: reviewFor("rg-robotics", "RG Robotics", "#0891b2"),
  },
];

export const getCase = (slug: string) => WORK.find((w) => w.slug === slug);

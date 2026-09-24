/**
 * OUR OWN PRODUCTS — everything Cogitation Works built for itself.
 *
 * Consolidated 24 Sep. Previously this was split across `/products` (the four
 * software engines) and `/ventures` (meat shop, Readers Club, agri) — two
 * sections for one idea. The client's own framing is simpler and better: these
 * are all *our* things, and what separates them is **stage**, not category.
 * Client work lives in `work.ts` and nowhere near this file.
 *
 * Status is the organising principle:
 *   live        running right now            HRMS Pro, Readers Club
 *   available   deployable today             CRM, ERP, Cogi AI
 *   progress    being built now              Sunday delivery
 *   upcoming    committed, not started       Agri-IoT, Robotics
 *
 * ⚠️ Nothing here is invented. Where a fact has not been supplied it is marked
 * ⟨TBC⟩ and renders with a visible marker — see PROJECT.md §7.
 */

export type Stage = "live" | "available" | "progress" | "upcoming";
export type Family = "software" | "operation" | "community";

export const STAGE_LABEL: Record<Stage, string> = {
  live: "Live now",
  available: "Available",
  progress: "In progress",
  upcoming: "Upcoming",
};

export type Review = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type Plate = {
  id: string;
  kind: "photo" | "video";
  label: string;
  brief: string;
  src?: string;
  video?: string;
  accent?: string;
  aspect?: string;
};

export type ConceptStep = {
  kicker: string;
  title: string;
  body: string;
  plate?: Plate;
};

export type OwnProduct = {
  slug: string;
  name: string;
  kicker: string;
  stage: Stage;
  family: Family;
  summary: string;
  description: string;
  /** Headline figure. `metricTbc` renders it with a visible placeholder mark. */
  metric?: string;
  metricLabel?: string;
  metricTbc?: boolean;
  features: string[];
  specs: { value: string; unit?: string; label: string; tbc?: boolean }[];
  builtFor: string[];
  /** Scroll-scrubbed film at the top of the page. */
  story: { kicker: string; title: string; body?: string }[];
  frames?: { path: string; count: number };
  /** Sticky-visual walkthrough. */
  concept: ConceptStep[];
  /** What ships next. Every product page needs an answer to "is this finished?" */
  nextPhase: { when: string; items: string[] };
  /** Editions, limits and what can be customised. */
  variants: { name: string; detail: string; note?: string }[];
  faq: { q: string; a: string }[];
  reviews: Review[];
  relatedHref?: { label: string; href: string };
  accent: string;
};

/* ------------------------------------------------------------------ live */

const HRMS: OwnProduct = {
  slug: "hrms",
  name: "HRMS Pro",
  kicker: "Workforce, attendance & payroll suite",
  stage: "live",
  family: "software",
  summary:
    "Clock-in to payslip, across countries, without the month-end spreadsheet. Built, shipped and running.",
  description:
    "Full lifecycle enterprise workforce platform: biometric and geofenced clock-in, multi-country tax compliance, dynamic shift scheduling and automated payroll processing. Designed for organisations whose headcount, shift patterns or jurisdictions have outgrown a generic HR tool.",
  metric: "50,000+",
  metricLabel: "staff at scale",
  metricTbc: true,
  features: [
    "Biometric & geofence clock-in",
    "1-click direct bank disbursement",
    "Dynamic shift rostering engine",
    "Encrypted employee documents",
  ],
  specs: [
    { value: "100", unit: "–50k+", label: "Staff supported", tbc: true },
    { value: "1", unit: "click", label: "Payroll disbursement" },
    { value: "Multi", label: "Country tax rules" },
  ],
  builtFor: [
    "Multi-site operations running shift patterns by hand",
    "Companies paying staff across more than one tax jurisdiction",
    "Anywhere attendance is still reconciled against a paper register",
  ],
  story: [
    { kicker: "Clock in", title: "Attendance starts where the work starts", body: "Biometric or geofenced, on the device the employee already carries." },
    { kicker: "The roster", title: "Shifts that respond to reality", body: "Cover, skills and hours resolved together rather than patched by hand every week." },
    { kicker: "Compliance", title: "Tax rules applied per jurisdiction", body: "At the point of calculation, not at the point of filing." },
    { kicker: "Payday", title: "One click to the bank", body: "The month ends without a spreadsheet reconciliation." },
  ],
  concept: [
    { kicker: "Clock-in", title: "Biometric and geofence", body: "Runs on the employee's phone, with biometric hardware supported where a site already has it. Location is verified, not trusted.", plate: { id: "hrms-clock", kind: "photo", label: "Clock-in", brief: "Phone mockup — geofenced clock-in screen with a site map.", accent: "#0d9488", aspect: "aspect-[4/3]" } },
    { kicker: "Rostering", title: "Shifts solved, not shuffled", body: "The engine resolves cover, skills and legal hour limits together. Manual override is always available — it just stops being the default.", plate: { id: "hrms-roster", kind: "photo", label: "Shift roster", brief: "Screenshot — weekly roster grid with coverage highlighted.", accent: "#0d9488", aspect: "aspect-[4/3]" } },
    { kicker: "Payroll", title: "From timesheet to bank in one pass", body: "Tax, deductions and disbursement run off the same attendance data nobody had to re-key.", plate: { id: "hrms-payroll", kind: "photo", label: "Payroll run", brief: "Screenshot — payroll summary before disbursement.", accent: "#0d9488", aspect: "aspect-[4/3]" } },
    { kicker: "In use", title: "One pay cycle, compressed", body: "The fastest way to understand it is to watch somebody run it.", plate: { id: "hrms-demo", kind: "video", label: "Live walkthrough", brief: "60–90s silent screen recording — clock-in through to payroll.", accent: "#0d9488", aspect: "aspect-[4/3]" } },
  ],
  nextPhase: {
    when: "⟨TBC⟩",
    items: [
      "Additional payroll jurisdictions ⟨TBC⟩ — confirm which",
      "Self-service leave and claims for employees",
      "Shift-swap marketplace between staff",
      "Open API for third-party finance systems",
    ],
  },
  variants: [
    { name: "Standard", detail: "Managed cloud, shared infrastructure, standard support window." },
    { name: "Single-tenant", detail: "Isolated deployment where data residency is a contractual requirement.", note: "Most requested by regulated clients" },
    { name: "Custom build", detail: "Rostering rules, pay codes and compliance logic written to your existing agreements." },
    { name: "On-premise", detail: "Available where the site has no reliable connectivity.", note: "⟨TBC⟩ confirm support model" },
  ],
  faq: [
    { q: "Does geofenced clock-in need a dedicated device?", a: "No. It runs on the employee's phone, with biometric hardware supported where a site already has it installed." },
    { q: "Which countries are supported for payroll?", a: "⟨TBC⟩ — list the confirmed jurisdictions before publishing." },
    { q: "How are employee documents secured?", a: "Encrypted at rest with role-scoped access; an audit trail records every retrieval." },
  ],
  reviews: [],
  accent: "#0d9488",
};

const READERS: OwnProduct = {
  slug: "readers-club",
  name: "Readers Club",
  kicker: "Community · Chennai & Vellore",
  stage: "live",
  family: "community",
  summary:
    "A book-reading community run by the company, meeting in Chennai and Vellore. Running now, and not for sale.",
  description:
    "A reading community that started internally and did not stay internal. Sessions run in both cities. It is not a service, it has no commercial relationship to the software business, and nothing about it is being sold — it is here because it is part of the company.",
  features: [
    "Sessions in Chennai and Vellore",
    "Open to people outside the company",
    "No membership, no fee",
    "Reading list chosen by the group",
  ],
  specs: [
    { value: "2", label: "Cities" },
    { value: "⟨TBC⟩", label: "Sessions per month", tbc: true },
    { value: "⟨TBC⟩", label: "Members", tbc: true },
  ],
  builtFor: [
    "People who want to read more and rarely do it alone",
    "Anyone in Chennai or Vellore — you do not have to work here",
  ],
  story: [
    { kicker: "The idea", title: "People here wanted somewhere to read together", body: "It started internally and did not stay internal. That is the whole origin story, and it does not need a better one." },
    { kicker: "Two cities", title: "Chennai and Vellore", body: "Sessions run in both. Same club, two rooms." },
    { kicker: "The rule", title: "Nothing is being sold here", body: "No product, no pipeline, no commercial relationship to the software business." },
  ],
  concept: [
    { kicker: "The room", title: "A table, chairs, and whoever turns up", body: "No membership, no fee, no curriculum. The organisational overhead is deliberately close to zero, which is why it has kept running.", plate: { id: "rc-room", kind: "photo", label: "The room", brief: "Wide shot of a session in progress — people seated, books open.", accent: "#a16207", aspect: "aspect-[4/3]" } },
    { kicker: "Two cities", title: "Chennai and Vellore", body: "Sessions run in both, and people have moved between them.", plate: { id: "rc-cities", kind: "photo", label: "Both groups", brief: "A pair of group photos, one per city, shot the same way.", accent: "#a16207", aspect: "aspect-[4/3]" } },
    { kicker: "The books", title: "Whatever the group picks", body: "Chosen by the people reading, not by anyone here. The list is the honest record of what the club actually is.", plate: { id: "rc-shelf", kind: "photo", label: "The reading list", brief: "Flat-lay of the books covered so far, arranged in order.", accent: "#a16207", aspect: "aspect-[4/3]" } },
  ],
  nextPhase: {
    when: "⟨TBC⟩",
    items: [
      "A published session calendar so people can plan",
      "The reading list, archived publicly",
      "⟨TBC⟩ — whether a third city is planned",
    ],
  },
  variants: [
    { name: "Chennai sessions", detail: "⟨TBC⟩ — venue and frequency." },
    { name: "Vellore sessions", detail: "⟨TBC⟩ — venue and frequency." },
  ],
  faq: [
    { q: "Do I have to work at Cogitation Works to join?", a: "No. It started internally but it is open." },
    { q: "Is there a fee?", a: "No." },
    { q: "How do I find out when the next session is?", a: "⟨TBC⟩ — add the contact or signup route." },
  ],
  reviews: [],
  accent: "#a16207",
};

/* ------------------------------------------------------------- available */

const CRM: OwnProduct = {
  slug: "crm",
  name: "Cogitation CRM",
  kicker: "Integrated business & sales CRM",
  stage: "available",
  family: "software",
  summary:
    "One record for the customer, shared by the team that sells to them and the team that serves them.",
  description:
    "Unified customer relationship and sales pipeline platform with integrated multi-channel communications, deal tracking, lead scoring and automated customer service workflows. Built for businesses where the sales conversation and the service history are currently held in two different systems.",
  metric: "+38%",
  metricLabel: "pipeline velocity",
  metricTbc: true,
  features: [
    "360° customer timeline",
    "Automated trigger cadence",
    "Deal & pipeline stage tracking",
    "Automated service workflows",
  ],
  specs: [
    { value: "360", unit: "°", label: "Customer timeline" },
    { value: "+38", unit: "%", label: "Pipeline velocity", tbc: true },
    { value: "Multi", label: "Channel comms" },
  ],
  builtFor: [
    "Sales teams losing context between the deal and the service ticket",
    "Operations leads who cannot see turnaround time end to end",
    "Businesses running a CRM and a helpdesk that do not talk",
  ],
  story: [
    { kicker: "The split", title: "Sales knows one customer. Service knows another.", body: "Two records, two systems, one company — and a customer who has to explain themselves twice." },
    { kicker: "The merge", title: "One record, both teams", body: "The deal and the ticket attach to the same customer, so history travels with them." },
    { kicker: "The cadence", title: "Follow-up stops depending on memory", body: "Triggers fire from what actually happened, not from a reminder somebody set." },
    { kicker: "The view", title: "Turnaround becomes measurable", body: "End to end, in one place, for the first time." },
  ],
  concept: [
    { kicker: "Timeline", title: "Everything this customer has ever done", body: "Calls, tickets, deals, invoices — one chronological record rather than four systems agreeing to disagree.", plate: { id: "crm-timeline", kind: "photo", label: "Customer timeline", brief: "Screenshot — the 360° customer timeline with mixed event types.", accent: "#2563eb", aspect: "aspect-[4/3]" } },
    { kicker: "Pipeline", title: "Stages that mean something", body: "Deal stages, lead scoring and forecast rollup on one board, configured to how this business actually sells.", plate: { id: "crm-pipeline", kind: "photo", label: "Pipeline board", brief: "Screenshot — kanban pipeline with stages and deal values.", accent: "#2563eb", aspect: "aspect-[4/3]" } },
    { kicker: "Service", title: "Tickets bound to the deal", body: "A service issue opens against the same customer record the salesperson is looking at.", plate: { id: "crm-service", kind: "photo", label: "Service desk", brief: "Screenshot — ticket view showing the linked account and open deals.", accent: "#2563eb", aspect: "aspect-[4/3]" } },
    { kicker: "In use", title: "A day in the system", body: "The fastest way to understand it is to watch somebody use it.", plate: { id: "crm-demo", kind: "video", label: "Live walkthrough", brief: "60–90s silent screen recording — one real workflow start to finish.", accent: "#2563eb", aspect: "aspect-[4/3]" } },
  ],
  nextPhase: {
    when: "⟨TBC⟩",
    items: [
      "WhatsApp Business as a first-class channel",
      "Forecast accuracy scoring against closed history",
      "Native Cogi AI summarisation of the customer timeline",
    ],
  },
  variants: [
    { name: "Standard", detail: "Managed cloud, shared infrastructure." },
    { name: "Single-tenant", detail: "Isolated deployment where data residency is required." },
    { name: "Alongside an incumbent", detail: "Runs beside a contractually locked-in CRM and syncs the customer record." },
    { name: "Custom pipeline", detail: "Stages, scoring and automation written to your sales motion rather than a template." },
  ],
  faq: [
    { q: "Can it replace an existing CRM, or does it sit alongside one?", a: "Either. It is most often deployed as a replacement where the existing CRM covers sales but not service. Where an incumbent is locked in, it runs alongside and syncs the customer record." },
    { q: "How is it deployed?", a: "Cloud native, with a single-tenant option where data residency is a requirement." },
    { q: "How long does a typical rollout take?", a: "⟨TBC⟩ — confirm the real range before publishing." },
  ],
  reviews: [],
  accent: "#2563eb",
};

const ERP: OwnProduct = {
  slug: "erp",
  name: "Cogitation ERP",
  kicker: "Manufacturing & operational business ERP",
  stage: "available",
  family: "software",
  summary:
    "Procurement, inventory and the production floor, reporting to the same system in real time.",
  description:
    "End-to-end resource planning centralising supply chain, procurement, inventory, production floor operations and financial auditing into one platform. Built for manufacturers whose stages are each individually tracked and collectively invisible.",
  metric: "99.3%",
  metricLabel: "resource precision",
  metricTbc: true,
  features: [
    "End-to-end operational visibility",
    "Warehouse & inventory control",
    "Multi-stage production scheduling",
    "Real-time procurement audit trail",
  ],
  specs: [
    { value: "99.3", unit: "%", label: "Resource precision", tbc: true },
    { value: "Multi", unit: "-stage", label: "Production scheduling" },
    { value: "Real", unit: "-time", label: "Procurement audit" },
  ],
  builtFor: [
    "Plants where inventory is accurate only on the day it is counted",
    "Procurement teams buying against a schedule rather than against demand",
    "Operations directors who cannot answer where an order is right now",
  ],
  story: [
    { kicker: "The order", title: "A job enters the system", body: "And from that moment its position is a fact anyone can look up, not a phone call." },
    { kicker: "The BOM", title: "Demand is derived, not forecast", body: "The bill of materials drives procurement directly. Nobody argues about the forecast because there isn't one." },
    { kicker: "The floor", title: "Each station reports as it finishes", body: "Stage completion recorded where the stage happens, in about the time it takes to mark a whiteboard." },
    { kicker: "The audit", title: "Every movement has a trail", body: "Procurement, inventory and production reconcile continuously instead of monthly." },
  ],
  concept: [
    { kicker: "Bill of materials", title: "Multi-level, and it drives buying", body: "Change the BOM and procurement changes with it. This is the difference between an ERP and a very expensive spreadsheet.", plate: { id: "erp-bom", kind: "photo", label: "Bill of materials", brief: "Screenshot — multi-level BOM tree with rolled-up quantities.", accent: "#ea580c", aspect: "aspect-[4/3]" } },
    { kicker: "Shop floor", title: "Reporting at the station", body: "One screen, one job: mark the stage done. Anything slower than the whiteboard it replaces will lose to the whiteboard.", plate: { id: "erp-station", kind: "photo", label: "Station terminal", brief: "Tablet mockup on a shop floor — single-purpose stage-completion screen.", accent: "#ea580c", aspect: "aspect-[4/3]" } },
    { kicker: "Inventory", title: "Accurate on days nobody counted", body: "Stock moves when production consumes it, so the number is right between stocktakes rather than only during one.", plate: { id: "erp-inventory", kind: "photo", label: "Inventory", brief: "Screenshot — warehouse stock view with live movements.", accent: "#ea580c", aspect: "aspect-[4/3]" } },
    { kicker: "In use", title: "One order, front to back", body: "", plate: { id: "erp-demo", kind: "video", label: "Live walkthrough", brief: "60–90s silent screen recording — order through to dispatch.", accent: "#ea580c", aspect: "aspect-[4/3]" } },
  ],
  nextPhase: {
    when: "⟨TBC⟩",
    items: [
      "Machine-level telemetry ingestion from shop-floor hardware",
      "Predictive reorder points from consumption history",
      "Supplier portal for inbound scheduling",
    ],
  },
  variants: [
    { name: "Standard", detail: "Managed cloud for a single plant." },
    { name: "Multi-site", detail: "Several plants under one tenant with consolidated reporting." },
    { name: "Custom MES integration", detail: "Connected to existing shop-floor hardware where it exposes an interface." },
    { name: "Finance integration", detail: "Runs alongside an incumbent accounting system instead of replacing it." },
  ],
  faq: [
    { q: "Does it handle multi-level bills of materials?", a: "Yes. The BOM drives procurement directly, so demand is derived rather than forecast by hand." },
    { q: "Can it integrate with existing shop-floor hardware?", a: "Yes, where the hardware exposes an interface. Station reporting is the integration point most often required." },
    { q: "Is there a finance module, or does it integrate with one?", a: "Financial auditing is built in; integration with an incumbent accounting system is supported." },
  ],
  reviews: [],
  relatedHref: { label: "Sunday delivery runs on this", href: "/products/sunday-delivery" },
  accent: "#ea580c",
};

const COGI_AI: OwnProduct = {
  slug: "cogi-ai",
  name: "Cogi AI",
  kicker: "Automotive & cognitive enterprise agent",
  stage: "available",
  family: "software",
  summary:
    "An agent that reads telemetry, service manuals and unstructured records, and acts on them.",
  description:
    "Autonomous AI agent for automotive diagnostics, telemetry interpretation and intelligent workflow automation. Handles unstructured data and conversational assistance, with retrieval grounded in the organisation's own manuals and records.",
  metric: "<120ms",
  metricLabel: "inference",
  metricTbc: true,
  features: [
    "Automotive telemetry AI",
    "Context-aware LLM orchestration",
    "RAG knowledge & manual querying",
    "Autonomous workflow execution",
  ],
  specs: [
    { value: "<120", unit: "ms", label: "Inference", tbc: true },
    { value: "RAG", label: "Grounded retrieval" },
    { value: "Auto", label: "Workflow execution" },
  ],
  builtFor: [
    "Service operations diagnosing from telemetry and technician notes",
    "Teams whose knowledge lives in PDFs nobody can search",
    "Workflows that are rule-based today and should not be",
  ],
  story: [
    { kicker: "The input", title: "Telemetry, manuals, technician notes", body: "Three kinds of unstructured data that nobody can search and everybody needs." },
    { kicker: "Retrieval", title: "Find the source before answering", body: "The agent retrieves from your own records first. Generation without retrieval is just a confident guess." },
    { kicker: "The answer", title: "With a citation attached", body: "Every response points at the document it came from, so it can be checked." },
    { kicker: "The action", title: "And then it does something", body: "Diagnosis becomes a scheduled job, not a paragraph somebody has to act on." },
  ],
  concept: [
    { kicker: "Ingest", title: "The documents nobody can search", body: "Service manuals, spec sheets, historical job notes. The knowledge exists; it is just in PDFs.", plate: { id: "ai-ingest", kind: "photo", label: "Knowledge base", brief: "Screenshot — ingested document set with indexing status.", accent: "#7c3aed", aspect: "aspect-[4/3]" } },
    { kicker: "Ground", title: "Retrieval before generation", body: "The agent finds the passage, then answers from it. This is the whole difference between useful and plausible.", plate: { id: "ai-rag", kind: "photo", label: "Grounded answer", brief: "Screenshot — an answer with its source passage shown alongside.", accent: "#7c3aed", aspect: "aspect-[4/3]" } },
    { kicker: "Telemetry", title: "Reading the vehicle, not the ticket", body: "Diagnostic codes and sensor streams interpreted against the same knowledge base.", plate: { id: "ai-telemetry", kind: "photo", label: "Telemetry view", brief: "Screenshot — live vehicle telemetry with an AI interpretation panel.", accent: "#7c3aed", aspect: "aspect-[4/3]" } },
    { kicker: "In use", title: "Question to scheduled job", body: "", plate: { id: "ai-demo", kind: "video", label: "Live walkthrough", brief: "60–90s silent screen recording — a diagnostic question becoming a work order.", accent: "#7c3aed", aspect: "aspect-[4/3]" } },
  ],
  nextPhase: {
    when: "⟨TBC⟩",
    items: [
      "Self-hosted model deployment as a standard option",
      "Domain packs beyond automotive ⟨TBC⟩ — which first",
      "Agent actions written directly into Cogitation ERP",
    ],
  },
  variants: [
    { name: "Managed", detail: "Hosted orchestration with a commercial model provider." },
    { name: "Self-hosted models", detail: "For data residency or confidentiality requirements." },
    { name: "Domain pack — automotive", detail: "The telemetry and diagnostics work this started from." },
    { name: "Custom knowledge base", detail: "Your manuals and records indexed and grounded to your terminology." },
  ],
  faq: [
    { q: "Does it send our data to a public model provider?", a: "Not necessarily. Orchestration supports self-hosted models where data residency or confidentiality requires it." },
    { q: "What does 'grounded' mean here?", a: "Answers are retrieved from your own documents and records before generation, so the agent cites a source rather than improvising one." },
    { q: "Is it limited to automotive?", a: "The telemetry work started in automotive. The retrieval and workflow layers are domain-independent." },
  ],
  reviews: [],
  accent: "#7c3aed",
};

/* -------------------------------------------------------------- progress */

const SUNDAY: OwnProduct = {
  slug: "sunday-delivery",
  name: "Sunday delivery, Vellore region",
  kicker: "Direct-to-consumer · Last mile · Cold chain",
  stage: "progress",
  family: "operation",
  summary:
    "Orders taken Monday to Saturday. Delivered Sunday, without delay, to serviceable areas near Vellore.",
  description:
    "A local direct-to-consumer meat operation with a deliberately narrow promise: you order during the week, and it arrives on Sunday. One delivery day, stated plainly, inside a defined area. The whole thing runs on Cogitation ERP and HRMS Pro — order intake, cold-chain windows, route planning, driver allocation and the Sunday dispatch itself.",
  features: [
    "Order window Monday to Saturday",
    "Single Sunday delivery day",
    "Published service area",
    "Cold-chain windows tracked as route constraints",
  ],
  specs: [
    { value: "Mon", unit: "–Sat", label: "Order window" },
    { value: "Sun", label: "Delivery day" },
    { value: "⟨TBC⟩", label: "Service area", tbc: true },
  ],
  builtFor: [
    "Households near Vellore who plan the week's cooking on a Sunday",
    "Anyone tired of delivery promises with vague geography",
  ],
  story: [
    { kicker: "Monday to Saturday", title: "The order window opens", body: "Six days to order, against a fixed cut-off. One window, stated plainly, so nobody is guessing whether they made it." },
    { kicker: "The route", title: "One delivery day, planned as one problem", body: "Every order for the week resolves into a single Sunday route. Planning one day properly is a harder commitment than planning seven loosely — and a far better one to keep." },
    { kicker: "The chain", title: "Cold is a deadline, not a setting", body: "Temperature windows are tracked as constraints on the route itself, so the schedule cannot quietly produce a drop that arrives warm." },
    { kicker: "Sunday", title: "It arrives, in the area we said", body: "A defined service area near Vellore. A delivery promise with vague geography is a complaint generator, so the boundary is published rather than implied." },
    { kicker: "The point", title: "We run it on our own software", body: "Ordering, routing, cold-chain windows and driver allocation are exactly what Cogitation ERP and HRMS Pro do. This is the proof, not a side business." },
  ],
  concept: [
    { kicker: "Order", title: "Six days to decide, one day to deliver", body: "The customer orders any time Monday to Saturday against a published cut-off.", plate: { id: "meat-order", kind: "photo", label: "Ordering", brief: "Phone mockup — the order screen, cut-off timer visible.", accent: "#dc2626", aspect: "aspect-[4/3]" } },
    { kicker: "Cut", title: "Prepared to the order, not to a forecast", body: "Because the delivery day is fixed, the week's demand is known before anything is cut. Less waste, and no guessing what Sunday will want.", plate: { id: "meat-prep", kind: "photo", label: "Preparation", brief: "Clean prep counter, stainless, portions being weighed and labelled.", accent: "#dc2626", aspect: "aspect-[4/3]" } },
    { kicker: "Cold", title: "Temperature is a constraint on the route", body: "Cold-chain windows are built into the routing, not checked afterwards.", plate: { id: "meat-cold", kind: "photo", label: "Cold chain", brief: "Insulated crate with a temperature logger, packed and sealed.", accent: "#dc2626", aspect: "aspect-[4/3]" } },
    { kicker: "Route", title: "Every Sunday order, solved as one problem", body: "The whole week resolves into a single route.", plate: { id: "meat-route", kind: "video", label: "Route planning", brief: "15s screen recording — Sunday's orders resolving into one optimised route.", accent: "#dc2626", aspect: "aspect-[4/3]" } },
    { kicker: "Deliver", title: "It arrives, inside the area we published", body: "A defined boundary near Vellore, stated up front.", plate: { id: "meat-deliver", kind: "photo", label: "Sunday delivery", brief: "Van and cold box at a doorstep, early morning, rural road.", accent: "#dc2626", aspect: "aspect-[4/3]" } },
  ],
  nextPhase: {
    when: "⟨TBC⟩",
    items: [
      "Publish the service-area boundary and the order cut-off",
      "Subscription orders for repeat weekly customers",
      "A second delivery day if Sunday volume supports it",
      "⟨TBC⟩ — whether B2B supply is in scope",
    ],
  },
  variants: [
    { name: "Standard order", detail: "Order Monday to Saturday, delivered Sunday inside the published area." },
    { name: "Serviceable area", detail: "⟨TBC⟩ — specific areas near Vellore. Outside the boundary is not served rather than served late.", note: "Limited" },
    { name: "Bulk / event orders", detail: "⟨TBC⟩ — whether larger quantities need a longer lead time." },
    { name: "Custom cuts", detail: "⟨TBC⟩ — confirm what can be specified at order time." },
  ],
  faq: [
    { q: "Why only Sunday?", a: "Because one delivery day planned properly is a harder promise to make and a far better one to keep than seven planned loosely." },
    { q: "What is the service area?", a: "⟨TBC⟩ — the boundary is published rather than implied. Confirm the areas before launch." },
    { q: "What is the order cut-off?", a: "⟨TBC⟩." },
  ],
  reviews: [],
  relatedHref: { label: "Runs on Cogitation ERP", href: "/products/erp" },
  accent: "#dc2626",
};

/* -------------------------------------------------------------- upcoming */

const AGRI: OwnProduct = {
  slug: "agri-iot",
  name: "Agri-IoT & drone logistics",
  kicker: "Agriculture · IoT · Unmanned transport",
  stage: "upcoming",
  family: "operation",
  summary:
    "Sensor telemetry for working farms, and drones for transport and delivery across ground that vehicles handle badly.",
  description:
    "The IoT work the company already does for buildings and industrial hardware transfers directly to a field: measure the conditions, get the readings somewhere useful, and let the system act on them. The second half is movement — drone transport for agricultural payloads, over terrain where a vehicle and a driver are the expensive part of the problem.",
  features: [
    "Field sensor telemetry",
    "Drone transport and delivery",
    "Threshold-driven dispatch",
    "Runs on the existing ERP scheduling layer",
  ],
  specs: [
    { value: "IoT", label: "Field telemetry" },
    { value: "UAV", label: "Payload transport" },
    { value: "⟨TBC⟩", label: "First deployment", tbc: true },
  ],
  builtFor: [
    "Farms where conditions are known only when somebody drives out to look",
    "Operations moving inputs and samples across awkward distances",
  ],
  story: [
    { kicker: "The ground", title: "Start with what a field actually knows", body: "Moisture, temperature, canopy condition. Today most of it is known only when somebody drives out to look, which means decisions are made on memory." },
    { kicker: "The sensors", title: "Put the measurement where the crop is", body: "Low-power sensors reporting continuously — the same telemetry layer we already run for industrial hardware, pointed at soil instead of a machine." },
    { kicker: "The lift", title: "Movement is the other half", body: "Drone transport for agricultural payloads, over terrain and distances where a vehicle and a driver are the expensive part of the problem." },
    { kicker: "The system", title: "Readings become dispatch, not a dashboard", body: "Telemetry lands in the ERP, where it can reschedule irrigation or send a flight." },
  ],
  concept: [
    { kicker: "Hardware", title: "A sensor that survives a field", body: "Solar, low-power radio, sealed against dust and monsoon. The constraint is not the electronics — it is that nobody is going out to service it.", plate: { id: "agri-sensor", kind: "photo", label: "Field sensor", brief: "Product render — a weather-sealed sensor mast standing in a crop row.", accent: "#16a34a", aspect: "aspect-[4/3]" } },
    { kicker: "The read", title: "Soil moisture, canopy, temperature", body: "Reported continuously instead of on the days somebody drives out.", plate: { id: "agri-dash", kind: "photo", label: "Field telemetry", brief: "Screenshot of the telemetry view — field map with live sensor values.", accent: "#16a34a", aspect: "aspect-[4/3]" } },
    { kicker: "The lift", title: "Payloads move without a driver", body: "Drone transport across ground that costs a vehicle real time.", plate: { id: "agri-drone", kind: "photo", label: "Transport drone", brief: "Product render — cargo drone with an underslung payload over a field.", accent: "#16a34a", aspect: "aspect-[4/3]" } },
    { kicker: "The loop", title: "A reading becomes a job", body: "The threshold is crossed, the ERP schedules the work and allocates who does it.", plate: { id: "agri-loop", kind: "video", label: "Sensor to dispatch", brief: "15s screen recording — a threshold trips and a job appears in the schedule.", accent: "#16a34a", aspect: "aspect-[4/3]" } },
  ],
  nextPhase: {
    when: "⟨TBC⟩",
    items: [
      "First field pilot — ⟨TBC⟩ location and crop",
      "Sensor hardware selection and weatherproofing trials",
      "Drone payload and range specification",
      "Regulatory clearance for beyond-line-of-sight flight ⟨TBC⟩",
    ],
  },
  variants: [
    { name: "Telemetry only", detail: "Sensors and the reporting layer, without the transport half." },
    { name: "Transport only", detail: "Drone logistics for operations that already have their data." },
    { name: "Full loop", detail: "Telemetry, thresholds and dispatch connected end to end." },
    { name: "Custom crop model", detail: "⟨TBC⟩ — thresholds tuned per crop and region." },
  ],
  faq: [
    { q: "When does this start?", a: "⟨TBC⟩ — it is committed but not yet deployed. Nothing here is available to buy today." },
    { q: "Is the drone side regulated?", a: "Yes, and clearance for beyond-line-of-sight operation is part of the work rather than an afterthought." },
    { q: "Does this replace an existing farm system?", a: "It is designed to feed one. The telemetry lands in a scheduling system rather than in its own dashboard." },
  ],
  reviews: [],
  relatedHref: { label: "Agriculture", href: "/industries/agriculture" },
  accent: "#16a34a",
};

const ROBOTICS: OwnProduct = {
  slug: "robotics",
  name: "Robotics",
  kicker: "Automation hardware · Early",
  stage: "upcoming",
  family: "operation",
  summary:
    "Automation hardware alongside the software that schedules it. The earliest thing on this page.",
  description:
    "⟨TBC⟩ — this is committed as a direction but the scope has not been defined. Everything below is a placeholder and must be replaced before publishing. It is listed here rather than hidden because leaving it out of a page about what the company is building would be the less honest choice.",
  features: [
    "⟨TBC⟩ — target application",
    "⟨TBC⟩ — hardware or integration",
    "⟨TBC⟩ — relationship to the IoT work",
  ],
  specs: [
    { value: "⟨TBC⟩", label: "Scope", tbc: true },
    { value: "⟨TBC⟩", label: "First build", tbc: true },
  ],
  builtFor: ["⟨TBC⟩ — define the buyer before writing this page"],
  story: [
    { kicker: "Direction", title: "Committed, not yet defined", body: "The company intends to work in robotics. The scope has not been set, and this page says so rather than filling the space." },
    { kicker: "The link", title: "It connects to the telemetry work", body: "Whatever the hardware turns out to be, the scheduling and telemetry layer already exists." },
  ],
  concept: [
    { kicker: "Scope", title: "⟨TBC⟩", body: "This section is waiting on a defined scope. Nothing is written here that could not be supported.", plate: { id: "rob-1", kind: "photo", label: "Scope pending", brief: "No asset until the scope is defined.", accent: "#0891b2", aspect: "aspect-[4/3]" } },
  ],
  nextPhase: {
    when: "⟨TBC⟩",
    items: [
      "Define the target application",
      "Decide build versus integrate",
      "⟨TBC⟩ — everything else",
    ],
  },
  variants: [{ name: "⟨TBC⟩", detail: "No variants defined yet." }],
  faq: [
    { q: "What stage is this at?", a: "Earliest. It is a stated direction with no defined scope, and this page will not pretend otherwise." },
  ],
  reviews: [],
  accent: "#0891b2",
};

/* ------------------------------------------------------------------ list */

/** Ordered by stage: what is running first, what is furthest out last. */
export const OWN_PRODUCTS: OwnProduct[] = [
  HRMS,
  READERS,
  CRM,
  ERP,
  COGI_AI,
  SUNDAY,
  AGRI,
  ROBOTICS,
];

export const getProduct = (slug: string) =>
  OWN_PRODUCTS.find((p) => p.slug === slug);

export const BY_STAGE: { stage: Stage; items: OwnProduct[] }[] = (
  ["live", "available", "progress", "upcoming"] as Stage[]
).map((stage) => ({
  stage,
  items: OWN_PRODUCTS.filter((p) => p.stage === stage),
}));

/** Kept so existing imports of PRODUCTS keep working. */
export const PRODUCTS = OWN_PRODUCTS;
export type Product = OwnProduct;

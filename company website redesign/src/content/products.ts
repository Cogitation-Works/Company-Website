/**
 * The four owned platforms. Content from PROJECT.md §2.4.
 *
 * Every headline metric here is still a placeholder from the client's existing
 * page — each is marked `tbc` so the UI can render it with a visible marker and
 * so a single grep finds all of them at launch. See PROJECT.md §7.
 *
 * `specs` drives the BMW-pattern product hero (reference R13): the object
 * rotates on scroll while these count up beside it.
 */

import type { ConceptStep } from "./ventures";

export type Product = {
  slug: string;
  name: string;
  kicker: string;
  /** One sentence, used in the index and as the meta description. */
  summary: string;
  description: string;
  metric: string;
  metricLabel: string;
  metricTbc: boolean;
  features: string[];
  /** Counted beside the rotating object on the product page. */
  specs: { value: string; unit?: string; label: string; tbc?: boolean }[];
  /** Who it is actually for — keeps the page from being a feature list. */
  builtFor: string[];
  faq: { q: string; a: string }[];
  accent: string;
  /** Scroll-scrubbed frame sequence, once generated. See ASSETS.md §4.2. */
  frames?: { path: string; count: number };
  /** Stages for the scroll-scrubbed concept film at the top of the page. */
  story: { kicker: string; title: string; body?: string }[];
  /** Sticky-visual walkthrough — the product explained one screen at a time. */
  concept: ConceptStep[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "crm",
    name: "Cogitation CRM",
    kicker: "Integrated business & sales CRM",
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
    faq: [
      {
        q: "Can it replace an existing CRM, or does it sit alongside one?",
        a: "Either. It is most often deployed as a replacement where the existing CRM covers sales but not service. Where an incumbent CRM is contractually locked in, it runs alongside and syncs the customer record.",
      },
      {
        q: "How is it deployed?",
        a: "Cloud native, with a single-tenant option where data residency is a requirement.",
      },
      {
        q: "How long does a typical rollout take?",
        a: "⟨TBC⟩ — confirm the real range before publishing.",
      },
    ],
    accent: "#2563eb",
    story: [
      { kicker: "The split", title: "Sales knows one customer. Service knows another.", body: "Two records, two systems, one company — and a customer who has to explain themselves twice." },
      { kicker: "The merge", title: "One record, both teams", body: "The deal and the ticket attach to the same customer, so history travels with them." },
      { kicker: "The cadence", title: "Follow-up stops depending on memory", body: "Triggers fire from what actually happened, not from a reminder somebody set." },
      { kicker: "The view", title: "Turnaround becomes measurable", body: "End to end, in one place, for the first time." },
    ],
    concept: [
      { kicker: "Timeline", title: "Everything this customer has ever done", body: "Calls, tickets, deals, invoices — one chronological record rather than four systems agreeing to disagree.", plate: { id: "crm-timeline", kind: "photo", label: "Customer timeline", brief: "Screenshot — the 360° customer timeline with mixed event types.", accent: "#2563eb", aspect: "aspect-[4/3]" } },
      { kicker: "Pipeline", title: "Stages that mean something", body: "Deal stages, lead scoring and forecast rollup on one board, configured to how this business actually sells.", plate: { id: "crm-pipeline", kind: "photo", label: "Pipeline board", brief: "Screenshot — kanban pipeline with stages and deal values.", accent: "#2563eb", aspect: "aspect-[4/3]" } },
      { kicker: "Service", title: "Tickets bound to the deal", body: "A service issue opens against the same customer record the salesperson is looking at. Nobody has to go and find out.", plate: { id: "crm-service", kind: "photo", label: "Service desk", brief: "Screenshot — ticket view showing the linked account and open deals.", accent: "#2563eb", aspect: "aspect-[4/3]" } },
      { kicker: "In use", title: "A day in the system", body: "The fastest way to understand it is to watch somebody use it.", plate: { id: "crm-demo", kind: "video", label: "Live walkthrough", brief: "60–90s silent screen recording — one real workflow start to finish.", accent: "#2563eb", aspect: "aspect-[4/3]" } },
    ],
  },
  {
    slug: "hrms",
    name: "HRMS Pro",
    kicker: "Workforce, attendance & payroll suite",
    summary:
      "Clock-in to payslip, across countries, without the month-end spreadsheet.",
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
    faq: [
      {
        q: "Does geofenced clock-in need a dedicated device?",
        a: "No. It runs on the employee's phone, with biometric hardware supported where a site already has it installed.",
      },
      {
        q: "Which countries are supported for payroll?",
        a: "⟨TBC⟩ — list the confirmed jurisdictions before publishing.",
      },
      {
        q: "How are employee documents secured?",
        a: "Encrypted at rest with role-scoped access; an audit trail records every retrieval.",
      },
    ],
    accent: "#0d9488",
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
      { kicker: "In use", title: "One pay cycle, compressed", body: "", plate: { id: "hrms-demo", kind: "video", label: "Live walkthrough", brief: "60–90s silent screen recording — clock-in through to payroll.", accent: "#0d9488", aspect: "aspect-[4/3]" } },
    ],
  },
  {
    slug: "erp",
    name: "Cogitation ERP",
    kicker: "Manufacturing & operational business ERP",
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
    faq: [
      {
        q: "Does it handle multi-level bills of materials?",
        a: "Yes. The BOM drives procurement directly, so demand is derived rather than forecast by hand.",
      },
      {
        q: "Can it integrate with existing shop-floor hardware?",
        a: "Yes, where the hardware exposes an interface. Station reporting is the integration point most often required.",
      },
      {
        q: "Is there a finance module, or does it integrate with one?",
        a: "Financial auditing is built in; integration with an incumbent accounting system is supported.",
      },
    ],
    accent: "#ea580c",
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
  },
  {
    slug: "cogi-ai",
    name: "Cogi AI",
    kicker: "Automotive & cognitive enterprise agent",
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
    faq: [
      {
        q: "Does it send our data to a public model provider?",
        a: "Not necessarily. Orchestration supports self-hosted models where data residency or confidentiality requires it.",
      },
      {
        q: "What does 'grounded' mean here?",
        a: "Answers are retrieved from your own documents and records before generation, so the agent cites a source rather than improvising one.",
      },
      {
        q: "Is it limited to automotive?",
        a: "The telemetry work started in automotive. The retrieval and workflow layers are domain-independent.",
      },
    ],
    accent: "#7c3aed",
    story: [
      { kicker: "The input", title: "Telemetry, manuals, technician notes", body: "Three kinds of unstructured data that nobody can search and everybody needs." },
      { kicker: "Retrieval", title: "Find the source before answering", body: "The agent retrieves from your own records first. Generation without retrieval is just a confident guess." },
      { kicker: "The answer", title: "With a citation attached", body: "Every response points at the document it came from, so it can be checked." },
      { kicker: "The action", title: "And then it does something", body: "Diagnosis becomes a scheduled job, not a paragraph somebody has to act on." },
    ],
    concept: [
      { kicker: "Ingest", title: "The documents nobody can search", body: "Service manuals, spec sheets, historical job notes. The knowledge exists; it is just in PDFs.", plate: { id: "ai-ingest", kind: "photo", label: "Knowledge base", brief: "Screenshot — ingested document set with indexing status.", accent: "#7c3aed", aspect: "aspect-[4/3]" } },
      { kicker: "Ground", title: "Retrieval before generation", body: "The agent finds the passage, then answers from it. This is the whole difference between useful and plausible.", plate: { id: "ai-rag", kind: "photo", label: "Grounded answer", brief: "Screenshot — an answer with its source passage shown alongside.", accent: "#7c3aed", aspect: "aspect-[4/3]" } },
      { kicker: "Telemetry", title: "Reading the vehicle, not the ticket", body: "Diagnostic codes and sensor streams interpreted against the same knowledge base, so the answer accounts for the hardware.", plate: { id: "ai-telemetry", kind: "photo", label: "Telemetry view", brief: "Screenshot — live vehicle telemetry with an AI interpretation panel.", accent: "#7c3aed", aspect: "aspect-[4/3]" } },
      { kicker: "In use", title: "Question to scheduled job", body: "", plate: { id: "ai-demo", kind: "video", label: "Live walkthrough", brief: "60–90s silent screen recording — a diagnostic question becoming a work order.", accent: "#7c3aed", aspect: "aspect-[4/3]" } },
    ],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

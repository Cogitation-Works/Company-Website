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
  frames?: string;
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
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

/**
 * Ventures — what the company is building next. See PROJECT.md §1.5.
 *
 * ⚠️ STANDING RULE: today, Cogitation Works sells IT services and software
 * only. Everything in this file is upcoming or in development, and EVERY
 * surface that renders it must show the `status` label. Nothing here may be
 * presented as a service a visitor can buy today.
 *
 * The Sunday delivery venture is deliberately framed as proof of the software
 * rather than as a second business — a company running its own physical
 * operation on its own ERP can say something no case study can buy. The framing
 * is "we run our own operation on our own stack", never "we also sell meat".
 *
 * Fields marked ⟨TBC⟩ are unconfirmed and must be filled before launch.
 */

export type VentureStatus = "In development" | "Upcoming" | "Running now";

export type Venture = {
  slug: string;
  name: string;
  status: VentureStatus;
  /** Commercial ventures and community initiatives are not the same thing. */
  kind: "venture" | "community";
  kicker: string;
  summary: string;
  body: string[];
  /** Why this belongs on an enterprise software company's site. */
  rationale: string;
  facts: { label: string; value: string; tbc?: boolean }[];
  relatedHref?: { label: string; href: string };
  accent: string;
};

export const VENTURES: Venture[] = [
  {
    slug: "agri-iot",
    name: "Agri-IoT & drone logistics",
    status: "In development",
    kind: "venture",
    kicker: "Agriculture · IoT · Unmanned transport",
    summary:
      "Sensor telemetry for working farms, and drones for transport and delivery across ground that vehicles handle badly.",
    body: [
      "The IoT work the company already does for buildings and industrial hardware transfers directly to a field: measure the conditions, get the readings somewhere useful, and let the system act on them instead of reporting them.",
      "The second half is movement. Drone transport and delivery for agricultural payloads, over terrain and distances where a vehicle and a driver are the expensive part of the problem.",
      "Both halves run on the same platform the company already builds for manufacturers — telemetry in, scheduling and dispatch out.",
    ],
    rationale:
      "This is a direct continuation of an existing service line, not a new company. The same telemetry and scheduling layer, pointed at a different operation.",
    facts: [
      { label: "Status", value: "In development" },
      { label: "Builds on", value: "IoT telemetry · Cogitation ERP" },
      { label: "First deployment", value: "⟨TBC⟩", tbc: true },
    ],
    relatedHref: { label: "Agriculture", href: "/industries/agriculture" },
    accent: "#16a34a",
  },
  {
    slug: "sunday-delivery",
    name: "Sunday delivery, Vellore region",
    status: "Upcoming",
    kind: "venture",
    kicker: "Direct-to-consumer · Last mile · Cold chain",
    summary:
      "Orders taken Monday to Saturday. Delivered Sunday, without delay, to serviceable areas near Vellore.",
    body: [
      "A local direct-to-consumer meat operation with a deliberately narrow promise: you order during the week, and it arrives on Sunday. One delivery day, stated plainly, inside a defined area.",
      "Narrow is the point. A single delivery window with a fixed cut-off is a harder operational commitment than a vague one, and it is the only kind worth making — a delivery promise with loose geography and loose timing is a complaint generator, not a service.",
      "The whole thing runs on Cogitation ERP and HRMS: order intake, cold-chain windows, route planning, driver allocation and the Sunday dispatch itself.",
    ],
    rationale:
      "This is the proof, not a side business. Ordering, routing, cold-chain windows and last-mile scheduling are exactly what the ERP and workforce platforms do. Running a real operation on our own software is a claim a case study cannot buy.",
    facts: [
      { label: "Order window", value: "Monday – Saturday" },
      { label: "Delivery day", value: "Sunday" },
      { label: "Service area", value: "⟨TBC⟩ — specific areas near Vellore", tbc: true },
      { label: "Order cut-off", value: "⟨TBC⟩", tbc: true },
      { label: "Runs on", value: "Cogitation ERP · HRMS Pro" },
    ],
    relatedHref: { label: "Cogitation ERP", href: "/products/erp" },
    accent: "#dc2626",
  },
  {
    slug: "readers-club",
    name: "Readers Club",
    status: "Running now",
    kind: "community",
    kicker: "Community · Chennai & Vellore",
    summary:
      "A book-reading community, meeting in Chennai and Vellore. Not a product, and not for sale.",
    body: [
      "A reading community run by the company, with sessions in Chennai and Vellore. It exists because the people here wanted it to, and it is listed on this site for the same reason.",
      "It is not a service, it has no commercial relationship to the software business, and nothing about it is being sold.",
    ],
    rationale:
      "Culture, not commerce. It appears here and on the About page and nowhere near a services list or a price.",
    facts: [
      { label: "Cities", value: "Chennai · Vellore" },
      { label: "Frequency", value: "⟨TBC⟩", tbc: true },
      { label: "Members", value: "⟨TBC⟩", tbc: true },
      { label: "How to join", value: "⟨TBC⟩", tbc: true },
    ],
    accent: "#a16207",
  },
];

export const getVenture = (slug: string) => VENTURES.find((v) => v.slug === slug);

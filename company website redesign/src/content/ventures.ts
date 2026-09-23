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

export type VentureStatus = "In progress" | "Upcoming" | "Running now";

/** A step in the sticky concept walkthrough on each venture page. */
export type ConceptStep = {
  kicker: string;
  title: string;
  body: string;
  plate?: {
    id: string;
    kind: "photo" | "video";
    label: string;
    brief: string;
    src?: string;
    video?: string;
    accent?: string;
    aspect?: string;
  };
};

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
  /**
   * The scroll-scrubbed story on the detail page. Runs on placeholder plates
   * today; when the footage lands it is sliced to ~60 webp frames into
   * /public/ventures/<slug>/ and `frames` points at it. No layout change.
   */
  story: { kicker: string; title: string; body?: string }[];
  /** e.g. "/ventures/agri-iot/f" once the frames exist. */
  frames?: { path: string; count: number };
  /** Sticky-visual walkthrough below the scroll story. */
  concept: ConceptStep[];
};

export const VENTURES: Venture[] = [
  {
    slug: "agri-iot",
    name: "Agri-IoT & drone logistics",
    status: "Upcoming",
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
      { label: "Status", value: "Upcoming" },
      { label: "Builds on", value: "IoT telemetry · Cogitation ERP" },
      { label: "First deployment", value: "⟨TBC⟩", tbc: true },
    ],
    relatedHref: { label: "Agriculture", href: "/industries/agriculture" },
    accent: "#16a34a",
    story: [
      {
        kicker: "The ground",
        title: "Start with what a field actually knows",
        body: "Moisture, temperature, canopy condition. Today most of it is known only when somebody drives out to look, which means decisions are made on memory.",
      },
      {
        kicker: "The sensors",
        title: "Put the measurement where the crop is",
        body: "Low-power sensors reporting continuously — the same telemetry layer we already run for industrial hardware, pointed at soil instead of a machine.",
      },
      {
        kicker: "The lift",
        title: "Movement is the other half",
        body: "Drone transport for agricultural payloads, over terrain and distances where a vehicle and a driver are the expensive part of the problem.",
      },
      {
        kicker: "The system",
        title: "Readings become dispatch, not a dashboard",
        body: "Telemetry lands in the ERP, where it can reschedule irrigation or send a flight — rather than in a screen somebody has to remember to check.",
      },
    ],
    concept: [
      {
        kicker: "Hardware",
        title: "A sensor that survives a field",
        body: "Solar, low-power radio, sealed against dust and monsoon. The constraint is not the electronics — it is that nobody is going out to service it.",
        plate: {
          id: "agri-sensor",
          kind: "photo",
          label: "Field sensor",
          brief: "Product render — a weather-sealed sensor mast standing in a crop row.",
          accent: "#16a34a",
          aspect: "aspect-[4/3]",
        },
      },
      {
        kicker: "The read",
        title: "Soil moisture, canopy, temperature",
        body: "Reported continuously instead of on the days somebody drives out. The value is not the reading — it is knowing the reading you did not go and take.",
        plate: {
          id: "agri-dash",
          kind: "photo",
          label: "Field telemetry",
          brief: "Screenshot of the telemetry view — field map with live sensor values.",
          accent: "#16a34a",
          aspect: "aspect-[4/3]",
        },
      },
      {
        kicker: "The lift",
        title: "Payloads move without a driver",
        body: "Drone transport across ground that costs a vehicle real time. Inputs out to a far block, samples back, without the round trip.",
        plate: {
          id: "agri-drone",
          kind: "photo",
          label: "Transport drone",
          brief: "Product render — cargo drone with an underslung payload over a field.",
          accent: "#16a34a",
          aspect: "aspect-[4/3]",
        },
      },
      {
        kicker: "The loop",
        title: "A reading becomes a job",
        body: "The threshold is crossed, the ERP schedules the work and allocates who does it. Telemetry that only produces a dashboard has not finished the job.",
        plate: {
          id: "agri-loop",
          kind: "video",
          label: "Sensor to dispatch",
          brief: "15s screen recording — a threshold trips and a job appears in the schedule.",
          accent: "#16a34a",
          aspect: "aspect-[4/3]",
        },
      },
    ],
  },
  {
    slug: "sunday-delivery",
    name: "Sunday delivery, Vellore region",
    status: "In progress",
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
    story: [
      {
        kicker: "Monday to Saturday",
        title: "The order window opens",
        body: "Six days to order, against a fixed cut-off. One window, stated plainly, so nobody is guessing whether they made it.",
      },
      {
        kicker: "The route",
        title: "One delivery day, planned as one problem",
        body: "Every order for the week resolves into a single Sunday route. Planning one day properly is a harder commitment than planning seven loosely — and a far better one to keep.",
      },
      {
        kicker: "The chain",
        title: "Cold is a deadline, not a setting",
        body: "Temperature windows are tracked as constraints on the route itself, so the schedule cannot quietly produce a drop that arrives warm.",
      },
      {
        kicker: "Sunday",
        title: "It arrives, in the area we said",
        body: "A defined service area near Vellore. A delivery promise with vague geography is a complaint generator, so the boundary is published rather than implied.",
      },
      {
        kicker: "The point",
        title: "We run it on our own software",
        body: "Ordering, routing, cold-chain windows and driver allocation are exactly what Cogitation ERP and HRMS Pro do. This is the proof, not a side business.",
      },
    ],
    concept: [
      {
        kicker: "Order",
        title: "Six days to decide, one day to deliver",
        body: "The customer orders any time Monday to Saturday against a published cut-off. One window, stated plainly — no guessing whether you made it.",
        plate: {
          id: "meat-order",
          kind: "photo",
          label: "Ordering",
          brief: "Phone mockup — the order screen, cut-off timer visible.",
          accent: "#dc2626",
          aspect: "aspect-[4/3]",
        },
      },
      {
        kicker: "Cut",
        title: "Prepared to the order, not to a forecast",
        body: "Because the delivery day is fixed, the week's demand is known before anything is cut. Less waste, and no guessing what Sunday will want.",
        plate: {
          id: "meat-prep",
          kind: "photo",
          label: "Preparation",
          brief: "Clean prep counter, stainless, portions being weighed and labelled.",
          accent: "#dc2626",
          aspect: "aspect-[4/3]",
        },
      },
      {
        kicker: "Cold",
        title: "Temperature is a constraint on the route",
        body: "Cold-chain windows are built into the routing, not checked afterwards. A schedule that would produce a warm drop is rejected before it is a schedule.",
        plate: {
          id: "meat-cold",
          kind: "photo",
          label: "Cold chain",
          brief: "Insulated crate with a temperature logger, packed and sealed.",
          accent: "#dc2626",
          aspect: "aspect-[4/3]",
        },
      },
      {
        kicker: "Route",
        title: "Every Sunday order, solved as one problem",
        body: "The whole week resolves into a single route. Planning one day properly is a harder promise to make and a far better one to keep.",
        plate: {
          id: "meat-route",
          kind: "video",
          label: "Route planning",
          brief: "15s screen recording — Sunday's orders resolving into one optimised route.",
          accent: "#dc2626",
          aspect: "aspect-[4/3]",
        },
      },
      {
        kicker: "Deliver",
        title: "It arrives, inside the area we published",
        body: "A defined boundary near Vellore, stated up front. A delivery promise with vague geography is a complaint generator.",
        plate: {
          id: "meat-deliver",
          kind: "photo",
          label: "Sunday delivery",
          brief: "Van and cold box at a doorstep, early morning, rural road.",
          accent: "#dc2626",
          aspect: "aspect-[4/3]",
        },
      },
    ],
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
    story: [
      {
        kicker: "The idea",
        title: "People here wanted somewhere to read together",
        body: "It started internally and did not stay internal. That is the whole origin story, and it does not need a better one.",
      },
      {
        kicker: "Two cities",
        title: "Chennai and Vellore",
        body: "Sessions run in both. Same club, two rooms.",
      },
      {
        kicker: "The rule",
        title: "Nothing is being sold here",
        body: "No product, no pipeline, no commercial relationship to the software business. It is on this site because it is part of the company, not because it converts.",
      },
    ],
    concept: [
      {
        kicker: "The room",
        title: "A table, chairs, and whoever turns up",
        body: "No membership, no fee, no curriculum. The organisational overhead is deliberately close to zero, which is why it has kept running.",
        plate: {
          id: "rc-room",
          kind: "photo",
          label: "The room",
          brief: "Wide shot of a session in progress — people seated, books open.",
          accent: "#a16207",
          aspect: "aspect-[4/3]",
        },
      },
      {
        kicker: "Two cities",
        title: "Chennai and Vellore",
        body: "Sessions run in both. Same club, two rooms, and people who have moved between them.",
        plate: {
          id: "rc-cities",
          kind: "photo",
          label: "Both groups",
          brief: "A pair of group photos, one per city, shot the same way.",
          accent: "#a16207",
          aspect: "aspect-[4/3]",
        },
      },
      {
        kicker: "The books",
        title: "Whatever the group picks",
        body: "Chosen by the people reading, not by anyone here. The list is the honest record of what the club actually is.",
        plate: {
          id: "rc-shelf",
          kind: "photo",
          label: "The reading list",
          brief: "Flat-lay of the books covered so far, arranged in order.",
          accent: "#a16207",
          aspect: "aspect-[4/3]",
        },
      },
    ],
  },
];

export const getVenture = (slug: string) => VENTURES.find((v) => v.slug === slug);

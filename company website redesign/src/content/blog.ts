/**
 * Blog — the SEO engine (PROJECT.md §4).
 *
 * ⚠️ Every post below is `draft: true` and is NOT rendered on the public index.
 * They are structural drafts written to prove the template and to give the
 * editor something to work from. They contain no claims about clients, no
 * metrics and no invented facts — but they still carry the company's name, so
 * a human must approve each one before `draft` is flipped.
 *
 * To publish: set `draft: false`. Nothing else is required.
 */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date. */
  date: string;
  readingMinutes: number;
  topic: string;
  draft: boolean;
  /** Plain paragraphs and `## ` headings. Kept deliberately simple. */
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "why-erp-rollouts-stall-at-the-shop-floor",
    title: "Why ERP rollouts stall at the shop floor",
    excerpt:
      "The finance module goes live on time. The floor keeps its whiteboard. This is almost never a software problem.",
    date: "2026-09-23",
    readingMinutes: 6,
    topic: "ERP",
    draft: true,
    body: [
      "An ERP programme usually reaches the shop floor last and in the worst condition. Finance and procurement go live roughly on schedule, because the people using those modules sit at desks, work in one place, and were in the room when the process was designed. The floor was not.",
      "## The whiteboard is not resistance",
      "When a station keeps using a whiteboard after go-live, the instinct is to call it change resistance and schedule more training. It is usually simpler than that: the whiteboard is faster. It takes two seconds and a marker, and it is visible to everyone walking past. If the replacement takes forty seconds on a shared terminal at the end of the aisle, the whiteboard wins, and it deserves to.",
      "## Report at the station, not at the terminal",
      "The fix is almost always physical before it is digital. Stage completion has to be reportable from where the stage happens, in roughly the time it takes to make a mark on a board. That usually means a device at the station and an interface with one job, not the full ERP client on a machine somebody has to walk to.",
      "## Derive demand, do not forecast it",
      "The second failure is procurement. If the bill of materials drives purchasing directly, demand is derived from what is actually being built. If it does not, somebody forecasts, and the forecast becomes the number everyone argues about instead of the number everyone uses.",
      "## What to check before you buy",
      "Ask the vendor to demonstrate stage reporting on the hardware you will actually have, standing where your operator stands. Ask how long it takes. If the demo happens on a laptop in a meeting room, you have not seen the thing that decides whether the rollout works.",
    ],
  },
  {
    slug: "what-iot-telemetry-is-for",
    title: "Telemetry is not a dashboard",
    excerpt:
      "Most IoT projects end at a screen somebody checks. The value starts one step after that.",
    date: "2026-09-23",
    readingMinutes: 5,
    topic: "IoT",
    draft: true,
    body: [
      "A great many IoT deployments finish at a dashboard. Sensors installed, data flowing, a screen with gauges on it. It demonstrates well and it changes very little, because a dashboard only works when somebody is looking at it, and nobody looks at it for long.",
      "## The question to ask first",
      "Before specifying a single sensor, ask what decision the reading is supposed to change, and who makes it. If the answer is 'we will know more', the project will produce a screen. If the answer is 'the order gets rescheduled' or 'the technician gets dispatched', it will produce a system.",
      "## Thresholds are a design decision, not a setting",
      "A reading becomes useful when it crosses into an action, and where that line sits is a real decision with a cost on both sides. Too tight and the alert becomes noise people mute. Too loose and the alert arrives after the thing it was meant to prevent. This is worth as much design attention as the hardware selection, and it usually gets none.",
      "## Connect it to the system that can act",
      "Telemetry that lands in its own platform is telemetry somebody has to go and look at. Telemetry that lands in the ERP can reschedule production; in the workforce system it can dispatch a technician. The integration is the project. The sensors are the easy part.",
      "## A useful test",
      "If every screen were turned off for a week, would anything different happen? If not, you have instrumentation, not automation.",
    ],
  },
  {
    slug: "buying-custom-software-questions",
    title: "Nine questions to ask before commissioning custom software",
    excerpt:
      "Most of the risk in a custom build is decided before any code is written. These are the questions that surface it.",
    date: "2026-09-23",
    readingMinutes: 7,
    topic: "Procurement",
    draft: true,
    body: [
      "Custom software goes wrong in predictable ways, and most of them are visible during procurement if the right questions get asked. None of these are technical questions. They are all about what happens when something goes wrong.",
      "## 1. Who owns the code?",
      "Get this in writing, including the repository, the infrastructure definitions and the deployment pipeline. Owning the application but not the means to deploy it is not ownership.",
      "## 2. What happens if we stop working together?",
      "A good answer includes a handover process and a running system that another team can pick up. A bad answer is a silence.",
      "## 3. Where does the data live, and who can reach it?",
      "Residency, backups, and the list of people with production access. Ask for the list.",
      "## 4. How is this deployed today?",
      "If deployment requires a specific person on a specific machine, that person is a single point of failure and you are paying for it.",
      "## 5. What is the integration surface?",
      "Every system you already run that this must talk to. This list is where estimates go wrong, and it is usually incomplete on first pass.",
      "## 6. Who uses this, and where are they standing?",
      "A system used by field staff on phones has almost nothing in common with the same system used at a desk, no matter how similar the requirements document makes them look.",
      "## 7. What does it do when the network is gone?",
      "For anything used away from a desk, this is a functional requirement, not an edge case.",
      "## 8. How will we know it is working?",
      "Agree what gets measured before go-live, while it is still an honest question.",
      "## 9. What is deliberately not in scope?",
      "A proposal that excludes nothing has not been thought about. Ask for the list of things that were considered and cut.",
    ],
  },
  {
    slug: "web-performance-for-enterprise-buyers",
    title: "Your enterprise buyer is on a mid-range phone",
    excerpt:
      "Sites for enterprise audiences get tested on the machines that built them. That is not where they are read.",
    date: "2026-09-23",
    readingMinutes: 5,
    topic: "Performance",
    draft: true,
    body: [
      "There is a persistent assumption that a B2B audience browses on a fast desktop on a corporate network. Some of the time that is true. A great deal of the time the first look at a vendor happens on a phone, on mobile data, between two other things.",
      "## Test on the device, not on the simulation",
      "Throttling in a desktop browser models the network. It does not model the processor, which is usually what is actually slow. A real mid-range Android handset on the desk, used weekly, finds problems no lab profile surfaces.",
      "## Layers are not free",
      "The most common cause of scroll stutter on heavy sites is not the animation itself but the number of elements promoted to their own compositing layer. Each one costs memory, and on a mid-range device memory pressure is the stutter. Promoting an element that animates once and then never again buys nothing and costs for the rest of the session.",
      "## Decode once",
      "Anything scrubbed against scroll should be decoded ahead of time and then only drawn. Seeking compressed video on every scroll event forces a fresh decode each time, which is the source of the specific juddering feel that makes an expensive site feel broken.",
      "## Measure the frames, not the score",
      "A performance score is a summary. Frame timing during a deliberately slow scroll is the actual experience. If frames are landing over 32ms, the visitor can see it, whatever the score says.",
    ],
  },
];

/** Public index shows published posts only. */
export const PUBLISHED = POSTS.filter((p) => !p.draft);
export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

/* ------------------------------------------------------------------------ */
/* THE EDITORIAL PLAN                                                        */
/* ------------------------------------------------------------------------ */

/**
 * What to write, and why.
 *
 * The blog exists for two readers and they want different things:
 *
 *   1. **The buyer mid-evaluation** — an operations director or CTO deciding
 *      whether we understand their problem. They arrive from a service or
 *      industry page and want evidence of judgement, not a feature list.
 *   2. **The search engine** — this is the only part of the site that can
 *      grow indefinitely, and it is how a company with six case studies
 *      competes with one that has sixty.
 *
 * The rule that keeps it useful: **write only what we have actually learned
 * doing the work.** Every piece below comes from something this company has
 * built, run or measured. A post assembled from research anyone could do is
 * worth nothing to either reader.
 *
 * Cadence: one substantial piece a month beats four thin ones. Four thin ones
 * is how a blog dies.
 */

export type Pillar = {
  id: string;
  name: string;
  why: string;
  reader: string;
  accent: string;
  ideas: { title: string; angle: string }[];
};

export const PILLARS: Pillar[] = [
  {
    id: "manufacturing",
    name: "Manufacturing & plant",
    why: "The sector we have delivered most in, and where the buyer is searching for a specific operational problem rather than for a vendor.",
    reader: "Plant managers and operations directors",
    accent: "#ea580c",
    ideas: [
      { title: "Why your inventory is only accurate on stocktake day", angle: "And what it costs you the other 29 days of the month." },
      { title: "The real reason shop-floor staff keep using the whiteboard", angle: "It is faster than the terminal. That is a design problem, not a training problem." },
      { title: "Bill of materials: the difference between an ERP and an expensive spreadsheet", angle: "If the BOM does not drive purchasing, you are forecasting by hand." },
      { title: "How to cost a production delay properly", angle: "Most plants measure the delay and not what it displaced." },
      { title: "Choosing between an off-the-shelf ERP and a built one", angle: "Five questions that settle it, none of them about features." },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare & billing",
    why: "High-value, compliance-heavy, and almost nobody writes about the billing side honestly.",
    reader: "Clinic administrators and finance leads",
    accent: "#0d9488",
    ideas: [
      { title: "Invoice matching by hand is a staffing decision nobody made", angle: "What it actually costs across a year of clinical accounts." },
      { title: "Tax compliance at transaction time, not at filing time", angle: "Why the fix belongs upstream of the accountant." },
      { title: "What a B2B client portal has to do before anyone will use it", angle: "Self-service fails when the data behind it is not trusted." },
      { title: "Patient data, vendor access, and the list nobody keeps", angle: "Who can reach production, and how you would know." },
    ],
  },
  {
    id: "retail",
    name: "Retail, delivery & last mile",
    why: "Directly supports the Sunday delivery venture and reaches D2C operators — a buyer group the old site never spoke to.",
    reader: "D2C founders and logistics managers",
    accent: "#dc2626",
    ideas: [
      { title: "A delivery promise with vague geography is a complaint generator", angle: "Publish the boundary. It is the cheapest support saving available." },
      { title: "Why one delivery day is easier to keep than seven", angle: "Narrowing the promise makes the routing problem solvable." },
      { title: "Cold chain is a deadline, not a setting", angle: "Modelling a physical constraint inside a scheduler." },
      { title: "Order cut-offs: the number that decides your whole week", angle: "Set it too late and every other process compresses." },
      { title: "What we learned running our own delivery operation", angle: "The bugs in your own software that only surface when you are the customer." },
    ],
  },
  {
    id: "buying",
    name: "Commissioning software",
    why: "Highest-intent traffic on the site — someone reading this has budget and is choosing a supplier.",
    reader: "Anyone about to commission a build",
    accent: "#2563eb",
    ideas: [
      { title: "Nine questions to ask before commissioning custom software", angle: "Drafted. None of them are technical." },
      { title: "Who owns the code — and the half of that question people forget", angle: "Owning the app but not the pipeline is not ownership." },
      { title: "Build, buy or configure: an honest decision tree", angle: "Including the cases where we tell people not to hire us." },
      { title: "What a good handover actually contains", angle: "Runbooks, infrastructure as code, and a team that can run it without us." },
      { title: "Reading a proposal: what the omissions tell you", angle: "One that excludes nothing has not been thought about." },
      { title: "What custom software costs, and what drives the number", angle: "Integration surface, not feature count." },
    ],
  },
  {
    id: "iot",
    name: "IoT, automation & AI",
    why: "Ties the IoT service line to the agri venture, and separates us from vendors whose projects end at a dashboard.",
    reader: "Facilities engineers, plant engineers, agri operators",
    accent: "#16a34a",
    ideas: [
      { title: "Telemetry is not a dashboard", angle: "Drafted. Ask what decision the reading changes." },
      { title: "Picking a threshold is a design decision with a cost on both sides", angle: "Too tight and it becomes noise; too loose and it arrives late." },
      { title: "What a sensor has to survive in a working field", angle: "Solar, sealing, and the fact that nobody is driving out to service it." },
      { title: "Sensor to work order: closing the loop", angle: "The integration is the project; the hardware is the easy part." },
      { title: "How to stop an AI assistant inventing answers", angle: "Retrieval before generation, with the source shown." },
    ],
  },
  {
    id: "growth",
    name: "Getting found",
    why: "Supports the Growth & Marketing pillar and reaches founders who arrive looking for marketing rather than software.",
    reader: "Founders and marketing leads",
    accent: "#db2777",
    ideas: [
      { title: "Instrument before you spend", angle: "Attribution cannot be added retrospectively." },
      { title: "The landing page is where the campaign money is lost", angle: "Conversion work on the page the ad actually points at." },
      { title: "Local SEO for businesses whose customers search by place", angle: "Google Business Profile, done properly." },
      { title: "Your buyer is on a mid-range phone", angle: "Drafted. Test on the device, not the simulation." },
      { title: "Reporting that survives scrutiny", angle: "Including the channels that did not work." },
    ],
  },
];

/** Flattened for the hero's live index. */
export const BACKLOG = PILLARS.flatMap((p) =>
  p.ideas.map((i) => ({ title: i.title, topic: p.name, accent: p.accent })),
);

/** Formats worth rotating through, so the blog is not 40 identical essays. */
export const FORMATS = [
  { name: "Field note", detail: "800–1,200 words from one real problem. The backbone." },
  { name: "Teardown", detail: "We take something apart and show how it works, with measurements." },
  { name: "Decision guide", detail: "A framework the reader can use without hiring us." },
  { name: "Build log", detail: "How a specific thing on this site or in a product was made." },
  { name: "Numbers post", detail: "Something we measured, with the method stated." },
];

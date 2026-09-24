# PROJECT — Cogitation Works Website Rebuild

**The master working document.** Everything about how this project is being built lives here: decisions, content, structure, assets, prompts, what is still needed, and the running log.

**Read order for anyone (or any agent) joining:**
1. this file
2. `DESIGN-DIRECTION.md` — the visual and motion decision, with reasoning
3. `../not for project/README.md` → `animated-websites-research.md` — the quality bar (18 award sites, measured)
4. `../not for project/component-libraries-and-resources.md` — the free toolbox

---

## 0. Standing rules

1. **The old live site (cogitationworks.com) is a *content* source only.** Its design is explicitly **not** a reference. Do not carry over its layout, colours, hero, card grid, or section order. Take the words and the facts; leave the design behind.
2. **Reference sites are a vocabulary of techniques, never templates.** If a reference uses a 3D asset, we use a different one. If it draws lines on scroll, we draw different lines. Same ambition, original execution.
3. **The bar is "better than the references," not "as good as."** The references are the floor.
4. **Never invent a fact.** No made-up client names, numbers, quotes or logos. Placeholders are marked `⟨TBC⟩` and must be replaced before launch.
5. **Performance is a requirement.** Budgets in `DESIGN-DIRECTION.md` §6 are binding, not aspirational.

---

## 1. Company facts

| | |
|---|---|
| Name | **Cogitation Works** |
| Business | IT services and software engineering |
| Locations | **UAE** · **Vellore, India** — "UAE \| India \| Global" |
| Email | info@cogitationworks.com |
| Phone / WhatsApp | +91 93608 89434 |
| LinkedIn | linkedin.com/in/cogitation-works |
| Instagram | instagram.com/cogitation_works |
| Booking | Google Calendar consultation link |

**Services offered** (expanded, current): custom software · mobile apps (iOS + Android) · desktop applications · static and dynamic websites · web applications · e-commerce · UI/UX · SaaS · cloud · IT consulting · IoT · AI & automation · **SEO optimisation** · **digital marketing** · idea-to-concept product definition.

**Positioning (decided):** Cogitation Works builds the operational nervous system — the systems that run factories, clinics, fleets, telecom networks, buildings and farms. Not "we make digital products."

---

## 1.5 Ventures — what the company is building next

⚠️ **Standing rule for this entire section: today, Cogitation Works sells IT
services and software only.** Everything below is upcoming or in development.
None of it may be presented as a service a visitor can buy today. Every card,
page and mention carries an explicit status label. A CTO evaluating an ERP
vendor must never come away thinking this is a drone company or a meat shop —
but they *should* come away thinking this company builds what it believes in.

**Why give them space at all:** they are the honest answer to "where is this
company going", and one of them is genuinely the best proof on the site — a
software company that runs its own physical operation on its own software has
something no case study can buy.

### Venture 1 — Agri-IoT, drones and drone logistics

Innovative IoT for agriculture, plus **drones for transport and delivery**.
Directly continuous with the existing IoT service line and with the
`/industries/agriculture` page, which is already flagged as the new direction.

- **Status:** in development
- **Links to:** the agriculture industry page, the IoT service, Cogitation ERP
- **Asset:** the agriculture still is already shipping and serves this

### Venture 2 — Sunday meat delivery, Vellore region

A local direct-to-consumer operation: **orders taken Monday to Saturday,
delivered on Sunday, without delay**, to specific serviceable areas near
Vellore.

- **Status:** upcoming, limited service area
- **Must state plainly:** the delivery day, the order window, and that the area
  is limited. A delivery promise with vague geography is a complaint generator.
- **Why it belongs on an enterprise software site:** framed correctly, it is not
  a side business — it is **the proof**. Ordering, routing, cold-chain windows
  and last-mile scheduling are exactly what Cogitation ERP and HRMS do. Running
  a real operation on our own stack is a claim almost no competitor can make.
  Frame it as *"we run our own operation on our own software"*, never as
  *"we also sell meat."*
- ⟨TBC⟩ — the serviceable area list, the order cut-off time, whether there is a
  brand name for it, and whether it is B2C, B2B or both

### Venture 3 — Readers Club

A book-reading community running **events in Chennai and Vellore**.

- **Status:** running now, but as community, not commerce
- **Placement:** this is **culture, not a service.** It belongs on `/about` and
  on its own page. It must never appear in a services list or a pricing context.
- ⟨TBC⟩ — how often events run, roughly how many members, whether there is a
  signup, photographs from past sessions

### Where each one goes

| Venture | Home | Own page | Also appears |
|---|---|---|---|
| Agri-IoT & drones | Ventures strip | `/ventures/agri-iot` | `/industries/agriculture`, `/services/iot` |
| Sunday meat delivery | Ventures strip | `/ventures/sunday-delivery` | `/about` (proof), `/products/erp` (as a live case) |
| Readers Club | — | `/ventures/readers-club` | `/about` culture section, footer |

The home page gets **one short strip**, low on the page, after the work and
products but before the CTA — titled *"What we're building next"*, three cards,
each with a status chip. It is deliberately not in the hero and not in the main
nav's first rank; the nav reaches it under **About → Ventures**.

---

## 2. Content inventory — extracted from the Products & Portfolio page

*This is the real content. Source: client-supplied page image. Transcribed, not invented.*

### 2.1 Headline content

- Eyebrow: `PROVEN EXCELLENCE · CASE STUDIES · READY PLATFORMS`
- H1: **Engineered for Impact: Our Products & Client Portfolio**
- Sub: *"Discover our bespoke digital platforms engineered for industry leaders worldwide, alongside proprietary enterprise software engines across Fintech, Healthcare, Logistics, Industrial IoT, InsurTech and E-commerce."*

### 2.2 Stats row — ⚠️ ALL PLACEHOLDER, REAL NUMBERS PENDING

| Shown | Status |
|---|---|
| 10+ Projects Delivered | ⟨TBC⟩ — live site says **50+**, this page says **10+**. Contradiction must be resolved |
| 98% Client Satisfaction | ⟨TBC⟩ — needs a real basis or removal |
| 7+ Industries Served | ⟨TBC⟩ |
| 99.9% Platform Uptime | ⟨TBC⟩ — needs a real measurement or removal |

### 2.3 Client projects (6 named)

**1. Fitings Zone — FinTech / service operations**
Integrated Business & Sales CRM Software. *"Unified CRM & Service Hub."*
Description: customised software solving the challenge of integrating service management and sales operations into a unified platform; streamlined sales process, service workflows and customer management, enabling better coordination across the business.
- **Challenge:** disjointed sales communication and siloed service workflows slowing customer turnaround.
- **Solution:** centralised CRM unifying pipeline management, service tickets, sales funnel and real-time client tracking.
- **Tags:** Unified (service operations) · End-to-End (sales pipeline) · Real-Time (coordination)

**2. Elite Medical — Healthcare**
B2B Sales & Billing Software. *"Centralized Portal · Automated Billing."*
Description: B2B sales and billing management system simplifying business operations — sales processes, billing, customer transactions and day-to-day B2B activity through a centralised platform.
- **Challenge:** manual invoice matching and fragmented customer transaction records across clinical accounts.
- **Solution:** centralised B2B portal automating the sales pipeline with integrated ledger, tax compliance and client sales dashboard.
- **Tags:** Automated (invoice & billing) · Streamlined (B2B transactions) · Centralized (customer portal)

**3. Uthmal Machinery — Manufacturing**
End-to-End ERP Solution. *"Shop-floor Visibility · Full Shop ERP."*
Description: comprehensive ERP for a manufacturing unit covering overall business and manufacturing operations; brings multiple processes into a centralised platform, improving operational visibility and workflow management.
- **Challenge:** siloed procurement, delayed fabrication stages, no real-time machine/inventory visibility.
- **Solution:** integrated manufacturing execution ERP connecting bill-of-materials, shop-floor stations and supply logs.
- **Tags:** Optimized (BOM flow) · Multi-Stage (production) · Complete (operational visibility)

**4. Dynamic Solar — Energy / production**
Production & Business Management Software. *"Production Control."*
Description: custom software supporting production and operational processes; organises workflows and provides a structured system for managing business activities.
- **Challenge:** manual production tracking for battery systems and uncoordinated technician scheduling across sites.
- **Solution:** tailored business suite for production milestone dispatching, parts telemetry and field job allocation.
- **Tags:** Structured (workflows) · Automated (production scheduling) · Seamless (business management)

**5. Mega Connect — Telecom (Etisalat channel partner, UAE)**
Corporate Website. *"UAE Presence · Fast Web Engine."*
Description: professional UAE-based corporate website for a channel partner associated with Etisalat, establishing digital presence and communicating networking and telecom solutions.
- **Challenge:** establishing high-trust corporate positioning in competitive UAE enterprise connectivity markets.
- **Solution:** performant custom web architecture with fast load and clear service presentation.
- **Tags:** High-Trust (UAE presence) · < 0.4s (load speed) · Showcased (telecom services)

**6. RG Robotics — Elevators & IoT**
Corporate Website & Digital Presence. *"Elevator & IoT Show."*
Description: modern corporate website showcasing elevator solutions, IoT technologies and related engineering services; presents technical capability clearly and professionally.
- **Challenge:** communicating sophisticated IoT sensor telemetry and vertical-transport hardware to industrial verticals.
- **Solution:** sleek digital demonstration with interactive solution breakdowns and rapid technical consultation enquiry flows.
- **Tags:** Interactive (engineering showcase) · Connected (IoT telemetry portal) · Modern (technical UI)

### 2.4 Own products (4)

Section framing: **Ready-to-Deploy Software Engines** — *"Pre-architected, battle-tested backend frameworks and web apps."* Architecture note: *High Concurrency · Cloud Native*.

**Cogitation CRM** — Integrated Business & Sales CRM
Unified customer relationship and sales pipeline platform with integrated multi-channel communications, deal tracking, lead scoring and automated customer service workflows.
Metric shown: **+38% Pipeline Velocity** ⟨TBC⟩
Features: 360° customer timeline · automated trigger cadence · deal & pipeline stage tracking · automated service workflows.

**HRMS Pro** — Workforce, Attendance & Payroll Suite
Full lifecycle enterprise workforce platform: biometric and geofenced clock-in, multi-country tax compliance, dynamic shift scheduling, automated payroll processing.
Metric shown: **100 to 50,000+ staff** ⟨TBC⟩
Features: biometric & geofence clock-in · 1-click direct bank disbursement · dynamic shift rostering engine · encrypted employee documents.

**Cogitation ERP** — Manufacturing & Operational Business ERP
End-to-end resource planning centralising supply chain, procurement, inventory, production floor operations and financial auditing into one platform.
Metric shown: **99.3% Resource Precision** ⟨TBC⟩
Features: end-to-end operational visibility · warehouse & inventory control · multi-stage production scheduling · real-time procurement audit trail.

**Cogi AI** — Automotive & Cognitive Enterprise Agent
Autonomous AI agent for automotive diagnostics, telemetry interpretation and intelligent workflow automation; handles unstructured data and conversational assistance.
Metric shown: **< 120ms inference** ⟨TBC⟩
Features: automotive telemetry AI · context-aware LLM orchestration · RAG knowledge & manual querying · autonomous workflow execution.

Each product card carries two CTAs: **Product Specs** and **Request Live Demo**.

### 2.5 Tech stack matrix

Framing: *"We don't chase hype cycles. We engineer reliable, benchmarked architectures with modern, battle-hardened tooling chosen specifically for scale and maintainability."*

Four pillars:
- **Frontend & Edge** — *"Pixel-perfect, accessible and reactive user experiences."*
- **Backend & Cloud** — *"High-throughput microservices and streaming pipelines."*
- **Mobile Systems** — *"Fluid native platform apps deployed to iOS and Android."*
- **AI & Infrastructure** — *"Autonomous cognitive agents and CI/CD pipelines."*

⟨TBC⟩ — confirm the exact technology chips under each pillar before build.

### 2.6 Testimonials — ⚠️ BLOCKED, see §7

Currently three quotes attributed to Thiyagu (Fitings Zone), Renugadevi (Elite Medical), Sathya (Mega Connect). **The same three sentences appear on the live site attributed to three entirely different people** (Arun Kumar / FinStream Global, Sara / TechFlow Inc., Sathya / RetailSync), paired with stock photography. These cannot ship as-is.

### 2.7 Closing CTA

*"Have a Product in Mind or Need an Enterprise Platform?"* — *"Let our senior software architects evaluate your functional requirements, analyse dependencies, and deliver a production-ready tech roadmap within 48 hours."*
Buttons: **Schedule a Solution Architecture Call** · **Download Product Catalog (PDF)**
Trust line: *Non-Disclosure Guaranteed · Free 45-Min Consultation*

---

## 3. New content modules to build

Requested for this rebuild, beyond what exists:

| Module | What it holds | Status |
|---|---|---|
| **Client review videos** | short video testimonials from real clients | 🔴 needs filming |
| **Written testimonials** | real quotes, real names, real titles | 🔴 needs collecting |
| **Reviews / ratings** | Clutch, Google, LinkedIn recommendations if any | ⟨TBC⟩ |
| **Office imagery** | UAE and Vellore — space, team, working | 🟡 partial assets exist |
| **Achievements** | awards, certifications, partnerships, milestones | ⟨TBC⟩ |
| **Expos & events** | which expos attended, when, where, photos, what was shown | ⟨TBC⟩ |
| **Project detail pages** | per project: screens, how it works, what we built, outcome | 🟡 text exists, visuals needed |
| **Real metrics** | replacing every ⟨TBC⟩ number | 🔴 blocking |

---

## 4. Sitemap

```
/                              Home
/services                      index
  /services/<slug>             web · mobile · desktop · ecommerce · ui-ux · cloud
                               · iot · ai-automation · seo · digital-marketing · consulting
/products                      index
  /products/crm
  /products/hrms
  /products/erp
  /products/cogi-ai            each: overview, features, specs, FAQ, demo request
/work                          case study index, filterable by industry
  /work/fitings-zone
  /work/elite-medical
  /work/uthmal-machinery
  /work/dynamic-solar
  /work/mega-connect
  /work/rg-robotics            each: challenge → solution → how it works → outcome
/industries                    index
  /industries/manufacturing
  /industries/healthcare
  /industries/fintech
  /industries/telecom
  /industries/logistics
  /industries/elevators-iot
  /industries/agriculture      ← new direction
/ventures                      index — what we are building next (§1.5)
  /ventures/agri-iot           agriculture IoT, drones, drone logistics
  /ventures/sunday-delivery    Vellore-region meat delivery — order Mon–Sat, deliver Sunday
  /ventures/readers-club       book community, Chennai + Vellore events
/about                         story, team, UAE + Vellore, achievements, expos, culture
/testimonials                  video wall + written reviews
/blog                          articles (the SEO engine)
  /blog/<slug>
/contact                       form, offices, direct booking
```

**`/insights` renamed `/blog`** — the client asked for "blogs" by name, and it is
also the term buyers and search engines expect. No reason to be clever here.

**Why per-industry pages:** this is the single highest-leverage SEO decision. One page per buyer intent. (Reference: Corgi runs 102 URLs that are almost entirely vertical landing pages; Lazarev runs 554.)

**Every route gets:** unique `<title>`, meta description, canonical, Open Graph image, and JSON-LD (`Organization` sitewide; `Article` on insights; `FAQPage` on product pages; `BreadcrumbList` on nested routes). Plus `sitemap.xml` and `robots.txt`. The current site has none of this.

---

## 5. Home page — section order

1. **Hero** — the Core (3D) occluding the headline. Positioning line, two CTAs, live amber status line.
2. **Stats strip** — 4 real numbers, count up on reveal, amber while counting.
3. **Positioning statement** — word-by-word scrubbed colour fill on scroll.
4. **The Operations Field** — pinned 3D section, markers morph: factory → clinic → fleet → elevator → antenna → crop rows. One line of copy per industry, links to that industry page.
5. **Selected work** — 3 result-first case cards → `/work`.
6. **Products** — 4 engines, each with its metric and a live micro-demo loop.
7. **Client video wall** — real review videos, muted autoplay, click to expand with sound.
8. **Tech stack matrix** — the four pillars, monospace chips.
9. **Achievements & expos** — horizontal timeline / marquee of events and milestones.
10. **Offices** — UAE + Vellore, real photography, live local time in amber.
11. **Written testimonials** — real quotes.
12. **What we're building next** — three venture cards with status chips (§1.5). Low on the page, deliberately after the proof, never in the hero.
13. **CTA block** — architecture call + catalogue download.
14. **Footer** — full nav, newsletter, legal.

---

## 6. Asset register

> ⚠️ **§6.2 and §6.3 below are superseded by [`ASSETS.md`](./ASSETS.md).** Those
> prompts were written in a flat documentary register before the agriculture
> shot established the cinematic one. Use `ASSETS.md` for anything new; the rest
> of this section (6.1, 6.4–6.7) still stands.

**Pipeline available to us:** Gemini Pro (image generation) → Figma AI (upscale / cleanup) → **Google Flow** (image-to-video) → optional frame-by-frame. For each asset below: the still prompt, then the motion prompt for Flow.

**Global image rules:** 2560×1440 minimum, 16:9 unless stated, photographic, **no text, no logos, no brand marks, no recognisable faces** unless it is our own real photography. Tone: cool, clean, well-lit, desaturated, calm. These sit behind type — they must not compete.

**Global video rules:** 1920×1080, 30fps, **silent**, 6–12s, seamless loop, delivered as H.264 `.mp4` **and** VP9 `.webm`, under 2MB each, plus a poster frame.

### 6.1 Hero fallback poster + loop

> **Still (Gemini):**
> `Studio product render of a segmented polished chrome sphere, its shell split into six curved plates that have separated slightly to reveal a clear glass core, fine luminous amber particles suspended and drifting inside the glass, floating against a pale near-white seamless background, soft large-source studio lighting, crisp specular reflections, subtle contact shadow, extremely clean and precise, centred composition, no text, no branding, 16:9`

> **Motion (Google Flow, from that still):**
> `Very slow continuous rotation of the chrome sphere, the shell plates drifting apart and gently back together in a slow breathing cycle, amber particles inside drifting and twinkling slowly, camera perfectly still, no cuts, seamless loop, subtle and premium, 8 seconds`

### 6.2 Industry stills — six, one per industry page and for the Operations Field

> **Manufacturing:** `Wide interior of a modern clean manufacturing facility, CNC machines and robotic arms in soft focus, polished concrete floor, cool daylight from high clerestory windows, pale grey and steel blue palette, no people, no text, no logos, shallow depth of field, architectural photography, calm and precise, 16:9`

> **Healthcare:** `Modern private clinic corridor and equipment bay, soft diffused daylight, white and pale blue surfaces, stainless fittings, clean and uncluttered, no people, no text, no branding, calm clinical atmosphere, architectural interior photography, 16:9`

> **Fintech:** `Abstract close-up of a brushed metal and frosted glass control surface with faint illuminated indicator lines, extremely shallow depth of field, pale neutral palette with one warm amber indicator, no screens, no text, no logos, calm precise product photography, 16:9`

> **Telecom:** `Rooftop telecom antenna array against a pale overcast sky, clean minimal composition, brushed metal and matte grey, soft even light, no branding or text, calm technical photography, 16:9`

> **Logistics:** `Aerial three-quarter view of an organised logistics yard at early morning, trailers parked in neat rows, wet concrete, cool blue-grey light, faint mist, no visible branding or text, calm industrial order, drone photography, 16:9`

> **Elevators & IoT:** `Interior of a modern glass elevator shaft in a contemporary office atrium, brushed steel and glass, clean geometric lines, cool neutral daylight, looking upward, no people, no text, no logos, architectural photography, 16:9`

> **Agriculture (make this the best one — it is the new direction):** `Aerial view of precision-farmed fields in neat geometric rows, subtle irrigation lines visible, early morning light, muted green and warm earth tones against a cool pale sky, a single small unbranded white sensor post in the foreground, no people, no text, no logos, drone photography, calm and ordered, 16:9`

> **Motion for any industry still (Flow):**
> `Extremely slow push-in on the scene, almost imperceptible parallax, atmospheric particles and light drifting, no subject movement, no cuts, seamless loop, cinematic and calm, 8 seconds`

### 6.3 Project visuals — six

The most credible asset on the site is a **real screenshot of the real product**. Prefer those. Where a screenshot cannot be shown (NDA), use an abstracted device mockup:

> **Device mockup still:** `Floating matte-dark laptop and phone mockups arranged in a clean isometric composition on a pale near-white background, screens blank and neutral grey, soft studio lighting, subtle contact shadows, no text, no logos, no UI, product photography, 16:9`
> *(We composite the real UI onto the blank screens in code, so it stays sharp and updatable.)*

> **Motion (Flow):** `Very slow orbit around the floating devices, gentle drift, perfectly steady, seamless loop, 8 seconds`

### 6.4 Achievements / expo section

> **Still:** `Clean modern trade-expo hall interior, pale grey carpet, soft even overhead lighting, blurred unbranded exhibition stands in the far background, wide empty foreground, no people in focus, no text, no logos, calm architectural photography, 16:9`

Real expo photography is strongly preferred here — this section exists to prove presence, and generated imagery proves nothing. Use the generated still only as a section backdrop behind real photos.

### 6.5 Abstract texture (subtle, optional)

> `Very subtle fine technical grid on an off-white surface, faint measurement tick marks, soft paper grain, almost imperceptible, no text, flat even lighting, top-down, 16:9`

### 6.6 3D assets — free tools

**The Core** (hero object)
- Build in **Spline** (spline.design, free, browser) or **Blender** (blender.org, free).
- Sphere or rounded-cube shell in **4–6 separable segments**, hollow inside, ≤ 25k triangles.
- **Export GLB with Draco compression, < 400KB.** Geometry only — chrome and glass materials are applied in React Three Fiber so they stay tunable.
- ⚠️ Do **not** export the Spline scene/runtime; it is far heavier than a GLB rendered with R3F.

**Operations Field markers** — six low-poly sets: machine · clinic bed · truck/trailer · elevator car · antenna mast · crop rows with sensor post. ≤ 3k triangles each, single flat material, no textures.
Free CC0 sources: **kenney.nl/assets** · **quaternius.com** · **sketchfab.com** (filter Downloadable + CC0).

**Environment map** — one studio or soft-overcast HDRI, **1k**, `.hdr`, < 500KB, from **polyhaven.com** (CC0) or **ambientcg.com** (CC0).

**Animated logo mark** (optional) — **SVGator** free tier or **Rive**. Export SVG or Lottie, never video.

### 6.7 Real assets only you can supply

| Asset | Spec |
|---|---|
| Client review videos | 1080p, landscape + a vertical crop, good audio, 30–60s each, subtitles needed |
| Office — UAE | 5–8 photos, ≥3000px, real space and team |
| Office — Vellore | 5–8 photos, ≥3000px |
| Expo / event photos | as many as exist, with event name + year for each |
| Achievement proof | certificates, awards, partner badges, ≥1500px |
| Testimonial portraits | ≥1200×1200, natural light, plain background |
| Product screenshots | CRM, HRMS, ERP, Cogi AI — real UI, ≥2560px wide |
| Product demo recordings | 1920×1080, 30fps, silent, 8–12s loops |

---

## 7. Blocking issues — must resolve before launch

1. **Testimonials are currently unusable.** The same three sentences appear on two pages attributed to six different people, with stock photos paired to Indian names. **Action:** collect three real quotes with real names, titles and photos. If a client declines a photo, run the quote without one. Never ship an invented attribution.
2. **Project count contradicts itself** — 50+ on the live site, 10+ on the Products page. **Action:** confirm the true number and use it everywhere. Six named enterprise platforms is genuinely strong; a precise small number is more persuasive than a vague large one.
3. **Every metric is a placeholder** — 98% satisfaction, 99.9% uptime, +38% pipeline velocity, 99.3% resource precision, <120ms inference. **Action:** supply real figures, or replace with claims we can defend.
4. **Tech stack chips unconfirmed** — need the exact list under each of the four pillars.

---

## 8. Additional ideas worth considering

Beyond the brief, things that would put this above the reference sites:

1. **Live local time in both offices** — UAE and Vellore, ticking, in amber. Tiny, cheap, and it makes a two-country company feel real.
2. **An interactive "build your platform" configurator** — pick industry + modules, get an indicative architecture diagram and timeline. This is a lead magnet that also demonstrates the thing you sell. None of the 18 references has anything like it.
3. **A real architecture diagram per case study** — an animated SVG that draws itself on scroll showing how the system actually works (devices → gateway → services → dashboard). This is your credibility made visible, and it is cheap (SVG, no 3D).
4. **Number-led case cards** — lead with outcome, not project name, as Lazarev does.
5. **The agriculture page as a statement piece** — since it is the new direction, give it the most ambitious treatment: the Operations Field in crop configuration, sensor telemetry animating across the field.
6. **A "Systems we run" live counter** — aggregate uptime or transactions processed, if we can source it honestly.
7. **PDF catalogue generated from the site content** so it never goes stale.
8. **Bilingual readiness** — Arabic for the UAE market is a genuine differentiator in UAE enterprise sales. Worth scoping even if deferred.

---

## 9. Build order

| # | Stage | Status |
|---|---|---|
| 1 | Research: 18 animated sites, measured | ✅ done |
| 2 | Research: free component/3D toolbox | ✅ done |
| 3 | Design direction decided | ✅ done — `DESIGN-DIRECTION.md` |
| 4 | Content inventory from client material | ✅ done — §2 above |
| 5 | **Design system** — tokens, type scale, motion primitives, grid | ✅ done |
| 6 | **Home hero alone**, for approval before anything else | 🟡 built, awaiting approval |
| 7 | Home remaining sections | ⬜ |
| 8 | Work index + 6 project pages | ⬜ |
| 9 | Products: index + 4 product pages | ⬜ |
| 10 | Industries: index + 7 industry pages | ⬜ |
| 11 | Services, About, Testimonials, Contact | ⬜ |
| 12 | Insights scaffold | ⬜ |
| 13 | SEO pass — metadata, JSON-LD, sitemap, robots, OG images | ⬜ |
| 14 | Performance pass against budgets | ⬜ |
| 15 | Accessibility + reduced-motion audit | ⬜ |
| 16 | Real asset swap — replace every ⟨TBC⟩ | ⬜ |

---

## 10. Log

| Date | Entry |
|---|---|
| 2026-09-22 | Scaffolded Next.js 16 + TS + Tailwind 4; installed GSAP, Three, R3F, drei, Motion, Lenis; installed `ui-ux-pro-max` skill bundle project-scoped |
| 2026-09-22 | Studied 18 animated reference sites in a real browser — structure, inner pages, tech, and **measured** scroll inertia, pinning and compositing. Written to `../not for project/` |
| 2026-09-22 | Evaluated 23 component/3D/gallery resources; free toolbox selected (React Bits, 21st.dev, Animate UI, Norrly + Iconsax, Spline, Poly Haven) |
| 2026-09-22 | Confirmed live site has no meta description, no canonical, no JSON-LD, 489 words, and **zero crawlable internal links** (nav uses `<button>`, not `<a href>`) |
| 2026-09-22 | Design direction decided: **"Live System"** — light instrument-grade, one recurring 3D Core, morphing Operations Field, telemetry-paced motion |
| 2026-09-22 | Content inventory transcribed from client Products & Portfolio page; 3 blocking content issues raised (§7) |
| 2026-09-22 | **Design system built** — `src/app/globals.css`: colour tokens (canvas/ink/signal/live), display type scale (h1 88px / 560 / −0.035em), motion easings and durations derived from the measured reference curves, reveal primitive, `prefers-reduced-motion` block, `label-mono` / `num` / `grid-field` utilities |
| 2026-09-22 | **Motion infrastructure** — Lenis on the GSAP ticker (one RAF loop, lerp 0.1 ≈ the measured ~1.0s settle), `registerGsap`, `useCanRender3D` gate (≥768px + WebGL + ≥4 cores + reduced-motion off), IntersectionObserver reveal |
| 2026-09-22 | **The Core built procedurally** — 5 chrome plates from sphere slices + transmission-glass inner core + 900 amber particles. **No .glb, no textures, no HDRI download**; lighting is a procedural Lightformer rig inside an enveloping neutral env shell. Opens on scroll via a smoothstep on scrollY |
| 2026-09-22 | **Hero built** — object-over-type occlusion (Core overlaps the end of the headline only), staggered blur reveals, live amber status dot, CTAs above the object. Static CSS fallback for mobile / no-WebGL / reduced-motion |
| 2026-09-22 | **SEO from commit one** — full metadata, canonical, OG/Twitter, `Organization` JSON-LD, skip link. Verified in-browser: 0 console errors, h1 computed 88px/560/−3.08px |
| 2026-09-22 | Two bugs found and fixed by looking at the running page: chrome rendered **black** (metal was reflecting an empty env — added an enveloping neutral studio shell), and the Core **swallowed the headline** (moved right-of-centre, reduced size) |
| 2026-09-22 | **Hero poster delivered by client** (Gemini → Figma: background removed, cropped, colour-corrected, exported 1x/2x with true alpha). Trimmed and optimised to responsive AVIF/WebP/PNG at 900px and 1400px — **AVIF 67KB at 900px** |
| 2026-09-22 | **Core retuned to match the approved poster** — 4 quadrant petals (was 5), vertical capsule core (was spherical), warmer amber. `--color-live` warmed `#f59e0b` → `#f0a500` so the token follows the object rather than fighting it |
| 2026-09-22 | **Mobile layout bug found and fixed** — the Core was absolutely positioned over the copy at all widths, burying the headline and body text on phones. Now stacks above the copy below `lg`, overlays only at `lg+` where there is horizontal room |
| 2026-09-22 | Verified both paths in-browser: desktop renders the canvas with 0 errors; mobile serves AVIF with **no canvas** (gate working) |
| 2026-09-23 | **Core transition video delivered** (Flow Frames, 1080p, closed→open from the matched pair). Sliced to **60 frames**, white background keyed out by edge flood-fill, cropped to a union bbox so the object never jumps, WebP w/ alpha — **38KB each, 2.25MB total, desktop only** |
| 2026-09-23 | **Hero is now a scroll-scrubbed frame sequence.** Explicitly engineered against the stutter the client flagged on terminal-industries.com: no video seeking (frames decode once to ImageBitmap), adjacent-frame cross-fade so 60 frames read as continuous, scroll listener writes a number only, rAF skips the draw when nothing moved, scrubbing held until all frames decode |
| 2026-09-23 | **Removed `will-change` from the reveal primitive** — the measured reference set had Terminal at 157 and Lusion at 106 will-change elements; that layer memory is a main cause of scroll stutter on mid-range devices |
| 2026-09-23 | **Measured frame pacing during a deliberately slow scroll: p50 6.9ms, p95 7.0ms, worst 20.8ms, ZERO frames over 32ms.** No dropped frames |
| 2026-09-23 | Built interaction primitives: custom cursor (dot + lagging ring), magnetic buttons, 3D tilt cards with pointer-tracked specular sheen, scroll-linked count-up, word-by-word scrub text, marquee. All disabled under reduced-motion and on touch |
| 2026-09-23 | Built sections: Header (direction-aware, real `<a href>` nav), Stats + capability marquee, Statement (scrub text), Work (6 real client cards, per-card accent, tilt + accent wash on hover), Products (hover-expand index, 4 platforms), Industries (animated SVG operations diagram with travelling amber pulse, agriculture flagged New), CTA (tonal flip to dark + live UAE/Vellore clocks), Footer |
| 2026-09-23 | **Logo-as-hero idea dropped** — client correct that none of the 18 references animate a pictorial logo (Alche animates its *wordmark*, not an icon). Logo stays in header/footer only |
| 2026-09-23 | **Analysed the shipped JavaScript of all 18 references** for technique signatures. Key findings: only 2 of 18 run a fluid simulation (Active Theory 27, Alche 17 `advect`/`divergence`/`vorticity`); **Lusion has 267 GLSL blocks + 61 noise functions, no physics engine, only 6 pointer handlers** — its motion is procedural noise, not simulation; Yambo has 94 springs + 185 pointer handlers and no fluid. Recorded in the research MD |
| 2026-09-23 | **Built 3 hero options for comparison**, switchable live via a floating A/B/C control and `?hero=a\|b\|c`: **(A) Signal Field** — 7,000 points, cursor-velocity displacement, morphing into production line / field grid / network graph / fleet route; **(B) Liquid Chrome** — raymarched metaball, zero assets, procedural studio env; **(C) Deforming Grid** — wireframe plane denting under the cursor with amber pulses |
| 2026-09-23 | **Built the refraction-lens cursor** — real `backdrop-filter` + SVG `feDisplacementMap` distortion of live page content, displacement scaling with pointer velocity, squash-and-stretch along travel direction. Feature-detected with a glass-disc fallback |
| 2026-09-23 | Bugs fixed on the way: DeformGrid failed program validation (`uPointerVel` highp in vertex / mediump in fragment); SignalField used `300.0 / -mv.z` for point size, making 7,000 points merge into a solid black mass over the whole hero |
| 2026-09-23 | **Watched 15 new client screen recordings** (~14 min) by extracting contact sheets through Chrome's decoder — no ffmpeg available, so `playwright-core` + a loopback HTTP server + `requestVideoFrameCallback`. Sites: Kode Immersive, Fame Estate, Noomo (agency / labs / beat / storytelling / glass playground / work index), Hashgraph Ventures, Alche, Peachweb, **BMW M3 E30**, Lusion (home + projects) |
| 2026-09-23 | **Hero decided: A stays on home, C moves to `/industries`, B retired** (two chrome objects on one site is one too many) |
| 2026-09-23 | **`ASSETS.md` written** — full asset brief replacing §6.2/§6.3. The strongest reference found is the **BMW M3 page**: scroll rotates the object while specs count beside it — that becomes the `/products/*` template, reusing the Core frame-scrub pipeline. Second strongest: **Lusion's project index is all video cards**, not stills, which costs us only screen-recording time |
| 2026-09-23 | **Dubai → UAE everywhere** in copy, metadata, JSON-LD and the hub clock label. The IANA zone id `Asia/Dubai` is left alone — it is a technical identifier, not a label |
| 2026-09-23 | **Ventures recorded and placed** (§1.5): agri-IoT & drone logistics, Sunday delivery in the Vellore region, Readers Club. Standing rule set — the company sells IT services and software today, so every venture surface carries a status chip and the qualifying sentence. Sunday delivery is framed as *proof of the ERP*, never as a second business; Readers Club is culture and never appears near a services list |
| 2026-09-23 | **Content layer extracted to `src/content/`** — `site`, `services`, `products`, `work`, `industries`, `ventures`, `blog`. Single source for the pages, the nav, the footer and the sitemap, so a footer link can no longer point at a route that does not exist |
| 2026-09-23 | **Whole site built out: 33 routes, all statically generated.** `/services` + 4 pillars (Kode chapter pattern, R1) · `/products` + 4 platforms (**BMW pattern, R13** — sticky `SpecScroller` rotates the object while specs count beside it) · `/work` + 6 case studies (Lusion/Noomo index pattern, R15/R7) · `/industries` + 7 sectors · `/ventures` + 3 · `/about` · `/contact` · `/blog` + template · `sitemap.xml` · `robots.txt` |
| 2026-09-23 | **Eleven services collapsed into the four pillars the company already uses for its own tech-stack matrix.** Eleven thin pages would compete for the same searches; four substantial ones do not, and every individual service still appears by name inside its pillar |
| 2026-09-23 | **Magnifier lens moved to the root layout** so it works on every page, not just home. Hero now detects `.lens-zoom` and falls back to its static poster inside the duplicate — without that guard the copy mounted a second WebGL context and a second 60-frame sequence |
| 2026-09-23 | **FluidTuner and the A/B/C hero switcher gated to `NODE_ENV === "development"`.** Both were shipping to production |
| 2026-09-23 | **Footer had 8 dead links** (6 stale service slugs, `/insights`, `/privacy`) — found by crawling every internal href, not by reading. Now derived from the content modules |
| 2026-09-23 | **Agriculture watermark removed properly.** Cropping could not do it — the mark and the white sensor mast occupy overlapping vertical bands, so any crop that cleared the mark beheaded the mast. Sampled, hard-blurred and composited back under a soft radial mask |
| 2026-09-23 | **Manufacturing still processed** — but the source was only 1024×572. Fine for the card, soft in the full-bleed hero. Flagged for regeneration at 2560px |
| 2026-09-23 | **Verified in a real browser:** 33 routes crawled, 0 non-200s, 0 pages missing an `h1`, 32 unique titles, no console or page errors. Frame pacing on the heaviest new page (`/products/erp`, sticky scroller) — **p50 7.0ms, p95 10.2ms, worst 18.8ms, zero frames over 32ms** |
| 2026-09-23 | **Every page now has its own hero.** The shared dark band made eight pages feel like one template with the words swapped. Built six distinct mechanisms, all different: `/services` **StackHero** (four CSS-3D planes, pointer-tilted) · `/industries` **hero variant C** (the deforming wireframe grid, rescued from retirement) · `/ventures` **OrbitHero** (canvas 2D, three nodes orbiting the amber core, one per venture) · `/about` **RouteHero** (an arc drawn between the two hubs with a packet running it and live local clocks) · `/contact` **ConfettiHero** (2D physics pile, from Lusion R15) · `/blog` a three-row typographic marquee of its own subject matter. `/` and `/work` and `/products` unchanged, as instructed |
| 2026-09-23 | **`ScrollStory` built** — scroll-scrubbed video with staged copy, the Peachweb dive (R12) crossed with the BMW sequence (R13). Frames, not `<video>`: decode once to ImageBitmap, scrub as a pure blit. **Placeholder mode runs the full choreography** — stages advance, progress fills, a scan line tracks scroll — so timing and copy are judgeable now and the footage is a drop-in later |
| 2026-09-23 | **`DrawPath` built** — SVG route that draws itself on scroll with a travelling pulse. Uses `stroke-dashoffset`, one of the few properties that animates without promoting a layer. Running on `/services` and `/about` |
| 2026-09-23 | **`MediaPlate` + `src/content/media.ts`** — the shot list now lives in code and *is* what renders. 19 slots across office, expos, achievements, Readers Club, client work and the company film. Holding plates are deliberately designed-as-placeholders: pointer-tracked sheen, stated media type, the brief printed on the face. **No stock photography** — a stand-in that looks finished quietly becomes permanent |
| 2026-09-23 | **Sound shipped, off by default** (Hashgraph R10 and Alche R11 both gate on audio and both default to silence). Drone and UI click are **synthesised via Web Audio** rather than waiting on a file — two detuned sines through a low-pass. AudioContext is created on the enabling click only, never speculatively. Suppressed entirely under `prefers-reduced-motion` |
| 2026-09-23 | Fixed on inspection: the About arc collided with the lead copy and meta row at full bleed (constrained to the right 54%), and the holding plates read as near-black voids (second wash added, accent raised 34%→62%) |
| 2026-09-23 | **Re-verified:** 33 routes, 0 non-200s, 32 unique titles, no console or page errors. `/products/erp` frame pacing **p50 7.0ms, p95 10.3ms, zero frames over 32ms** — unchanged despite six new animated heroes, because each is gated, cheap, or both |
| 2026-09-23 | **Work and product separated properly**, per the client: `/work/*` is delivered *client* projects and now carries **product screens** + a **client review video**; `/products/*` and `/ventures/*` are *our own* things and both now run the full animated-scroll shape — scroll film → counting specs → parallax overview → sticky concept walkthrough → capabilities → FAQ |
| 2026-09-23 | **Venture statuses corrected** to the client's words: Sunday delivery **In progress**, Readers Club **In progress** (meets running), Agri & IoT **Upcoming** |
| 2026-09-23 | **`StickyConcept` built** — visual sticks while the copy scrolls past, visual swapping per step, segmented progress. Terminal and Viture both use this and Terminal stutters at it; ours measures once per frame in one rAF, writes to React only when the active index changes, and promotes only the sticky wrapper |
| 2026-09-23 | **`Parallax` built** — clamped to ±0.3, writes transform straight to the node, and skips entirely when the element is off screen so a dozen instances cost nothing |
| 2026-09-23 | **Concept walkthroughs written for all 7 own-products** (4 engines + 3 ventures) — 28 steps, each with its own media slot and brief |
| 2026-09-23 | **ASSETS.md §4.6 — product prompts delivered**: 3 Flow films (one per venture) and 5 Gemini stills (field sensor, cargo drone, prep counter, cold crate, Sunday delivery). Crucially it also states **what must not be generated** — every screenshot and UI recording, because a rendered fake UI is the most obvious tell on a software company's site |
| 2026-09-23 | Verified again: 33 routes, 0 errors, frame pacing on `/products/erp` **p50 7.0ms, p95 11.3ms, zero frames over 32ms** with the scroll film, spec scroller, parallax and sticky concept all on one page |
| 2026-09-24 | **Heroes rebuilt as different SHAPES, not one band with different wallpaper.** The previous pass was the real failure: every page was dark + eyebrow + h1 + lead + meta, and only the background changed. Now seven layouts, **three of them light**: `ChapterHero` (services — flat saturated blue, chapter index down the left, marquee below) · `IndexHero` (work — **light**, oversized wordmark, no band) · `FanHero` (products — exploded perspective fan of the four platforms) · `FrameHero` (industries — full-bleed photograph with the sector list inside it) · `CentreHero` (ventures — centred, visual above the copy) · `SplitHero` (about — two full-height columns) · `OpenHero` (contact — **light**, scrub-filled headline, form visible immediately) · blog (**light**, three marquees of its own vocabulary behind the type) |
| 2026-09-24 | **`HeroTheme` + header adaptation** — pages declare light or dark on `<html>` and the header reads it via MutationObserver. React context could not carry this because the header is in the layout and the page is its child |
| 2026-09-24 | **Loading screen built** — counts to 100 against real `document.readyState` with a floor so it always advances, wipes upward on exit, **once per session** via sessionStorage, suppressed under reduced motion. Sits over the page rather than gating render, so the content behind is already painted when it lifts |
| 2026-09-24 | **Five new animation types added** (`scroll/Effects.tsx`): `ParallaxCards` (grid where each card drifts at its own irregular rate — on work and industries) · `StackCards` (cards pin and stack, the one beneath scaling and dimming — the four service pillars) · `ClipReveal` (wipe, not fade — Fame Estate's mechanism) · `ScrambleText` (monospace only; proportional type reflows every frame) · `HorizontalRail` |
| 2026-09-24 | **🐞 Real bug found and fixed: `ClipReveal` was self-defeating.** It applied `clip-path: inset(100%)` to the *same node* it observed, and Chrome factors an element's own clip-path into the intersection rectangle — so the element clipped itself to zero area and the observer could never fire. The Services and Work headlines were invisible. Clip now goes on an inner element, observer watches the outer. Found by probing computed styles in the browser, not by reading |
| 2026-09-24 | **A real 3D asset shipped** — `GlassObject`, drei `MeshTransmissionMaterial` on the product spec scroller, using the values **measured off Noomo's public playground** (thickness 5, reflectivity 0.32, anisotropy 0.63, chromaticAberration 0.07, distortion 2.08). Procedural geometry, procedural Lightformer rig — no `.glb`, no textures, no HDRI download. Desktop-gated, lazy-loaded, and guarded against the magnifier's duplicate render |
| 2026-09-24 | Fixed on inspection: the About arc was clamped to 54% viewport width and became tiny once it had its own column; the contact confetti climbed over the lead paragraph |
| 2026-09-24 | **Verified:** 33 routes, 0 non-200s, 32 unique titles, no console or page errors. `/products/erp` — now carrying a scroll film, the 3D glass object, a parallax block and a sticky concept walkthrough — holds **p50 7.0ms, p95 11.6ms, worst 14ms, zero frames over 32ms** |
| | *next: client generates §4.6 (3 films + 5 stills) and §4.1 (4 industry stills + manufacturing at 2560px); records the product and client screens, and the 6 client review videos* |

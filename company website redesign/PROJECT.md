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
| Locations | **Dubai, UAE** · **Vellore, India** — "Dubai \| India \| Global" |
| Email | info@cogitationworks.com |
| Phone / WhatsApp | +91 93608 89434 |
| LinkedIn | linkedin.com/in/cogitation-works |
| Instagram | instagram.com/cogitation_works |
| Booking | Google Calendar consultation link |

**Services offered** (expanded, current): custom software · mobile apps (iOS + Android) · desktop applications · static and dynamic websites · web applications · e-commerce · UI/UX · SaaS · cloud · IT consulting · IoT · AI & automation · **SEO optimisation** · **digital marketing** · idea-to-concept product definition.

**New directions being entered:** **agriculture** and **IoT**.

**Positioning (decided):** Cogitation Works builds the operational nervous system — the systems that run factories, clinics, fleets, telecom networks, buildings and farms. Not "we make digital products."

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

**5. Mega Connect — Telecom (Etisalat channel partner, Dubai)**
Corporate Website. *"Dubai, UAE Presence · Fast Web Engine."*
Description: professional Dubai-based corporate website for a channel partner associated with Etisalat, establishing digital presence and communicating networking and telecom solutions.
- **Challenge:** establishing high-trust corporate positioning in competitive UAE enterprise connectivity markets.
- **Solution:** performant custom web architecture with fast load and clear service presentation.
- **Tags:** High-Trust (Dubai presence) · < 0.4s (load speed) · Showcased (telecom services)

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
| **Office imagery** | Dubai and Vellore — space, team, working | 🟡 partial assets exist |
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
/about                         story, team, Dubai + Vellore, achievements, expos
/testimonials                  video wall + written reviews
/insights                      articles (the SEO engine)
/contact                       form, offices, direct booking
```

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
10. **Offices** — Dubai + Vellore, real photography, live local time in amber.
11. **Written testimonials** — real quotes.
12. **CTA block** — architecture call + catalogue download.
13. **Footer** — full nav, newsletter, legal.

---

## 6. Asset register

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
| Office — Dubai | 5–8 photos, ≥3000px, real space and team |
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

1. **Live local time in both offices** — Dubai and Vellore, ticking, in amber. Tiny, cheap, and it makes a two-country company feel real.
2. **An interactive "build your platform" configurator** — pick industry + modules, get an indicative architecture diagram and timeline. This is a lead magnet that also demonstrates the thing you sell. None of the 18 references has anything like it.
3. **A real architecture diagram per case study** — an animated SVG that draws itself on scroll showing how the system actually works (devices → gateway → services → dashboard). This is your credibility made visible, and it is cheap (SVG, no 3D).
4. **Number-led case cards** — lead with outcome, not project name, as Lazarev does.
5. **The agriculture page as a statement piece** — since it is the new direction, give it the most ambitious treatment: the Operations Field in crop configuration, sensor telemetry animating across the field.
6. **A "Systems we run" live counter** — aggregate uptime or transactions processed, if we can source it honestly.
7. **PDF catalogue generated from the site content** so it never goes stale.
8. **Bilingual readiness** — Arabic for the Dubai market is a genuine differentiator in UAE enterprise sales. Worth scoping even if deferred.

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
| 2026-09-23 | Built sections: Header (direction-aware, real `<a href>` nav), Stats + capability marquee, Statement (scrub text), Work (6 real client cards, per-card accent, tilt + accent wash on hover), Products (hover-expand index, 4 platforms), Industries (animated SVG operations diagram with travelling amber pulse, agriculture flagged New), CTA (tonal flip to dark + live Dubai/Vellore clocks), Footer |
| 2026-09-23 | **Logo-as-hero idea dropped** — client correct that none of the 18 references animate a pictorial logo (Alche animates its *wordmark*, not an icon). Logo stays in header/footer only |
| 2026-09-23 | **Analysed the shipped JavaScript of all 18 references** for technique signatures. Key findings: only 2 of 18 run a fluid simulation (Active Theory 27, Alche 17 `advect`/`divergence`/`vorticity`); **Lusion has 267 GLSL blocks + 61 noise functions, no physics engine, only 6 pointer handlers** — its motion is procedural noise, not simulation; Yambo has 94 springs + 185 pointer handlers and no fluid. Recorded in the research MD |
| 2026-09-23 | **Built 3 hero options for comparison**, switchable live via a floating A/B/C control and `?hero=a\|b\|c`: **(A) Signal Field** — 7,000 points, cursor-velocity displacement, morphing into production line / field grid / network graph / fleet route; **(B) Liquid Chrome** — raymarched metaball, zero assets, procedural studio env; **(C) Deforming Grid** — wireframe plane denting under the cursor with amber pulses |
| 2026-09-23 | **Built the refraction-lens cursor** — real `backdrop-filter` + SVG `feDisplacementMap` distortion of live page content, displacement scaling with pointer velocity, squash-and-stretch along travel direction. Feature-detected with a glass-disc fallback |
| 2026-09-23 | Bugs fixed on the way: DeformGrid failed program validation (`uPointerVel` highp in vertex / mediump in fragment); SignalField used `300.0 / -mv.z` for point size, making 7,000 points merge into a solid black mass over the whole hero |
| | *next: client picks a hero (A/B/C), then The Descent + horizontal work reveal + video finale* |

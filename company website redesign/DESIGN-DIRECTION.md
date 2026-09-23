# Cogitation Works — Design Direction & Build Plan

**Status:** the plan. Supersedes the earlier version of this file.
**Updated:** 23 September 2026
**Companions:** `PROJECT.md` (content inventory, asset register, running log) · `../not for project/animated-websites-research.md` (18 sites, now including a **measured teardown of their actual JavaScript**) · `../not for project/component-libraries-and-resources.md` (free toolbox)

---

## 0. Where we actually are — honest status

| | |
|---|---|
| ✅ Working | Design system, Lenis smooth scroll, header/footer, 7 homepage sections, real content from the 6 client projects, SEO from commit one |
| ✅ Working | Scroll-scrubbed Core sequence (60 frames, 37KB each, desktop only), now completing in the first 45% of a viewport |
| ⚠️ Weak | **Interaction is thin.** Cursor ring, magnetic buttons, card tilt. Nothing responds with physics. Nothing reacts to cursor *velocity*. This is the gap between us and the references |
| ❌ Not started | Fluid/noise cursor layer · pinned scroll sections · page transitions · loader · work/product/industry/service pages · all real photography |

**Two bugs already cost us time and are recorded so they are not repeated:**
1. Frame extraction using `seeked` produced **60 identical frames** — `seeked` fires before the frame is painted. Must use `requestVideoFrameCallback`.
2. `body { overflow-x: hidden }` made body a scroll container and **froze scroll at 1100px**. Must be `overflow-x: clip`.

---

## 1. The brand link we should be using

The logo (`Cogitation_Works_Website/public/logo/logo.png`, 348×312) is a **four-blade aperture** — four curved blades spiralling around an open centre, in blue, green, orange and red.

The Core render already approved has **four chrome petals opening around a glowing centre.**

**They are the same form.** The hero object is the logo in three dimensions. That is not a coincidence we should waste — it means:

- The Core is justified as the signature object; it is the mark, not an arbitrary sphere.
- The **four blade colours become the four industry/section accents** instead of one flat blue. Blue = platforms/fintech, green = agriculture, orange = manufacturing/energy, red = healthcare/urgent.
- The aperture "opening to reveal what's inside" is exactly the positioning: *we build the system inside your operation.*

**Consequence:** the logo must be redrawn as **SVG**. 348×312 PNG is too small for any modern screen and cannot be animated. This is asset request #1.

---

## 2. The motion system — grounded in what the references actually do

This section replaces guesswork. Every shipped `.js` bundle from all 18 reference sites was downloaded and searched for technique signatures. Full table in the research file. The findings that change our plan:

| Finding | Evidence | What it means for us |
|---|---|---|
| **Only 2 of 18 run a fluid simulation** | Active Theory 27, Alche 17 hits on `advect`/`divergence`/`vorticity`. Everyone else: 0 | We do **not** need a Navier–Stokes solver. It is the most expensive path and almost nobody takes it |
| **Lusion's motion is procedural noise, not physics** | **267 GLSL blocks, 61 noise functions, only 6 pointer handlers**, no physics engine | The "fog" look is a simplex-noise flow field in a fragment shader with the cursor as a light influence |
| **Cursor "aliveness" is springs** | Peachweb 60 springs / 56 pointer handlers. Yambo **94 springs / 185 pointer handlers**, no fluid | Critically damped springs easing toward a pointer target produce most of the feel |
| **Raycasting is how objects feel hovered** | Phantom 64, Active Theory 55, Viture 38, Yambo 27 | Without it, 3D objects cannot respond individually to the cursor |
| **Instancing + render targets are universal** | Every WebGL site uses both | Thousands of particles in one draw call |
| **Four sites use no WebGL at all** | Corgi, Terminal, Fame Estate, Lazarev | Including Corgi, the best-converting site in the set |

### Our motion stack, in cost order

1. **Spring layer (no WebGL).** Critically damped springs on pointer position driving cursor, magnetics, card tilt, parallax. *Already partly built.*
2. **Noise flow-field shader.** One full-screen quad behind the hero. Simplex noise + time + a cursor uniform carrying **position and velocity**. This is the fog/scatter. ~4KB of GLSL, one draw call.
3. **Instanced particle field.** A few thousand points pushed by cursor velocity, settling back via spring. One draw call.
4. **Raycaster** on the Core and work cards so individual objects respond to hover.
5. **Rapier** only if we commit to real rigid-body collisions (falling, stacking). Decide later.
6. **Fluid solver** — not planned. 2 of 18 use it.

### Motion rules

- Scroll: Lenis, ~1.0s settle, matching the measured Yambo/Alche curves.
- Sections pin via `position: sticky`, never by hijacking scroll.
- **No global `will-change`.** Terminal has 157 and stutters at normal scroll speed — that is the failure mode to avoid.
- Everything honours `prefers-reduced-motion`. 3D and particles are desktop-only.
- **Performance budget is binding:** LCP < 2.5s on a mid-range Android, < 150 requests, < 350KB JS gzipped, CLS < 0.1.

---

## 3. Visual system

| Token | Value | Rule |
|---|---|---|
| Canvas | `#F4F5F7` | the page |
| Surface | `#FFFFFF` | cards |
| Ink | `#0B0F14` | all type |
| Muted | `#5A6472` | body copy |
| **Signal Blue** | `#2563EB` | primary brand action |
| **Live Amber** | `#F0A500` | **only** on things actually moving or updating |
| Logo green | ⟨from SVG⟩ | agriculture |
| Logo orange | ⟨from SVG⟩ | manufacturing / energy |
| Logo red | ⟨from SVG⟩ | healthcare |

**Type:** Geist (interface) + Geist Mono (data, labels, counters, technical readouts). h1 ~88px / weight 560 / −0.035em. Body 16–18px and quiet. The contrast between them *is* the design.

**Light, not dark.** 11 of the 18 references are dark because dark hides rendering flaws. Light is harder and reads as more confident, and it suits a company whose product is clarity.

---

## 4. Site structure

```
/                          Home
/services  /services/<slug>      web · mobile · desktop · ecommerce · ui-ux · cloud
                                 · iot · ai-automation · seo · digital-marketing
/products  /products/<slug>      crm · hrms · erp · cogi-ai   (each with FAQ)
/work      /work/<slug>          6 client case studies
/industries/<slug>               manufacturing · healthcare · fintech · telecom
                                 · logistics · elevators-iot · agriculture
/about  /testimonials  /insights  /contact
```

Per-industry pages are the highest-leverage SEO decision — Corgi runs 102 URLs that are almost entirely vertical landing pages, Lazarev 554. Every route gets unique title, description, canonical, OG image and JSON-LD.

---

## 5. Homepage — section by section, with its interaction

| # | Section | The interaction |
|---|---|---|
| 1 | **Loader** | Logo aperture blades spin in and open; releases into the hero. ~900ms, once per session |
| 2 | **Hero** | Core frame sequence opens on scroll **+ noise flow-field shader reacting to cursor velocity + instanced particles pushed by the pointer** |
| 3 | **Stats** | Count-up, amber while counting, hairline draws on hover |
| 4 | **Statement** | Word-by-word scrub fill *(already built — the one thing you liked)* |
| 5 | **Work** | 6 real cards, per-client accent, tilt + specular sheen, accent rule draws across the top |
| 6 | **Products** | Hover-expand index, 4 platforms, live demo micro-loops |
| 7 | **Industries** | Animated SVG operations diagram, amber pulse travelling the path, agriculture flagged New |
| 8 | **Tech stack** | Monospace chips, four pillars |
| 9 | **Client videos** | Muted autoplay wall, click to expand with sound |
| 10 | **Achievements & expos** | Horizontal pinned timeline |
| 11 | **Offices** | Dubai + Vellore, real photography, live local clocks |
| 12 | **Testimonials** | Real quotes, real photos |
| 13 | **CTA** | Tonal flip to dark, architecture call |
| 14 | **Footer** | Full nav, oversized wordmark marquee |

---

## 6. WHAT I NEED FROM YOU — in order

**Send one at a time. I'll confirm each before you spend effort on the next.**

### ⬜ #1 — Logo as SVG *(blocking the loader and the accent palette)*

The PNG is 348×312 — too small, and can't be animated. I need vector.

**Option A (best):** if you have the original Illustrator/Figma/CorelDraw file, export **SVG**.
**Option B:** in Figma — drop `logo.png` in → select → **Plugins → Image Tracer** (or "Vectorizer") → trace → export SVG.
**Option C:** upload to `vectorizer.ai` or `vectormagic.com`, download SVG.

Also send me the **four exact hex codes** for the blades (use Figma's eyedropper on each).

---

### ⬜ #2 — Hero ambient loop *(only if the noise shader isn't enough — I'll tell you after building it)*

Hold this one. I'll build the shader first and show you; we may not need any asset.

---

### ⬜ #3 — Six industry stills

Gemini, **2560×1440, 16:9, no text, no logos, no watermark, no people.** Keep them cool and desaturated — they sit behind type.

> **Agriculture** *(the new direction — make this the best one)*
> `Aerial view of precision-farmed fields in neat geometric rows converging toward the horizon, subtle irrigation lines, soft overcast morning light, muted desaturated green and cool grey-brown earth tones, cool neutral colour grade, a single small unbranded white sensor post, no people, no text, no logos, no watermark, calm and ordered, drone photography, 16:9, 2560x1440`

> **Manufacturing**
> `Wide interior of a modern clean manufacturing facility, CNC machines and robotic arms in soft focus, polished concrete floor, cool daylight from high clerestory windows, pale grey and steel blue, desaturated, no people, no text, no logos, shallow depth of field, architectural photography, 16:9, 2560x1440`

> **Healthcare**
> `Modern private clinic corridor and equipment bay, soft diffused daylight, white and pale blue surfaces, stainless fittings, clean and uncluttered, desaturated cool grade, no people, no text, no branding, architectural interior photography, 16:9, 2560x1440`

> **Telecom**
> `Rooftop telecom antenna array against a pale overcast sky, clean minimal composition, brushed metal and matte grey, soft even light, desaturated, no branding, no text, calm technical photography, 16:9, 2560x1440`

> **Elevators & IoT**
> `Interior of a modern glass elevator shaft in a contemporary office atrium, brushed steel and glass, clean geometric lines, cool neutral daylight, looking upward, no people, no text, no logos, architectural photography, 16:9, 2560x1440`

> **Fintech**
> `Abstract close-up of a brushed metal and frosted glass control surface with faint illuminated indicator lines, extremely shallow depth of field, pale neutral palette with one small warm amber indicator, no screens, no text, no logos, calm precise product photography, 16:9, 2560x1440`

---

### ⬜ #4 — Product screenshots *(the most credible asset on the entire site)*

Real UI from **CRM · HRMS Pro · ERP · Cogi AI**. ≥2560px wide, light theme, no customer data visible. Nothing I can generate substitutes for these.

---

### ⬜ #5 — Product demo recordings

Screen recordings, one real task each. **1920×1080, 30fps, silent, 8–12s, seamless loop, .mp4 + .webm, under 2MB.**
CRM: a deal moving through stages · HRMS: biometric clock-in then payroll run · ERP: BOM → station → dispatch · Cogi AI: a telemetry question answered.

---

### ⬜ #6 — Real photography *(only you have these)*

| Asset | Spec |
|---|---|
| Office — Dubai | 5–8 shots, ≥3000px |
| Office — Vellore | 5–8 shots, ≥3000px |
| Expo / event photos | with event name + year for each |
| Achievements | certificates, awards, partner badges, ≥1500px |
| Testimonial portraits | ≥1200×1200, natural light, plain background |

---

### ⬜ #7 — Client review videos

1080p, landscape **plus a vertical crop**, good audio, 30–60s each. Subtitles needed.

---

### ⬜ #8 — Real numbers *(blocking launch, not build)*

Every figure on the site is currently `⟨TBC⟩` and labelled as such on screen. I need the true values for: projects delivered (**the live site says 50+, the Products page says 10+ — these contradict**), client satisfaction %, industries served, platform uptime, pipeline velocity, staff scale, resource precision, inference latency.

And **three real testimonials** with real names, titles and photos — the same three sentences currently appear attributed to six different people across two pages.

---

## 7. Build order

| # | Stage | Depends on |
|---|---|---|
| 1 | **Noise flow-field + cursor-velocity shader** behind the hero | nothing — starting now |
| 2 | **Instanced particle field** pushed by pointer | 1 |
| 3 | **Raycaster hover** on Core and cards | 2 |
| 4 | Loader with animated logo aperture | **#1 logo SVG** |
| 5 | Pinned scroll sections + page transitions | nothing |
| 6 | Tech stack, video wall, expos, offices, testimonials sections | #4 #6 #7 |
| 7 | Work / Product / Industry / Service pages | #3 #4 |
| 8 | SEO pass — sitemap, robots, per-route JSON-LD, OG images | content |
| 9 | Performance pass against budget | all |
| 10 | Replace every `⟨TBC⟩` | **#8** |

---

## 8. Standing rules

1. The old live site is a **content source only** — its design is not a reference.
2. Reference sites are a **vocabulary of techniques, never templates**. Different 3D object, different lines, original execution.
3. **Never invent a fact** — no made-up clients, numbers, quotes or logos. Placeholders are `⟨TBC⟩`.
4. Performance budgets are binding.
5. **Verify in the browser before claiming anything works.** Both bugs in §0 shipped because I didn't.

# ASSET BRIEF — what to generate, capture and supply

Supersedes `PROJECT.md` §6.2 and §6.3 (those prompts were written in a flat
documentary register before the agriculture shot proved the cinematic one works).

Everything here is derived from the 15 screen recordings in `Videos/New folder`,
matched against the pages we actually have to build.

---

## 0. How to not waste credits

Read this once before generating anything.

1. **Generate ONE first, not a batch.** Look at it at 100%. Only then run the rest.
2. **Gemini wants a paragraph, not tags.** Comma-separated keyword soup is a
   Midjourney habit. Gemini's image models parse natural sentences and follow
   spatial instructions ("in the lower-left foreground", "converging toward a
   vanishing point"). Write it like you are briefing a photographer.
3. **State the negatives explicitly.** "No text, no watermark, no logos, no
   people" — every time. Gemini adds text unprompted otherwise.
4. **Set the aspect ratio in the UI as well as the prompt.** The prompt alone
   does not reliably change the canvas.
5. **Veo/Flow needs Subject → Action → Camera → Lighting → Style → Audio.**
   Missing the camera line is the single most common reason a clip comes back
   unusable. If you do not say "camera locked", it will invent a drift.
6. **For anything I will scroll-scrub, say `single continuous take, constant
   speed, no cuts, no transitions`.** A clip with an edit in it is unusable —
   the scrub jumps. This killed the first Core attempt.
7. **Veo generates audio by default.** Say "no audio, silent" unless you want it.
8. **Iterate by editing one clause, not rewriting.** Keep everything else
   identical so you can tell what changed.
9. **Generate larger than needed.** I downsample; I cannot invent pixels. 2K
   minimum for stills, 1080p for video.

---

## 1. What we already have

| Asset | State |
|---|---|
| Core frame sequence, 60 × webp | ✅ shipping, scroll-scrubbed in the hero |
| Core poster, 2 sizes × 3 formats | ✅ shipping |
| Agriculture still, 2 widths × AVIF/WebP | ✅ shipping — **this is the reference register**. Watermark patched out 23 Sep |
| Manufacturing still, 2 widths × AVIF/WebP | ⚠️ shipping, but **source was only 1024×572** — fine on the card, soft in the full-bleed hero. **Regenerate at 2560px** using the §4.1 ① prompt |

**The site is now built: 33 routes, all statically generated.** Every page
exists, every route returns 200, and every missing asset has a slot waiting for
it that renders an honest empty state rather than a placeholder pretending to be
content. Nothing below requires a rebuild — each asset is a drop-in swap.

---

## 2. The register — locked by the agriculture shot

That image works because of six things. **Every industry still must repeat all
six**, or the set will not read as one family:

1. **Elevated or aerial vantage**, never eye-level.
2. **Low backlit sun**, with **visible atmospheric haze carrying the light** —
   the haze is what makes it cinematic rather than stock.
3. **Strong converging geometry** running to a vanishing point (crop rows there;
   machine lines, racks, masts, trailers elsewhere).
4. **Exactly one small piece of unbranded white/metal technology hardware**,
   off-centre, small in frame. This is the only thing that says "we run systems
   here". Never a fake UI overlay — those always look fake.
5. **Warm amber key against cool blue** — matches `--color-live #f0a500` and
   `--color-deep #06090d`. The palette is not decoration, it is the brand.
6. **No people, no text, no logos, no watermark.** 16:9.

---

## 3. TIER 0 — nothing can replace these

No prompt exists for these. Until they arrive, parts of the site are decorated
rather than evidenced. **These are worth more than everything in Tier 1.**

| # | Asset | Spec | Blocks |
|---|---|---|---|
| 0.1 | **Logo as SVG** | true vector, not a traced PNG | the loader, the favicon, every OG image |
| 0.2 | **Product screenshots** — CRM, HRMS, ERP, Cogi AI | real UI, ≥2560px wide, 6–8 screens each, light UI if possible | all four `/products/*` pages |
| 0.3 | **Product demo recordings** | 1920×1080, 30fps, **silent**, 8–12s, one clean interaction per clip, no cursor jitter | the product page finale |
| 0.4 | **Client work recordings** — the 6 delivered platforms | same spec; for Mega Connect + RG Robotics just screen-record the live sites scrolling | the `/work` index cards |
| 0.5 | **Office photos** — UAE + Vellore | 5–8 each, ≥3000px, real space, real people working | `/about` |
| 0.6 | **Expo / event photos** | whatever exists, with event name + year | the achievements strip |
| 0.7 | **Real numbers** | replacing every ⟨TBC⟩ | launch, not build |
| 0.8 | **Real testimonials** | real name, title, company, photo | launch — see `PROJECT.md` §7 |

> **On 0.4:** Lusion's entire projects index is *video* cards, not stills — every
> card is a 3–6s silent loop of the actual work. That is why it feels like proof
> instead of a portfolio. It costs us nothing but screen-recording time, and it
> is the highest-value thing you can capture this week.

---

## 4. TIER 1 — generate now

### 4.1 Five industry stills · **Gemini** · 16:9, 2560×1440 minimum

Same register as agriculture. One at a time. Check each before the next.

---

**① MANUFACTURING** — *Uthmal Machinery*

```
A high aerial three-quarter view looking down the full length of a vast modern
manufacturing hall. Long parallel rows of CNC machining cells and conveyor lines
run away from the camera and converge toward a distant vanishing point. A low
morning sun breaks through a tall wall of clerestory windows along the left side
and throws long visible shafts of light across airborne dust and machine haze,
so the beams themselves are clearly readable in the air. In the lower-left
foreground stands a single small unbranded white sensor module on a slim metal
mast, catching one hard specular highlight. Warm amber sunlight against deep
cool blue-grey shadow in the roof trusses and floor. Polished concrete reflects
the light in long streaks. Cinematic anamorphic photography, wide angle, deep
depth of field, rich film-grade colour, high dynamic range. No people, no text,
no signage, no logos, no watermark. 16:9.
```

---

**② HEALTHCARE** — *Elite Medical*

```
An elevated wide view down a long modern hospital corridor, shot from just below
ceiling height. Rows of recessed ceiling coves, floor joints and glass partition
mullions run away from the camera and converge sharply on a tall glass end wall.
Low morning sun floods through that end wall as a bloom of warm light, and thin
haze in the corridor turns the beams into visible shafts across the polished
floor. In the lower-right foreground, a single small unbranded white wall-mounted
monitoring unit glows with one calm amber indicator. Everything else is white,
pale blue-grey and brushed stainless. Warm amber key against cool blue shadow.
Cinematic architectural photography, wide angle, deep depth of field, rich
film-grade colour, high dynamic range, immaculately clean and quiet. No people,
no text, no signage, no logos, no watermark. 16:9.
```

---

**③ FINTECH** — *Fitings Zone*

```
A low aerial view down a long cold aisle of a modern data centre. Two unbroken
walls of server racks run away from the camera and converge to a distant
vanishing point, their status LEDs reading as two receding lines of tiny warm
amber points. A single shaft of low sun enters from a window at the far end and
cuts through faint haze and the cold air shimmer above the floor vents. In the
lower-left foreground, one small unbranded white telemetry sensor is clamped to
the end of a rack, catching a hard specular highlight. Deep blue-black steel and
graphite everywhere, lit by warm amber from the LEDs and the distant sun.
Cinematic anamorphic photography, wide angle, deep depth of field, rich
film-grade colour, high dynamic range. No people, no text, no branding, no
logos, no watermark. 16:9.
```

---

**④ TELECOM** — *Mega Connect*

```
An aerial view looking along a rooftop ridge high above a hazy city at sunrise.
A line of slim unbranded telecom antenna masts and microwave dishes recedes from
the foreground toward a distant vanishing point, the rooftop parapet converging
with them. The low sun sits just above a thick layer of morning haze that fills
the streets far below, so the city reads as soft receding bands and the mast
silhouettes are rimmed in warm amber light. In the lower-left foreground, one
small unbranded white equipment cabinet sits at the base of the nearest mast,
its edge catching a hard highlight. Warm amber sky against cool blue haze and
deep blue-grey steel. Cinematic drone photography, wide angle, deep depth of
field, rich film-grade colour, high dynamic range. No people, no text, no
branding, no logos, no watermark. 16:9.
```

---

**⑤ ELEVATORS & IoT** — *RG Robotics*

```
Looking straight up the inside of a tall glass and brushed-steel elevator shaft
in a contemporary office atrium. The shaft structure, guide rails and floor
edges converge dramatically toward a bright vanishing point at the skylight far
above, where low sun enters and blooms. Faint haze in the atrium turns the light
into visible shafts crossing the shaft interior. A single glass elevator car sits
part-way up the frame, its underside catching warm amber light. On the nearest
rail in the lower-right foreground, one small unbranded white IoT sensor module
is mounted, catching a hard specular highlight. Warm amber light from above
against cool blue-grey steel and glass below. Cinematic architectural
photography, ultra-wide angle looking vertically upward, strong one-point
perspective, deep depth of field, rich film-grade colour, high dynamic range.
No people, no text, no branding, no logos, no watermark. 16:9.
```

---

**Optional ⑥ LOGISTICS · ⑦ ENERGY** — only if you want 7 industries rather than
6. Energy/solar will look very close to the agriculture shot (rows converging to
a low sun); if you generate it, push it to dusk with the trackers silhouetted so
the two do not read as duplicates.

---

### 4.2 Four product objects · **Google Flow** · the BMW move

The strongest single reference in the whole set is recording `131955` — the BMW
M3 page. Scroll rotates the car; the specs count up beside it. That is exactly
what each `/products/*` page should do, and we already have the pipeline: Flow
clip → 60 webp frames → scroll-scrubbed canvas. It is the same code as the hero.

These four must read as **one family with the Core** — polished chrome shell,
warm amber interior light — so the site holds together.

**Flow settings for all four:** 1080p · 16:9 · 8 seconds · highest quality.

> ⚠️ **Pure black background is not optional.** I key the background out to get
> transparent webp frames. A gradient, a floor, or a cast shadow makes the key
> fail and the object ships with a grey box around it.

---

**① COGITATION CRM** — *nested rings · relationships in orbit*

```
Subject: a precision-machined object made of four concentric polished chrome
rings nested inside one another like a gyroscope, each ring set at a different
angle, with a small glowing warm amber sphere suspended at the exact centre,
its light spilling across the inner faces of the chrome.
Action: the whole assembly rotates smoothly about its vertical axis through
exactly 360 degrees over the full clip at a perfectly constant speed, while the
inner rings counter-rotate slowly against the outer ones. The amber core pulses
almost imperceptibly.
Camera: locked off, completely static, three-quarter view slightly above the
object. No zoom, no push, no drift, no handheld.
Composition: object centred, filling about 70 percent of the frame height,
against a pure flat black background, no floor, no shadow, no horizon.
Lighting: large soft studio key from the upper left with a second rim light from
behind right, producing crisp specular highlights and clean reflections on the
chrome. Warm amber bounce from the core. Lighting is identical in every frame.
Style: photoreal studio product render, extremely clean and precise, premium
industrial design, sharp focus throughout.
Audio: none, silent.
Single continuous take, constant rotation speed, seamless loop, no cuts, no
transitions, no text, no logos, no watermark.
```

---

**② HRMS PRO** — *a lattice of many becoming one*

Same block as ①, with the Subject and Action lines replaced:

```
Subject: a precision-machined object formed from roughly two hundred identical
small polished chrome cubes arranged in a dense spherical lattice, with narrow
gaps between them through which warm amber light escapes from a glowing core at
the centre.
Action: the lattice rotates smoothly about its vertical axis through exactly 360
degrees over the full clip at a perfectly constant speed, while the individual
cubes drift a few millimetres outward and back in one slow synchronised breath,
widening and closing the amber gaps.
```

---

**③ COGITATION ERP** — *a machined gear-train, sectioned*

```
Subject: a precision-machined cylindrical mechanism in polished chrome, cut away
along one side to expose an interlocking gear train and layered internal
stages, with warm amber light glowing from deep inside the exposed cavity and
catching on the gear teeth.
Action: the cylinder rotates smoothly about its vertical axis through exactly
360 degrees over the full clip at a perfectly constant speed, while the exposed
internal gears turn steadily against each other.
```

---

**④ COGI AI** — *liquid chrome, always reconfiguring*

```
Subject: a single mass of liquid mercury-like polished chrome suspended in the
air, its surface continuously reforming between smooth organic curves and sharp
faceted crystalline planes, with warm amber light glowing from somewhere within
the mass and refracting through its thinner edges.
Action: the mass rotates smoothly about its vertical axis through exactly 360
degrees over the full clip at a perfectly constant speed, while its surface
slowly melts between the organic and faceted states and back, returning to its
exact starting shape at the end of the clip.
```

> Return all four to me as `.mp4`. I extract the frames, key the background,
> encode to webp and wire the scrub — same as the Core.

---

### 4.3 Four service pillar objects · **Gemini** · stills, not video

Recording `125241` (Kode Immersive) numbers its services `001 / 002 / 003` and
gives each one a single sculptural black 3D object. It is cheap, it is striking,
and it scales. We do the same on `/services`, using the four pillars already in
your own content (`PROJECT.md` §2.5) rather than eleven separate services.

Deliberately **matte graphite, not chrome** — that keeps them visually separate
from the products, which are the chrome family.

**Common block for all four** — paste this after each Subject line:

```
Single sculptural object floating centred against a pure flat black background,
no floor, no horizon, no shadow. Matte graphite surface with a fine bead-blasted
texture, lit by one large soft key from the upper left and a single hard warm
amber rim light raking across one edge from behind. Photoreal studio product
render, extremely clean, premium industrial design, sharp focus throughout,
object fills about 65 percent of the frame. No text, no logos, no watermark,
no people. Square 1:1, 2048×2048.
```

| Pillar | Subject line |
|---|---|
| **Frontend & Edge** | `A thin rectangular slab of matte graphite that has fractured cleanly into nine smaller rectangles, the pieces floating a few centimetres apart in their original arrangement, edges razor sharp.` |
| **Backend & Cloud** | `A dense knot of matte graphite pipes and conduits of varying diameter, interwoven into a roughly spherical mass, every joint machined and precise, cut ends facing outward.` |
| **Mobile Systems** | `A stack of seven matte graphite rounded-rectangle plates of decreasing size, floating one above another and fanned slightly apart in a gentle spiral, like a deck of cards caught mid-shuffle.` |
| **AI & Infrastructure** | `A matte graphite polyhedron whose surface is subdivided into hundreds of small irregular facets, with a fine network of raised nodes and connecting ridges tracing across it like a circuit.` |

---

## 5. TIER 2 — after the pages exist

### 5.1 The Descent · **Flow** · the Peachweb transition

Recording `131735` — Peachweb opens on a bright surface, and scrolling **dives**
you underwater into a completely different world. That single transition is what
makes a one-page scroll feel like a journey, and it is the strongest candidate
for the moment our light sections hand over to the deep ones.

I can approximate this in code with the particle field alone. **Generate it only
if you want the stronger version.**

```
Subject: an endless field of fine luminous amber particles suspended in deep
blue-black space, with faint geometric wireframe structures drifting far in the
background.
Action: the camera descends steadily downward through the particle field. The
particles stream upward past the lens. The field grows gradually denser and the
background darkens from deep blue to near black across the clip.
Camera: a single continuous downward dolly at a perfectly constant speed. No
rotation, no acceleration, no easing, no handheld.
Lighting: the particles are self-illuminated warm amber; the surrounding space
is unlit deep blue-black.
Style: photoreal, cinematic, volumetric haze, shallow bloom on the brightest
particles.
Audio: none, silent.
Single continuous take, constant speed, no cuts, no transitions, no text, no
logos, no watermark. 1080p, 16:9, 10 seconds.
```

### 5.2 Ambient audio · **Google AI Studio**

Recordings `131408` (Hashgraph) and `131531` (Alche) both gate entry on
**"ENTER WITH AUDIO / enter without audio"**. It costs one small file and it
makes the loader feel like a product rather than a spinner. Default must be
**off** — autoplaying audio is the fastest way to lose a visitor.

```
A calm, low, continuous ambient drone for an enterprise software company's
website loader. Deep sustained bass pad, a faint high shimmer, and a very slow
swell that rises and settles once. Restrained, precise, confident — engineering,
not cinema. No melody, no rhythm, no percussion, no voices, no instruments that
read as orchestral. Must loop seamlessly with no audible seam. 20 seconds.
```

Also worth one pass: a **single soft UI click**, 80ms, for nav and card hovers.

### 5.3 Device mockup plate · **Gemini** · for NDA'd client work

Only needed where a real screenshot cannot be shown. I composite the live UI onto
the blank screens in code so it stays sharp and updatable.

```
A matte dark-graphite laptop and a phone floating in a clean three-quarter
arrangement against a pure flat black background, screens completely blank and
neutral mid-grey, no interface, no reflections on the screens. Soft large studio
key from the upper left, crisp edge definition, subtle warm amber rim light along
the near edges. Photoreal product photography, extremely clean, sharp focus
throughout. No text, no logos, no watermark, no people, no floor, no shadow. 16:9.
```

---

## 6. Where hero C goes

You said you like **A and C**, and to leave **A** on the home page.

**C — the deforming wireframe grid — becomes the `/industries` hero.** It is
literally a terrain surface reacting to a pointer, which is the right metaphor
for six sectors we operate across, and it sits naturally above the still
photography without competing with it. **B is retired** — the raymarched chrome
blob reads as a weaker version of the Core, and two chrome objects on one site
is one too many.

The other page heroes reuse techniques from the recordings rather than new
assets:

| Page | Hero technique | Source | New asset? |
|---|---|---|---|
| `/` | SignalField (A) + Core scrub | built | no |
| `/services` | numbered pillar slides, one object each | Kode `125241` | §4.3 |
| `/products` | exploded screenshot stack | Peachweb `131735` @34s | Tier 0.2 |
| `/products/*` | scroll-rotated object + counting specs | **BMW `131955`** | §4.2 |
| `/work` | curved video wall of project screens | Alche `131531` | Tier 0.4 |
| `/work/*` | horizontal split reveal, stat overlay | Fame `125347` | Tier 0.4 |
| `/industries` | DeformGrid (C) over the stills | built | §4.1 |
| `/about` | one object morphing through the story | Noomo `131246` | Tier 0.5 |
| `/blog` | light editorial, no 3D | — | no |
| `/contact` | confetti physics on the headline | Lusion `132741` | no |

---

## 7. Order to work in

1. **0.4 — screen-record the six client platforms.** Free, fastest, highest
   credibility gain on the whole site.
2. **0.1 — the logo SVG.** Three files are waiting on it.
3. **§4.1 — the five industry stills.** One at a time.
4. **0.2 — product screenshots.**
5. **§4.2 — the four product objects.**
6. **§4.3 — the four service pillars.**
7. Everything in Tier 2.

---

*Global output rules unchanged from `PROJECT.md` §6: stills 2560×1440 min,
16:9 unless stated; video 1080p, 30fps, silent, delivered as `.mp4`; no text,
no logos, no recognisable faces in anything generated.*

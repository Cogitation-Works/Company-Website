/**
 * A glass break, synthesised.
 *
 * Kode Immersive ships no <audio> element, no Howler and no Tone — their sound
 * is Web Audio, created only once the visitor enables it. Same approach here,
 * for the same reasons: zero download, and nothing plays until the visitor has
 * done something.
 *
 * Three layers, which is roughly what breaking glass actually is:
 *   1. a short burst of filtered noise — the initial crack;
 *   2. several high, fast-decaying partials at inharmonic ratios — the shards
 *      ringing. Inharmonic is the important part: harmonic ratios sound like a
 *      bell or a chime, and only inharmonic ones read as glass;
 *   3. a quiet low thud for the body.
 *
 * The AudioContext is created lazily on the first break and reused. A break is
 * always a direct response to the visitor touching the object, so this is not
 * autoplay — but it is still kept short and quiet.
 */

let ctx: AudioContext | null = null;

function context(): AudioContext | null {
  if (ctx) return ctx;
  const Ctor =
    typeof window !== "undefined"
      ? window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext
      : undefined;
  if (!Ctor) return null;
  ctx = new Ctor();
  return ctx;
}

/** Short burst of white noise, band-passed and swept down. */
function crack(ac: AudioContext, out: GainNode, t0: number) {
  const dur = 0.26;
  const buf = ac.createBuffer(1, Math.ceil(ac.sampleRate * dur), ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    // Decaying noise — the envelope is in the buffer so it needs no extra node.
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2.6);
  }

  const src = ac.createBufferSource();
  src.buffer = buf;

  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 0.9;
  bp.frequency.setValueAtTime(5200, t0);
  bp.frequency.exponentialRampToValueAtTime(1300, t0 + dur);

  const g = ac.createGain();
  g.gain.value = 0.5;

  src.connect(bp).connect(g).connect(out);
  src.start(t0);
  src.stop(t0 + dur);
}

/** The shards ringing — inharmonic partials, fast decay, slightly staggered. */
function shards(ac: AudioContext, out: GainNode, t0: number) {
  // Deliberately not integer multiples: harmonic ratios would sound like a bell.
  const ratios = [1, 1.41, 1.87, 2.31, 3.07, 4.13];
  ratios.forEach((r, i) => {
    const osc = ac.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = 1750 * r * (0.94 + Math.random() * 0.12);

    const g = ac.createGain();
    const start = t0 + Math.random() * 0.06;
    const dur = 0.10 + Math.random() * 0.24;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.055 / (i * 0.55 + 1), start + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    osc.connect(g).connect(out);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  });
}

/** Low body, so it lands rather than only hissing. */
function thud(ac: AudioContext, out: GainNode, t0: number) {
  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(180, t0);
  osc.frequency.exponentialRampToValueAtTime(58, t0 + 0.18);

  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.10, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);

  osc.connect(g).connect(out);
  osc.start(t0);
  osc.stop(t0 + 0.24);
}

/**
 * One small glass tile touching another. Played repeatedly while the sphere is
 * being held open, faster and louder as it strains — Noomo's equivalent is a
 * looped "Sphere-collision" sample; this is the same idea, synthesised.
 */
export function playClink(intensity = 0.5) {
  const ac = context();
  if (!ac) return;
  if (ac.state === "suspended") ac.resume().catch(() => {});
  const t0 = ac.currentTime + 0.001;
  const out = ac.createGain();
  out.gain.value = 0.18 + intensity * 0.32;
  out.connect(ac.destination);

  // Two inharmonic partials: enough to read as glass, short enough to stack.
  [1, 2.76].forEach((r, i) => {
    const osc = ac.createOscillator();
    osc.type = "sine";
    osc.frequency.value = (2600 + Math.random() * 1900) * r;
    const g = ac.createGain();
    const dur = 0.05 + Math.random() * 0.07;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(i === 0 ? 0.09 : 0.035, t0 + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(out);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  });
  setTimeout(() => out.disconnect(), 300);
}

/**
 * The sphere letting go: a shatter followed by a long, thinning shimmer of
 * tiles still falling — Noomo's "ParticleScattering". The tail is what sells
 * it: a single crack sounds like a dropped glass, a crack that keeps tinkling
 * for a second sounds like hundreds of pieces.
 */
export function playScatter(volume = 0.6) {
  playGlassBreak(volume);
  const ac = context();
  if (!ac) return;
  const out = ac.createGain();
  out.gain.value = volume * 0.55;
  out.connect(ac.destination);

  const start = ac.currentTime + 0.05;
  const COUNT = 38;
  for (let i = 0; i < COUNT; i++) {
    // Density falls off over ~1.4s, like debris settling.
    const at = start + Math.pow(i / COUNT, 1.7) * 1.4;
    const osc = ac.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = 2200 + Math.random() * 5200;
    const g = ac.createGain();
    const dur = 0.04 + Math.random() * 0.12;
    const peak = 0.05 * (1 - i / COUNT) + 0.008;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(peak, at + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    osc.connect(g).connect(out);
    osc.start(at);
    osc.stop(at + dur + 0.02);
  }
  setTimeout(() => out.disconnect(), 2200);
}

export function playGlassBreak(volume = 0.55) {
  const ac = context();
  if (!ac) return;
  // Safari and Chrome both start contexts suspended until a gesture.
  if (ac.state === "suspended") ac.resume().catch(() => {});

  const master = ac.createGain();
  master.gain.value = Math.max(0, Math.min(1, volume));
  master.connect(ac.destination);

  const t0 = ac.currentTime + 0.001;
  crack(ac, master, t0);
  shards(ac, master, t0);
  thud(ac, master, t0);

  // Let the tail finish, then drop the node rather than leaking one per break.
  setTimeout(() => master.disconnect(), 900);
}

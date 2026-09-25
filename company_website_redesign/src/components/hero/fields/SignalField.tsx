"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * HERO OPTION A — "The Signal Field".
 *
 * ~7,000 instanced points drifting as a volumetric mass. Cursor VELOCITY
 * shoves them aside; they ease back when it leaves. Every few seconds the
 * cloud snaps into a recognisable operational formation — a production line,
 * a field grid, a network graph, a fleet route — holds, then dissolves.
 *
 * Technique matches what the reference bundles actually contain (see
 * ../not for project/animated-websites-research.md §"HOW THEY ACTUALLY DO IT"):
 * Lusion ships 267 GLSL blocks + 61 noise functions and NO physics engine —
 * the motion is procedural noise plus springs, not a simulation. This is the
 * same approach: one draw call, all movement in the vertex shader.
 */

const COUNT = 7000;
const HOLD = 2.6;   // seconds a formation holds
const DRIFT = 4.2;  // seconds of free drift between formations

/* ---------- formations: target positions the cloud snaps into ------------ */

function productionLine(i: number, n: number, v: THREE.Vector3) {
  // A spine with perpendicular station branches — a shop floor.
  const t = i / n;
  const station = Math.floor(t * 7);
  const along = (t * 7 - station) * 2 - 1;
  const spineX = (station / 6 - 0.5) * 3.4;
  if (i % 3 === 0) {
    v.set(spineX, along * 0.14, 0);          // the spine itself
  } else {
    v.set(spineX + along * 0.22, (i % 2 ? 1 : -1) * (0.25 + (i % 5) * 0.12), (i % 7) * 0.03 - 0.1);
  }
}

function fieldGrid(i: number, n: number, v: THREE.Vector3) {
  // Crop rows on a ground plane, seen in perspective — agriculture.
  const cols = 60;
  const r = Math.floor(i / cols), c = i % cols;
  const rows = Math.ceil(n / cols);
  v.set((c / cols - 0.5) * 3.8, (r / rows - 0.5) * 1.5, Math.sin(c * 0.4) * 0.05);
}

function networkGraph(i: number, n: number, v: THREE.Vector3) {
  // Hub-and-spoke — a telecom / IoT topology.
  const hubs = 7;
  const h = i % hubs;
  const a = (h / hubs) * Math.PI * 2;
  const hx = Math.cos(a) * 1.5, hy = Math.sin(a) * 0.95;
  const t = (i / n) * 2.0;
  const edge = t % 1;
  v.set(hx * edge + Math.cos(a + 1.6) * 0.06 * (1 - edge), hy * edge, ((i % 11) - 5) * 0.015);
}

function fleetRoute(i: number, n: number, v: THREE.Vector3) {
  // A winding logistics route with depots.
  const t = i / n;
  const x = (t - 0.5) * 3.9;
  const y = Math.sin(t * Math.PI * 3.1) * 0.55 + Math.sin(t * Math.PI * 7) * 0.09;
  v.set(x, y, Math.cos(t * Math.PI * 4) * 0.08);
}

const FORMATIONS = [productionLine, fieldGrid, networkGraph, fleetRoute];

/* ------------------------------------------------------------------------- */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uFormA;
  uniform float uFormB;
  uniform vec2  uPointer;
  uniform float uPointerVel;
  uniform float uSize;
  uniform float uDpr;

  attribute vec3 aDrift;
  attribute vec3 aF0;
  attribute vec3 aF1;
  attribute vec3 aF2;
  attribute vec3 aF3;
  attribute float aSeed;

  varying float vGlow;
  varying float vSeed;

  vec3 formation(float idx) {
    // Branchless select across the four formation attributes.
    vec3 p = aF0;
    p = mix(p, aF1, step(0.5, idx) * step(idx, 1.5));
    p = mix(p, aF2, step(1.5, idx) * step(idx, 2.5));
    p = mix(p, aF3, step(2.5, idx));
    return p;
  }

  void main() {
    // Free drift — slow procedural wander, each point on its own phase.
    vec3 drift = aDrift;
    drift.x += sin(uTime * 0.28 + aSeed * 11.0) * 0.16;
    drift.y += cos(uTime * 0.23 + aSeed * 7.0) * 0.14;
    drift.z += sin(uTime * 0.19 + aSeed * 5.0) * 0.12;

    // Blend between the two formations either side of the current transition,
    // then blend that against free drift.
    vec3 target = mix(formation(uFormA), formation(uFormB), uMorph);
    float settle = smoothstep(0.0, 1.0, uMorph);
    vec3 pos = mix(drift, target, settle);

    // Cursor displacement — strength scales with POINTER VELOCITY, which is
    // what makes it feel like air being disturbed rather than a static well.
    vec2 toPointer = pos.xy - uPointer;
    float d = length(toPointer);
    float influence = smoothstep(1.15, 0.0, d);
    float push = influence * (0.30 + uPointerVel * 2.6);
    pos.xy += normalize(toPointer + 1e-5) * push;
    pos.z += influence * uPointerVel * 0.8;

    vGlow = influence * min(uPointerVel * 5.0, 1.0);
    vSeed = aSeed;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    // NOTE: the divisor is the camera distance (~4.4), NOT a large constant.
    // Using 300.0 here made every point tens of pixels wide, and 7,000 of them
    // merged into a solid black mass that covered the whole hero.
    gl_PointSize = uSize * uDpr * (1.0 + vGlow * 1.6) * (5.0 / -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform vec3 uInk;
  uniform vec3 uLive;
  varying float vGlow;
  varying float vSeed;

  void main() {
    // Soft round point — cheaper and cleaner than a texture lookup.
    vec2 c = gl_PointCoord - 0.5;
    float r = dot(c, c);
    if (r > 0.25) discard;
    float alpha = smoothstep(0.25, 0.02, r);

    // Amber only where the cursor is actually disturbing the field — the
    // "live" colour stays rationed, exactly as the design system requires.
    vec3 col = mix(uInk, uLive, vGlow);
    // Deliberately faint: this is a dust field behind type, not a solid mass.
    float base = 0.16 + vSeed * 0.30;
    gl_FragColor = vec4(col, alpha * (base + vGlow * 0.55));
  }
`;

export default function SignalField({
  pointer,
}: {
  pointer: React.RefObject<{ x: number; y: number; vel: number }>;
}) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const phase = useRef({ index: 0, next: 1, t: 0 });

  const { geometry, uniforms } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const drift = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const forms = FORMATIONS.map(() => new Float32Array(COUNT * 3));
    const v = new THREE.Vector3();

    for (let i = 0; i < COUNT; i++) {
      // Free-drift home: a flattened ellipsoid cloud.
      const r = Math.cbrt(Math.random());
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      drift[i * 3] = r * Math.sin(theta) * Math.cos(phi) * 3.1;
      drift[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi) * 1.7;
      drift[i * 3 + 2] = r * Math.cos(theta) * 0.9;
      seeds[i] = Math.random();

      FORMATIONS.forEach((fn, f) => {
        fn(i, COUNT, v);
        forms[f][i * 3] = v.x;
        forms[f][i * 3 + 1] = v.y;
        forms[f][i * 3 + 2] = v.z;
      });
    }

    geo.setAttribute("position", new THREE.BufferAttribute(drift.slice(), 3));
    geo.setAttribute("aDrift", new THREE.BufferAttribute(drift, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    forms.forEach((f, i) =>
      geo.setAttribute(`aF${i}`, new THREE.BufferAttribute(f, 3)),
    );
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 6);

    return {
      geometry: geo,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uFormA: { value: 0 },
        uFormB: { value: 1 },
        uPointer: { value: new THREE.Vector2(99, 99) },
        uPointerVel: { value: 0 },
        uSize: { value: 1.7 },
        uDpr: { value: 1 },
        uInk: { value: new THREE.Color("#cfe0f5") },
        uLive: { value: new THREE.Color("#f0a500") },
      },
    };
  }, []);

  useFrame(({ clock, viewport, gl }, delta) => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    u.uTime.value = clock.elapsedTime;
    u.uDpr.value = gl.getPixelRatio();

    // Pointer → world space on the z = 0 plane.
    const p = pointer.current ?? { x: 0, y: 0, vel: 0 };
    u.uPointer.value.set((p.x * viewport.width) / 2, (p.y * viewport.height) / 2);
    u.uPointerVel.value += (p.vel - u.uPointerVel.value) * Math.min(1, delta * 6);

    // Formation cycle: drift → snap in → hold → dissolve → next.
    const ph = phase.current;
    ph.t += delta;
    const cycle = DRIFT + HOLD;
    const local = ph.t % cycle;
    if (ph.t > cycle) {
      ph.t -= cycle;
      ph.index = ph.next;
      ph.next = (ph.next + 1) % FORMATIONS.length;
    }
    // Ease in over 1.1s, hold, ease out over 1.1s.
    const inT = Math.min(1, local / 1.1);
    const outT = Math.min(1, Math.max(0, (local - (1.1 + HOLD)) / 1.1));
    const ease = (x: number) => x * x * (3 - 2 * x);
    u.uMorph.value = ease(inT) * (1 - ease(outT));
    u.uFormA.value = ph.index;
    u.uFormB.value = ph.index;

    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.045;
  });

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

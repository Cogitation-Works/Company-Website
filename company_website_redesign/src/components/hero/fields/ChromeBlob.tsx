"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * HERO OPTION B — "Liquid chrome".
 *
 * A raymarched metaball on a single full-screen quad. No geometry, no model,
 * no texture, no HDRI — the chrome is a procedural environment evaluated in
 * the fragment shader.
 *
 * Precedent: ThoughtLab's entire refracting blob downloads NOTHING but fonts
 * (measured — no .glb, no .hdr, no textures). This is the same class of
 * effect: maths, not assets.
 *
 * The blob leans toward the cursor and ripples away from fast movement.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uRes;
  uniform vec2  uPointer;
  uniform float uPointerVel;
  uniform vec3  uLive;
  uniform vec3  uCanvas;

  varying vec2 vUv;

  /* --- smooth-minimum union: what fuses spheres into one liquid mass ----- */
  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  float sdSphere(vec3 p, float r) { return length(p) - r; }

  /* --- the scene: five orbiting spheres fused together ------------------- */
  float map(vec3 p) {
    float t = uTime * 0.36;
    float d = sdSphere(p, 0.78);

    for (int i = 0; i < 4; i++) {
      float f = float(i);
      vec3 o = vec3(
        sin(t * (0.7 + f * 0.13) + f * 2.1) * (0.46 + f * 0.05),
        cos(t * (0.6 + f * 0.17) + f * 1.3) * (0.40 + f * 0.04),
        sin(t * (0.5 + f * 0.11) + f * 3.7) * 0.34
      );
      d = smin(d, sdSphere(p - o, 0.34 + f * 0.03), 0.38);
    }

    // Cursor pulls a lobe out of the mass; fast movement pulls harder.
    vec3 pp = vec3(uPointer * 1.25, 0.28);
    d = smin(d, sdSphere(p - pp, 0.20 + uPointerVel * 0.9), 0.44);
    return d;
  }

  vec3 calcNormal(vec3 p) {
    vec2 e = vec2(0.0012, 0.0);
    return normalize(vec3(
      map(p + e.xyy) - map(p - e.xyy),
      map(p + e.yxy) - map(p - e.yxy),
      map(p + e.yyx) - map(p - e.yyx)
    ));
  }

  /* --- procedural studio environment: bright strips on a light field -----
     Chrome only reads as chrome when it reflects HIGH CONTRAST. A flat
     environment makes metal look like matte plastic — that mistake was made
     once already on this project. */
  vec3 env(vec3 rd) {
    float strips = smoothstep(0.55, 0.95, sin(rd.y * 7.0 + 0.6) * 0.5 + 0.5);
    float band   = smoothstep(0.1, 0.9, rd.y * 0.5 + 0.5);
    vec3 base = mix(vec3(0.34), vec3(0.97), band);
    base += strips * 0.85;
    // A warm rim low and behind, so edges catch the brand's live colour.
    base += uLive * smoothstep(0.55, -0.25, rd.y) * 0.30;
    return base;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 2.2;

    vec3 ro = vec3(0.0, 0.0, 3.4);
    vec3 rd = normalize(vec3(uv, -1.9));

    float t = 0.0;
    float hit = 0.0;
    for (int i = 0; i < 68; i++) {
      vec3 p = ro + rd * t;
      float d = map(p);
      if (d < 0.0016) { hit = 1.0; break; }
      if (t > 7.0) break;
      t += d * 0.85;
    }

    if (hit < 0.5) { gl_FragColor = vec4(uCanvas, 0.0); return; }

    vec3 p = ro + rd * t;
    vec3 n = calcNormal(p);
    vec3 r = reflect(rd, n);

    vec3 col = env(r);

    // Fresnel — grazing angles reflect more, which is what sells metal.
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.2);
    col += fres * 0.55;

    // Warm interior glow, brighter where the cursor is disturbing it.
    float core = smoothstep(0.9, 0.0, length(p));
    col = mix(col, uLive * 1.5, core * (0.16 + uPointerVel * 0.5));

    // Soft contact shadow under the mass.
    float alpha = smoothstep(0.0, 0.14, hit);
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function ChromeBlob({
  pointer,
}: {
  pointer: React.RefObject<{ x: number; y: number; vel: number }>;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPointerVel: { value: 0 },
      uLive: { value: new THREE.Color("#f0a500") },
      uCanvas: { value: new THREE.Color("#06090d") },
    }),
    [],
  );

  useFrame(({ clock, size }, delta) => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    u.uTime.value = clock.elapsedTime;
    u.uRes.value.set(size.width, size.height);
    const p = pointer.current ?? { x: 0, y: 0, vel: 0 };
    // Ease the pointer so the lobe follows with weight rather than snapping.
    u.uPointer.value.x += (p.x - u.uPointer.value.x) * Math.min(1, delta * 4);
    u.uPointer.value.y += (p.y - u.uPointer.value.y) * Math.min(1, delta * 4);
    u.uPointerVel.value += (p.vel - u.uPointerVel.value) * Math.min(1, delta * 5);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

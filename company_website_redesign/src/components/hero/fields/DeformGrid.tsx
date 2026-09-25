"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * HERO OPTION C — "The deforming grid".
 *
 * A wireframe plane — read it as a factory floor, a field, or a network mesh —
 * tilted away in perspective. The cursor dents it like cloth, and amber pulses
 * travel along the lines toward the dent.
 *
 * Drawn as THREE.LineSegments so the wire is real geometry, not a texture.
 * Displacement happens entirely in the vertex shader: one draw call, no CPU
 * work per frame.
 */

const SEG = 64;      // cells per side
const SIZE = 9.0;    // world units

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uPointer;
  uniform float uPointerVel;
  varying float vDent;
  varying float vPulse;
  varying float vDist;

  void main() {
    vec3 pos = position;

    // Ambient swell so the surface is never dead flat.
    float swell =
      sin(pos.x * 0.55 + uTime * 0.5) * 0.10 +
      cos(pos.y * 0.62 - uTime * 0.42) * 0.10;
    pos.z += swell;

    // Cursor dent — a smooth well that deepens with pointer speed.
    float d = distance(pos.xy, uPointer);
    float well = exp(-d * d * 0.55);
    float depth = 0.85 + uPointerVel * 3.4;
    pos.z -= well * depth;

    vDent = well;
    vDist = d;

    // Rings travelling outward from the cursor.
    vPulse = smoothstep(0.55, 1.0, sin(d * 2.6 - uTime * 2.4)) * smoothstep(4.2, 0.4, d);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  // highp, not mediump: uPointerVel is also declared in the vertex shader,
  // where float defaults to highp. A precision mismatch on a shared uniform
  // fails program validation outright.
  precision highp float;
  uniform vec3 uLine;
  uniform vec3 uLive;
  uniform float uPointerVel;
  varying float vDent;
  varying float vPulse;
  varying float vDist;

  void main() {
    // Base wire fades with distance so the horizon dissolves instead of
    // ending in a hard edge.
    float fade = smoothstep(7.5, 1.0, vDist * 0.9 + 1.0);
    float a = 0.16 + fade * 0.30;

    // Amber only where the surface is actually being disturbed — keeps the
    // live colour rationed per the design system.
    float energy = clamp(vDent * (0.5 + uPointerVel * 3.0) + vPulse * 0.75, 0.0, 1.0);
    vec3 col = mix(uLine, uLive, energy);
    a += energy * 0.55;

    gl_FragColor = vec4(col, a);
  }
`;

export default function DeformGrid({
  pointer,
}: {
  pointer: React.RefObject<{ x: number; y: number; vel: number }>;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    // Build the wire lattice by hand: horizontal and vertical segments only,
    // which reads as a floor plan rather than triangulated mesh diagonals.
    const verts: number[] = [];
    const step = SIZE / SEG;
    const half = SIZE / 2;
    for (let i = 0; i <= SEG; i++) {
      for (let j = 0; j < SEG; j++) {
        const y = -half + i * step;
        const x0 = -half + j * step;
        const x1 = x0 + step;
        verts.push(x0, y, 0, x1, y, 0);        // horizontal
        verts.push(y, x0, 0, y, x1, 0);        // vertical
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), SIZE);
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPointerVel: { value: 0 },
      uLine: { value: new THREE.Color("#5f7288") },
      uLive: { value: new THREE.Color("#f0a500") },
    }),
    [],
  );

  useFrame(({ clock, viewport }, delta) => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    u.uTime.value = clock.elapsedTime;
    const p = pointer.current ?? { x: 0, y: 0, vel: 0 };
    // Map pointer into the plane's own rotated space.
    const tx = (p.x * viewport.width) / 2;
    const ty = (p.y * viewport.height) / 2 + 1.2;
    u.uPointer.value.x += (tx - u.uPointer.value.x) * Math.min(1, delta * 7);
    u.uPointer.value.y += (ty - u.uPointer.value.y) * Math.min(1, delta * 7);
    u.uPointerVel.value += (p.vel - u.uPointerVel.value) * Math.min(1, delta * 6);
  });

  return (
    <lineSegments
      geometry={geometry}
      rotation={[-Math.PI / 2.85, 0, 0]}
      position={[0, -0.6, 0]}
      frustumCulled={false}
    >
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </lineSegments>
  );
}

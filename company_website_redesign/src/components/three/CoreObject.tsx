"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * "The Core" — the site's signature object.
 *
 * A machined chrome shell in six curved plates enclosing a glass core, with
 * fine amber particles drifting inside. On scroll the plates separate and
 * rotate, revealing the core.
 *
 * Built entirely from procedural geometry: no .glb, no textures, no HDRI
 * download. The reference study found Lusion and ThoughtLab ship no 3D model
 * files at all — geometry is generated and lighting is environment-only.
 * We do the same, which keeps this inside the performance budget.
 */

// Matched to the approved poster render: four quadrant petals, elongated core.
const PLATE_COUNT = 4;
const PLATE_GAP = 0.13; // fraction of each slice left as a gap between plates
const PARTICLE_COUNT = 1100;
const MAX_SPREAD = 0.95; // how far plates travel when fully open

function Plate({
  index,
  openRef,
}: {
  index: number;
  openRef: React.RefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const { geometry, outward } = useMemo(() => {
    const slice = (Math.PI * 2) / PLATE_COUNT;
    const phiStart = index * slice;
    const phiLength = slice * (1 - PLATE_GAP);

    const geo = new THREE.SphereGeometry(
      1,
      24,
      32,
      phiStart,
      phiLength,
      0,
      Math.PI,
    );

    // Outward normal at the plate's centre azimuth. Three's sphere maps
    // x = -cos(phi) * sin(theta), z = sin(phi) * sin(theta); at the equator
    // theta = PI/2, so sin(theta) = 1.
    const phiCentre = phiStart + phiLength / 2;
    const dir = new THREE.Vector3(
      -Math.cos(phiCentre),
      0,
      Math.sin(phiCentre),
    ).normalize();

    return { geometry: geo, outward: dir };
  }, [index]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const open = openRef.current ?? 0;

    // Idle breathing so the object is never completely static, plus the
    // scroll-driven separation on top of it.
    const breathe = Math.sin(t * 0.6 + index * 0.5) * 0.014;
    const spread = open * MAX_SPREAD + breathe;

    ref.current.position.copy(outward).multiplyScalar(spread);

    // Plates fan outward as they separate — a mechanism opening, not a
    // sphere cracking. Alternating signs keep it from looking symmetrical.
    const sign = index % 2 === 0 ? 1 : -1;
    ref.current.rotation.y = open * 0.42 * sign;
    ref.current.rotation.x = open * 0.26 * (index % 3 === 0 ? 1 : -1);
    // Plates also scale down slightly, so the core reads as the subject.
    const s = 1 - open * 0.12;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} geometry={geometry} castShadow={false}>
      <meshStandardMaterial
        color="#c9ced6"
        metalness={1}
        roughness={0.14}
        side={THREE.DoubleSide}
        envMapIntensity={1.15}
      />
    </mesh>
  );
}

function Particles({ openRef }: { openRef: React.RefObject<number> }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, seeds } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const sd = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Even distribution inside a sphere (cube-root keeps it from clumping
      // at the centre).
      const r = 0.50 * Math.cbrt(Math.random());
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      // Elongated vertically to fill the capsule-shaped core.
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi) * 1.42;
      pos[i * 3 + 2] = r * Math.cos(theta);
      sd[i] = Math.random();
    }
    return { positions: pos, seeds: sd };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const open = openRef.current ?? 0;

    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const s = seeds[i];
      // Slow vertical drift with a per-particle phase — reads as suspended
      // signal rather than falling dust.
      arr[i * 3 + 1] =
        positions[i * 3 + 1] + Math.sin(t * 0.4 + s * 12) * 0.022;
      arr[i * 3] =
        positions[i * 3] + Math.cos(t * 0.3 + s * 9) * 0.016;
    }
    attr.needsUpdate = true;

    ref.current.rotation.y = t * 0.06;
    const mat = ref.current.material as THREE.PointsMaterial;
    // Particles brighten as the shell opens.
    mat.opacity = 0.35 + open * 0.5;
    mat.size = 0.012 + open * 0.006;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f0a500"
        size={0.012}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function CoreObject({
  openRef,
  pointerRef,
}: {
  openRef: React.RefObject<number>;
  pointerRef: React.RefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    const p = pointerRef.current ?? { x: 0, y: 0 };

    // Continuous slow rotation, plus a gentle pointer parallax eased toward
    // the target so it never snaps.
    group.current.rotation.y += delta * 0.12;

    const targetX = p.y * 0.18;
    const targetZ = p.x * 0.08;
    group.current.rotation.x +=
      (targetX - group.current.rotation.x) * Math.min(1, delta * 2.2);
    group.current.rotation.z +=
      (targetZ - group.current.rotation.z) * Math.min(1, delta * 2.2);

    group.current.position.y = Math.sin(t * 0.5) * 0.045;
  });

  return (
    <group ref={group} scale={1.32}>
      {/* Inner glass core */}
      {/* Core is a vertical capsule, not a sphere — matches the poster. */}
      <mesh scale={[1, 1.4, 1]}>
        <sphereGeometry args={[0.58, 48, 48]} />
        <MeshTransmissionMaterial
          samples={4}
          resolution={256}
          thickness={0.55}
          roughness={0.05}
          ior={1.42}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.25}
          temporalDistortion={0.08}
          color="#ffd27a"
          attenuationColor="#f0a500"
          attenuationDistance={1.1}
        />
      </mesh>

      <Particles openRef={openRef} />

      {Array.from({ length: PLATE_COUNT }).map((_, i) => (
        <Plate key={i} index={i} openRef={openRef} />
      ))}
    </group>
  );
}

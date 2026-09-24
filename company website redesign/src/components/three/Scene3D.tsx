"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * One canvas, six objects. Every page that wants 3D gets a different one, so
 * the site does not repeat the same glass blob eight times.
 *
 *   glass    refractive icosahedron with a glowing core   (managed teams, products)
 *   lattice  instanced cube lattice, breathing             (backend & cloud)
 *   ribbon   extruded torus knot in chrome                 (frontend & edge)
 *   shards   scattered plates drifting in depth            (mobile & desktop)
 *   orbit    particle ring system                          (AI & IoT)
 *   wave     displaced wireframe plane                     (growth & marketing)
 *
 * Shared rules, learned the hard way on the hero Core:
 *  - procedural geometry only — no .glb, no textures, no HDRI download;
 *  - an enveloping environment shell, or metal and glass refract an empty scene
 *    and render as black;
 *  - low `samples`/`resolution` on transmission, which re-renders the scene per
 *    sample and will halve the frame rate of a decorative background;
 *  - callers gate on desktop + reduced-motion + not-inside-the-magnifier-copy.
 */

export type SceneVariant =
  | "glass"
  | "lattice"
  | "ribbon"
  | "shards"
  | "orbit"
  | "wave";

/* ----------------------------------------------------------------- glass */

function Glass({ accent }: { accent: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.18;
      mesh.current.rotation.y += delta * 0.26;
    }
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} scale={1.35}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={256}
          thickness={5}
          reflectivity={0.32}
          roughness={0.1}
          anisotropy={0.63}
          chromaticAberration={0.07}
          distortion={2.08}
          distortionScale={0.4}
          temporalDistortion={0.22}
          ior={1.42}
          color="#ffffff"
        />
      </mesh>
      <mesh scale={0.26}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      <pointLight intensity={1.6} color={accent} distance={4} />
    </group>
  );
}

/* --------------------------------------------------------------- lattice */

function Lattice({ accent }: { accent: string }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  /* Points on a Fibonacci sphere — an even distribution without the pole
     clustering a naive lat/long loop produces. */
  const points = useMemo(() => {
    const n = 150;
    const out: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = phi * i;
      out.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r));
    }
    return out;
  }, []);

  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const breathe = 1 + Math.sin(t * 0.5) * 0.09;
    points.forEach((p, i) => {
      dummy.position.copy(p).multiplyScalar(1.3 * breathe);
      dummy.rotation.set(t * 0.2 + i, t * 0.15 + i, 0);
      dummy.scale.setScalar(0.07);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
    m.rotation.y = t * 0.12;
  });

  return (
    <>
      <instancedMesh ref={ref} args={[undefined, undefined, points.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#cfd6de"
          metalness={0.9}
          roughness={0.22}
          envMapIntensity={1.1}
        />
      </instancedMesh>
      {/* Small and lit rather than large and flat. At 0.5 with a basic
          material this read as an opaque disc pasted behind the cubes. */}
      <mesh scale={0.22}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      <pointLight intensity={4} color={accent} distance={7} />
    </>
  );
}

/* ---------------------------------------------------------------- ribbon */

function Ribbon({ accent }: { accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.14;
    ref.current.rotation.z += delta * 0.1;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
  });
  return (
    <>
      <mesh ref={ref} scale={0.92}>
        <torusKnotGeometry args={[1, 0.3, 200, 32, 2, 3]} />
        <meshStandardMaterial
          color="#e6ebf1"
          metalness={1}
          roughness={0.12}
          envMapIntensity={1.4}
        />
      </mesh>
      <pointLight position={[2, 1, 3]} intensity={2} color={accent} />
    </>
  );
}

/* ---------------------------------------------------------------- shards */

function Shards({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null);
  const plates = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        pos: [
          (Math.random() - 0.5) * 4.6,
          (Math.random() - 0.5) * 4.2,
          (Math.random() - 0.5) * 3,
        ] as [number, number, number],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: 0.3 + Math.random() * 0.55,
        speed: 0.2 + Math.random() * 0.5,
        i,
      })),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.07;
    group.current.children.forEach((c, i) => {
      c.rotation.x += delta * 0.1 * plates[i].speed;
      c.position.y += Math.sin(state.clock.elapsedTime * plates[i].speed + i) * 0.0016;
    });
  });

  return (
    <group ref={group}>
      {plates.map((p) => (
        <mesh key={p.i} position={p.pos} rotation={p.rot} scale={p.scale}>
          <boxGeometry args={[1, 1.4, 0.04]} />
          <meshStandardMaterial
            color={p.i % 4 === 0 ? accent : "#aab4c0"}
            metalness={0.85}
            roughness={0.25}
            envMapIntensity={1.1}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ----------------------------------------------------------------- orbit */

function Orbit({ accent }: { accent: string }) {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const n = 2600;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      // Three nested rings with vertical scatter, so it reads as a system
      // rather than as a sphere of noise.
      const ring = i % 3;
      const r = 1.2 + ring * 0.55 + (Math.random() - 0.5) * 0.12;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5 * (ring + 1) * 0.4;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.16;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.18;
  });

  return (
    <>
      <points ref={ref} geometry={geo}>
        <pointsMaterial
          size={0.022}
          color={accent}
          transparent
          opacity={0.9}
          sizeAttenuation
          toneMapped={false}
        />
      </points>
      <mesh scale={0.3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffd88a" toneMapped={false} />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ wave */

function Wave({ accent }: { accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.PlaneGeometry(7, 7, 56, 56), []);
  const base = useMemo(
    () => Float32Array.from(geo.attributes.position.array),
    [geo],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      pos.setZ(
        i,
        Math.sin(x * 0.7 + t * 0.7) * 0.28 + Math.cos(y * 0.6 - t * 0.5) * 0.24,
      );
    }
    pos.needsUpdate = true;
    if (ref.current) ref.current.rotation.z = t * 0.03;
  });

  return (
    <mesh ref={ref} geometry={geo} rotation={[-Math.PI / 2.6, 0, 0]}>
      <meshBasicMaterial color={accent} wireframe transparent opacity={0.42} />
    </mesh>
  );
}

/* ----------------------------------------------------------------- scene */

export default function Scene3D({
  variant,
  accent = "#f0a500",
  className = "",
  transparent = false,
}: {
  variant: SceneVariant;
  accent?: string;
  className?: string;
  /** Leave the canvas transparent so the section background shows through. */
  transparent?: boolean;
}) {
  const needsEnv = variant === "glass" || variant === "lattice" || variant === "ribbon" || variant === "shards";

  return (
    <Canvas
      className={className}
      dpr={[1, 1.6]}
      gl={{ antialias: false, alpha: transparent, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 38 }}
      style={{ pointerEvents: "none" }}
    >
      {transparent ? null : <color attach="background" args={["#06090d"]} />}
      <ambientLight intensity={0.6} />

      {/* Only the metal and glass variants pay for an environment. Points and
          wireframes do not sample it, so building one would be pure cost. */}
      {needsEnv ? (
        <Environment resolution={128}>
          <Lightformer intensity={2.4} position={[0, 4, 2]} scale={[8, 3, 1]} />
          <Lightformer intensity={1.2} position={[-4, 0, 2]} scale={[3, 8, 1]} />
          <Lightformer intensity={1.6} position={[4, 1, 1]} scale={[3, 6, 1]} />
          <mesh scale={30}>
            <sphereGeometry args={[1, 24, 24]} />
            <meshBasicMaterial color="#141c25" side={THREE.BackSide} />
          </mesh>
        </Environment>
      ) : null}

      {variant === "glass" && <Glass accent={accent} />}
      {variant === "lattice" && <Lattice accent={accent} />}
      {variant === "ribbon" && <Ribbon accent={accent} />}
      {variant === "shards" && <Shards accent={accent} />}
      {variant === "orbit" && <Orbit accent={accent} />}
      {variant === "wave" && <Wave accent={accent} />}
    </Canvas>
  );
}

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh, Group } from "three";

/**
 * A real 3D object for the product pages — refractive glass over the page.
 *
 * The material values are not guesses. Noomo publish a live configurator for
 * their glass at playground.noomoagency.com, and the sliders are drei's
 * `MeshTransmissionMaterial` props one-for-one. These are read straight off
 * that UI (recorded in the research doc, §WATCHED IN MOTION):
 *
 *   thickness 5 · reflectivity 0.32 · roughness 0.1 · anisotropy 0.63
 *   chromaticAberration 0.07 · distortion 2.08 · temporalDistortion 0.22
 *
 * Geometry is procedural — an icosahedron and a torus, no .glb, no textures, no
 * HDRI download. The environment is a small Lightformer rig, which is what
 * makes the refraction read without shipping a 2MB .hdr.
 *
 * `samples` and `resolution` are deliberately low. Transmission renders the
 * scene again per sample; the default settings will drop a mid-range GPU to
 * single figures for a decorative background object.
 */

function Knot({ accent, speed }: { accent: string; speed: number }) {
  const mesh = useRef<Mesh>(null);
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.18 * speed;
      mesh.current.rotation.y += delta * 0.26 * speed;
    }
    if (group.current) {
      // Very slow bob so it never sits perfectly still.
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} scale={1.35}>
        {/* One subdivision: a bare icosahedron is so faceted that the
            refraction reads as noise rather than as glass. */}
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

      {/* A glowing core inside the glass — the same family as the hero Core, so
          the object reads as belonging to this site rather than to a demo.
          Kept small and dim: at 0.42 scale with an untonemapped basic material
          it blew out through the refraction and swamped the glass entirely. */}
      <mesh scale={0.26}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={1.6} color={accent} distance={4} />
    </group>
  );
}

export default function GlassObject({
  accent = "#f0a500",
  speed = 1,
  className = "",
}: {
  accent?: string;
  speed?: number;
  className?: string;
}) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.6]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 38 }}
      // The scene only changes when it animates, and it always animates — but
      // capping at a modest frameloop keeps it off the critical path.
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={["#06090d"]} />
      <ambientLight intensity={0.6} />

      {/* Procedural studio rig. An enveloping shell is needed or the glass
          refracts an empty scene and renders as a black blob — the same bug
          that hit the hero Core. */}
      <Environment resolution={128}>
        <Lightformer intensity={2.4} position={[0, 4, 2]} scale={[8, 3, 1]} />
        <Lightformer intensity={1.2} position={[-4, 0, 2]} scale={[3, 8, 1]} />
        <Lightformer intensity={1.6} position={[4, 1, 1]} scale={[3, 6, 1]} />
        <mesh scale={30}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial color="#141c25" side={1} />
        </mesh>
      </Environment>

      <Knot accent={accent} speed={speed} />
    </Canvas>
  );
}

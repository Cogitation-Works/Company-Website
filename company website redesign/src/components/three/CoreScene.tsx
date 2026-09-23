"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import CoreObject from "./CoreObject";

/**
 * Canvas host for the Core.
 *
 * Lighting is a procedural studio rig built from Lightformers rather than a
 * downloaded HDRI — same look, zero network cost, and it keeps us well inside
 * the asset budget (the reference study found Peachweb renders a full 3D world
 * in 108 requests while Terminal takes 1,247).
 *
 * The caller decides whether this renders at all; see useCanRender3D().
 */
export default function CoreScene({ className }: { className?: string }) {
  const openRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Shell separation is tied to how far into the hero the visitor has
    // scrolled. Read directly in the render loop — no React state, so no
    // re-renders during scroll.
    const onScroll = () => {
      const vh = window.innerHeight || 1;
      const t = Math.min(1, Math.max(0, window.scrollY / (vh * 0.85)));
      // Ease so the shell barely moves at first, then opens decisively.
      openRef.current = t * t * (3 - 2 * t);
    };

    const onPointer = (e: PointerEvent) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        // Cap DPR: retina at 2x doubles fragment cost for no visible gain here.
        dpr={[1, 1.75]}
        style={{ background: "transparent" }}
      >
        <CoreObject openRef={openRef} pointerRef={pointerRef} />

        <Environment resolution={256}>
          {/* Enveloping studio room.
              Chrome reflects its environment, so with only small lightformers
              in empty space the metal mirrors black. This bright neutral
              shell is what makes it read as polished chrome rather than a
              black ball. It is geometry inside the env cubemap only — it is
              never visible in the scene itself. */}
          <mesh scale={60}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="#eef1f5" side={THREE.BackSide} />
          </mesh>
          {/* Floor bounce — slightly brighter below the horizon */}
          <Lightformer
            form="rect"
            intensity={0.9}
            color="#ffffff"
            position={[0, -6, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[14, 14, 1]}
          />

          {/* Key — large soft source, upper front left */}
          <Lightformer
            form="rect"
            intensity={3.2}
            position={[-3, 3, 4]}
            scale={[7, 7, 1]}
            target={[0, 0, 0]}
          />
          {/* Fill — cool, right */}
          <Lightformer
            form="rect"
            intensity={1.4}
            color="#dbe6fe"
            position={[4, 0.5, 2]}
            scale={[5, 5, 1]}
            target={[0, 0, 0]}
          />
          {/* Rim — warm amber, behind, so the chrome edges catch the live colour */}
          <Lightformer
            form="ring"
            intensity={1.8}
            color="#f59e0b"
            position={[0, -1.5, -4]}
            scale={[4, 4, 1]}
            target={[0, 0, 0]}
          />
          {/* Top bounce — keeps the upper plates from going dead */}
          <Lightformer
            form="rect"
            intensity={1.6}
            position={[0, 5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[8, 8, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

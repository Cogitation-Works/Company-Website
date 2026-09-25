"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Text } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { playClink, playScatter } from "@/lib/glassSound";

/**
 * A sphere of glass tiles in front of a giant wordmark — click and hold to
 * break it open.
 *
 * Built from labs.noomoagency.com, inspected the same way as the other
 * references (shaderSource hook + network log + the client's screen
 * recording). What their build is, and what is reproduced:
 *
 *   · the sphere is hundreds of FLAT rectangular tiles on latitude rings
 *     (their `segRoman.glb` / `half4.glb`) — instanced;
 *   · the material is MeshPhysicalMaterial with transmission, iridescence,
 *     clearcoat and dispersion (all four present in their compiled shaders);
 *   · the lighting is Poly Haven's `photo_studio_01` HDRI — CC0, so it is the
 *     same file here, self-hosted in /public/hdri;
 *   · THE KEY DETAIL: the wordmark is rendered INSIDE the WebGL scene (theirs
 *     from a Druk font JSON). Transmission can only refract what is in the
 *     scene, so a DOM headline behind a canvas would show through unchanged —
 *     that is why every tile in theirs carries a sliver of black letter.
 *
 * What differs, deliberately: the tiles are generated here rather than loaded
 * from a .glb, the font is Anton (OFL, self-hosted) rather than the commercial
 * Druk, and the sounds are synthesised rather than their .mp3 files.
 *
 * Interaction, as in the recording: press and hold anywhere in the hero. The
 * tiles push outward and twist as the hold builds, with glass ticking faster
 * as it strains; complete the hold and the sphere bursts — tiles fly off, a
 * scatter sound — then reassembles. Let go early and it springs back.
 */

const HOLD_MS = 1600;
const BURST_MS = 2600;
const BG = "#eceef3";
const BG_COLOR = new THREE.Color(BG);

type Tile = {
  dir: THREE.Vector3;
  quat: THREE.Quaternion;
  w: number;
  h: number;
  vel: THREE.Vector3;
  spin: THREE.Vector3;
  phase: number;
};

export type SphereControl = {
  down: boolean;
  /** Written by the scene each frame; read by the DOM progress bar. */
  progress: number;
  bursting: boolean;
};

export default function TileSphere({
  control,
  word,
}: {
  control: React.MutableRefObject<SphereControl>;
  word: string;
}) {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.6]}
      /* No tone mapping. The transmission buffer is already tone-mapped, and
         the glass output went through ACES a second time — the background
         seen through every tile came out a shade darker, so the whole sphere
         read as grey panels instead of clear glass. */
      flat
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 8], fov: 34 }}
    >
      {/* Opaque, matched to the section. Transmission samples a render of the
          scene behind the glass; with a transparent clear colour the empty
          parts of that render are black and every tile turns dark. */}
      <color attach="background" args={[BG]} />

      {/* ⚠️ Suspense INSIDE the Canvas is load-bearing.
          drei's <Text> suspends while its font loads, and <Environment>
          suspends while the HDR loads. Without a boundary in here the
          suspension bubbles out of the R3F tree to next/dynamic's boundary,
          which unmounts the ENTIRE canvas and mounts a fresh one. Measured:
          the component mounted twice, the first renderer was disposed
          500ms later with forceContextLoss(), and the survivor stopped
          drawing after ~60 frames — a canvas showing only the background. */}
      <Suspense fallback={null}>
        <Environment files="/hdri/photo_studio_01_1k.hdr" />
        <Scene control={control} word={word} />
      </Suspense>
    </Canvas>
  );
}

function Scene({
  control,
  word,
}: {
  control: React.MutableRefObject<SphereControl>;
  word: string;
}) {
  const { viewport, camera, size } = useThree();
  const mesh = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);

  const pointer = useRef(new THREE.Vector2(0, 0));
  const hold = useRef(0);
  const burstAt = useRef(-1);
  const lastClink = useRef(0);
  const tilt = useRef(new THREE.Vector2(0, 0));

  // Sphere sized to the viewport so it dominates like theirs at any width.
  const R = Math.min(viewport.height * 0.4, viewport.width * 0.24);

  /* Tiles on latitude rings. Ring count and per-ring count are chosen so tiles
     come out roughly square, and each is shrunk a little to leave the gaps
     that make it read as a mosaic rather than a solid ball. */
  const tiles = useMemo<Tile[]>(() => {
    const out: Tile[] = [];
    const RINGS = 13;
    const up = new THREE.Vector3(0, 0, 1);
    for (let r = 0; r < RINGS; r++) {
      const lat = -Math.PI / 2 + ((r + 0.5) / RINGS) * Math.PI;
      const ringR = Math.cos(lat);
      const count = Math.max(5, Math.round(30 * ringR));
      for (let i = 0; i < count; i++) {
        const lon = (i / count) * Math.PI * 2 + (r % 2) * (Math.PI / count);
        const dir = new THREE.Vector3(
          Math.cos(lat) * Math.cos(lon),
          Math.sin(lat),
          Math.cos(lat) * Math.sin(lon),
        );
        // Face outward, with the tile's "up" along the meridian.
        const m = new THREE.Matrix4().lookAt(new THREE.Vector3(), dir, new THREE.Vector3(0, 1, 0));
        const quat = new THREE.Quaternion().setFromRotationMatrix(m);
        quat.multiply(new THREE.Quaternion().setFromUnitVectors(up, new THREE.Vector3(0, 0, -1)));
        /* A small random tilt per tile, even at rest. Perfectly tangent tiles
           refract the wordmark almost straight through; tilted ones each
           shift it by a different amount, which is what slices the letters
           into the offset fragments you see in the reference. */
        quat.multiply(
          new THREE.Quaternion().setFromEuler(
            new THREE.Euler((Math.random() - 0.5) * 0.26, (Math.random() - 0.5) * 0.26, (Math.random() - 0.5) * 0.08),
          ),
        );
        out.push({
          dir,
          quat,
          w: ((Math.PI * 2 * ringR) / count) * 0.86,
          h: (Math.PI / RINGS) * 0.86,
          vel: dir
            .clone()
            .multiplyScalar(2.2 + Math.random() * 2.8)
            .add(new THREE.Vector3((Math.random() - 0.5) * 1.6, (Math.random() - 0.3) * 1.6, (Math.random() - 0.5) * 1.6)),
          spin: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(9),
          phase: Math.random() * Math.PI * 2,
        });
      }
    }
    return out;
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const q = useMemo(() => new THREE.Quaternion(), []);
  const e = useMemo(() => new THREE.Euler(), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    const now = performance.now();
    const t = state.clock.elapsedTime;
    const c = control.current;

    /* ---- hold / burst state machine */
    const bursting = burstAt.current >= 0;
    if (!bursting) {
      if (c.down) {
        hold.current = Math.min(1, hold.current + (delta * 1000) / HOLD_MS);
        // Ticking gets faster and louder as the sphere strains.
        const gap = 190 - hold.current * 150;
        if (now - lastClink.current > gap) {
          lastClink.current = now;
          playClink(hold.current);
        }
        if (hold.current >= 1) {
          burstAt.current = now;
          playScatter();
        }
      } else {
        // Let go early: spring back, faster than it opened.
        hold.current = Math.max(0, hold.current - delta * 2.2);
      }
    }

    let burst = 0; // 0 → 1 → 0 across the burst
    let reform = 0;
    if (burstAt.current >= 0) {
      const p = (now - burstAt.current) / BURST_MS;
      if (p >= 1) {
        burstAt.current = -1;
        hold.current = 0;
      } else {
        burst = p < 0.55 ? 1 - Math.pow(1 - p / 0.55, 3) : 1;
        reform = p < 0.62 ? 0 : (p - 0.62) / 0.38;
        reform = reform * reform * (3 - 2 * reform);
        hold.current = 1 - reform;
      }
    }
    c.progress = hold.current;
    c.bursting = burstAt.current >= 0;

    const h = hold.current;
    const ease = h * h;

    /* ---- the whole sphere: slow turn, leaning toward the pointer */
    tilt.current.lerp(pointer.current, 0.04);
    if (group.current) {
      group.current.rotation.y = t * 0.12 + tilt.current.x * 0.35;
      group.current.rotation.x = -tilt.current.y * 0.25 + Math.sin(t * 0.3) * 0.05;
    }

    /* ---- each tile */
    const flight = burst * (1 - reform);
    for (let i = 0; i < tiles.length; i++) {
      const tl = tiles[i];
      // Idle breathing, then the hold pushes tiles outward unevenly — the
      // unevenness is what makes it look like it is straining to open.
      const breathe = Math.sin(t * 1.3 + tl.phase) * 0.012;
      const push = ease * (0.22 + 0.16 * Math.sin(tl.phase * 3.1)) + h * 0.02 * Math.sin(t * 22 + tl.phase);
      const radius = R * (1 + breathe + push);

      tmp.copy(tl.dir).multiplyScalar(radius);
      tmp.addScaledVector(tl.vel, flight * R * 0.9);
      tmp.y -= flight * flight * R * 0.9; // gravity on the way out
      dummy.position.copy(tmp);

      // Twist grows with the hold; spin takes over during the burst.
      e.set(
        tl.spin.x * (0.05 * ease + flight * 0.9),
        tl.spin.y * (0.05 * ease + flight * 0.9),
        tl.spin.z * (0.05 * ease + flight * 0.9),
      );
      q.setFromEuler(e);
      dummy.quaternion.copy(tl.quat).multiply(q);

      const shrink = 1 - flight * 0.35;
      dummy.scale.set(tl.w * R * shrink, tl.h * R * shrink, R * 0.022);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  // Wordmark sized to span most of the viewport, as theirs does.
  const fontSize = Math.min(viewport.width * 0.16, viewport.height * 0.34);
  void camera;
  void size;

  return (
    <>
      <Text
        font="/fonts/Anton-Regular.ttf"
        fontSize={fontSize}
        letterSpacing={-0.01}
        color="#050608"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, -R * 0.6]}
      >
        {word}
      </Text>

      <group ref={group}>
        <instancedMesh ref={mesh} args={[undefined, undefined, tiles.length]} frustumCulled={false}>
          <boxGeometry args={[1, 1, 1]} />
          {/* MeshTransmissionMaterial rather than plain MeshPhysicalMaterial
              transmission. The physical version rendered every tile milky
              white — hiding the wordmark instead of showing it through the
              glass, which is the entire point of the effect. drei's version
              renders the scene into its own buffer and refracts that, and adds
              the chromatic aberration that gives their tiles the blue/pink
              fringing along the edges of the letters. */}
          <MeshTransmissionMaterial
            color="#ffffff"
            transmission={1}
            thickness={0.6}
            roughness={0.01}
            ior={1.45}
            chromaticAberration={0.06}
            anisotropy={0.15}
            distortion={0}
            temporalDistortion={0}
            iridescence={0.22}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[120, 420]}
            clearcoat={0.6}
            clearcoatRoughness={0.02}
            samples={10}
            resolution={768}
            backside={false}
            /* Low on purpose. At 1.1 the white studio reflection dominated
               every face-on tile and the whole sphere read as frosted — theirs
               is nearly invisible wherever there is no letter behind it. */
            envMapIntensity={0.45}
            background={BG_COLOR}
          />
        </instancedMesh>
      </group>
    </>
  );
}

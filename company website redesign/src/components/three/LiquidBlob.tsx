"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * A raymarched liquid glass blob — iridescent rim, chromatic refraction, and a
 * surface that wobbles as the pointer moves.
 *
 * TECHNIQUE, and where it comes from
 * ----------------------------------
 * Built after inspecting thoughtlab.com's compiled shader (captured by hooking
 * `WebGLRenderingContext.prototype.shaderSource` before their bundle ran). What
 * that showed, and what is reproduced here:
 *
 *   · the shape is two SDF spheres joined with a smooth minimum, each following
 *     the pointer at a DIFFERENT lag — that lag difference is what makes it
 *     stretch and wobble rather than slide;
 *   · the surface is classic 3D Perlin noise at two frequencies, animated;
 *   · normals come from the cross product of two tangent-offset displaced
 *     points, not from the SDF gradient — without this the noise shapes the
 *     silhouette but does not shade;
 *   · the rim is two Fresnel terms summed and raised to a power;
 *   · refraction offsets the sample position, and R, G and B are sampled at
 *     three slightly different offsets to produce the colour fringe;
 *   · they then sample a downloaded cubemap and push it through
 *     `saturation(tex, 5.0)` for the iridescence.
 *
 * WHAT IS DIFFERENT HERE, deliberately
 * ------------------------------------
 *   1. The shader below is written from scratch. Theirs samples `tRender` — a
 *      render target of *their* scene — and a cubemap from *their* server;
 *      pasted across it would render black on this site.
 *   2. The environment is PROCEDURAL. Instead of six downloaded .webp cubemap
 *      faces, `env()` builds a studio from our own tokens — deep, signal blue
 *      and live amber — so the blob belongs to this brand and costs no network
 *      requests.
 *   3. Raymarching is bounded and the noise is evaluated once per step rather
 *      than twice, because the displacement is applied to a single field.
 *
 * The Perlin implementation is Stefan Gustavson's classic `cnoise`, which is
 * public domain and is the same one nearly every WebGL site uses.
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform vec2  uRes;
  uniform float uTime;
  uniform vec2  uM1;      // fast pointer follower
  uniform vec2  uM2;      // slow pointer follower — the lag difference wobbles it
  uniform float uSize;
  uniform vec3  uDeep;
  uniform vec3  uAccentA;
  uniform vec3  uAccentB;
  uniform float uOpacity;

  /* ---- Perlin noise (Stefan Gustavson, public domain) --------------------- */
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  vec3 fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}
  float cnoise(vec3 P){
    vec3 Pi0=floor(P), Pi1=Pi0+vec3(1.0);
    Pi0=mod289(Pi0); Pi1=mod289(Pi1);
    vec3 Pf0=fract(P), Pf1=Pf0-vec3(1.0);
    vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);
    vec4 iy=vec4(Pi0.yy,Pi1.yy);
    vec4 iz0=Pi0.zzzz, iz1=Pi1.zzzz;
    vec4 ixy=permute(permute(ix)+iy);
    vec4 ixy0=permute(ixy+iz0), ixy1=permute(ixy+iz1);
    vec4 gx0=ixy0*(1.0/7.0);
    vec4 gy0=fract(floor(gx0)*(1.0/7.0))-0.5; gx0=fract(gx0);
    vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);
    vec4 sz0=step(gz0,vec4(0.0));
    gx0-=sz0*(step(0.0,gx0)-0.5); gy0-=sz0*(step(0.0,gy0)-0.5);
    vec4 gx1=ixy1*(1.0/7.0);
    vec4 gy1=fract(floor(gx1)*(1.0/7.0))-0.5; gx1=fract(gx1);
    vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);
    vec4 sz1=step(gz1,vec4(0.0));
    gx1-=sz1*(step(0.0,gx1)-0.5); gy1-=sz1*(step(0.0,gy1)-0.5);
    vec3 g000=vec3(gx0.x,gy0.x,gz0.x), g100=vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010=vec3(gx0.z,gy0.z,gz0.z), g110=vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001=vec3(gx1.x,gy1.x,gz1.x), g101=vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011=vec3(gx1.z,gy1.z,gz1.z), g111=vec3(gx1.w,gy1.w,gz1.w);
    vec4 n0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
    g000*=n0.x; g010*=n0.y; g100*=n0.z; g110*=n0.w;
    vec4 n1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
    g001*=n1.x; g011*=n1.y; g101*=n1.z; g111*=n1.w;
    float n000=dot(g000,Pf0);
    float n100=dot(g100,vec3(Pf1.x,Pf0.yz));
    float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));
    float n110=dot(g110,vec3(Pf1.xy,Pf0.z));
    float n001=dot(g001,vec3(Pf0.xy,Pf1.z));
    float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));
    float n011=dot(g011,vec3(Pf0.x,Pf1.yz));
    float n111=dot(g111,Pf1);
    vec3 f=fade(Pf0);
    vec4 nz=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),f.z);
    vec2 nyz=mix(nz.xy,nz.zw,f.y);
    return 2.2*mix(nyz.x,nyz.y,f.x);
  }

  /* ---- Field ------------------------------------------------------------- */

  float smin(float a, float b, float k){
    float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
    return mix(b, a, h) - k*h*(1.0-h);
  }

  /* Two spheres at the two pointer followers. Because one lags further behind
     than the other, moving the pointer pulls the blob into a teardrop and it
     settles back — the whole sense of liquid weight comes from this. */
  float field(vec3 p){
    float a = length(p - vec3(uM1, 0.0)) - (uSize - 0.045);
    float b = length(p - vec3(uM2, 0.0)) - uSize;
    return smin(a, b, 0.22);
  }

  /* Perlin displacement at two frequencies — one slow and large, one faster
     and finer, so the surface reads as a liquid rather than as a bumpy ball. */
  vec3 displace(vec3 p){
    float t = uTime * 0.16;
    float big   = cnoise(p * 1.15 + vec3(0.0, 0.0, t));
    float fine  = cnoise(p * 2.60 - vec3(t * 1.4, t, 0.0));
    /* Gentle. A soap bubble is round — it breathes, it does not churn. The
       earlier amplitudes turned the silhouette into a lumpy teardrop. */
    return p + normalize(p + 1e-5) * (big * 0.040 + fine * 0.013);
  }

  float map(vec3 p){ return field(displace(p)); }

  /* Normals from the cross product of two tangent-offset displaced points.
     The SDF gradient alone would give a smooth sphere — this is what makes
     the noise actually catch the light. */
  vec3 orthogonal(vec3 v){
    return normalize(abs(v.x) > abs(v.z)
      ? vec3(-v.y, v.x, 0.0)
      : vec3(0.0, -v.z, v.y));
  }
  vec3 surfaceNormal(vec3 p){
    vec2 e = vec2(0.012, 0.0);
    vec3 g = normalize(vec3(
      map(p+e.xyy) - map(p-e.xyy),
      map(p+e.yxy) - map(p-e.yxy),
      map(p+e.yyx) - map(p-e.yyx)));
    vec3 t1 = orthogonal(g);
    vec3 t2 = normalize(cross(g, t1));
    float f = 0.02;
    vec3 d0 = displace(p);
    vec3 d1 = displace(p + t1*f);
    vec3 d2 = displace(p + t2*f);
    vec3 n  = normalize(cross(d1-d0, d2-d0));
    return dot(n, g) < 0.0 ? -n : n;
  }

  /* ---- Procedural environment -------------------------------------------
     This replaces the six downloaded cubemap faces. A dark studio with a
     bright overhead band and two coloured kickers in the brand accents. The
     heavy saturation at the call site is what turns it iridescent.          */
  vec3 env(vec3 d){
    float up   = smoothstep(-0.25, 0.95, d.y);
    float band = pow(max(0.0, d.y), 6.0);
    vec3 base  = mix(uDeep * 0.55, vec3(0.92, 0.95, 1.0), up * 0.85);
    base += vec3(1.0) * band * 1.6;
    /* Two opposed kickers: cool across the upper-left, warm across the lower
       edge. Opposing them is what splits the rim into blue on one side and
       amber on the other instead of tinting the whole shell one colour. */
    base += uAccentA * pow(max(0.0, dot(d, normalize(vec3(-0.75, 0.45, 0.35)))), 3.2) * 2.3;
    base += uAccentB * pow(max(0.0, dot(d, normalize(vec3( 0.25,-0.85, 0.30)))), 3.0) * 2.6;
    return base;
  }

  vec3 saturate3(vec3 c, float a){
    float l = dot(c, vec3(0.2125, 0.7154, 0.0721));
    return mix(vec3(l), c, a);
  }
  vec3 screenBlend(vec3 a, vec3 b){ return 1.0 - (1.0 - a) * (1.0 - b); }

  /* ---- The backdrop, drawn in the shader ---------------------------------
     THIS is what was missing. The reference samples tRender — a texture of
     its own scene — and offsets the lookup by the refracted ray, so the words
     behind the bubble visibly bend and split. Ours could not do that because
     the card fan behind it is DOM, and a shader cannot sample the DOM.
     So the shader draws its own copy of that fan, and refracts THAT. It is
     only ever shown INSIDE the blob: outside, the canvas stays transparent
     and the real DOM fan shows through. The slight mismatch at the boundary
     is exactly what a refracting edge does anyway. */

  float roundRect(vec2 p, vec2 b, float r){
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  vec3 cardTint(int i){
    if (i == 0) return vec3(0.05, 0.58, 0.53);   // HRMS — teal
    if (i == 1) return vec3(0.63, 0.42, 0.03);   // Readers Club — amber
    if (i == 2) return vec3(0.15, 0.39, 0.92);   // CRM — blue
    if (i == 3) return vec3(0.92, 0.35, 0.05);   // ERP — orange
    return vec3(0.49, 0.23, 0.93);               // Cogi AI — violet
  }

  vec3 backdrop(vec2 uv){
    vec3 c = vec3(0.0);
    for (int i = 0; i < 5; i++){
      float fi = float(i) - 2.0;
      vec2 p = uv - vec2(fi * 0.295, 0.135);
      float a = fi * 0.055;                       // slight fan rotation
      p = mat2(cos(a), -sin(a), sin(a), cos(a)) * p;

      float d = roundRect(p, vec2(0.112, 0.215), 0.022);
      vec3 tint = cardTint(i);

      c += tint * smoothstep(0.010, 0.0, abs(d)) * 1.10;   // the border
      c += tint * smoothstep(0.0, -0.30, d) * 0.13;        // interior glow

      /* Grid, inside the card only. */
      if (d < 0.0){
        vec2 g = abs(fract(p * 13.0) - 0.5);
        float line = 1.0 - smoothstep(0.0, 0.07, min(g.x, g.y));
        c += vec3(0.62, 0.68, 0.78) * line * 0.16;
      }
    }
    return c;
  }

  void main(){
    vec2 uv = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);

    vec3 ro = vec3(0.0, 0.0, 2.0);
    vec3 rd = normalize(vec3(uv, -1.0));

    float t = 0.0;
    float tMax = 3.4;
    bool hit = false;
    /* Sphere tracing. The field is convex enough that this converges in few
       steps; the cap is what keeps a noisy raymarch affordable. */
    for (int i = 0; i < 28; i++){
      vec3 p = ro + rd * t;
      float h = map(p);
      if (h < 0.0015){ hit = true; break; }
      t += h * 0.92;
      if (t > tMax) break;
    }

    if (!hit){
      gl_FragColor = vec4(0.0);
      return;
    }

    vec3 p = ro + rd * t;
    vec3 n = surfaceNormal(p);

    /* Fresnel — two terms, as in the reference: one against the view ray and
       one biased, summed then powered. One alone gives a flat rim. */
    float f1 = 1.0 + dot(rd, n);
    float f2 = 0.35 + 0.65 * (1.0 + dot(normalize(ro - p), n));
    float fres = pow(clamp(f1 + f2 * 0.35, 0.0, 2.0), 2.4);

    /* Chromatic refraction: three rays at slightly different indices, so the
       edges split into colour exactly where the surface curves hardest. */
    vec3 rr = refract(rd, n, 1.0 / 1.44);
    vec3 rg = refract(rd, n, 1.0 / 1.47);
    vec3 rb = refract(rd, n, 1.0 / 1.50);
    vec3 refr = vec3(env(rr).r, env(rg).g, env(rb).b);

    vec3 reflCol = env(reflect(rd, n));

    /* THE REFRACTED BACKDROP. The refracted ray's XY displaces the lookup into
       the shader-drawn fan, and each channel is offset separately — so what is
       behind the bubble bends AND splits into colour, hardest at the edge
       where the surface curves most. This is the thing that makes it read as
       a lens instead of as a ring laid over the page. */
    float bend = 0.42;
    vec2 bR = uv + rr.xy * bend;
    vec2 bG = uv + rg.xy * bend;
    vec2 bB = uv + rb.xy * bend;
    vec3 behind = vec3(backdrop(bR).r, backdrop(bG).g, backdrop(bB).b);

    /* f1 is ~0 looking straight through the middle and ~1 at the silhouette,
       so it IS the rim factor.
       (No backticks in this file's GLSL comments — the shader is a template
       literal, and a backtick would close it mid-string.) */
    float rim = clamp(f1, 0.0, 1.0);

    /* ---- Thin-film interference -----------------------------------------
       This is what a soap bubble actually is, and what the previous version
       was missing. Film thickness varies across the surface, so the path
       difference — and therefore the hue — sweeps as the view angle changes.
       A cosine palette across R, G and B at 1/3-phase offsets gives that
       sweep: blue through white to amber, in bands, rather than one flat
       white glow. */
    /* Just under ONE cycle. At 2.4 cycles the shell banded through the whole
       spectrum and read as a CD rather than as a bubble — the reference stays
       in a narrow blue â†’ white â†’ amber range. */
    float thickness = pow(rim, 2.0) * 0.85
                    + cnoise(n * 2.0 + vec3(0.0, 0.0, uTime * 0.09)) * 0.07;
    vec3 spectral = 0.5 + 0.5 * cos(6.28318 * (vec3(0.0, 0.33, 0.67) + thickness));

    /* Two corrections that keep it a bubble rather than a prism:
       desaturate toward its own luminance, then bias what is left toward the
       brand accents so the sweep runs cool-to-warm instead of through green
       and magenta. */
    float lum = dot(spectral, vec3(0.33));
    vec3 film = mix(vec3(lum), spectral, 0.42);

    /* Bias by POSITION on the shell, not by rim. Keyed to rim the whole ring
       drifted to one colour; keyed to the surface normal the top of the bubble
       picks up the cool sky and the underside picks up the warm kicker, which
       is what the reference does and what a real environment would do. */
    float updown = smoothstep(0.45, -0.45, n.y);
    film = mix(film, mix(uAccentA, uAccentB, updown), 0.52);

    /* Keep the shell bright — it is a specular film, not a tint. */
    film = mix(film, vec3(1.0), pow(rim, 3.0) * 0.50);
    film = saturate3(film, 1.35);

    /* A THICK, soft band — not a hairline. The reference's film occupies a
       good fifth of the radius and is heavily blurred; a tight ring reads as
       an outline rather than as a curved surface catching light. */
    float filmMask = smoothstep(0.30, 0.98, rim) * 1.05
                   + smoothstep(0.05, 0.62, rim) * 0.42;
    float edge     = pow(rim, 5.0);

    vec3 irid = saturate3(refr, 2.0);

    /* Interior: the refracted backdrop, dimmed, over a shaded sphere. A flat
       hole in the middle is what made ours look like a decal. */
    /* Kept dim on purpose. The reference's interior is dark — the refracted
       content is legible but subdued, so the film stays the brightest thing on
       screen. At full brightness the bent card borders competed with the rim
       and the whole thing read as busy rather than as glass. */
    float bodyShade = 0.16 + 0.30 * pow(1.0 - rim, 1.4);
    vec3 col = behind * (0.34 + 0.30 * (1.0 - rim));
    col = mix(col, irid, 0.16);
    col *= bodyShade + 0.48;

    col += film * filmMask * 1.05;                // the interference film
    col = screenBlend(col, reflCol * edge * 0.85);
    col += vec3(1.0) * edge * 0.5;

    /* CRYSTAL CLEAR: alpha lives almost entirely in the film. The centre is
       genuinely see-through, so the headline, the cards and the cursor trail
       read straight through it. A dark fill would make this a ball; leaving
       it open is what makes it glass. */
    /* The body now has to be substantially opaque, because it is carrying the
       refracted backdrop — at near-zero alpha the real DOM fan showed through
       undisturbed underneath and cancelled the whole effect. Not fully opaque
       though: the headline sits behind the blob and should stay readable
       through it, veiled, the way it is on the reference. */
    float alpha = clamp(
        0.60                      // the glass body, carrying the refraction
      + filmMask * 0.34           // the film
      + edge     * 0.30,          // the lip
      0.0, 1.0) * uOpacity;

    /* Feather the outermost pixels. Without this the silhouette ends on a hard
       step, which reads as a cut-out sticker rather than as a surface curving
       away from the camera. */
    alpha *= smoothstep(1.0, 0.972, rim);

    gl_FragColor = vec4(col, alpha);
  }
`;

function Blob({
  size,
  accentA,
  accentB,
  opacity,
}: {
  size: number;
  accentA: string;
  accentB: string;
  opacity: number;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size: vp, gl } = useThree();

  /* Two followers with different lag. The gap between them is the wobble. */
  const target = useRef(new THREE.Vector2(0, 0));
  const m1 = useRef(new THREE.Vector2(0, 0));
  const m2 = useRef(new THREE.Vector2(0, 0));

  /**
   * ⚠ï¸ The pointer is read from the WINDOW, not from R3F's `state.pointer`.
   *
   * The canvas is `pointer-events: none` so it never steals clicks from the
   * links underneath — which also means it receives no pointer events, so
   * `state.pointer` stays at (0,0) forever. Using it meant both followers sat
   * at the origin, the lag gap was always zero, and the blob never moved. The
   * movement IS the effect, so this has to come from somewhere that actually
   * fires.
   *
   * Coordinates are relative to the canvas element and clamped, so the shape
   * drifts with the cursor but always stays inside its own section.
   */
  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;

      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);

      /* Only follows while the pointer is INSIDE the hero. Outside it, the
         target returns to centre and the blob drifts home, rather than being
         yanked around by a cursor three sections down the page. */
      const inside = nx >= -1 && nx <= 1 && ny >= -1 && ny <= 1;
      if (inside) {
        target.current.set(nx * 0.62, ny * 0.40);
      } else {
        target.current.set(0, 0);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  const uniforms = useMemo(
    () => ({
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uM1: { value: new THREE.Vector2(0, 0) },
      uM2: { value: new THREE.Vector2(0, 0) },
      uSize: { value: size },
      uDeep: { value: new THREE.Color("#06090d") },
      uAccentA: { value: new THREE.Color(accentA) },
      uAccentB: { value: new THREE.Color(accentB) },
      uOpacity: { value: opacity },
    }),
    [size, accentA, accentB, opacity],
  );

  useFrame((_state, delta) => {
    const u = mat.current?.uniforms;
    if (!u) return;

    u.uTime.value += delta;
    u.uRes.value.set(vp.width, vp.height);

    /* Two lerp rates, deliberately far apart. The leading sphere catches up
       quickly, the trailing one lags — so moving the pointer pulls the blob
       into a teardrop and it settles back. Close the gap and it stops looking
       like liquid and starts looking like a ball on a string.
       Both raised sharply: at 0.085/0.026 it crawled after the cursor. */
    m1.current.lerp(target.current, 0.30);
    m2.current.lerp(target.current, 0.115);
    u.uM1.value.copy(m1.current);
    u.uM2.value.copy(m2.current);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function LiquidBlob({
  className = "",
  size = 0.78,
  accentA = "#2563eb",
  accentB = "#f0a500",
  opacity = 1,
}: {
  className?: string;
  size?: number;
  accentA?: string;
  accentB?: string;
  opacity?: number;
}) {
  return (
    <Canvas
      className={className}
      /* A noisy raymarch is fill-rate bound, so resolution is the dial that
         matters most. Capped well below devicePixelRatio on purpose. */
      dpr={[1, 1.35]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Blob size={size} accentA={accentA} accentB={accentB} opacity={opacity} />
    </Canvas>
  );
}

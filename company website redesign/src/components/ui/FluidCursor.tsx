"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useMediaQuery } from "@/lib/motion";

/**
 * FluidCursor — a real GPU fluid simulation driven by the pointer.
 *
 * WHY THIS AND NOT A FAKE:
 * storytelling.noomoagency.com's shipped bundle was inspected directly and
 * contains a genuine Navier–Stokes solver — advect ×13, divergence ×16,
 * vorticity ×8, curl ×24, pressure ×32, dissipation ×5, splat ×4, ping-pong
 * framebuffers, WebGL2. That is why moving the cursor there makes the page
 * behave like water and leaves a trail that keeps flowing after you stop.
 * Nothing built from CSS blur or a lagging div reproduces it.
 *
 * THE PIPELINE, per frame:
 *   1. curl          — measure rotation in the velocity field
 *   2. vorticity     — feed that rotation back in, so eddies persist instead
 *                      of being smeared away by numerical diffusion
 *   3. divergence    — how much the field is compressing
 *   4. pressure      — Jacobi iterations solving for a pressure field
 *   5. gradientSub   — subtract pressure gradient => incompressible flow
 *   6. advect        — carry velocity, then dye, along the velocity field
 *   7. display       — draw the dye with a chromatic offset
 *
 * The pointer "splats" velocity and colour into the field on movement.
 *
 * All fields live in floating-point textures ping-ponged between two FBOs.
 * Simulation runs at 128², dye at 512² — the page itself is untouched, so
 * text stays sharp and selectable.
 */

const SIM_RES = 128;
const DYE_RES = 512;
const PRESSURE_ITERATIONS = 18;
const CURL_STRENGTH = 28;
const VELOCITY_DISSIPATION = 0.9965;
const DENSITY_DISSIPATION = 0.9895;
const SPLAT_RADIUS = 0.0030;
const SPLAT_FORCE = 6600;

/**
 * Live-tunable parameters, read fresh every frame by the render loop.
 * Exported so the dev tuning panel can mutate them in place — this look
 * cannot be dialled in blind, it has to be watched on a real GPU.
 */
export const FLUID = {
  densityDissipation: 0.978, // tail length — higher lasts longer
  velocityDissipation: 0.992, // how long the flow keeps moving
  curl: CURL_STRENGTH,                      // swirliness
  splatForce: SPLAT_FORCE,                  // how hard the cursor pushes
  splatRadius: SPLAT_RADIUS,                // stroke thickness
  brightness: 0.26,                         // ink intensity
};

/* ------------------------------------------------------------------ shaders */

const VERT = `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv, vL, vR, vT, vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const F_HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv, vL, vR, vT, vB;
out vec4 fragColor;
`;

const SPLAT = F_HEAD + `
uniform sampler2D uTarget;
uniform float aspectRatio, radius;
uniform vec3 color;
uniform vec2 point, prevPoint;
void main () {
  // Distance to the CAPSULE swept between the previous and current pointer,
  // not to a single point. This is what Noomo's shader does, and it is why a
  // fast flick paints one continuous stroke instead of a dotted line.
  vec2 uv = vUv;  uv.x *= aspectRatio;
  vec2 a = prevPoint; a.x *= aspectRatio;
  vec2 b = point;     b.x *= aspectRatio;
  vec2 ab = b - a;
  float len = length(ab);
  vec2 q;
  if (len < 1e-4) {
    q = uv - a;
  } else {
    vec2 n = ab / len;
    float d = clamp(dot(uv - a, n), 0.0, len);
    q = uv - (a + n * d);
  }
  vec3 splat = exp(-dot(q, q) / radius) * color;
  fragColor = vec4(texture(uTarget, vUv).rgb + splat, 1.0);
}`;

const ADVECT = F_HEAD + `
uniform sampler2D uVelocity, uSource;
uniform vec2 texelSize;
uniform float dt, dissipation;
void main () {
  // Semi-Lagrangian: look BACK along the velocity to find what arrives here.
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
  fragColor = dissipation * texture(uSource, coord);
  fragColor.a = 1.0;
}`;

const DIVERGENCE = F_HEAD + `
uniform sampler2D uVelocity;
void main () {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  // Reflect at the edges so the fluid doesn't leak out of the viewport.
  if (vL.x < 0.0) { L = -C.x; }
  if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; }
  if (vB.y < 0.0) { B = -C.y; }
  fragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`;

const CURL = F_HEAD + `
uniform sampler2D uVelocity;
void main () {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  fragColor = vec4(0.5 * ((R - L) - (T - B)), 0.0, 0.0, 1.0);
}`;

const VORTICITY = F_HEAD + `
uniform sampler2D uVelocity, uCurl;
uniform float curl, dt;
void main () {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  // Push velocity along the gradient of |curl| — this is what keeps swirls
  // alive instead of dissolving into mush.
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 vel = texture(uVelocity, vUv).xy + force * dt;
  fragColor = vec4(clamp(vel, -1000.0, 1000.0), 0.0, 1.0);
}`;

const PRESSURE = F_HEAD + `
uniform sampler2D uPressure, uDivergence;
void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float divergence = texture(uDivergence, vUv).x;
  fragColor = vec4((L + R + B + T - divergence) * 0.25, 0.0, 0.0, 1.0);
}`;

const GRADIENT_SUB = F_HEAD + `
uniform sampler2D uPressure, uVelocity;
void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  fragColor = vec4(velocity, 0.0, 1.0);
}`;

const DISPLAY = F_HEAD + `
uniform sampler2D uTexture;
uniform vec2 texelSize;
void main () {
  // Sample the dye three times at tiny offsets for a chromatic edge — the
  // colour fringe that makes it read as refraction rather than paint.
  float r = texture(uTexture, vUv + vec2( texelSize.x * 1.6, 0.0)).r;
  float g = texture(uTexture, vUv).g;
  float b = texture(uTexture, vUv - vec2( texelSize.x * 1.6, 0.0)).b;
  vec3 c = vec3(r, g, b);
  float a = max(c.r, max(c.g, c.b));
  fragColor = vec4(c, a);
}`;

/* ------------------------------------------------------------------- engine */

type FBO = { tex: WebGLTexture; fbo: WebGLFramebuffer; w: number; h: number; texelX: number; texelY: number };
type DoubleFBO = { read: FBO; write: FBO; swap: () => void; w: number; h: number; texelX: number; texelY: number };

export default function FluidCursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!fine || reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) return;

    // Float render targets are required for the velocity/pressure fields.
    const ext = gl.getExtension("EXT_color_buffer_float");
    const linear = gl.getExtension("OES_texture_float_linear");
    if (!ext) return;
    const filtering = linear ? gl.LINEAR : gl.NEAREST;

    /* ---------- gl helpers ---------- */
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.warn("[fluid]", gl.getShaderInfoLog(s));
      return s;
    };
    const program = (fragSrc: string) => {
      const p = gl.createProgram()!;
      gl.attachShader(p, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fragSrc));
      gl.linkProgram(p);
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const name = gl.getActiveUniform(p, i)!.name;
        uniforms[name] = gl.getUniformLocation(p, name);
      }
      return { p, uniforms };
    };

    const progSplat = program(SPLAT);
    const progAdvect = program(ADVECT);
    const progDivergence = program(DIVERGENCE);
    const progCurl = program(CURL);
    const progVorticity = program(VORTICITY);
    const progPressure = program(PRESSURE);
    const progGradient = program(GRADIENT_SUB);
    const progDisplay = program(DISPLAY);

    // Full-screen triangle pair.
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const createFBO = (w: number, h: number, internal: number, format: number, type: number, filter: number): FBO => {
      const tex = gl.createTexture()!;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, type, null);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return { tex, fbo, w, h, texelX: 1 / w, texelY: 1 / h };
    };

    const createDouble = (w: number, h: number, internal: number, format: number, type: number, filter: number): DoubleFBO => {
      let a = createFBO(w, h, internal, format, type, filter);
      let b = createFBO(w, h, internal, format, type, filter);
      return {
        w, h, texelX: 1 / w, texelY: 1 / h,
        get read() { return a; }, set read(v) { a = v; },
        get write() { return b; }, set write(v) { b = v; },
        swap() { const t = a; a = b; b = t; },
      };
    };

    const RGBA16F = (gl as WebGL2RenderingContext).RGBA16F;
    const RG16F = (gl as WebGL2RenderingContext).RG16F;
    const R16F = (gl as WebGL2RenderingContext).R16F;
    const RG = (gl as WebGL2RenderingContext).RG;
    const RED = (gl as WebGL2RenderingContext).RED;

    let dye = createDouble(DYE_RES, DYE_RES, RGBA16F, gl.RGBA, gl.HALF_FLOAT, filtering);
    let velocity = createDouble(SIM_RES, SIM_RES, RG16F, RG, gl.HALF_FLOAT, filtering);
    const divergence = createFBO(SIM_RES, SIM_RES, R16F, RED, gl.HALF_FLOAT, gl.NEAREST);
    const curl = createFBO(SIM_RES, SIM_RES, R16F, RED, gl.HALF_FLOAT, gl.NEAREST);
    let pressure = createDouble(SIM_RES, SIM_RES, R16F, RED, gl.HALF_FLOAT, gl.NEAREST);

    const blit = (target: FBO | null) => {
      if (target) {
        gl.viewport(0, 0, target.w, target.h);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      } else {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    /* ---------- pointer ---------- */
    const pointer = { x: 0.5, y: 0.5, px: 0.5, py: 0.5, dx: 0, dy: 0, moved: false };
    let hue = Math.random();

    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      pointer.dx = (x - pointer.x) * FLUID.splatForce;
      pointer.dy = (y - pointer.y) * FLUID.splatForce;
      pointer.px = pointer.x; pointer.py = pointer.y;
      pointer.x = x;
      pointer.y = y;
      pointer.moved = Math.abs(pointer.dx) > 0.1 || Math.abs(pointer.dy) > 0.1;
    };

    const splat = (x: number, y: number, px: number, py: number, dx: number, dy: number, color: [number, number, number]) => {
      gl.useProgram(progSplat.p);
      gl.uniform1i(progSplat.uniforms.uTarget!, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
      gl.uniform1f(progSplat.uniforms.aspectRatio!, canvas.width / canvas.height);
      gl.uniform2f(progSplat.uniforms.point!, x, y);
      gl.uniform2f(progSplat.uniforms.prevPoint!, px, py);
      gl.uniform3f(progSplat.uniforms.color!, dx, dy, 0);
      gl.uniform1f(progSplat.uniforms.radius!, FLUID.splatRadius);
      blit(velocity.write); velocity.swap();

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, dye.read.tex);
      gl.uniform3f(progSplat.uniforms.color!, color[0], color[1], color[2]);
      blit(dye.write); dye.swap();
    };

    // HSV→RGB, so successive splats walk the hue wheel instead of muddying.
    const hsv = (h: number, s: number, v: number): [number, number, number] => {
      const i = Math.floor(h * 6), f = h * 6 - i;
      const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0: return [v, t, p];
        case 1: return [q, v, p];
        case 2: return [p, v, t];
        case 3: return [p, q, v];
        case 4: return [t, p, v];
        default: return [v, p, q];
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };

    /* ---------- loop ---------- */
    let raf = 0;
    let lastTime = performance.now();

    const step = (dt: number) => {
      gl.disable(gl.BLEND);

      // 1. curl
      gl.useProgram(progCurl.p);
      gl.uniform2f(progCurl.uniforms.texelSize!, velocity.texelX, velocity.texelY);
      gl.uniform1i(progCurl.uniforms.uVelocity!, 0);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
      blit(curl);

      // 2. vorticity confinement
      gl.useProgram(progVorticity.p);
      gl.uniform2f(progVorticity.uniforms.texelSize!, velocity.texelX, velocity.texelY);
      gl.uniform1i(progVorticity.uniforms.uVelocity!, 0);
      gl.uniform1i(progVorticity.uniforms.uCurl!, 1);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, curl.tex);
      gl.uniform1f(progVorticity.uniforms.curl!, FLUID.curl);
      gl.uniform1f(progVorticity.uniforms.dt!, dt);
      blit(velocity.write); velocity.swap();

      // 3. divergence
      gl.useProgram(progDivergence.p);
      gl.uniform2f(progDivergence.uniforms.texelSize!, velocity.texelX, velocity.texelY);
      gl.uniform1i(progDivergence.uniforms.uVelocity!, 0);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
      blit(divergence);

      // 4. pressure — Jacobi iterations
      gl.useProgram(progPressure.p);
      gl.uniform2f(progPressure.uniforms.texelSize!, velocity.texelX, velocity.texelY);
      gl.uniform1i(progPressure.uniforms.uDivergence!, 0);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, divergence.tex);
      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(progPressure.uniforms.uPressure!, 1);
        gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
        blit(pressure.write); pressure.swap();
      }

      // 5. subtract pressure gradient => incompressible
      gl.useProgram(progGradient.p);
      gl.uniform2f(progGradient.uniforms.texelSize!, velocity.texelX, velocity.texelY);
      gl.uniform1i(progGradient.uniforms.uPressure!, 0);
      gl.uniform1i(progGradient.uniforms.uVelocity!, 1);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
      blit(velocity.write); velocity.swap();

      // 6. advect velocity, then dye
      gl.useProgram(progAdvect.p);
      gl.uniform2f(progAdvect.uniforms.texelSize!, velocity.texelX, velocity.texelY);
      gl.uniform1i(progAdvect.uniforms.uVelocity!, 0);
      gl.uniform1i(progAdvect.uniforms.uSource!, 0);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
      gl.uniform1f(progAdvect.uniforms.dt!, dt);
      gl.uniform1f(progAdvect.uniforms.dissipation!, FLUID.velocityDissipation);
      blit(velocity.write); velocity.swap();

      gl.uniform1i(progAdvect.uniforms.uVelocity!, 0);
      gl.uniform1i(progAdvect.uniforms.uSource!, 1);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, dye.read.tex);
      gl.uniform1f(progAdvect.uniforms.dissipation!, FLUID.densityDissipation);
      blit(dye.write); dye.swap();
    };

    const render = () => {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(progDisplay.p);
      gl.uniform2f(progDisplay.uniforms.texelSize!, dye.texelX, dye.texelY);
      gl.uniform1i(progDisplay.uniforms.uTexture!, 0);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, dye.read.tex);
      blit(null);
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.016666);
      lastTime = now;

      if (pointer.moved) {
        pointer.moved = false;
        hue = (hue + 0.006) % 1;
        splat(pointer.x, pointer.y, pointer.px, pointer.py, pointer.dx, pointer.dy, hsv(hue, 0.85, FLUID.brightness));
      }
      step(dt);
      render();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[196] h-full w-full"
      style={{ mixBlendMode: "plus-lighter" }}
    />
  );
}

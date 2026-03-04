"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TAU = Math.PI * 2;
const STAR_COUNT = 3600;
const INNER_RADIUS = 190;
const OUTER_RADIUS = 740;

const starVertex = /* glsl */ `
attribute float aScale;
attribute float aPhase;
varying vec3 vColor;
varying float vTwinkle;
uniform float uTime;

void main() {
  vColor = color;
  vTwinkle = 0.8 + sin(uTime * 0.35 + aPhase) * 0.2;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aScale * (220.0 / max(1.0, -mvPosition.z));
  gl_Position = projectionMatrix * mvPosition;
}
`;

const starFragment = /* glsl */ `
varying vec3 vColor;
varying float vTwinkle;

void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float d = dot(p, p);
  if (d > 1.0) discard;

  float glow = exp(-d * 3.2);
  float core = smoothstep(0.25, 0.0, d) * 0.65;
  float alpha = (glow + core) * 0.44 * vTwinkle;

  gl_FragColor = vec4(vColor, alpha);
}
`;

const nebulaVertex = /* glsl */ `
varying vec3 vWorldDir;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldDir = normalize(worldPos.xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const nebulaFragment = /* glsl */ `
varying vec3 vWorldDir;
uniform float uTime;

float noise(vec3 p) {
  return (
    sin(p.x * 2.1 + uTime * 0.01) +
    sin(p.y * 2.7 - uTime * 0.008) +
    sin(p.z * 3.2 + uTime * 0.006)
  ) / 3.0;
}

void main() {
  vec3 dir = normalize(vWorldDir);
  float haze = noise(dir * 3.4) * 0.5 + 0.5;
  float band = smoothstep(-0.2, 0.55, dir.y * 0.75 + haze * 0.35);

  vec3 deep = vec3(0.006, 0.01, 0.028);
  vec3 cool = vec3(0.03, 0.06, 0.13);
  vec3 warm = vec3(0.065, 0.045, 0.024);

  vec3 base = mix(deep, cool, band);
  base += warm * smoothstep(0.45, 0.95, haze) * 0.24;

  gl_FragColor = vec4(base, 1.0);
}
`;

function createRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967295;
  };
}

export function DeepSpaceStarfield() {
  const spaceRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Mesh>(null);
  const nebulaGeometry = useMemo(() => new THREE.SphereGeometry(940, 44, 28), []);

  const starGeometry = useMemo(() => {
    const rng = createRng(814271);
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);
    const scales = new Float32Array(STAR_COUNT);
    const phases = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i += 1) {
      const spread = Math.pow(rng(), 1.2);
      const radius = INNER_RADIUS + spread * (OUTER_RADIUS - INNER_RADIUS);
      const theta = rng() * TAU;
      const phi = Math.acos(2 * rng() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi) * 0.78;
      const z = radius * Math.sin(phi) * Math.sin(theta);

      const o = i * 3;
      positions[o] = x;
      positions[o + 1] = y;
      positions[o + 2] = z;

      const warmChance = rng();
      if (warmChance > 0.82) {
        colors[o] = 1.0;
        colors[o + 1] = 0.91 + rng() * 0.06;
        colors[o + 2] = 0.74 + rng() * 0.08;
      } else {
        colors[o] = 0.79 + rng() * 0.15;
        colors[o + 1] = 0.85 + rng() * 0.13;
        colors[o + 2] = 0.97 + rng() * 0.03;
      }

      scales[i] = 0.45 + rng() * 1.35 + (radius < 320 ? 0.3 : 0);
      phases[i] = rng() * TAU;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

    return geometry;
  }, []);

  const starMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: starVertex,
        fragmentShader: starFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 }
        },
        vertexColors: true,
        toneMapped: false
      }),
    []
  );

  const nebulaMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: nebulaVertex,
        fragmentShader: nebulaFragment,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.96,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 }
        },
        toneMapped: false
      }),
    []
  );

  useFrame((state) => {
    if (spaceRef.current) {
      // Keep the deep-space shell centered on the camera to avoid visible dome edges while panning.
      spaceRef.current.position.copy(state.camera.position);
    }

    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.003;
      starsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.01;
    }

    const starUniforms = starMaterial.uniforms as { uTime: { value: number } };
    starUniforms.uTime.value = state.clock.elapsedTime;

    const nebulaUniforms = nebulaMaterial.uniforms as { uTime: { value: number } };
    nebulaUniforms.uTime.value = state.clock.elapsedTime;

    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = state.clock.elapsedTime * 0.0018;
    }
  });

  return (
    <group ref={spaceRef}>
      <mesh ref={nebulaRef} geometry={nebulaGeometry} material={nebulaMaterial} frustumCulled={false} />
      <points ref={starsRef} geometry={starGeometry} material={starMaterial} frustumCulled={false} />
    </group>
  );
}

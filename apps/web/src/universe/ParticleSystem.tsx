"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { computeEdgeControlPoint, hashToUnit, sampleQuadraticBezier } from "./physics";
import { PARTICLES_PER_EDGE, useUniverseStore } from "./store";

interface ParticleRuntime {
  edgeId: string;
  progress: number;
  speed: number;
  jitter: number;
}

const particleVertex = /* glsl */ `
attribute float aStrength;
varying float vStrength;

void main() {
  vStrength = aStrength;
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = (3.2 + 4.0 * aStrength) * (220.0 / max(1.0, -mvPos.z));
  gl_Position = projectionMatrix * mvPos;
}
`;

const particleFragment = /* glsl */ `
varying float vStrength;

void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float d = dot(p, p);
  if (d > 1.0) discard;
  float alpha = (1.0 - d) * (0.35 + vStrength * 0.65);
  vec3 color = mix(vec3(0.4, 0.7, 1.0), vec3(1.0, 0.85, 0.6), vStrength);
  gl_FragColor = vec4(color, alpha);
}
`;

export function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null);
  const particles = useRef<ParticleRuntime[]>([]);

  const positions = useRef(new Float32Array(0));
  const strength = useRef(new Float32Array(0));
  const edgeVersion = useUniverseStore((s) => s.edgeVersion);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(0), 3));
    g.setAttribute("aStrength", new THREE.BufferAttribute(new Float32Array(0), 1));
    return g;
  }, []);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      }),
    []
  );

  useEffect(() => {
    const universe = useUniverseStore.getState();
    const next: ParticleRuntime[] = [];

    for (const edgeId of universe.edgeIds) {
      for (let i = 0; i < PARTICLES_PER_EDGE; i += 1) {
        const seed = hashToUnit(`${edgeId}:${i}`);
        next.push({
          edgeId,
          progress: seed,
          speed: 0.08 + seed * 0.38,
          jitter: (seed - 0.5) * 0.03
        });
      }
    }

    particles.current = next;
    positions.current = new Float32Array(next.length * 3);
    strength.current = new Float32Array(next.length);

    geometry.setAttribute("position", new THREE.BufferAttribute(positions.current, 3));
    geometry.setAttribute("aStrength", new THREE.BufferAttribute(strength.current, 1));
  }, [edgeVersion, geometry]);

  const from = useMemo(() => new THREE.Vector3(), []);
  const to = useMemo(() => new THREE.Vector3(), []);
  const ctrl = useMemo(() => new THREE.Vector3(), []);
  const center = useMemo(() => new THREE.Vector3(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const universe = useUniverseStore.getState();
    const p = particles.current;
    const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
    const strengthAttr = geometry.getAttribute("aStrength") as THREE.BufferAttribute | undefined;

    if (!positionAttr || !strengthAttr) {
      return;
    }

    for (let i = 0; i < p.length; i += 1) {
      const particle = p[i];
      const edge = universe.edges.get(particle.edgeId);

      if (!edge) {
        positions.current[i * 3] = 99999;
        positions.current[i * 3 + 1] = 99999;
        positions.current[i * 3 + 2] = 99999;
        strength.current[i] = 0;
        continue;
      }

      particle.progress += delta * particle.speed;
      if (particle.progress >= 1) {
        particle.progress -= 1;
      }

      const fo = edge.fromIndex * 3;
      const toIndex = edge.toIndex * 3;

      from.set(universe.positions[fo], universe.positions[fo + 1], universe.positions[fo + 2]);
      to.set(universe.positions[toIndex], universe.positions[toIndex + 1], universe.positions[toIndex + 2]);
      center.set(
        (universe.centers[fo] + universe.centers[toIndex]) * 0.5,
        (universe.centers[fo + 1] + universe.centers[toIndex + 1]) * 0.5,
        (universe.centers[fo + 2] + universe.centers[toIndex + 2]) * 0.5
      );
      computeEdgeControlPoint(from, to, center, state.clock.elapsedTime, edge.seed, {
        type: edge.edge.type,
        fromDepth: universe.nodeDepthValues[edge.fromIndex],
        toDepth: universe.nodeDepthValues[edge.toIndex]
      }, ctrl);
      sampleQuadraticBezier(from, ctrl, to, particle.progress, pos);

      positions.current[i * 3] = pos.x + particle.jitter;
      positions.current[i * 3 + 1] = pos.y + particle.jitter * 0.3;
      positions.current[i * 3 + 2] = pos.z - particle.jitter;

      strength.current[i] = edge.activeUntil > state.clock.elapsedTime ? 1 : 0.45;
    }

    positionAttr.needsUpdate = true;
    strengthAttr.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}

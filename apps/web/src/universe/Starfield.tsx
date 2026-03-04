"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 1800;
const INNER_RADIUS = 120;
const OUTER_RADIUS = 260;

export function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(STAR_COUNT * 3);

    for (let i = 0; i < STAR_COUNT; i += 1) {
      const r = INNER_RADIUS + Math.random() * (OUTER_RADIUS - INNER_RADIUS);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) * 0.7;
      const z = r * Math.sin(phi) * Math.sin(theta);

      const o = i * 3;
      positions[o] = x;
      positions[o + 1] = y;
      positions[o + 2] = z;
    }

    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#dce8ff",
        size: 0.42,
        transparent: true,
        opacity: 0.4,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false
      }),
    []
  );

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    points.rotation.y = state.clock.elapsedTime * 0.006;
    material.opacity = 0.34 + Math.sin(state.clock.elapsedTime * 0.55) * 0.06;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}

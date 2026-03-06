"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useUniverseGraphStore } from "./graphStore";

const MAX_EDGES = 9000;
const EDGE_SEGMENTS = 7;
const MAX_LINE_SEGMENTS = MAX_EDGES * EDGE_SEGMENTS;

function hashToUnit(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

export function EdgeSystem() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(MAX_LINE_SEGMENTS * 2 * 3), 3));
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#75afff",
        transparent: true,
        opacity: 0.34,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false
      }),
    []
  );

  useFrame(() => {
    const line = lineRef.current;
    if (!line) return;

    const store = useUniverseGraphStore.getState();
    const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = pos.array as Float32Array;

    let segmentIndex = 0;

    for (const edge of store.edgeArray) {
      const from = store.nodes.get(edge.from);
      const to = store.nodes.get(edge.to);
      if (!from || !to) continue;
      if (segmentIndex + EDGE_SEGMENTS >= MAX_LINE_SEGMENTS) break;

      const sx = from.posCurrent.x;
      const sy = from.posCurrent.y;
      const sz = from.posCurrent.z;
      const ex = to.posCurrent.x;
      const ey = to.posCurrent.y;
      const ez = to.posCurrent.z;

      const mx = (sx + ex) * 0.5;
      const my = (sy + ey) * 0.5;
      const mz = (sz + ez) * 0.5;

      const dx = ex - sx;
      const dy = ey - sy;
      const dz = ez - sz;
      const len = Math.hypot(dx, dy, dz) || 1;

      // Perpendicular normal in XY plane so links arch instead of crossing straight through clusters.
      const nx = -dy / len;
      const ny = dx / len;
      const bend = (0.11 + hashToUnit(edge.id) * 0.2) * len;

      const cx = mx + nx * bend;
      const cy = my + ny * bend;
      const cz = mz + (from.depth <= to.depth ? 1 : -1) * (1.1 + Math.abs(from.depth - to.depth) * 0.22);

      for (let s = 0; s < EDGE_SEGMENTS; s += 1) {
        const t0 = s / EDGE_SEGMENTS;
        const t1 = (s + 1) / EDGE_SEGMENTS;

        // Quadratic Bézier interpolation.
        const ax = (1 - t0) * (1 - t0) * sx + 2 * (1 - t0) * t0 * cx + t0 * t0 * ex;
        const ay = (1 - t0) * (1 - t0) * sy + 2 * (1 - t0) * t0 * cy + t0 * t0 * ey;
        const az = (1 - t0) * (1 - t0) * sz + 2 * (1 - t0) * t0 * cz + t0 * t0 * ez;

        const bx = (1 - t1) * (1 - t1) * sx + 2 * (1 - t1) * t1 * cx + t1 * t1 * ex;
        const by = (1 - t1) * (1 - t1) * sy + 2 * (1 - t1) * t1 * cy + t1 * t1 * ey;
        const bz = (1 - t1) * (1 - t1) * sz + 2 * (1 - t1) * t1 * cz + t1 * t1 * ez;

        const o = segmentIndex * 6;
        array[o] = ax;
        array[o + 1] = ay;
        array[o + 2] = az;
        array[o + 3] = bx;
        array[o + 4] = by;
        array[o + 5] = bz;

        segmentIndex += 1;
      }
    }

    geometry.setDrawRange(0, segmentIndex * 2);
    pos.needsUpdate = true;
  });

  return <lineSegments ref={lineRef} geometry={geometry} material={material} frustumCulled={false} />;
}

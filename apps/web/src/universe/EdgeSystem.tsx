"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useUniverseGraphStore } from "./graphStore";

const MAX_EDGES = 20000;

export function EdgeSystem() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(MAX_EDGES * 2 * 3), 3));
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#6ca9ff",
        transparent: true,
        opacity: 0.4,
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

    let i = 0;
    for (const edge of store.edgeArray) {
      const from = store.nodes.get(edge.from);
      const to = store.nodes.get(edge.to);
      if (!from || !to) continue;
      if (i >= MAX_EDGES) break;

      const o = i * 6;
      array[o] = from.posCurrent.x;
      array[o + 1] = from.posCurrent.y;
      array[o + 2] = from.posCurrent.z;
      array[o + 3] = to.posCurrent.x;
      array[o + 4] = to.posCurrent.y;
      array[o + 5] = to.posCurrent.z;
      i += 1;
    }

    geometry.setDrawRange(0, i * 2);
    pos.needsUpdate = true;
  });

  return <lineSegments ref={lineRef} geometry={geometry} material={material} frustumCulled={false} />;
}

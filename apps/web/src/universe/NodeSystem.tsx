"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useUniverseGraphStore } from "./graphStore";

const MAX_INSTANCES = 12000;

export function NodeSystem() {
  const dirRef = useRef<THREE.InstancedMesh>(null);
  const fileRef = useRef<THREE.InstancedMesh>(null);
  const temp = useMemo(() => new THREE.Object3D(), []);

  const dirGeo = useMemo(() => new THREE.SphereGeometry(0.44, 12, 10), []);
  const fileGeo = useMemo(() => new THREE.SphereGeometry(0.22, 10, 8), []);
  const dirMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#67d3ff", emissive: "#1f3f63", emissiveIntensity: 0.4 }), []);
  const fileMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#d9dde8", emissive: "#394052", emissiveIntensity: 0.18 }), []);

  useFrame(() => {
    const dirs = dirRef.current;
    const files = fileRef.current;
    if (!dirs || !files) return;

    const store = useUniverseGraphStore.getState();
    store.tick(0.18);

    let dirCount = 0;
    let fileCount = 0;

    for (const node of store.nodeArray) {
      if (!store.isNodeVisible(node)) continue;
      temp.position.set(node.posCurrent.x, node.posCurrent.y, node.posCurrent.z);
      temp.scale.setScalar(node.kind === "dir" ? 1 : 1);
      temp.updateMatrix();

      if (node.kind === "dir") dirs.setMatrixAt(dirCount++, temp.matrix);
      else files.setMatrixAt(fileCount++, temp.matrix);
    }

    dirs.count = dirCount;
    files.count = fileCount;
    dirs.instanceMatrix.needsUpdate = true;
    files.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={dirRef} args={[dirGeo, dirMat, MAX_INSTANCES]} frustumCulled={false} />
      <instancedMesh ref={fileRef} args={[fileGeo, fileMat, MAX_INSTANCES]} frustumCulled={false} />
    </group>
  );
}

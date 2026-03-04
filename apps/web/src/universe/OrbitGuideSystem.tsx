"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useUniverseStore } from "./store";

const MAX_GUIDES = 1600;

export function OrbitGuideSystem() {
  const projectGuidesRef = useRef<THREE.InstancedMesh>(null);
  const orbitGuidesRef = useRef<THREE.InstancedMesh>(null);
  const temp = useMemo(() => new THREE.Object3D(), []);

  const guideGeometry = useMemo(() => new THREE.TorusGeometry(1, 0.01, 4, 96), []);

  const projectGuideMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#4f73a2",
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        toneMapped: false,
        blending: THREE.AdditiveBlending
      }),
    []
  );

  const orbitGuideMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#7ac7ff",
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
        toneMapped: false,
        blending: THREE.AdditiveBlending
      }),
    []
  );

  useFrame((state) => {
    const projectMesh = projectGuidesRef.current;
    const orbitMesh = orbitGuidesRef.current;
    if (!projectMesh || !orbitMesh) return;

    const universe = useUniverseStore.getState();

    let projectGuideCount = 0;
    let orbitGuideCount = 0;

    for (const runtime of universe.nodes.values()) {
      const projectId = runtime.node.projectId;
      if (projectId && !universe.selectedProjectIds.has(projectId)) {
        continue;
      }

      const o = runtime.index * 3;
      const x = universe.positions[o];
      const y = universe.positions[o + 1];
      const z = universe.positions[o + 2];

      if (runtime.node.type === "PROJECT") {
        for (let ring = 0; ring < 3; ring += 1) {
          if (projectGuideCount >= MAX_GUIDES) break;
          const radius = 8 + ring * 6.2;
          const ecc = 0.06 + ring * 0.04;

          temp.position.set(x, y - 0.02 - ring * 0.04, z);
          temp.rotation.set(Math.PI / 2 + ring * 0.02, state.clock.elapsedTime * 0.01 + ring * 0.25, 0);
          temp.scale.set(radius * (1 + ecc), 1, radius * (1 - ecc * 0.45));
          temp.updateMatrix();

          projectMesh.setMatrixAt(projectGuideCount, temp.matrix);
          projectGuideCount += 1;
        }
        continue;
      }

      if (runtime.depth > 1 || orbitGuideCount >= MAX_GUIDES) {
        continue;
      }

      const cx = universe.centers[o];
      const cy = universe.centers[o + 1];
      const cz = universe.centers[o + 2];
      const dx = x - cx;
      const dz = z - cz;
      const radialDistance = Math.sqrt(dx * dx + dz * dz);

      if (radialDistance < 1.2) {
        continue;
      }

      temp.position.set(cx, cy - 0.015, cz);
      temp.rotation.set(Math.PI / 2 + runtime.orbitTilt * 0.2, runtime.orbitTilt * 0.18, 0);
      temp.scale.set(radialDistance * 1.03, 1, radialDistance * 0.92);
      temp.updateMatrix();

      orbitMesh.setMatrixAt(orbitGuideCount, temp.matrix);
      orbitGuideCount += 1;
    }

    projectMesh.count = projectGuideCount;
    orbitMesh.count = orbitGuideCount;

    projectMesh.instanceMatrix.needsUpdate = true;
    orbitMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={projectGuidesRef}
        args={[guideGeometry, projectGuideMaterial, MAX_GUIDES]}
        frustumCulled={false}
      />
      <instancedMesh
        ref={orbitGuidesRef}
        args={[guideGeometry, orbitGuideMaterial, MAX_GUIDES]}
        frustumCulled={false}
      />
    </group>
  );
}

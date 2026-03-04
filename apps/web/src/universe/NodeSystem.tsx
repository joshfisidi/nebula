"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MAX_NODES, useUniverseStore } from "./store";

export function NodeSystem() {
  const projectRef = useRef<THREE.InstancedMesh>(null);
  const projectGlowRef = useRef<THREE.InstancedMesh>(null);
  const majorFolderRef = useRef<THREE.InstancedMesh>(null);
  const majorFolderGlowRef = useRef<THREE.InstancedMesh>(null);
  const folderRef = useRef<THREE.InstancedMesh>(null);
  const folderGlowRef = useRef<THREE.InstancedMesh>(null);
  const fileRef = useRef<THREE.InstancedMesh>(null);
  const fileGlowRef = useRef<THREE.InstancedMesh>(null);

  const temp = useMemo(() => new THREE.Object3D(), []);

  const sunGeo = useMemo(() => new THREE.SphereGeometry(1.0, 24, 20), []);
  const majorPlanetGeo = useMemo(() => new THREE.SphereGeometry(0.76, 20, 16), []);
  const planetGeo = useMemo(() => new THREE.SphereGeometry(0.56, 18, 14), []);
  const moonGeo = useMemo(() => new THREE.SphereGeometry(0.25, 14, 10), []);

  const sunMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f6d36a",
        emissive: "#ff9728",
        emissiveIntensity: 1.05,
        roughness: 0.45,
        metalness: 0.08
      }),
    []
  );

  const majorPlanetMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffbe63",
        emissive: "#cf3c1c",
        emissiveIntensity: 0.72,
        roughness: 0.5,
        metalness: 0.07
      }),
    []
  );

  const planetMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#57d6ff",
        emissive: "#1d4e91",
        emissiveIntensity: 0.22,
        roughness: 0.58,
        metalness: 0.1
      }),
    []
  );

  const moonMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c9d0dc",
        emissive: "#3a4254",
        emissiveIntensity: 0.12,
        roughness: 0.68,
        metalness: 0.04
      }),
    []
  );

  const projectGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffb24a",
        transparent: true,
        opacity: 0.24,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      }),
    []
  );

  const majorFolderGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ff8757",
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      }),
    []
  );

  const folderGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#61d6ff",
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      }),
    []
  );

  const fileGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#c6d3ff",
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      }),
    []
  );

  useFrame((state) => {
    const projectMesh = projectRef.current;
    const projectGlowMesh = projectGlowRef.current;
    const majorFolderMesh = majorFolderRef.current;
    const majorFolderGlowMesh = majorFolderGlowRef.current;
    const folderMesh = folderRef.current;
    const folderGlowMesh = folderGlowRef.current;
    const fileMesh = fileRef.current;
    const fileGlowMesh = fileGlowRef.current;

    if (
      !projectMesh ||
      !projectGlowMesh ||
      !majorFolderMesh ||
      !majorFolderGlowMesh ||
      !folderMesh ||
      !folderGlowMesh ||
      !fileMesh ||
      !fileGlowMesh
    ) {
      return;
    }

    const universe = useUniverseStore.getState();

    let projectCount = 0;
    let majorFolderCount = 0;
    let folderCount = 0;
    let fileCount = 0;

    for (let i = 0; i < universe.nodeCount; i += 1) {
      const nodeId = universe.nodeIdsByIndex[i];
      if (!nodeId || !universe.isNodeVisible(nodeId)) {
        continue;
      }

      const o = i * 3;
      const typeValue = universe.nodeTypeValues[i];
      const depth = universe.nodeDepthValues[i];
      const isActive = universe.nodeActiveValues[i] > 0.5;
      const pulse = isActive ? 1 + Math.sin(state.clock.elapsedTime * 2.1 + i * 0.23) * 0.04 : 1;

      temp.position.set(universe.positions[o], universe.positions[o + 1], universe.positions[o + 2]);

      if (typeValue < 0.5) {
        temp.rotation.set(0, state.clock.elapsedTime * 0.12, 0);
        temp.scale.setScalar(2.35 * pulse);
        temp.updateMatrix();
        projectMesh.setMatrixAt(projectCount, temp.matrix);

        temp.scale.setScalar(3.55 * pulse);
        temp.updateMatrix();
        projectGlowMesh.setMatrixAt(projectCount, temp.matrix);
        projectCount += 1;
      } else if (typeValue < 1.5 && depth <= 1) {
        temp.rotation.set(0, state.clock.elapsedTime * 0.08 + i * 0.01, 0.08);
        temp.scale.setScalar(1.82 * pulse);
        temp.updateMatrix();
        majorFolderMesh.setMatrixAt(majorFolderCount, temp.matrix);

        temp.scale.setScalar(2.6 * pulse);
        temp.updateMatrix();
        majorFolderGlowMesh.setMatrixAt(majorFolderCount, temp.matrix);
        majorFolderCount += 1;
      } else if (typeValue < 1.5) {
        temp.rotation.set(0.04, state.clock.elapsedTime * 0.06 + i * 0.01, 0.03);
        temp.scale.setScalar(1.06 * pulse);
        temp.updateMatrix();
        folderMesh.setMatrixAt(folderCount, temp.matrix);

        temp.scale.setScalar(1.64 * pulse);
        temp.updateMatrix();
        folderGlowMesh.setMatrixAt(folderCount, temp.matrix);
        folderCount += 1;
      } else {
        temp.rotation.set(0, state.clock.elapsedTime * 0.02, 0);
        temp.scale.setScalar(0.74 * pulse);
        temp.updateMatrix();
        fileMesh.setMatrixAt(fileCount, temp.matrix);

        temp.scale.setScalar(1.2 * pulse);
        temp.updateMatrix();
        fileGlowMesh.setMatrixAt(fileCount, temp.matrix);
        fileCount += 1;
      }
    }

    projectMesh.count = projectCount;
    projectGlowMesh.count = projectCount;
    majorFolderMesh.count = majorFolderCount;
    majorFolderGlowMesh.count = majorFolderCount;
    folderMesh.count = folderCount;
    folderGlowMesh.count = folderCount;
    fileMesh.count = fileCount;
    fileGlowMesh.count = fileCount;

    projectMesh.instanceMatrix.needsUpdate = true;
    projectGlowMesh.instanceMatrix.needsUpdate = true;
    majorFolderMesh.instanceMatrix.needsUpdate = true;
    majorFolderGlowMesh.instanceMatrix.needsUpdate = true;
    folderMesh.instanceMatrix.needsUpdate = true;
    folderGlowMesh.instanceMatrix.needsUpdate = true;
    fileMesh.instanceMatrix.needsUpdate = true;
    fileGlowMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={projectGlowRef} args={[sunGeo, projectGlowMat, MAX_NODES]} frustumCulled={false} />
      <instancedMesh ref={projectRef} args={[sunGeo, sunMat, MAX_NODES]} frustumCulled={false} />
      <instancedMesh
        ref={majorFolderGlowRef}
        args={[majorPlanetGeo, majorFolderGlowMat, MAX_NODES]}
        frustumCulled={false}
      />
      <instancedMesh ref={majorFolderRef} args={[majorPlanetGeo, majorPlanetMat, MAX_NODES]} frustumCulled={false} />
      <instancedMesh ref={folderGlowRef} args={[planetGeo, folderGlowMat, MAX_NODES]} frustumCulled={false} />
      <instancedMesh ref={folderRef} args={[planetGeo, planetMat, MAX_NODES]} frustumCulled={false} />
      <instancedMesh ref={fileGlowRef} args={[moonGeo, fileGlowMat, MAX_NODES]} frustumCulled={false} />
      <instancedMesh ref={fileRef} args={[moonGeo, moonMat, MAX_NODES]} frustumCulled={false} />
    </group>
  );
}

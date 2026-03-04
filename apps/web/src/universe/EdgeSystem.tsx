"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { computeEdgeControlPoint } from "./physics";
import { useUniverseStore } from "./store";

const EDGE_SEGMENTS = 10;
const MAX_RENDERED_EDGES = 1800;

function writeQuadraticCurvePositions(
  positions: Float32Array,
  from: THREE.Vector3,
  control: THREE.Vector3,
  to: THREE.Vector3
): void {
  for (let i = 0; i <= EDGE_SEGMENTS; i += 1) {
    const t = i / EDGE_SEGMENTS;
    const omt = 1 - t;
    const w0 = omt * omt;
    const w1 = 2 * omt * t;
    const w2 = t * t;

    const o = i * 3;
    positions[o] = from.x * w0 + control.x * w1 + to.x * w2;
    positions[o + 1] = from.y * w0 + control.y * w1 + to.y * w2;
    positions[o + 2] = from.z * w0 + control.z * w1 + to.z * w2;
  }
}

function writeStraightPositions(positions: Float32Array, from: THREE.Vector3, to: THREE.Vector3): void {
  for (let i = 0; i <= EDGE_SEGMENTS; i += 1) {
    const t = i / EDGE_SEGMENTS;
    const o = i * 3;
    positions[o] = from.x + (to.x - from.x) * t;
    positions[o + 1] = from.y + (to.y - from.y) * t;
    positions[o + 2] = from.z + (to.z - from.z) * t;
  }
}

function EdgeLine({ edgeId }: { edgeId: string }) {
  const lineRef = useRef<THREE.Line>(null);
  const frameCounter = useRef(0);
  const tmpFrom = useMemo(() => new THREE.Vector3(), []);
  const tmpTo = useMemo(() => new THREE.Vector3(), []);
  const tmpCtrl = useMemo(() => new THREE.Vector3(), []);
  const tmpCenter = useMemo(() => new THREE.Vector3(), []);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const points = new Float32Array((EDGE_SEGMENTS + 1) * 3);
    g.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return g;
  }, []);

  const parentMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#6da7ff",
        transparent: true,
        opacity: 0.46,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      }),
    []
  );

  const importMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#e1b768",
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false
      }),
    []
  );
  const lineObject = useMemo(() => new THREE.Line(geometry, parentMat), [geometry, parentMat]);

  useFrame((state) => {
    const line = lineRef.current;
    if (!line) return;

    const universe = useUniverseStore.getState();
    const runtime = universe.edges.get(edgeId);

    if (!runtime) {
      line.visible = false;
      return;
    }

    const fromNodeId = universe.nodeIdsByIndex[runtime.fromIndex];
    const toNodeId = universe.nodeIdsByIndex[runtime.toIndex];

    if (!fromNodeId || !toNodeId || !universe.isNodeVisible(fromNodeId) || !universe.isNodeVisible(toNodeId)) {
      line.visible = false;
      return;
    }

    const latticeMode = universe.viewMode === "lattice";
    if (latticeMode && runtime.edge.type === "IMPORT") {
      line.visible = false;
      return;
    }

    line.visible = true;
    frameCounter.current += 1;

    const fo = runtime.fromIndex * 3;
    const to = runtime.toIndex * 3;

    tmpFrom.set(universe.positions[fo], universe.positions[fo + 1], universe.positions[fo + 2]);
    tmpTo.set(universe.positions[to], universe.positions[to + 1], universe.positions[to + 2]);
    tmpCenter.set(
      (universe.centers[fo] + universe.centers[to]) * 0.5,
      (universe.centers[fo + 1] + universe.centers[to + 1]) * 0.5,
      (universe.centers[fo + 2] + universe.centers[to + 2]) * 0.5
    );

    line.material = runtime.edge.type === "PARENT" ? parentMat : importMat;
    const material = line.material as THREE.LineBasicMaterial;
    material.opacity =
      runtime.edge.type === "PARENT"
        ? runtime.activeUntil > state.clock.elapsedTime
          ? 0.58
          : 0.42
        : runtime.activeUntil > state.clock.elapsedTime
          ? 0.34
          : 0.22;

    const updateEvery = latticeMode ? 12 : 5;
    if (frameCounter.current % updateEvery !== 0) {
      return;
    }

    const positions = (geometry.getAttribute("position") as THREE.BufferAttribute).array as Float32Array;

    if (latticeMode) {
      writeStraightPositions(positions, tmpFrom, tmpTo);
    } else {
      computeEdgeControlPoint(
        tmpFrom,
        tmpTo,
        tmpCenter,
        state.clock.elapsedTime,
        runtime.seed,
        {
          type: runtime.edge.type,
          fromDepth: universe.nodeDepthValues[runtime.fromIndex],
          toDepth: universe.nodeDepthValues[runtime.toIndex]
        },
        tmpCtrl
      );
      writeQuadraticCurvePositions(positions, tmpFrom, tmpCtrl, tmpTo);
    }

    const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    positionAttr.needsUpdate = true;
  });

  return <primitive object={lineObject} ref={lineRef} frustumCulled={false} />;
}

export function EdgeSystem() {
  const edgeVersion = useUniverseStore((s) => s.edgeVersion);
  const viewMode = useUniverseStore((s) => s.viewMode);

  const edgeIds = useMemo(() => {
    const store = useUniverseStore.getState();
    const ids: string[] = [];

    for (const id of store.edgeIds) {
      const runtime = store.edges.get(id);
      if (!runtime) continue;
      if (viewMode === "lattice" && runtime.edge.type === "IMPORT") continue;
      ids.push(id);
      if (ids.length >= MAX_RENDERED_EDGES) break;
    }

    return ids;
  }, [edgeVersion, viewMode]);

  return (
    <group>
      {edgeIds.map((edgeId) => (
        <EdgeLine key={edgeId} edgeId={edgeId} />
      ))}
    </group>
  );
}

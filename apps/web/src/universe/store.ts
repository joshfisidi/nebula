import { create } from "zustand";
import type { NodeType, UniverseEdge, UniverseEvent, UniverseNode } from "@nebula/protocol";
import { hashToUnit, projectCenterFromSlot, typeToValue } from "./physics";

export const MAX_NODES = 4096;
export const PARTICLES_PER_EDGE = 10;
const TAU = Math.PI * 2;
const COLLISION_CELL_SIZE = 5.2;
const MIN_COLLISION_PADDING = 0.18;
const MAX_COLLISION_PUSH = 1.2;
const COLLISION_NEIGHBORS: [number, number, number][] = [];

for (let dx = -1; dx <= 1; dx += 1) {
  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dz = -1; dz <= 1; dz += 1) {
      if (dx > 0 || (dx === 0 && dy > 0) || (dx === 0 && dy === 0 && dz >= 0)) {
        COLLISION_NEIGHBORS.push([dx, dy, dz]);
      }
    }
  }
}

interface RuntimeNode {
  node: UniverseNode;
  index: number;
  parentIndex: number;
  parentId?: string;
  depth: number;
  siblingIndex: number;
  orbitBaseAngle: number;
  orbitPhase: number;
  orbitDrift: number;
  orbitRadius: number;
  orbitBand: number;
  orbitCapacity: number;
  orbitEccentricity: number;
  orbitTilt: number;
  orbitLift: number;
  activeUntil: number;
}

interface RuntimeEdge {
  edge: UniverseEdge;
  fromIndex: number;
  toIndex: number;
  seed: number;
  activeUntil: number;
}

interface ProjectRuntime {
  slot: number;
  center: [number, number, number];
  name: string;
  rootPath: string;
}

interface Tuning {
  springK: number;
  damping: number;
  noise: number;
  gravity: number;
}

type ViewMode = "lattice" | "presentation3d";

interface UniverseState {
  connected: boolean;
  nodeCount: number;
  edgeCount: number;
  nodeVersion: number;
  edgeVersion: number;
  tuning: Tuning;
  nodes: Map<string, RuntimeNode>;
  edges: Map<string, RuntimeEdge>;
  projects: Map<string, ProjectRuntime>;
  childrenByParent: Map<string, string[]>;
  selectedProjectIds: Set<string>;
  selectedNodeId: string | null;
  collapsedNodeIds: Set<string>;
  searchQuery: string;
  visibleTypes: Set<NodeType>;
  viewMode: ViewMode;
  nodeProjectIds: string[];
  nodeIdsByIndex: string[];
  pendingEdges: UniverseEdge[];
  edgeIds: string[];
  positions: Float32Array;
  previousPositions: Float32Array;
  accelerations: Float32Array;
  centers: Float32Array;
  nodeTypeValues: Float32Array;
  nodeDepthValues: Float32Array;
  nodeActiveValues: Float32Array;
  nodeCollisionRadiusValues: Float32Array;
  ingestEvent: (event: UniverseEvent) => void;
  addNode: (node: UniverseNode) => void;
  addEdge: (edge: UniverseEdge) => void;
  tick: (delta: number, elapsed: number) => void;
  setConnectionStatus: (connected: boolean) => void;
  setTuning: (partial: Partial<Tuning>) => void;
  toggleProjectSelection: (projectId: string) => void;
  selectAllProjects: () => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  toggleCollapsedNode: (nodeId: string) => void;
  setSearchQuery: (query: string) => void;
  toggleVisibleType: (type: NodeType) => void;
  setViewMode: (mode: ViewMode) => void;
  isNodeVisible: (nodeId: string) => boolean;
}

function vecOffset(index: number): number {
  return index * 3;
}

function splitPath(input: string): string[] {
  return input.replace(/\\/g, "/").split("/").filter(Boolean);
}

function basename(input: string): string {
  const parts = splitPath(input);
  return parts[parts.length - 1] ?? input;
}

function nodeDepth(projectRootPath: string, nodePath: string): number {
  const root = splitPath(projectRootPath);
  const node = splitPath(nodePath);

  if (node.length <= root.length) {
    return 0;
  }

  return node.length - root.length;
}

function orbitDefaults(node: UniverseNode, depth: number, seed: number): {
  radius: number;
  band: number;
  capacity: number;
  eccentricity: number;
  drift: number;
  tilt: number;
  lift: number;
} {
  if (node.type === "PROJECT") {
    return { radius: 0, band: 0, capacity: 1, eccentricity: 0, drift: 0, tilt: 0, lift: 0 };
  }

  if (node.type === "FOLDER") {
    const laneRadius = 9.4 + depth * 3.2 + seed * 1.7;
    return {
      radius: laneRadius,
      band: 4 + Math.min(2.2, depth * 0.3),
      capacity: Math.max(6, Math.round((TAU * laneRadius) / 5.8)),
      eccentricity: 0.1 + seed * 0.18,
      drift: 0.012 + seed * 0.01,
      tilt: (seed - 0.5) * 0.56,
      lift: 0.72 + seed * 0.3
    };
  }

  const laneRadius = 3.2 + depth * 1.45 + seed * 0.9;
  return {
    radius: laneRadius,
    band: 2.2 + Math.min(1, depth * 0.16),
    capacity: Math.max(7, Math.round((TAU * laneRadius) / 2.15)),
    eccentricity: 0.07 + seed * 0.2,
    drift: 0.019 + seed * 0.015,
    tilt: (seed - 0.5) * 0.75,
    lift: 0.26 + seed * 0.14
  };
}

function nodeCollisionRadius(nodeType: UniverseNode["type"], depth: number): number {
  if (nodeType === "PROJECT") return 2.52;
  if (nodeType === "FOLDER") {
    return depth <= 1 ? 1.94 : 1.24;
  }
  return 0.86;
}

function orbitLaneForSibling(
  siblingIndex: number,
  siblingCount: number,
  orbitCapacity: number,
  baseRadius: number,
  orbitBand: number
): {
  slotAngle: number;
  radius: number;
} {
  const capacity = Math.max(1, orbitCapacity);
  const ringIndex = Math.floor(siblingIndex / capacity);
  const ringStart = ringIndex * capacity;
  const siblingsInRing = Math.max(1, Math.min(capacity, siblingCount - ringStart));
  const slotInRing = Math.max(0, siblingIndex - ringStart);

  return {
    slotAngle: (slotInRing / siblingsInRing) * TAU,
    radius: baseRadius + ringIndex * orbitBand
  };
}

export const useUniverseStore = create<UniverseState>((set, get) => ({
  connected: false,
  nodeCount: 0,
  edgeCount: 0,
  nodeVersion: 0,
  edgeVersion: 0,
  tuning: {
    springK: 0.002,
    damping: 0.965,
    noise: 0.00035,
    gravity: 0.004
  },
  nodes: new Map(),
  edges: new Map(),
  projects: new Map(),
  childrenByParent: new Map(),
  selectedProjectIds: new Set(),
  selectedNodeId: null,
  collapsedNodeIds: new Set(),
  searchQuery: "",
  visibleTypes: new Set<NodeType>(["PROJECT", "FOLDER", "FILE"]),
  viewMode: "lattice",
  nodeProjectIds: new Array<string>(MAX_NODES).fill(""),
  nodeIdsByIndex: new Array<string>(MAX_NODES).fill(""),
  pendingEdges: [],
  edgeIds: [],
  positions: new Float32Array(MAX_NODES * 3),
  previousPositions: new Float32Array(MAX_NODES * 3),
  accelerations: new Float32Array(MAX_NODES * 3),
  centers: new Float32Array(MAX_NODES * 3),
  nodeTypeValues: new Float32Array(MAX_NODES),
  nodeDepthValues: new Float32Array(MAX_NODES),
  nodeActiveValues: new Float32Array(MAX_NODES),
  nodeCollisionRadiusValues: new Float32Array(MAX_NODES),

  setConnectionStatus(connected) {
    set({ connected });
  },

  setTuning(partial) {
    set((state) => {
      const next = { ...state.tuning, ...partial };
      if (
        next.springK === state.tuning.springK &&
        next.damping === state.tuning.damping &&
        next.noise === state.tuning.noise &&
        next.gravity === state.tuning.gravity
      ) {
        return state;
      }

      return { tuning: next };
    });
  },

  toggleProjectSelection(projectId) {
    set((state) => {
      const next = new Set(state.selectedProjectIds);
      if (next.has(projectId)) {
        next.delete(projectId);
      } else {
        next.add(projectId);
      }
      return { selectedProjectIds: next };
    });
  },

  selectAllProjects() {
    set((state) => ({ selectedProjectIds: new Set(state.projects.keys()) }));
  },

  setSelectedNodeId(nodeId) {
    set({ selectedNodeId: nodeId });
  },

  toggleCollapsedNode(nodeId) {
    set((state) => {
      const next = new Set(state.collapsedNodeIds);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return { collapsedNodeIds: next };
    });
  },

  setSearchQuery(query) {
    set({ searchQuery: query });
  },

  toggleVisibleType(type) {
    set((state) => {
      const next = new Set(state.visibleTypes);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return { visibleTypes: next.size > 0 ? next : new Set<NodeType>(["PROJECT", "FOLDER", "FILE"]) };
    });
  },

  setViewMode(mode) {
    set({ viewMode: mode });
  },

  isNodeVisible(nodeId) {
    const state = get();
    const runtime = state.nodes.get(nodeId);
    if (!runtime) return false;

    if (!state.selectedProjectIds.has(runtime.node.projectId)) return false;
    if (!state.visibleTypes.has(runtime.node.type)) return false;

    const q = state.searchQuery.trim().toLowerCase();
    if (q) {
      const hay = `${basename(runtime.node.path)} ${runtime.node.path}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    let parentId = runtime.parentId;
    while (parentId) {
      if (state.collapsedNodeIds.has(parentId)) return false;
      parentId = state.nodes.get(parentId)?.parentId;
    }

    return true;
  },

  ingestEvent(event) {
    if (event.type === "node.create" || event.type === "node.update") {
      get().addNode(event.node);
      return;
    }

    if (event.type === "edge.create") {
      get().addEdge(event.edge);
    }
  },

  addNode(node) {
    const state = get();
    if (state.nodes.has(node.id) || state.nodeCount >= MAX_NODES) {
      return;
    }

    let project = state.projects.get(node.projectId);
    if (!project) {
      const slot = state.projects.size;
      const rootName = node.path.replace(/\\/g, "/").split("/").filter(Boolean).pop() ?? node.projectId;
      project = {
        slot,
        center: projectCenterFromSlot(slot),
        name: rootName,
        rootPath: node.path
      };
      state.projects.set(node.projectId, project);
      state.selectedProjectIds.add(node.projectId);
    }

    const parentIndex = node.parentId ? state.nodes.get(node.parentId)?.index ?? -1 : -1;
    const index = state.nodeCount;
    const seed = hashToUnit(node.id);
    const depth = node.type === "PROJECT" ? 0 : nodeDepth(project.rootPath, node.path);
    const orbit = orbitDefaults(node, depth, seed);

    let siblingIndex = 0;
    if (node.parentId) {
      const siblings = state.childrenByParent.get(node.parentId) ?? [];
      siblingIndex = siblings.length;
      siblings.push(node.id);
      state.childrenByParent.set(node.parentId, siblings);
    }

    const siblingCount = node.parentId ? state.childrenByParent.get(node.parentId)?.length ?? 1 : 1;
    const lane = orbitLaneForSibling(siblingIndex, siblingCount, orbit.capacity, orbit.radius, orbit.band);

    const baseAngle = hashToUnit(`${node.id}:base-angle`) * TAU;
    const initialTheta = baseAngle + lane.slotAngle;

    const o = vecOffset(index);
    const [pcx, pcy, pcz] = project.center;

    let anchorX = pcx;
    let anchorY = pcy;
    let anchorZ = pcz;

    if (parentIndex >= 0) {
      const po = vecOffset(parentIndex);
      anchorX = state.positions[po];
      anchorY = state.positions[po + 1];
      anchorZ = state.positions[po + 2];
    }

    const radiusX = lane.radius * (1 + orbit.eccentricity);
    const radiusZ = lane.radius * (1 - orbit.eccentricity * 0.58);
    const targetX = node.type === "PROJECT" ? pcx : anchorX + Math.cos(initialTheta) * radiusX;
    const targetY =
      node.type === "PROJECT"
        ? pcy
        : anchorY + Math.sin(initialTheta * 0.5 + orbit.tilt) * orbit.lift;
    const targetZ = node.type === "PROJECT" ? pcz : anchorZ + Math.sin(initialTheta) * radiusZ;

    state.positions[o] = targetX;
    state.positions[o + 1] = targetY;
    state.positions[o + 2] = targetZ;

    state.previousPositions[o] = targetX;
    state.previousPositions[o + 1] = targetY;
    state.previousPositions[o + 2] = targetZ;

    state.centers[o] = anchorX;
    state.centers[o + 1] = anchorY;
    state.centers[o + 2] = anchorZ;

    state.nodeTypeValues[index] = typeToValue(node.type);
    state.nodeDepthValues[index] = depth;
    state.nodeActiveValues[index] = 1;
    state.nodeCollisionRadiusValues[index] = nodeCollisionRadius(node.type, depth);
    state.nodeProjectIds[index] = node.projectId;
    state.nodeIdsByIndex[index] = node.id;

    state.nodes.set(node.id, {
      node,
      index,
      parentIndex,
      parentId: node.parentId,
      depth,
      siblingIndex,
      orbitBaseAngle: baseAngle,
      orbitPhase: 0,
      orbitDrift: orbit.drift * (hashToUnit(`${node.id}:drift-sign`) > 0.5 ? 1 : -1),
      orbitRadius: orbit.radius,
      orbitBand: orbit.band,
      orbitCapacity: orbit.capacity,
      orbitEccentricity: orbit.eccentricity,
      orbitTilt: orbit.tilt,
      orbitLift: orbit.lift,
      activeUntil: performance.now() * 0.001 + 2.6
    });

    const resolvedPending: UniverseEdge[] = [];
    const unresolvedPending: UniverseEdge[] = [];

    for (const pending of state.pendingEdges) {
      const fromReady = state.nodes.has(pending.from);
      const toReady = state.nodes.has(pending.to);
      if (fromReady && toReady) {
        resolvedPending.push(pending);
      } else {
        unresolvedPending.push(pending);
      }
    }

    state.pendingEdges = unresolvedPending;

    set({
      nodeCount: state.nodeCount + 1,
      nodeVersion: state.nodeVersion + 1
    });

    for (const pending of resolvedPending) {
      get().addEdge(pending);
    }
  },

  addEdge(edge) {
    const state = get();
    if (state.edges.has(edge.id)) {
      return;
    }

    const fromNode = state.nodes.get(edge.from);
    const toNode = state.nodes.get(edge.to);

    if (!fromNode || !toNode) {
      state.pendingEdges.push(edge);
      return;
    }

    const runtimeEdge: RuntimeEdge = {
      edge,
      fromIndex: fromNode.index,
      toIndex: toNode.index,
      seed: hashToUnit(edge.id),
      activeUntil: performance.now() * 0.001 + 3.4
    };

    state.edges.set(edge.id, runtimeEdge);

    const nextIds = state.edgeIds.concat(edge.id);
    const fromRuntime = state.nodes.get(edge.from);
    const toRuntime = state.nodes.get(edge.to);

    if (fromRuntime) {
      fromRuntime.activeUntil = performance.now() * 0.001 + 2.5;
    }
    if (toRuntime) {
      toRuntime.activeUntil = performance.now() * 0.001 + 2.5;
    }

    set({
      edgeCount: state.edgeCount + 1,
      edgeIds: nextIds,
      edgeVersion: state.edgeVersion + 1
    });
  },

  tick(delta, elapsed) {
    const state = get();
    if (state.nodeCount === 0) {
      return;
    }

    const dt = Math.min(1 / 24, Math.max(1 / 200, delta));

    if (state.viewMode === "lattice") {
      const settle = 0.22;
      const xSpacing = 2.8;
      const ySpacing = 2.2;
      const zSpacing = 0.45;

      for (const runtime of state.nodes.values()) {
        const o = vecOffset(runtime.index);
        const project = state.projects.get(runtime.node.projectId);
        if (!project) continue;

        const [pcx, pcy, pcz] = project.center;
        const siblingCount = runtime.parentId ? Math.max(1, state.childrenByParent.get(runtime.parentId)?.length ?? 1) : 1;
        const laneOffset = runtime.siblingIndex - (siblingCount - 1) / 2;

        const targetX = pcx + laneOffset * xSpacing;
        const targetY = pcy - runtime.depth * ySpacing;
        const targetZ = pcz + (runtime.node.type === "PROJECT" ? 0 : runtime.node.type === "FOLDER" ? zSpacing : zSpacing * 2);

        state.positions[o] += (targetX - state.positions[o]) * settle;
        state.positions[o + 1] += (targetY - state.positions[o + 1]) * settle;
        state.positions[o + 2] += (targetZ - state.positions[o + 2]) * settle;

        state.previousPositions[o] = state.positions[o];
        state.previousPositions[o + 1] = state.positions[o + 1];
        state.previousPositions[o + 2] = state.positions[o + 2];

        state.centers[o] = targetX;
        state.centers[o + 1] = targetY;
        state.centers[o + 2] = targetZ;
        state.nodeActiveValues[runtime.index] = runtime.activeUntil > elapsed ? 1 : 0;
      }

      return;
    }

    const settle = Math.min(0.28, Math.max(0.1, 1 - state.tuning.damping * 0.88));
    const driftScale = 0.38 + state.tuning.noise * 14;
    const liftScale = 0.62 + state.tuning.gravity * 12;

    state.accelerations.fill(0, 0, state.nodeCount * 3);

    for (const runtime of state.nodes.values()) {
      if (runtime.node.type !== "PROJECT") {
        continue;
      }
      const project = state.projects.get(runtime.node.projectId);
      if (!project) continue;

      const o = vecOffset(runtime.index);
      const [pcx, pcy, pcz] = project.center;

      state.positions[o] = pcx;
      state.positions[o + 1] = pcy;
      state.positions[o + 2] = pcz;

      state.previousPositions[o] = pcx;
      state.previousPositions[o + 1] = pcy;
      state.previousPositions[o + 2] = pcz;

      state.centers[o] = pcx;
      state.centers[o + 1] = pcy;
      state.centers[o + 2] = pcz;

      state.nodeActiveValues[runtime.index] = runtime.activeUntil > elapsed ? 1 : 0;
    }

    for (const runtime of state.nodes.values()) {
      if (runtime.node.type === "PROJECT") {
        continue;
      }

      const project = state.projects.get(runtime.node.projectId);
      if (!project) continue;

      const o = vecOffset(runtime.index);

      let anchorX = project.center[0];
      let anchorY = project.center[1];
      let anchorZ = project.center[2];

      if (runtime.parentIndex >= 0) {
        const po = vecOffset(runtime.parentIndex);
        anchorX = state.positions[po];
        anchorY = state.positions[po + 1];
        anchorZ = state.positions[po + 2];
      }

      const siblingCount = runtime.parentId
        ? Math.max(1, state.childrenByParent.get(runtime.parentId)?.length ?? 1)
        : 1;

      const lane = orbitLaneForSibling(
        runtime.siblingIndex,
        siblingCount,
        runtime.orbitCapacity,
        runtime.orbitRadius,
        runtime.orbitBand
      );

      runtime.orbitPhase += runtime.orbitDrift * driftScale * dt;

      const theta = runtime.orbitBaseAngle + lane.slotAngle + runtime.orbitPhase;
      const radiusX = lane.radius * (1 + runtime.orbitEccentricity);
      const radiusZ = lane.radius * (1 - runtime.orbitEccentricity * 0.58);
      const yAmp = (runtime.orbitLift * liftScale) / (1 + runtime.depth * 0.14);

      const targetX = anchorX + Math.cos(theta) * radiusX;
      const targetY = anchorY + Math.sin(theta * 0.5 + runtime.orbitTilt) * yAmp;
      const targetZ = anchorZ + Math.sin(theta) * radiusZ;

      state.positions[o] += (targetX - state.positions[o]) * settle;
      state.positions[o + 1] += (targetY - state.positions[o + 1]) * settle;
      state.positions[o + 2] += (targetZ - state.positions[o + 2]) * settle;

      state.centers[o] = anchorX;
      state.centers[o + 1] = anchorY;
      state.centers[o + 2] = anchorZ;

      state.nodeActiveValues[runtime.index] = runtime.activeUntil > elapsed ? 1 : 0;
    }

    const cells = new Map<string, number[]>();

    for (let i = 0; i < state.nodeCount; i += 1) {
      const o = vecOffset(i);
      const cellX = Math.floor(state.positions[o] / COLLISION_CELL_SIZE);
      const cellY = Math.floor(state.positions[o + 1] / COLLISION_CELL_SIZE);
      const cellZ = Math.floor(state.positions[o + 2] / COLLISION_CELL_SIZE);
      const key = `${cellX}|${cellY}|${cellZ}`;

      let bucket = cells.get(key);
      if (!bucket) {
        bucket = [];
        cells.set(key, bucket);
      }
      bucket.push(i);
    }

    for (const [key, bucket] of cells.entries()) {
      const [sx, sy, sz] = key.split("|");
      const cellX = Number(sx);
      const cellY = Number(sy);
      const cellZ = Number(sz);

      for (const [dx, dy, dz] of COLLISION_NEIGHBORS) {
        const neighborKey = `${cellX + dx}|${cellY + dy}|${cellZ + dz}`;
        const neighbor = cells.get(neighborKey);
        if (!neighbor) continue;

        for (let ia = 0; ia < bucket.length; ia += 1) {
          const aIndex = bucket[ia];
          const start = neighbor === bucket ? ia + 1 : 0;

          for (let ib = start; ib < neighbor.length; ib += 1) {
            const bIndex = neighbor[ib];

            const aType = state.nodeTypeValues[aIndex];
            const bType = state.nodeTypeValues[bIndex];
            const aIsProject = aType < 0.5;
            const bIsProject = bType < 0.5;

            if (aIsProject && bIsProject) {
              continue;
            }

            const ao = vecOffset(aIndex);
            const bo = vecOffset(bIndex);

            let dxPos = state.positions[bo] - state.positions[ao];
            let dyPos = state.positions[bo + 1] - state.positions[ao + 1];
            let dzPos = state.positions[bo + 2] - state.positions[ao + 2];

            let distSq = dxPos * dxPos + dyPos * dyPos + dzPos * dzPos;
            if (distSq < 0.000001) {
              const angle = hashToUnit(`${aIndex}:${bIndex}`) * TAU;
              dxPos = Math.cos(angle) * 0.0008;
              dyPos = Math.sin(angle * 1.37) * 0.0008;
              dzPos = Math.sin(angle) * 0.0008;
              distSq = dxPos * dxPos + dyPos * dyPos + dzPos * dzPos;
            }

            const minDistance =
              state.nodeCollisionRadiusValues[aIndex] +
              state.nodeCollisionRadiusValues[bIndex] +
              MIN_COLLISION_PADDING;
            const minDistanceSq = minDistance * minDistance;

            if (distSq >= minDistanceSq) {
              continue;
            }

            const distance = Math.sqrt(distSq);
            const overlap = Math.min(MAX_COLLISION_PUSH, minDistance - distance);
            const nx = dxPos / distance;
            const ny = dyPos / distance;
            const nz = dzPos / distance;

            if (aIsProject) {
              state.accelerations[bo] += nx * overlap;
              state.accelerations[bo + 1] += ny * overlap;
              state.accelerations[bo + 2] += nz * overlap;
            } else if (bIsProject) {
              state.accelerations[ao] -= nx * overlap;
              state.accelerations[ao + 1] -= ny * overlap;
              state.accelerations[ao + 2] -= nz * overlap;
            } else {
              const half = overlap * 0.5;
              state.accelerations[ao] -= nx * half;
              state.accelerations[ao + 1] -= ny * half;
              state.accelerations[ao + 2] -= nz * half;

              state.accelerations[bo] += nx * half;
              state.accelerations[bo + 1] += ny * half;
              state.accelerations[bo + 2] += nz * half;
            }
          }
        }
      }
    }

    for (let i = 0; i < state.nodeCount; i += 1) {
      if (state.nodeTypeValues[i] < 0.5) {
        continue;
      }

      const o = vecOffset(i);
      state.positions[o] += state.accelerations[o] * 0.56;
      state.positions[o + 1] += state.accelerations[o + 1] * 0.46;
      state.positions[o + 2] += state.accelerations[o + 2] * 0.56;

      state.previousPositions[o] = state.positions[o];
      state.previousPositions[o + 1] = state.positions[o + 1];
      state.previousPositions[o + 2] = state.positions[o + 2];
    }
  }
}));

"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import type { NodeType } from "@nebula/protocol";
import { useUniverseStore } from "./store";

interface LabelEntry {
  id: string;
  index: number;
  type: NodeType;
  label: string;
}

const TYPE_COLOR: Record<NodeType, string> = {
  PROJECT: "#ffd071",
  FOLDER: "#73d9ff",
  FILE: "#cfd6e1"
};

function basename(input: string): string {
  const cleaned = input.replace(/\\/g, "/").replace(/\/+$/, "");
  const segments = cleaned.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? input;
}

function formatLabel(type: NodeType, path: string): string {
  const name = basename(path);
  const clipped = name.length > 28 ? `${name.slice(0, 25)}...` : name;

  if (type === "PROJECT") return `[PROJECT] ${clipped}`;
  if (type === "FOLDER") return `[FOLDER] ${clipped}/`;
  return `[FILE] ${clipped}`;
}

export function LabelSystem({ limit = 260 }: { limit?: number }) {
  const nodeVersion = useUniverseStore((s) => s.nodeVersion);
  const selectedProjectIds = useUniverseStore((s) => s.selectedProjectIds);
  const searchQuery = useUniverseStore((s) => s.searchQuery);
  const visibleTypes = useUniverseStore((s) => s.visibleTypes);
  const collapsedNodeIds = useUniverseStore((s) => s.collapsedNodeIds);
  const refs = useRef(new Map<string, THREE.Object3D>());

  const labels = useMemo<LabelEntry[]>(() => {
    const store = useUniverseStore.getState();
    const nodes = Array.from(store.nodes.values()).filter((runtime) => store.isNodeVisible(runtime.node.id));

    const projectAndFolder = nodes
      .filter((runtime) => runtime.node.type !== "FILE")
      .sort((a, b) => a.depth - b.depth || a.node.path.localeCompare(b.node.path));
    const files = nodes
      .filter((runtime) => runtime.node.type === "FILE")
      .sort((a, b) => a.depth - b.depth || a.node.path.localeCompare(b.node.path));

    const fileLabelCap = Math.min(64, Math.max(12, Math.floor(limit * 0.25)));
    const picked = projectAndFolder.concat(files.slice(0, fileLabelCap)).slice(0, limit);

    return picked.map((runtime) => ({
      id: runtime.node.id,
      index: runtime.index,
      type: runtime.node.type,
      label: formatLabel(runtime.node.type, runtime.node.path)
    }));
  }, [nodeVersion, limit, selectedProjectIds, searchQuery, visibleTypes, collapsedNodeIds]);

  useFrame(() => {
    const universe = useUniverseStore.getState();

    for (const entry of labels) {
      const object = refs.current.get(entry.id);
      if (!object) continue;

      const o = entry.index * 3;
      object.position.set(universe.positions[o], universe.positions[o + 1] + 0.78, universe.positions[o + 2]);
    }
  });

  return (
    <group>
      {labels.map((entry) => (
        <Billboard
          key={entry.id}
          ref={(value) => {
            if (value) {
              refs.current.set(entry.id, value);
            } else {
              refs.current.delete(entry.id);
            }
          }}
          follow
          lockX={false}
          lockY={false}
          lockZ={false}
        >
          <Text
            fontSize={entry.type === "PROJECT" ? 0.58 : entry.type === "FOLDER" ? 0.42 : 0.31}
            color={TYPE_COLOR[entry.type]}
            outlineColor="#030712"
            outlineWidth={0.038}
            anchorX="center"
            anchorY="bottom"
            maxWidth={8}
          >
            {entry.label}
          </Text>
        </Billboard>
      ))}
    </group>
  );
}

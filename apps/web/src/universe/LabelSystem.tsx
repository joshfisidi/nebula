"use client";

import { useMemo } from "react";
import { Billboard, Text } from "@react-three/drei";
import { useUniverseGraphStore } from "./graphStore";

export function LabelSystem({ limit = 200 }: { limit?: number }) {
  const version = useUniverseGraphStore((s) => s.version);

  const labels = useMemo(() => {
    const nodes = useUniverseGraphStore
      .getState()
      .nodeArray.filter((n) => n.kind === "dir")
      .sort((a, b) => a.depth - b.depth || a.name.localeCompare(b.name));

    return nodes.slice(0, limit);
  }, [version, limit]);

  return (
    <group>
      {labels.map((node) => (
        <Billboard key={node.id} position={[node.posCurrent.x, node.posCurrent.y + 0.45, node.posCurrent.z]}>
          <Text fontSize={0.25} color="#9ddcff" outlineColor="#07101e" outlineWidth={0.03} anchorX="center" anchorY="bottom">
            {node.name}
          </Text>
        </Billboard>
      ))}
    </group>
  );
}

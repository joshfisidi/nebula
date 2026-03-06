"use client";

import { useMemo } from "react";
import { Billboard, Text } from "@react-three/drei";
import { useUniverseGraphStore } from "./graphStore";

function truncateName(name: string, max = 24): string {
  if (name.length <= max) return name;
  return `${name.slice(0, max - 1)}…`;
}

export function LabelSystem({ limit = 160 }: { limit?: number }) {
  const version = useUniverseGraphStore((s) => s.version);

  const labels = useMemo(() => {
    const grid = new Set<string>();

    // Prioritize lower-depth directories; drop labels that collide in a coarse XY grid.
    return useUniverseGraphStore
      .getState()
      .nodeArray.filter((n) => n.kind === "dir" && n.depth <= 4)
      .sort((a, b) => a.depth - b.depth || a.name.localeCompare(b.name))
      .filter((node) => {
        const gx = Math.round(node.posCurrent.x / 4.2);
        const gy = Math.round(node.posCurrent.y / 3.2);
        const key = `${gx}:${gy}`;
        if (grid.has(key)) return false;
        grid.add(key);
        return true;
      })
      .slice(0, limit);
  }, [version, limit]);

  return (
    <group>
      {labels.map((node) => (
        <Billboard key={node.id} position={[node.posCurrent.x, node.posCurrent.y + 0.75, node.posCurrent.z]}>
          <Text
            fontSize={0.18}
            color="#b8ddff"
            outlineColor="#05101d"
            outlineWidth={0.018}
            maxWidth={5.6}
            anchorX="center"
            anchorY="bottom"
          >
            {truncateName(node.name)}
          </Text>
        </Billboard>
      ))}
    </group>
  );
}

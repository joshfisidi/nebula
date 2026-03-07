"use client";

import { BaseEdge, getSmoothStepPath, MarkerType, type EdgeProps } from "reactflow";

export function FloatingEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 10,
    offset: 16
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      markerEnd={MarkerType.ArrowClosed}
      style={{ stroke: "rgba(138, 179, 255, 0.65)", strokeWidth: 1.2 }}
    />
  );
}

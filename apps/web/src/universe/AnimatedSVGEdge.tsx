"use client";

import { BaseEdge, getSmoothStepPath, type EdgeProps } from "reactflow";

export function AnimatedSVGEdge({
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
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: "rgba(140,180,255,0.35)", strokeWidth: 1 }} />
      <circle r="3" fill="#7dd3fc">
        <animateMotion dur="2.2s" repeatCount="indefinite" path={edgePath} />
      </circle>
    </>
  );
}

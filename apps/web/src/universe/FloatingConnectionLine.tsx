"use client";

import { getSmoothStepPath, type ConnectionLineComponentProps } from "reactflow";

export function FloatingConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
  fromPosition,
  toPosition
}: ConnectionLineComponentProps) {
  const [path] = getSmoothStepPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
    sourcePosition: fromPosition,
    targetPosition: toPosition,
    borderRadius: 10,
    offset: 16
  });

  return <path fill="none" stroke="rgba(125, 211, 252, 0.9)" strokeWidth={1.4} d={path} />;
}

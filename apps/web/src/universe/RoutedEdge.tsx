"use client";

import { BaseEdge, type EdgeProps } from "reactflow";
import type { RoutedEdgeData } from "./layoutEngines";

type Point = { x: number; y: number };

function buildRoundedPath(points: Point[], radius: number): string {
  const filtered: Point[] = [];

  for (const point of points) {
    const last = filtered[filtered.length - 1];
    if (!last || Math.abs(last.x - point.x) > 0.01 || Math.abs(last.y - point.y) > 0.01) {
      filtered.push(point);
    }
  }

  if (filtered.length === 0) return "";

  let path = `M ${filtered[0].x} ${filtered[0].y}`;

  for (let index = 1; index < filtered.length; index += 1) {
    const previous = filtered[index - 1];
    const current = filtered[index];
    const next = filtered[index + 1];

    if (!next) {
      path += ` L ${current.x} ${current.y}`;
      continue;
    }

    const inDx = current.x - previous.x;
    const inDy = current.y - previous.y;
    const outDx = next.x - current.x;
    const outDy = next.y - current.y;
    const inLength = Math.hypot(inDx, inDy);
    const outLength = Math.hypot(outDx, outDy);

    if (inLength < 0.01 || outLength < 0.01) {
      path += ` L ${current.x} ${current.y}`;
      continue;
    }

    const bend = Math.min(radius, inLength / 2, outLength / 2);
    const start = {
      x: current.x - (inDx / inLength) * bend,
      y: current.y - (inDy / inLength) * bend
    };
    const end = {
      x: current.x + (outDx / outLength) * bend,
      y: current.y + (outDy / outLength) * bend
    };

    path += ` L ${start.x} ${start.y} Q ${current.x} ${current.y} ${end.x} ${end.y}`;
  }

  return path;
}

export function RoutedEdge({ id, sourceX, sourceY, targetX, targetY, data, style }: EdgeProps) {
  const route = (data as RoutedEdgeData | undefined) ?? {
    laneY: (sourceY + targetY) / 2,
    route: targetX - sourceX >= 56 ? ("forward" as const) : ("detour" as const),
    laneX: Math.max(sourceX, targetX) + 72
  };

  const laneY = route.laneY;
  const laneX = route.laneX ?? Math.max(sourceX, targetX) + 72;
  const fanOut = 18;
  const fanIn = 18;

  const points: Point[] =
    route.route === "forward"
      ? [
          { x: sourceX, y: sourceY },
          { x: sourceX + fanOut, y: sourceY },
          { x: sourceX + fanOut, y: laneY },
          { x: targetX - fanIn, y: laneY },
          { x: targetX - fanIn, y: targetY },
          { x: targetX, y: targetY }
        ]
      : [
          { x: sourceX, y: sourceY },
          { x: laneX, y: sourceY },
          { x: laneX, y: laneY },
          { x: targetX - fanIn, y: laneY },
          { x: targetX - fanIn, y: targetY },
          { x: targetX, y: targetY }
        ];

  const path = buildRoundedPath(points, 10);

  return <BaseEdge id={id} path={path} style={style} />;
}

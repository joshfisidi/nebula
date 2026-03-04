"use client";

import { useMemo, useRef, useState } from "react";
import { UniverseLiveProvider } from "./UniverseLiveProvider";
import { useUniverseGraphStore } from "./graphStore";

function StatusHud() {
  const connected = useUniverseGraphStore((s) => s.connected);
  const nodeCount = useUniverseGraphStore((s) => s.nodeArray.length);
  const edgeCount = useUniverseGraphStore((s) => s.edgeArray.length);

  return (
    <div style={{ position: "fixed", top: 12, left: 12, zIndex: 5, fontSize: 12, color: "#d6e7ff", background: "rgba(7,12,23,0.72)", border: "1px solid rgba(105,159,255,0.32)", borderRadius: 10, padding: "8px 10px" }}>
      <div>mode: flat deterministic</div>
      <div>ws: {connected ? "connected" : "disconnected"}</div>
      <div>nodes: {nodeCount}</div>
      <div>edges: {edgeCount}</div>
    </div>
  );
}

function UniverseFlatCanvas() {
  const nodes = useUniverseGraphStore((s) => s.nodeArray);
  const edges = useUniverseGraphStore((s) => s.edgeArray);

  const nodeById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      style={{ width: "100vw", height: "100vh", background: "#060b14", overflow: "hidden", cursor: dragRef.current ? "grabbing" : "grab" }}
      onWheel={(e) => {
        e.preventDefault();
        const next = e.deltaY < 0 ? zoom * 1.08 : zoom / 1.08;
        setZoom(Math.min(6, Math.max(0.2, next)));
      }}
      onMouseDown={(e) => {
        dragRef.current = { x: e.clientX, y: e.clientY };
      }}
      onMouseMove={(e) => {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.x;
        const dy = e.clientY - dragRef.current.y;
        dragRef.current = { x: e.clientX, y: e.clientY };
        setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      }}
      onMouseUp={() => {
        dragRef.current = null;
      }}
      onMouseLeave={() => {
        dragRef.current = null;
      }}
    >
      <svg width="100%" height="100%" style={{ display: "block" }}>
        <g transform={`translate(${window.innerWidth / 2 + pan.x} ${window.innerHeight / 2 + pan.y}) scale(${zoom})`}>
          {edges.map((edge) => {
            const from = nodeById.get(edge.from);
            const to = nodeById.get(edge.to);
            if (!from || !to) return null;
            return (
              <line
                key={edge.id}
                x1={from.posCurrent.x}
                y1={from.posCurrent.y}
                x2={to.posCurrent.x}
                y2={to.posCurrent.y}
                stroke={to.kind === "file" ? "#6ea8ff" : "#7bf7d4"}
                strokeOpacity={0.55}
                strokeWidth={to.kind === "file" ? 1 : 1.4}
              />
            );
          })}

          {nodes.map((node) => (
            <g key={node.id} transform={`translate(${node.posCurrent.x} ${node.posCurrent.y})`}>
              <circle
                r={node.kind === "dir" ? 3.8 : 2.6}
                fill={node.kind === "dir" ? "#5bf3bf" : "#7cb6ff"}
                stroke="#0b1422"
                strokeWidth={1}
              />
              {zoom > 0.45 && (
                <text x={6} y={4} fill="#d9e9ff" fontSize={10} style={{ userSelect: "none" }}>
                  {node.name}
                </text>
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export function UniverseFlatScene() {
  return (
    <UniverseLiveProvider>
      <StatusHud />
      <UniverseFlatCanvas />
    </UniverseLiveProvider>
  );
}

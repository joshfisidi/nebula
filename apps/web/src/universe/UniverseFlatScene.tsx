"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [size, setSize] = useState({ width: 1200, height: 780 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setSize({ width: Math.max(320, rect.width), height: Math.max(240, rect.height) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const visibleNodes = useMemo(() => {
    // Density control: always show directories and top depth; reveal files progressively by zoom.
    if (zoom >= 1.35) return nodes;
    return nodes.filter((n) => n.kind === "dir" || n.depth <= 1 || (zoom > 0.9 && n.depth <= 2));
  }, [nodes, zoom]);

  const maxLabelLength = zoom > 1.4 ? 28 : zoom > 1.0 ? 20 : 14;
  const labelFontSize = zoom > 1.4 ? 10 : zoom > 1.0 ? 9 : 8;

  const shouldShowLabel = (node: (typeof nodes)[number]) => {
    if (zoom < 0.72) return false;
    if (node.kind === "dir") return true;
    if (zoom > 1.4 && node.depth <= 2) return true;
    if (zoom > 1.9) return true;
    return false;
  };

  const truncate = (name: string) => (name.length > maxLabelLength ? `${name.slice(0, maxLabelLength - 1)}…` : name);

  return (
    <div
      ref={containerRef}
      style={{
        width: "min(96vw, 1600px)",
        height: "min(90vh, 980px)",
        margin: "4vh auto 0",
        borderRadius: 18,
        background: "radial-gradient(120% 140% at 20% 10%, #0b1430 0%, #060b14 48%, #04070d 100%)",
        border: "1px solid rgba(110,164,255,0.22)",
        boxShadow: "0 24px 90px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
        overflow: "hidden",
        cursor: dragRef.current ? "grabbing" : "grab"
      }}
      onWheel={(e) => {
        e.preventDefault();
        const next = e.deltaY < 0 ? zoom * 1.08 : zoom / 1.08;
        setZoom(Math.min(6, Math.max(0.25, next)));
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
        <g transform={`translate(${size.width / 2 + pan.x} ${size.height / 2 + pan.y}) scale(${zoom})`}>
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
                strokeOpacity={0.42}
                strokeWidth={to.kind === "file" ? 0.9 : 1.2}
              />
            );
          })}

          {visibleNodes.map((node) => (
            <g key={node.id} transform={`translate(${node.posCurrent.x} ${node.posCurrent.y})`}>
              <circle
                r={node.kind === "dir" ? 3.4 : 2.2}
                fill={node.kind === "dir" ? "#5bf3bf" : "#7cb6ff"}
                stroke="#0b1422"
                strokeWidth={0.9}
              />
              {shouldShowLabel(node) && (
                <text x={5.5} y={3.2} fill="#d9e9ff" fontSize={labelFontSize} style={{ userSelect: "none" }}>
                  {truncate(node.name)}
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

"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Folder, File, Search } from "lucide-react";
import { useUniverseGraphStore } from "./graphStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type TreeNode = {
  id: string;
  name: string;
  kind: "dir" | "file";
  parentId?: string;
  depth: number;
  path: string;
};

export function ProjectViewerPanel() {
  const nodes = useUniverseGraphStore((s) => s.nodeArray);
  const edges = useUniverseGraphStore((s) => s.edgeArray);
  const connected = useUniverseGraphStore((s) => s.connected);
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const byParent = useMemo(() => {
    const map = new Map<string, TreeNode[]>();
    for (const n of nodes) {
      const node: TreeNode = {
        id: n.id,
        name: n.name,
        kind: n.kind,
        parentId: n.parentId,
        depth: n.depth,
        path: n.path
      };
      const key = n.parentId ?? "__root__";
      const arr = map.get(key) ?? [];
      arr.push(node);
      map.set(key, arr);
    }

    for (const arr of map.values()) {
      arr.sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === "dir" ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
    }

    return map;
  }, [nodes]);

  const rootNodes = useMemo(() => byParent.get("__root__") ?? [], [byParent]);

  const visibleSet = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const byId = new Map(nodes.map((n) => [n.id, n]));
    const matched = new Set<string>();

    for (const n of nodes) {
      if (`${n.name} ${n.path}`.toLowerCase().includes(q)) {
        matched.add(n.id);
        let p = n.parentId;
        while (p) {
          matched.add(p);
          p = byId.get(p)?.parentId;
        }
      }
    }

    return matched;
  }, [nodes, query]);

  const renderNode = (node: TreeNode) => {
    if (visibleSet && !visibleSet.has(node.id)) return null;

    const children = byParent.get(node.id) ?? [];
    const isCollapsed = collapsed.has(node.id);
    const canCollapse = node.kind === "dir" && children.length > 0;

    return (
      <div key={node.id}>
        <div className="flex items-center gap-1 py-0.5 text-xs" style={{ paddingLeft: node.depth * 10 }}>
          {canCollapse ? (
            <button
              className="rounded p-0.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              onClick={() => {
                setCollapsed((prev) => {
                  const next = new Set(prev);
                  if (next.has(node.id)) next.delete(node.id);
                  else next.add(node.id);
                  return next;
                });
              }}
            >
              {isCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
            </button>
          ) : (
            <span className="w-4" />
          )}

          {node.kind === "dir" ? <Folder size={13} className="text-cyan-300" /> : <File size={12} className="text-slate-300" />}
          <span className="truncate text-slate-200" title={node.path}>{node.name}</span>
        </div>

        {!isCollapsed && children.map(renderNode)}
      </div>
    );
  };

  return (
    <Card className="absolute left-3 top-3 z-20 w-[360px] backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Project Viewer</CardTitle>
          <Badge variant={connected ? "default" : "secondary"}>{connected ? "live" : "offline"}</Badge>
        </div>
        <div className="flex gap-2 text-xs text-slate-400">
          <span>{nodes.length} nodes</span>
          <span>•</span>
          <span>{edges.length} edges</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-3 flex items-center gap-2">
          <Search size={14} className="text-slate-400" />
          <Input placeholder="Search files/folders..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button variant="outline" size="sm" onClick={() => setCollapsed(new Set())}>expand</Button>
        </div>

        <div className="max-h-[62vh] overflow-auto rounded-md border border-slate-700/80 bg-slate-900/40 p-2">
          {rootNodes.length === 0 ? (
            <div className="px-2 py-6 text-center text-xs text-slate-400">Waiting for graph data...</div>
          ) : (
            rootNodes.map(renderNode)
          )}
        </div>
      </CardContent>
    </Card>
  );
}

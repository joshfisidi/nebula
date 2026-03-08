"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, File, Folder, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { cn } from "@/lib/utils";
import { useUniverseGraphStore } from "./graphStore";

type TreeNode = {
  id: string;
  name: string;
  kind: "dir" | "file";
  parentId?: string;
  depth: number;
  path: string;
  projectId: string;
};

export function ProjectViewerPanel() {
  const nodes = useUniverseGraphStore((s) => s.nodeArray);
  const selectedProjectIds = useUniverseGraphStore((s) => s.selectedProjectIds);
  const focusId = useUniverseGraphStore((s) => s.focusId);
  const searchQuery = useUniverseGraphStore((s) => s.searchQuery);
  const drawerOpen = useUniverseGraphStore((s) => s.drawerOpen);
  const setProjectSelection = useUniverseGraphStore((s) => s.setProjectSelection);
  const selectAllProjects = useUniverseGraphStore((s) => s.selectAllProjects);
  const clearProjectSelection = useUniverseGraphStore((s) => s.clearProjectSelection);
  const revealNode = useUniverseGraphStore((s) => s.revealNode);
  const setSearchQuery = useUniverseGraphStore((s) => s.setSearchQuery);
  const setDrawerOpen = useUniverseGraphStore((s) => s.setDrawerOpen);
  const [viewportWidth, setViewportWidth] = useState(1280);

  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = viewportWidth < 900;

  const byId = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes]);

  const byParent = useMemo(() => {
    const map = new Map<string, TreeNode[]>();
    for (const node of nodes) {
      const entry: TreeNode = {
        id: node.id,
        name: node.name,
        kind: node.kind,
        parentId: node.parentId,
        depth: node.depth,
        path: node.path,
        projectId: node.projectId
      };

      const key = node.parentId ?? "__root__";
      const siblings = map.get(key) ?? [];
      siblings.push(entry);
      map.set(key, siblings);
    }

    for (const siblings of map.values()) {
      siblings.sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === "dir" ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
    }

    return map;
  }, [nodes]);

  const rootNodes = useMemo(() => byParent.get("__root__") ?? [], [byParent]);

  const projects = useMemo(
    () =>
      rootNodes
        .map((node) => ({ id: node.id, projectId: node.projectId, name: node.name }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [rootNodes]
  );

  const selectedProjectValue = useMemo(() => {
    if (selectedProjectIds.size !== 1) return "";
    return [...selectedProjectIds][0] ?? "";
  }, [selectedProjectIds]);

  const selectedRoots = useMemo(
    () => rootNodes.filter((node) => selectedProjectIds.has(node.projectId)),
    [rootNodes, selectedProjectIds]
  );

  const focusedNode = useMemo(() => {
    if (focusId && byId.has(focusId)) return byId.get(focusId) ?? null;
    if (selectedRoots.length === 1) return selectedRoots[0];
    return selectedRoots[0] ?? null;
  }, [byId, focusId, selectedRoots]);

  const breadcrumbs = useMemo(() => {
    if (!focusedNode) return [];
    const trail: TreeNode[] = [];
    let cursor: TreeNode | undefined | null = focusedNode;
    while (cursor) {
      trail.unshift(cursor);
      cursor = cursor.parentId ? byId.get(cursor.parentId) ?? null : null;
    }
    return trail;
  }, [byId, focusedNode]);

  const focusedChildren = useMemo(() => {
    if (!focusedNode || focusedNode.kind !== "dir") return [];
    return byParent.get(focusedNode.id) ?? [];
  }, [byParent, focusedNode]);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return nodes
      .filter((node) => selectedProjectIds.size > 0 && selectedProjectIds.has(node.projectId))
      .filter((node) => `${node.name} ${node.path}`.toLowerCase().includes(query))
      .sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === "dir" ? -1 : 1;
        return a.path.localeCompare(b.path);
      })
      .slice(0, 40);
  }, [nodes, searchQuery, selectedProjectIds]);

  const allSelected = projects.length > 0 && selectedProjectIds.size === projects.length;
  const noneSelected = selectedProjectIds.size === 0;

  return (
    <>
      {isMobile && drawerOpen ? (
        <button
          type="button"
          className="absolute inset-0 z-20 bg-slate-950/70"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close project navigator"
        />
      ) : null}

      <aside
        id="project-drawer"
        className={cn(
          "absolute bottom-3 left-3 top-3 z-30 flex w-[360px] max-w-[calc(100vw-1.5rem)] flex-col rounded-3xl border border-slate-700/70 bg-slate-950/88 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl transition duration-200",
          drawerOpen ? "translate-x-0 opacity-100" : "-translate-x-[calc(100%+1rem)] opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Navigator</div>
            <div className="text-base font-semibold text-slate-50">Project Browser</div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setDrawerOpen(false)}
            aria-controls="project-drawer"
            aria-expanded={drawerOpen}
            aria-label="Collapse project navigator"
          >
            <X size={16} />
          </Button>
        </div>

        <div className="border-b border-slate-800/80 px-4 py-4">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
            <span>Projects</span>
            <div className="flex gap-1">
              <Button type="button" variant="ghost" size="sm" onClick={selectAllProjects} aria-pressed={allSelected} aria-label="Select all projects">
                all
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={clearProjectSelection} aria-pressed={noneSelected} aria-label="Clear project selection">
                none
              </Button>
            </div>
          </div>

          <label htmlFor="project-selector" className="sr-only">
            Project selector
          </label>
          <NativeSelect
            id="project-selector"
            value={selectedProjectValue}
            onChange={(event) => setProjectSelection(event.target.value || null)}
          >
            <NativeSelectOption value="">Select project</NativeSelectOption>
            {projects.map((project) => (
              <NativeSelectOption key={project.id} value={project.projectId}>
                {project.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>

        <div className="border-b border-slate-800/80 px-4 py-4">
          <label htmlFor="project-search" className="sr-only">
            Search files and folders
          </label>
          <div className="relative">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <Input
              id="project-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-controls="project-drawer-tree"
              className="pl-9"
              placeholder="Search files and folders"
            />
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Search reveals matching branches on the canvas and keeps this drawer scoped to the active project.
          </div>
        </div>

        <div className="border-b border-slate-800/80 px-4 py-3">
          <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">Path</div>
          {breadcrumbs.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              {breadcrumbs.map((node, index) => (
                <button
                  key={node.id}
                  type="button"
                  className={cn(
                    "rounded-full border border-slate-700/80 px-2 py-1 transition hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                    index === breadcrumbs.length - 1 && "border-cyan-400/40 text-cyan-100"
                  )}
                  onClick={() => revealNode(node.id)}
                  aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}
                >
                  {node.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-sm text-slate-500">Choose a project to start exploring one node at a time.</div>
          )}
        </div>

        <div id="project-drawer-tree" className="min-h-0 flex-1 overflow-auto px-4 py-4">
          {rootNodes.length === 0 ? (
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-4 py-6 text-sm text-slate-400">
              Waiting for graph data.
            </div>
          ) : selectedProjectIds.size === 0 ? (
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-4 py-6 text-sm text-slate-400">
              Select a project to open the navigator.
            </div>
          ) : searchQuery.trim() ? (
            <div className="space-y-2">
              {searchResults.length > 0 ? (
                searchResults.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    className="block w-full rounded-2xl border border-slate-800/80 bg-slate-900/50 px-3 py-3 text-left transition hover:border-slate-600 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    onClick={() => revealNode(node.id)}
                  >
                    <div className="mb-1 flex items-center gap-2 text-sm text-slate-100">
                      {node.kind === "dir" ? <Folder size={14} className="text-cyan-300" /> : <File size={13} className="text-slate-300" />}
                      <span className="truncate">{node.name}</span>
                    </div>
                    <div className="truncate text-xs text-slate-400">{node.path}</div>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-4 py-6 text-sm text-slate-400">
                  No matches in the selected project scope.
                </div>
              )}
            </div>
          ) : focusedNode ? (
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Current Node</div>
                <button
                  type="button"
                  className={cn(
                    "mt-2 flex w-full items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/60 px-3 py-3 text-left transition hover:border-slate-600 hover:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                    focusId === focusedNode.id && "border-cyan-400/30"
                  )}
                  onClick={() => revealNode(focusedNode.id)}
                  aria-current="page"
                >
                  <span className="mt-0.5 shrink-0">
                    {focusedNode.kind === "dir" ? <Folder size={15} className="text-cyan-300" /> : <File size={14} className="text-slate-300" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-slate-100">{focusedNode.name}</span>
                    <span className="mt-1 block truncate text-xs text-slate-400">{focusedNode.path}</span>
                  </span>
                  {focusedNode.kind === "dir" ? (
                    <span className="rounded-full border border-slate-700/80 px-2 py-0.5 text-[10px] text-slate-400">
                      {focusedChildren.length}
                    </span>
                  ) : null}
                </button>
                <div className="mt-2 text-xs text-slate-500">
                  Tap a child to move deeper. Use the path chips above to climb back up.
                </div>
              </div>
              {focusedNode.kind === "dir" ? (
                focusedChildren.length > 0 ? (
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-2">
                    <div className="mb-2 px-2 pt-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">Next Nodes</div>
                    <div className="space-y-1">
                      {focusedChildren.map((child) => {
                        const childChildren = byParent.get(child.id) ?? [];
                        const isFocused = focusId === child.id;
                        const canExplore = child.kind === "dir" && childChildren.length > 0;

                        return (
                          <button
                            key={child.id}
                            type="button"
                            className={cn(
                              "flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm text-slate-200 transition hover:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                              isFocused && "bg-slate-800 text-white"
                            )}
                            onClick={() => revealNode(child.id)}
                            aria-current={isFocused ? "true" : undefined}
                          >
                            {canExplore ? <ChevronRight size={13} className="shrink-0 text-slate-400" /> : <span className="w-[13px] shrink-0" aria-hidden="true" />}
                            {child.kind === "dir" ? (
                              <Folder size={14} className="shrink-0 text-cyan-300" />
                            ) : (
                              <File size={13} className="shrink-0 text-slate-300" />
                            )}
                            <span className="min-w-0 flex-1 truncate" title={child.path}>
                              {child.name}
                            </span>
                            {canExplore ? (
                              <span className="rounded-full border border-slate-700/80 px-2 py-0.5 text-[10px] text-slate-400">
                                {childChildren.length}
                              </span>
                            ) : (
                              <ChevronDown size={13} className="shrink-0 rotate-[-90deg] text-slate-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-4 py-6 text-sm text-slate-400">
                    This folder is empty.
                  </div>
                )
              ) : (
                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-4 py-6 text-sm text-slate-400">
                  This file is a leaf node. Use the path chips above to jump back to a parent folder.
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-4 py-6 text-sm text-slate-400">
              No focused node available.
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

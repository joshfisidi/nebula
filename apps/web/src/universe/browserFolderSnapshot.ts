import type { GraphEdge, GraphNode, UniverseSnapshotMessage } from "./patch";

const MAX_FILES = 10_000;

export function createBrowserFolderSnapshot(relativePaths: readonly string[]): {
  rootName: string;
  snapshot: UniverseSnapshotMessage;
} {
  if (relativePaths.length === 0) {
    throw new Error("Choose a folder containing at least one file.");
  }
  if (relativePaths.length > MAX_FILES) {
    throw new Error(`Choose a folder with ${MAX_FILES.toLocaleString()} files or fewer.`);
  }

  const firstPath = relativePaths[0]?.replace(/\\/g, "/") ?? "";
  const rootName = firstPath.split("/").filter(Boolean)[0] || "Selected folder";
  const rootId = `browser:${rootName}`;
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];

  nodes.set(rootId, { id: rootId, name: rootName, path: rootName, kind: "dir", depth: 0 });

  for (const relativePath of relativePaths) {
    const parts = relativePath.replace(/\\/g, "/").split("/").filter(Boolean);
    if (parts.length < 2 || parts[0] !== rootName || parts.some((part) => part === "." || part === "..")) {
      continue;
    }

    let parentId = rootId;
    for (let index = 1; index < parts.length; index += 1) {
      const path = parts.slice(0, index + 1).join("/");
      const id = `browser:${path}`;
      if (!nodes.has(id)) {
        nodes.set(id, {
          id,
          name: parts[index] ?? "",
          path,
          kind: index === parts.length - 1 ? "file" : "dir",
          parentId,
          depth: index
        });
        edges.push({ id: `edge:${parentId}:${id}`, from: parentId, to: id, kind: "contains" });
      }
      parentId = id;
    }
  }

  if (nodes.size === 1) {
    throw new Error("The selected folder did not expose any file paths to this browser.");
  }

  return {
    rootName,
    snapshot: { type: "snapshot", t: Date.now(), graph: { nodes: [...nodes.values()], edges } }
  };
}

import type { GraphEdge, GraphNode, UniverseSnapshotMessage } from "./patch";

const BLOCKED_SEGMENTS = new Set([
  ".git",
  "node_modules",
  ".pnpm-store",
  "dist",
  "build",
  ".next",
  ".cache",
  ".turbo",
  ".parcel-cache",
  "coverage"
]);

const MAX_BROWSER_ENTRIES = 5000;

type RelativeBrowserFile = File & {
  webkitRelativePath?: string;
};

type BrowserEntry =
  | {
      kind: "dir";
      relPath: string;
    }
  | {
      kind: "file";
      relPath: string;
      sizeBytes: number;
      mtimeMs: number | null;
    };

interface BrowserDirectoryHandleLike {
  kind: "directory";
  name: string;
  values: () => AsyncIterable<BrowserHandleLike>;
}

interface BrowserFileHandleLike {
  kind: "file";
  name: string;
  getFile: () => Promise<File>;
}

type BrowserHandleLike = BrowserDirectoryHandleLike | BrowserFileHandleLike;

type PickerWindow = Window & {
  showDirectoryPicker?: () => Promise<BrowserDirectoryHandleLike>;
};

export interface BrowserWorkspaceSnapshot {
  rootName: string;
  rootPath: string;
  entryCount: number;
  snapshot: UniverseSnapshotMessage;
}

function normalizeSegment(segment: string): string {
  return segment.replace(/\\/g, "/").trim();
}

function normalizeRelPath(relPath: string): string {
  return relPath
    .replace(/\\/g, "/")
    .split("/")
    .map((segment) => normalizeSegment(segment))
    .filter(Boolean)
    .join("/");
}

function shouldSkipRelPath(relPath: string): boolean {
  const segments = normalizeRelPath(relPath)
    .split("/")
    .map((segment) => segment.toLowerCase())
    .filter(Boolean);

  return segments.some((segment) => {
    if (BLOCKED_SEGMENTS.has(segment)) return true;
    return segment === "cache" || segment.endsWith("-cache") || segment.endsWith("_cache");
  });
}

function toVirtualRootPath(rootName: string): string {
  const trimmed = normalizeSegment(rootName) || "workspace";
  return `/${trimmed}`;
}

function buildSnapshot(rootName: string, entries: BrowserEntry[]): BrowserWorkspaceSnapshot {
  type NodeRecord = GraphNode;

  const rootPath = toVirtualRootPath(rootName);
  const nodes = new Map<string, NodeRecord>();
  const edges = new Map<string, GraphEdge>();

  const ensureDir = (segments: string[]): string => {
    const id = segments.length === 0 ? rootPath : `${rootPath}/${segments.join("/")}`;
    if (!nodes.has(id)) {
      nodes.set(id, {
        id,
        path: id,
        name: segments[segments.length - 1] ?? rootName,
        kind: "dir",
        parentId: segments.length === 0 ? undefined : ensureDir(segments.slice(0, -1)),
        depth: segments.length
      });
    }

    const node = nodes.get(id)!;
    if (node.parentId) {
      const edgeId = `edge:${node.parentId}:${node.id}`;
      if (!edges.has(edgeId)) {
        edges.set(edgeId, { id: edgeId, from: node.parentId, to: node.id, kind: "contains" });
      }
    }

    return id;
  };

  ensureDir([]);

  for (const entry of entries) {
    const relPath = normalizeRelPath(entry.relPath);
    if (!relPath) continue;

    const segments = relPath.split("/").filter(Boolean);
    const parentSegments = entry.kind === "dir" ? segments.slice(0, -1) : segments.slice(0, -1);
    const parentId = ensureDir(parentSegments);
    const id = `${rootPath}/${segments.join("/")}`;
    const name = segments[segments.length - 1] ?? rootName;

    if (entry.kind === "dir") {
      nodes.set(id, {
        id,
        path: id,
        name,
        kind: "dir",
        parentId,
        depth: segments.length
      });
    } else {
      nodes.set(id, {
        id,
        path: id,
        name,
        kind: "file",
        parentId,
        depth: segments.length,
        sizeBytes: entry.sizeBytes,
        mtimeMs: entry.mtimeMs ?? undefined
      });
    }

    const edgeId = `edge:${parentId}:${id}`;
    if (!edges.has(edgeId)) {
      edges.set(edgeId, { id: edgeId, from: parentId, to: id, kind: "contains" });
    }
  }

  return {
    rootName,
    rootPath,
    entryCount: entries.length,
    snapshot: {
      type: "snapshot",
      t: Date.now(),
      graph: {
        nodes: [...nodes.values()],
        edges: [...edges.values()]
      }
    }
  };
}

async function collectEntriesFromDirectoryHandle(handle: BrowserDirectoryHandleLike): Promise<BrowserEntry[]> {
  const entries: BrowserEntry[] = [];

  const walk = async (directory: BrowserDirectoryHandleLike, parents: string[]) => {
    for await (const entry of directory.values()) {
      if (entries.length >= MAX_BROWSER_ENTRIES) return;

      const relPath = normalizeRelPath([...parents, entry.name].join("/"));
      if (!relPath || shouldSkipRelPath(relPath)) continue;

      if (entry.kind === "directory") {
        entries.push({ kind: "dir", relPath });
        await walk(entry, [...parents, entry.name]);
        continue;
      }

      const file = await entry.getFile();
      entries.push({
        kind: "file",
        relPath,
        sizeBytes: file.size,
        mtimeMs: Number.isFinite(file.lastModified) ? file.lastModified : null
      });
    }
  };

  await walk(handle, []);
  return entries;
}

function collectEntriesFromFiles(files: RelativeBrowserFile[]): BrowserEntry[] {
  const entries: BrowserEntry[] = [];
  const seenDirs = new Set<string>();

  for (const file of files) {
    if (entries.length >= MAX_BROWSER_ENTRIES) break;

    const relPath = normalizeRelPath(file.webkitRelativePath || file.name);
    if (!relPath || shouldSkipRelPath(relPath)) continue;

    const segments = relPath.split("/").filter(Boolean);
    for (let index = 1; index < segments.length; index += 1) {
      const dirRel = segments.slice(1, index).join("/");
      if (!dirRel || seenDirs.has(dirRel) || shouldSkipRelPath(dirRel)) continue;
      seenDirs.add(dirRel);
      entries.push({ kind: "dir", relPath: dirRel });
    }

    const leafRel = segments.slice(1).join("/");
    if (!leafRel) continue;

    entries.push({
      kind: "file",
      relPath: leafRel,
      sizeBytes: file.size,
      mtimeMs: Number.isFinite(file.lastModified) ? file.lastModified : null
    });
  }

  return entries;
}

async function pickDirectoryFilesFromInput(): Promise<RelativeBrowserFile[]> {
  return await new Promise<RelativeBrowserFile[]>((resolve, reject) => {
    const input = document.createElement("input") as HTMLInputElement & {
      webkitdirectory?: boolean;
      directory?: boolean;
    };

    let settled = false;

    const cleanup = () => {
      window.removeEventListener("focus", onWindowFocus, true);
      input.remove();
    };

    const finishResolve = (files: RelativeBrowserFile[]) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(files);
    };

    const finishReject = (error: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(error);
    };

    const onWindowFocus = () => {
      window.setTimeout(() => {
        if (!settled) {
          finishReject(new Error("Folder selection was cancelled."));
        }
      }, 300);
    };

    input.type = "file";
    input.multiple = true;
    input.webkitdirectory = true;
    input.directory = true;
    input.setAttribute("webkitdirectory", "");
    input.setAttribute("directory", "");
    input.style.position = "fixed";
    input.style.left = "-9999px";
    document.body.appendChild(input);

    input.addEventListener(
      "change",
      () => {
        const files = Array.from(input.files ?? []) as RelativeBrowserFile[];
        if (files.length === 0) {
          finishReject(new Error("No folder selected."));
          return;
        }
        finishResolve(files);
      },
      { once: true }
    );

    window.addEventListener("focus", onWindowFocus, true);
    input.click();
  });
}

export async function pickBrowserWorkspaceSnapshot(): Promise<BrowserWorkspaceSnapshot> {
  const picker = (window as PickerWindow).showDirectoryPicker;

  if (typeof picker === "function") {
    const handle = await picker.call(window);
    const rootName = normalizeSegment(handle.name) || "workspace";
    const entries = await collectEntriesFromDirectoryHandle(handle);
    return buildSnapshot(rootName, entries);
  }

  const files = await pickDirectoryFilesFromInput();
  const rootName = normalizeSegment(files[0]?.webkitRelativePath?.split("/")[0] || files[0]?.name || "workspace") || "workspace";
  const entries = collectEntriesFromFiles(files);
  return buildSnapshot(rootName, entries);
}

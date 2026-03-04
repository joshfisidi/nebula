import path from "node:path";
import { promises as fs } from "node:fs";
import crypto from "node:crypto";
import chokidar from "chokidar";
import { WebSocket, WebSocketServer } from "ws";
import type { UniverseEdge, UniverseEvent, UniverseNode } from "@nebula/protocol";

const PORT = Number(process.env.PORT ?? 4001);
const WATCH_ROOT = path.resolve(process.env.WATCH_DIR ?? process.cwd());
const MULTI_PROJECT_ROOT = process.env.MULTI_PROJECT_ROOT === "1";
const ENABLE_IMPORT_EDGES = process.env.ENABLE_IMPORT_EDGES === "1";
const DEBUG_EVENTS = process.env.DEBUG_EVENTS === "1";

const PROJECT_IDS = new Map<string, string>();
const NODE_IDS_BY_PATH = new Map<string, string>();
const NODE_BY_ID = new Map<string, UniverseNode>();
const EDGE_IDS = new Set<string>();
const EDGE_BY_ID = new Map<string, UniverseEdge>();
const IMPORT_SPECIFIERS_BY_FILE_ID = new Map<
  string,
  { filePath: string; projectId: string; specifiers: string[] }
>();

const wss = new WebSocketServer({ port: PORT });

function hashId(input: string): string {
  return crypto.createHash("sha1").update(input).digest("hex").slice(0, 16);
}

function toPosix(input: string): string {
  return input.split(path.sep).join("/");
}

function resolveProject(absPath: string): {
  projectName: string;
  projectId: string;
  relativePath: string;
  projectRootPath: string;
} {
  const rel = toPosix(path.relative(WATCH_ROOT, absPath));
  const segments = rel.split("/").filter(Boolean);
  const fallbackName = path.basename(WATCH_ROOT);

  let projectName = fallbackName;
  let projectRootPath = WATCH_ROOT;
  let relativePath = rel || ".";

  // Optional multi-project mode: map /watch-root/<project-name>/... to one universe per child folder.
  if (MULTI_PROJECT_ROOT && segments.length >= 1) {
    projectName = segments[0];
    projectRootPath = path.join(WATCH_ROOT, projectName);
    relativePath = segments.slice(1).join("/") || ".";
  } else if (segments.length === 1) {
    relativePath = segments[0];
  }

  const projectId = PROJECT_IDS.get(projectName) ?? `project_${hashId(projectName)}`;

  if (!PROJECT_IDS.has(projectName)) {
    PROJECT_IDS.set(projectName, projectId);
  }

  return { projectName, projectId, relativePath, projectRootPath };
}

function shouldProcessPath(absPath: string, kind: "file" | "dir"): boolean {
  const rel = toPosix(path.relative(WATCH_ROOT, absPath));

  if (rel.startsWith("..")) {
    return false;
  }

  if (rel === "." || rel === "") {
    return false;
  }

  if (!MULTI_PROJECT_ROOT) {
    return true;
  }

  const depth = rel.split("/").filter(Boolean).length;

  // In multi-project mode, allow /watch-root/<project> folders and deeper.
  // Files still require /watch-root/<project>/<file-or-subdir>.
  if (kind === "dir") {
    return depth >= 1;
  }

  return depth >= 2;
}

function relativeToWatchRoot(absPath: string): string {
  return toPosix(path.relative(WATCH_ROOT, absPath));
}

function isIgnoredPath(absPath: string): boolean {
  const rel = relativeToWatchRoot(path.resolve(absPath));
  if (!rel || rel === ".") {
    return false;
  }
  if (rel.startsWith("..")) {
    return true;
  }

  const segments = rel.split("/").filter(Boolean);
  if (segments.length === 0) {
    return false;
  }

  if (segments.some((segment) => segment.startsWith("."))) {
    return true;
  }

  if (segments.includes("node_modules") || segments.includes(".git") || segments.includes("dist")) {
    return true;
  }

  return rel.endsWith(".tsbuildinfo");
}

function createNode(params: {
  type: UniverseNode["type"];
  absPath: string;
  projectId: string;
  parentId?: string;
}): UniverseNode {
  const id = `${params.type.toLowerCase()}_${hashId(`${params.projectId}:${toPosix(params.absPath)}`)}`;

  return {
    id,
    type: params.type,
    parentId: params.parentId,
    projectId: params.projectId,
    path: toPosix(params.absPath),
    createdAt: Date.now()
  };
}

function emit(event: UniverseEvent): void {
  const json = JSON.stringify(event);

  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(json);
    }
  }

  if (DEBUG_EVENTS) {
    process.stdout.write(`${json}\n`);
  }
}

function ensureProjectNode(projectName: string, projectId: string, projectRootPath: string): UniverseNode {
  const key = `${projectId}::PROJECT`;
  const existingId = NODE_IDS_BY_PATH.get(key);

  if (existingId) {
    return NODE_BY_ID.get(existingId)!;
  }

  const node = createNode({
    type: "PROJECT",
    absPath: projectRootPath,
    projectId
  });

  NODE_IDS_BY_PATH.set(key, node.id);
  NODE_BY_ID.set(node.id, node);
  emit({ type: "node.create", node });
  return node;
}

function ensureFolderHierarchy(
  absPath: string,
  projectRootPath: string,
  projectId: string,
  projectNodeId: string,
  includeLeafFolder = false
): string {
  const rel = toPosix(path.relative(projectRootPath, absPath));
  const parts = rel.split("/").filter(Boolean);
  const upper = includeLeafFolder ? parts.length : Math.max(0, parts.length - 1);

  let parentId = projectNodeId;
  let cursor = projectRootPath;

  for (let i = 0; i < upper; i += 1) {
    cursor = path.join(cursor, parts[i]);
    const key = `${projectId}:${toPosix(cursor)}`;
    const existing = NODE_IDS_BY_PATH.get(key);

    if (existing) {
      parentId = existing;
      continue;
    }

    const folderNode = createNode({
      type: "FOLDER",
      absPath: cursor,
      projectId,
      parentId
    });

    NODE_IDS_BY_PATH.set(key, folderNode.id);
    NODE_BY_ID.set(folderNode.id, folderNode);
    emit({ type: "node.create", node: folderNode });

    const edge = makeEdge(parentId, folderNode.id, "PARENT");
    if (edge) {
      emit({ type: "edge.create", edge });
    }

    parentId = folderNode.id;
  }

  return parentId;
}

function makeEdge(from: string, to: string, type: UniverseEdge["type"]): UniverseEdge | null {
  const id = `${type.toLowerCase()}_${hashId(`${from}:${to}`)}`;
  if (EDGE_IDS.has(id)) {
    return null;
  }

  EDGE_IDS.add(id);
  const edge = { id, from, to, type };
  EDGE_BY_ID.set(id, edge);
  return edge;
}

function resolveImportPath(fromFileAbsPath: string, importSpecifier: string): string | null {
  if (!importSpecifier.startsWith(".")) {
    return null;
  }

  const baseResolved = path.resolve(path.dirname(fromFileAbsPath), importSpecifier);
  const candidates = [
    baseResolved,
    `${baseResolved}.ts`,
    `${baseResolved}.tsx`,
    `${baseResolved}.js`,
    `${baseResolved}.jsx`,
    path.join(baseResolved, "index.ts"),
    path.join(baseResolved, "index.tsx"),
    path.join(baseResolved, "index.js")
  ];

  for (const candidate of candidates) {
    const normalized = toPosix(candidate);
    const nodeId = NODE_IDS_BY_PATH.get(`${inferProjectId(candidate)}:${normalized}`);
    if (nodeId) {
      return nodeId;
    }
  }

  return null;
}

function inferProjectId(absPath: string): string {
  return resolveProject(absPath).projectId;
}

async function emitImportEdges(fileNode: UniverseNode): Promise<void> {
  if (!ENABLE_IMPORT_EDGES) {
    IMPORT_SPECIFIERS_BY_FILE_ID.delete(fileNode.id);
    return;
  }

  if (!fileNode.path.match(/\.(c|m)?(t|j)sx?$/)) {
    IMPORT_SPECIFIERS_BY_FILE_ID.delete(fileNode.id);
    return;
  }

  try {
    const content = await fs.readFile(fileNode.path, "utf8");
    const importRegex = /import\s+(?:[^"']+?\s+from\s+)?["']([^"']+)["']/g;
    const specifiers = new Set<string>();

    for (const match of content.matchAll(importRegex)) {
      const specifier = match[1];
      if (specifier.startsWith(".")) {
        specifiers.add(specifier);
      }
    }

    IMPORT_SPECIFIERS_BY_FILE_ID.set(fileNode.id, {
      filePath: fileNode.path,
      projectId: fileNode.projectId,
      specifiers: Array.from(specifiers)
    });

    for (const specifier of specifiers) {
      const targetId = resolveImportPath(fileNode.path, specifier);

      if (targetId && targetId !== fileNode.id) {
        const edge = makeEdge(fileNode.id, targetId, "IMPORT");
        if (edge) {
          emit({ type: "edge.create", edge });
        }
      }
    }
  } catch {
    // Best effort. Some files may disappear before read.
  }
}

function resolvePendingImportEdges(projectId: string): void {
  if (!ENABLE_IMPORT_EDGES) {
    return;
  }

  for (const [sourceId, importInfo] of IMPORT_SPECIFIERS_BY_FILE_ID.entries()) {
    if (importInfo.projectId !== projectId) {
      continue;
    }

    if (!NODE_BY_ID.has(sourceId)) {
      IMPORT_SPECIFIERS_BY_FILE_ID.delete(sourceId);
      continue;
    }

    for (const specifier of importInfo.specifiers) {
      const targetId = resolveImportPath(importInfo.filePath, specifier);
      if (targetId && targetId !== sourceId) {
        const edge = makeEdge(sourceId, targetId, "IMPORT");
        if (edge) {
          emit({ type: "edge.create", edge });
        }
      }
    }
  }
}

async function handleFile(absPath: string): Promise<void> {
  if (!shouldProcessPath(absPath, "file")) {
    return;
  }

  const { projectName, projectId, projectRootPath } = resolveProject(absPath);
  const projectNode = ensureProjectNode(projectName, projectId, projectRootPath);
  const parentId = ensureFolderHierarchy(absPath, projectRootPath, projectId, projectNode.id);

  const pathKey = `${projectId}:${toPosix(absPath)}`;
  if (NODE_IDS_BY_PATH.has(pathKey)) {
    return;
  }

  const fileNode = createNode({
    type: "FILE",
    absPath,
    projectId,
    parentId
  });

  NODE_IDS_BY_PATH.set(pathKey, fileNode.id);
  NODE_BY_ID.set(fileNode.id, fileNode);
  emit({ type: "node.create", node: fileNode });

  const parentEdge = makeEdge(parentId, fileNode.id, "PARENT");
  if (parentEdge) {
    emit({ type: "edge.create", edge: parentEdge });
  }

  await emitImportEdges(fileNode);
  resolvePendingImportEdges(projectId);
}

function handleDirectory(absPath: string): void {
  if (isIgnoredPath(absPath)) {
    return;
  }

  if (!shouldProcessPath(absPath, "dir")) {
    return;
  }

  const { projectName, projectId, projectRootPath } = resolveProject(absPath);
  const projectNode = ensureProjectNode(projectName, projectId, projectRootPath);

  // Project root directory is represented by PROJECT node.
  if (toPosix(path.resolve(absPath)) === toPosix(path.resolve(projectRootPath))) {
    return;
  }

  ensureFolderHierarchy(absPath, projectRootPath, projectId, projectNode.id, true);
}

async function bootstrapScan(dirAbsPath: string): Promise<void> {
  if (isIgnoredPath(dirAbsPath)) {
    return;
  }

  handleDirectory(dirAbsPath);

  let entries: import("node:fs").Dirent[];
  try {
    entries = await fs.readdir(dirAbsPath, { withFileTypes: true });
  } catch {
    return;
  }

  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dirAbsPath, entry.name);
      if (isIgnoredPath(entryPath)) {
        return;
      }

      if (entry.isDirectory()) {
        await bootstrapScan(entryPath);
        return;
      }

      if (entry.isFile()) {
        await handleFile(entryPath);
      }
    })
  );
}

const watcher = chokidar.watch(WATCH_ROOT, {
  ignored: (candidatePath) => isIgnoredPath(String(candidatePath)),
  ignoreInitial: true,
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 120,
    pollInterval: 20
  }
});

watcher.on("add", (filePath) => {
  if (isIgnoredPath(filePath)) {
    return;
  }
  handleFile(path.resolve(filePath)).catch((error) => {
    process.stderr.write(`watch add failed: ${String(error)}\n`);
  });
});

watcher.on("addDir", (dirPath) => {
  if (isIgnoredPath(dirPath)) {
    return;
  }
  handleDirectory(path.resolve(dirPath));
});

watcher.on("error", (error) => {
  process.stderr.write(`watcher error: ${String(error)}\n`);
});

watcher.on("ready", () => {
  process.stdout.write("watcher ready\n");
});

wss.on("connection", (socket) => {
  process.stdout.write("client connected\n");

  for (const node of NODE_BY_ID.values()) {
    socket.send(JSON.stringify({ type: "node.create", node } satisfies UniverseEvent));
  }
  for (const edge of EDGE_BY_ID.values()) {
    socket.send(JSON.stringify({ type: "edge.create", edge } satisfies UniverseEvent));
  }

  socket.on("close", () => {
    process.stdout.write("client disconnected\n");
  });
});

process.stdout.write(`Nebula server running on ws://localhost:${PORT}\n`);
process.stdout.write(`Watching root: ${WATCH_ROOT}\n`);
process.stdout.write(`Multi-project mode: ${MULTI_PROJECT_ROOT ? "enabled" : "disabled"}\n`);
process.stdout.write(`Import edges: ${ENABLE_IMPORT_EDGES ? "enabled" : "disabled"}\n`);
process.stdout.write(`Debug events: ${DEBUG_EVENTS ? "enabled" : "disabled"}\n`);

bootstrapScan(WATCH_ROOT)
  .then(() => {
    process.stdout.write(`initial scan complete: nodes=${NODE_BY_ID.size}, edges=${EDGE_BY_ID.size}\n`);
  })
  .catch((error) => {
    process.stderr.write(`initial scan failed: ${String(error)}\n`);
  });

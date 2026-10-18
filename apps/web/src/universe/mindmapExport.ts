import type { GraphNode } from "./patch";

type TreeNode = Pick<GraphNode, "id" | "name" | "kind" | "parentId">;

function makeTree(nodes: readonly TreeNode[]) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const children = new Map<string, TreeNode[]>();
  const roots: TreeNode[] = [];

  for (const node of nodes) {
    if (node.parentId && byId.has(node.parentId)) {
      const siblings = children.get(node.parentId) ?? [];
      siblings.push(node);
      children.set(node.parentId, siblings);
    } else {
      roots.push(node);
    }
  }

  const order = (a: TreeNode, b: TreeNode) =>
    (a.kind === b.kind ? 0 : a.kind === "dir" ? -1 : 1) || a.name.localeCompare(b.name);
  roots.sort(order);
  for (const siblings of children.values()) siblings.sort(order);
  return { roots, children };
}

function mermaidLabel(value: string): string {
  return value.replace(/[\u0000-\u001f&"#%()<>\[\]\\`]/g, (char) => `#${char.charCodeAt(0)};`);
}

function xmlAttribute(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, " ")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function toMermaidMindmap(nodes: readonly TreeNode[]): string {
  const { roots, children } = makeTree(nodes);
  if (roots.length === 0) throw new Error("Open a folder before exporting a mind map.");

  const lines = ["mindmap"];
  let nextId = 0;
  const visited = new Set<string>();
  const write = (node: TreeNode, depth: number) => {
    if (visited.has(node.id)) return;
    visited.add(node.id);
    const id = `n${nextId++}`;
    const label = mermaidLabel(node.name);
    const shape = depth === 1 ? `${id}(("${label}"))` : node.kind === "dir" ? `${id}("${label}")` : `${id}["${label}"]`;
    lines.push(`${"  ".repeat(depth)}${shape}`);
    for (const child of children.get(node.id) ?? []) write(child, depth + 1);
  };

  if (roots.length > 1) {
    lines.push("  workspace((\"Projects\"))");
    for (const root of roots) write(root, 2);
  } else {
    write(roots[0]!, 1);
  }
  return `${lines.join("\n")}\n`;
}

export function toFreeplaneMap(nodes: readonly TreeNode[]): string {
  const { roots, children } = makeTree(nodes);
  if (roots.length === 0) throw new Error("Open a folder before exporting a mind map.");

  let nextId = 1;
  const visited = new Set<string>();
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<map version="freeplane 1.12.1">'];
  const write = (node: TreeNode, depth: number, position?: "left" | "right") => {
    if (visited.has(node.id)) return;
    visited.add(node.id);
    const childNodes = children.get(node.id) ?? [];
    const attributes = `TEXT="${xmlAttribute(node.name)}" ID="ID_${nextId++}"${position ? ` POSITION="${position}"` : ""}`;
    const indent = "  ".repeat(depth);
    if (childNodes.length === 0) {
      lines.push(`${indent}<node ${attributes}/>`);
      return;
    }
    lines.push(`${indent}<node ${attributes}${depth === 1 ? ' FOLDED="false"' : ""}>`);
    childNodes.forEach((child, index) => write(child, depth + 1, depth === 1 ? index % 2 === 0 ? "right" : "left" : undefined));
    lines.push(`${indent}</node>`);
  };

  if (roots.length > 1) {
    lines.push('  <node TEXT="Projects" ID="ID_0" FOLDED="false">');
    roots.forEach((root, index) => write(root, 2, index % 2 === 0 ? "right" : "left"));
    lines.push("  </node>");
  } else {
    write(roots[0]!, 1);
  }
  lines.push("</map>");
  return `${lines.join("\n")}\n`;
}

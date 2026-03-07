# Core Audit

- Generated: 2026-03-07T17:48:10Z
- Root: /Users/josh/.openclaw/workspace/projects/nebula
- Targets: apps/web apps/server packages scripts

## Tree: apps/web

```text
apps/web
├── app
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── src
│   ├── components
│   │   └── ui
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── native-select.tsx
│   ├── lib
│   │   └── utils.ts
│   └── universe
│       ├── AnimatedSVGEdge.tsx
│       ├── FloatingConnectionLine.tsx
│       ├── FloatingEdge.tsx
│       ├── graphStore.ts
│       ├── layoutEngines.ts
│       ├── patch.ts
│       ├── ProjectViewerPanel.tsx
│       ├── ReactFlowOverlay.tsx
│       ├── UniverseLiveProvider.tsx
│       ├── UniverseScene.tsx
│       └── wsClient.ts
├── .env.example
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── tsconfig.tsbuildinfo
└── tsconfig.typecheck.json

7 directories, 28 files
```

## Tree: apps/server

```text
apps/server
├── src
│   ├── universe
│   │   ├── graph.ts
│   │   ├── ids.ts
│   │   ├── ignore.ts
│   │   ├── index.ts
│   │   ├── layout.ts
│   │   ├── types.ts
│   │   ├── watch.ts
│   │   └── ws.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── tsconfig.tsbuildinfo

3 directories, 12 files
```

## Tree: packages

```text
packages
├── physics
│   ├── src
│   │   ├── index.ts
│   │   └── verlet.ts
│   ├── package.json
│   └── tsconfig.json
└── protocol
    ├── src
    │   ├── index.ts
    │   └── types.ts
    ├── package.json
    └── tsconfig.json

5 directories, 8 files
```

## Tree: scripts

```text
scripts
├── automation
│   ├── nebula-cron-run.cjs
│   ├── nebula-github-sync.cjs
│   └── nebula-health-check.cjs
├── dev
│   ├── start-bg.sh
│   ├── start.sh
│   ├── status-bg.sh
│   └── stop-bg.sh
├── audit_core.sh
└── audit_full.sh

3 directories, 9 files
```

## Symbol map

```text
apps/server/src/universe/index.ts:10:export function startUniverseRuntime(params: {
apps/web/src/universe/patch.ts:50:export function isUniverseMessage(value: unknown): value is UniverseMessage {
apps/web/src/universe/graphStore.ts:27:  toggleExpandedNode: (nodeId: string) => void;
apps/web/src/universe/graphStore.ts:28:  setFocusId: (nodeId: string | null) => void;
apps/web/src/universe/graphStore.ts:120:export const useUniverseGraphStore = create<UniverseGraphState>((set, get) => ({
apps/web/src/universe/graphStore.ts:238:  toggleExpandedNode(nodeId) {
apps/web/src/universe/graphStore.ts:247:  setFocusId(nodeId) {
apps/server/src/universe/watch.ts:12:export function startUniverseWatcher(params: {
apps/web/src/universe/UniverseScene.tsx:5:import { ReactFlowOverlay } from "./ReactFlowOverlay";
apps/web/src/universe/UniverseScene.tsx:40:export function UniverseScene() {
apps/web/src/universe/UniverseScene.tsx:55:        <ReactFlowOverlay enabled />
packages/physics/src/verlet.ts:31:export function applySpringConstraints(ctx: IntegratorContext): void {
packages/physics/src/verlet.ts:64:export function applyCentralGravity(ctx: IntegratorContext): void {
packages/physics/src/verlet.ts:80:export function applyNoiseDrift(ctx: IntegratorContext, time: number): void {
packages/physics/src/verlet.ts:93:export function integrateVerlet(ctx: IntegratorContext): void {
apps/server/src/universe/layout.ts:30:export function computeLayout(nodes: Map<string, GraphNode>, rootId: string): Map<string, Vec3> {
apps/server/src/universe/ids.ts:4:export function normalizePath(absPath: string): string {
apps/server/src/universe/ids.ts:13:export function nodeId(absPath: string): string {
apps/server/src/universe/ids.ts:17:export function edgeId(kind: string, from: string, to: string): string {
apps/server/src/universe/ws.ts:1:import { WebSocket, WebSocketServer } from "ws";
apps/server/src/universe/ws.ts:10:export function startUniverseWsServer(port: number, getSnapshot: () => UniverseSnapshotMessage): UniverseWs {
apps/server/src/universe/ws.ts:11:  const wss = new WebSocketServer({ port, host: "0.0.0.0" });
apps/server/src/universe/ws.ts:12:  const clients = new Set<WebSocket>();
apps/server/src/universe/ws.ts:31:        if (client.readyState === WebSocket.OPEN) client.close();
apps/server/src/universe/ws.ts:38:function send(socket: WebSocket, msg: UniverseMessage): void {
apps/server/src/universe/ws.ts:39:  if (socket.readyState !== WebSocket.OPEN) return;
apps/web/src/universe/FloatingEdge.tsx:5:export function FloatingEdge({
apps/web/app/layout.tsx:4:export const metadata: Metadata = {
apps/web/app/layout.tsx:9:export const viewport: Viewport = {
apps/web/src/lib/utils.ts:4:export function cn(...inputs: ClassValue[]) {
apps/server/src/universe/ignore.ts:7:export function shouldIgnore(absPath: string): boolean {
apps/server/src/universe/graph.ts:7:export class UniverseGraph {
scripts/audit_full.sh:76:    "(export\\s+function|export\\s+const|class\\s+|create\\(|use[A-Z][A-Za-z0-9_]+\\(|ReactFlow|WebSocket|chokidar|layoutWithElk|layoutWithDagre|chooseLayout|setFocusId|toggleExpandedNode)" \
apps/web/src/universe/layoutEngines.ts:10:export function chooseLayout(ctx: {
apps/web/src/universe/layoutEngines.ts:23:export function layoutWithRadial(nodes: Node[], edges: Edge[]): { nodes: Node[]; edges: Edge[] } {
apps/web/src/universe/layoutEngines.ts:45:export function layoutWithDagre(nodes: Node[], edges: Edge[], direction: "TB" | "LR" = "LR"): { nodes: Node[]; edges: Edge[] } {
apps/web/src/universe/layoutEngines.ts:68:export async function layoutWithElk(
apps/web/src/universe/AnimatedSVGEdge.tsx:5:export function AnimatedSVGEdge({
apps/web/src/universe/FloatingConnectionLine.tsx:5:export function FloatingConnectionLine({
apps/web/src/universe/UniverseLiveProvider.tsx:15:export function UniverseLiveProvider({ children }: { children: React.ReactNode }) {
apps/web/src/universe/UniverseLiveProvider.tsx:23:      onConnected: setConnected,
apps/web/src/components/ui/native-select.tsx:4:export function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
apps/web/src/components/ui/native-select.tsx:16:export function NativeSelectOption(props: React.ComponentProps<"option">) {
scripts/audit_core.sh:46:    "(export\\s+function|export\\s+const|class\\s+|ReactFlow|WebSocket|layoutWithElk|layoutWithDagre|chooseLayout|setFocusId|toggleExpandedNode|onNodeClick|onConnect)" \
apps/web/src/universe/ReactFlowOverlay.tsx:4:import ReactFlow, {
apps/web/src/universe/ReactFlowOverlay.tsx:11:  type ReactFlowInstance,
apps/web/src/universe/ReactFlowOverlay.tsx:17:  chooseLayout,
apps/web/src/universe/ReactFlowOverlay.tsx:18:  layoutWithDagre,
apps/web/src/universe/ReactFlowOverlay.tsx:19:  layoutWithElk,
apps/web/src/universe/ReactFlowOverlay.tsx:101:export const ReactFlowOverlay = memo(function ReactFlowOverlay({ enabled }: { enabled: boolean }) {
apps/web/src/universe/ReactFlowOverlay.tsx:106:  const toggleExpandedNode = useUniverseGraphStore((s) => s.toggleExpandedNode);
apps/web/src/universe/ReactFlowOverlay.tsx:107:  const setFocusId = useUniverseGraphStore((s) => s.setFocusId);
apps/web/src/universe/ReactFlowOverlay.tsx:113:  const [rf, setRf] = useState<ReactFlowInstance | null>(null);
apps/web/src/universe/ReactFlowOverlay.tsx:315:    const autoEngine = chooseLayout({
apps/web/src/universe/ReactFlowOverlay.tsx:335:        const out = layoutWithDagre(graphSnapshot.nodes, graphSnapshot.edges, "LR");
apps/web/src/universe/ReactFlowOverlay.tsx:340:      const out = await layoutWithElk(graphSnapshot.nodes, graphSnapshot.edges, isMobile ? undefined : "RIGHT");
apps/web/src/universe/ReactFlowOverlay.tsx:350:  const onConnect = useCallback<OnConnect>(
apps/web/src/universe/ReactFlowOverlay.tsx:364:      setFocusId(nodeId);
apps/web/src/universe/ReactFlowOverlay.tsx:386:    [isMobile, rf, setFocusId]
apps/web/src/universe/ReactFlowOverlay.tsx:389:  const onNodeClick = useCallback(
apps/web/src/universe/ReactFlowOverlay.tsx:395:        toggleExpandedNode(node.id);
apps/web/src/universe/ReactFlowOverlay.tsx:400:    [focusNode, isMobile, toggleExpandedNode]
apps/web/src/universe/ReactFlowOverlay.tsx:483:      <ReactFlow
apps/web/src/universe/ReactFlowOverlay.tsx:486:        onNodeClick={onNodeClick}
apps/web/src/universe/ReactFlowOverlay.tsx:487:        onConnect={onConnect}
apps/web/src/universe/ReactFlowOverlay.tsx:500:      </ReactFlow>
apps/web/src/universe/ProjectViewerPanel.tsx:22:export function ProjectViewerPanel() {
apps/web/src/universe/wsClient.ts:3:export function connectUniverseWs(params: {
apps/web/src/universe/wsClient.ts:6:  onConnected?: (connected: boolean) => void;
apps/web/src/universe/wsClient.ts:9:  let socket: WebSocket | null = null;
apps/web/src/universe/wsClient.ts:15:    socket = new WebSocket(params.url);
apps/web/src/universe/wsClient.ts:19:      params.onConnected?.(true);
apps/web/src/universe/wsClient.ts:33:    socket.onerror = () => params.onConnected?.(false);
apps/web/src/universe/wsClient.ts:36:      params.onConnected?.(false);
apps/web/src/components/ui/card.tsx:4:export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
apps/web/src/components/ui/card.tsx:8:export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
apps/web/src/components/ui/card.tsx:12:export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
apps/web/src/components/ui/card.tsx:16:export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
apps/web/src/components/ui/badge.tsx:17:export function Badge({ className, variant, ...props }: BadgeProps) {
```

import type { Page } from "@playwright/test";

type MockBridgeOptions = {
  connectWebSocket?: boolean;
};

const snapshotTree = {
  name: "nebula",
  path: "/Users/josh/projects/nebula",
  isDirectory: true,
  children: [
    {
      name: "apps",
      path: "/Users/josh/projects/nebula/apps",
      isDirectory: true,
      children: [
        {
          name: "web",
          path: "/Users/josh/projects/nebula/apps/web",
          isDirectory: true,
          children: [
            {
              name: "page.tsx",
              path: "/Users/josh/projects/nebula/apps/web/page.tsx",
              isDirectory: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      name: "README.md",
      path: "/Users/josh/projects/nebula/README.md",
      isDirectory: false,
      children: []
    }
  ]
};

export async function mockBrokenBridge(page: Page) {
  await page.route("http://127.0.0.1:8787/**", async (route) => {
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ message: "Bridge unavailable" })
    });
  });
}

export async function mockServerSelection(page: Page, options?: MockBridgeOptions) {
  await mockBrokenBridge(page);

  if (options?.connectWebSocket) {
    await page.addInitScript(() => {
      class MockWebSocket {
        static CONNECTING = 0;
        static OPEN = 1;
        static CLOSING = 2;
        static CLOSED = 3;
        readyState = MockWebSocket.CONNECTING;
        url: string;
        onopen: ((event: Event) => void) | null = null;
        onclose: ((event: CloseEvent) => void) | null = null;
        onerror: ((event: Event) => void) | null = null;
        onmessage: ((event: MessageEvent) => void) | null = null;

        constructor(url: string) {
          this.url = url;
          window.setTimeout(() => {
            this.readyState = MockWebSocket.OPEN;
            this.onopen?.(new Event("open"));
          }, 10);
        }

        send() {}

        close() {
          this.readyState = MockWebSocket.CLOSED;
          this.onclose?.(new CloseEvent("close"));
        }

        addEventListener() {}
        removeEventListener() {}
        dispatchEvent() {
          return true;
        }
      }

      Object.defineProperty(window, "WebSocket", {
        configurable: true,
        writable: true,
        value: MockWebSocket
      });
    });
  }

  await page.route("**/source/current", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        currentRoot: null,
        allowedRoots: ["/Users/josh/projects"],
        requireSource: true
      })
    });
  });

  await page.route("**/source/list**", async (route) => {
    const url = new URL(route.request().url());
    const root = url.searchParams.get("root") ?? "/Users/josh/projects";
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        base: root,
        folders: [
          { name: "nebula", path: "/Users/josh/projects/nebula" },
          { name: "alpha-app", path: "/Users/josh/projects/alpha-app" }
        ]
      })
    });
  });

  await page.route("**/source/select", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        currentRoot: "/Users/josh/projects/nebula"
      })
    });
  });
}

export async function mockLocalBridge(page: Page) {
  await page.route("http://127.0.0.1:8787/bridge/handshake", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        bridge: "nebula-sync",
        token: "bridge-token",
        sourcePath: "/Users/josh/projects/nebula",
        endpoints: {
          health: "http://127.0.0.1:8787/health",
          sourceCurrent: "http://127.0.0.1:8787/source/current",
          sourceSelect: "http://127.0.0.1:8787/source/select",
          sourceList: "http://127.0.0.1:8787/source/list",
          graphSnapshot: "http://127.0.0.1:8787/graph/snapshot"
        }
      })
    });
  });

  await page.route("http://127.0.0.1:8787/graph/snapshot", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(snapshotTree)
    });
  });

  await page.route("http://127.0.0.1:8787/source/list**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        base: "/Users/josh/projects",
        folders: [{ name: "nebula", path: "/Users/josh/projects/nebula" }]
      })
    });
  });

  await page.route("http://127.0.0.1:8787/source/select", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        sourcePath: "/Users/josh/projects/nebula"
      })
    });
  });

  await page.route("**/source/current", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        currentRoot: null,
        allowedRoots: ["/Users/josh/projects"],
        requireSource: true
      })
    });
  });
}

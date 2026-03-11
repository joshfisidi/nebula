import { expect, test, type Page } from "@playwright/test";
import { mockBrokenBridge, mockLocalBridge, mockServerSelection } from "./helpers/nebula-mocks";

async function openResponsiveRail(page: Page, label: "Explorer" | "Inspector") {
  const button = page.getByRole("button", { name: label });
  if ((await button.getAttribute("aria-pressed")) !== "true") {
    await button.click();
  }
}

test.describe("Nebula control room UI", () => {
  test("shows local-first onboarding when no source is configured", async ({ page }) => {
    await mockBrokenBridge(page);
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
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({
          base: "/Users/josh/projects",
          folders: [{ name: "nebula", path: "/Users/josh/projects/nebula" }]
        })
      });
    });

    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Choose a live graph source" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Connect Nebula Sync" })).toBeVisible();
    await expect(page.getByText("Runtime server mode")).toBeVisible();
    await expect(page.getByLabel("Manual path")).toBeVisible();
    await expect(page.getByRole("button", { name: "Source routing" })).toBeVisible();
  });

  test("routes through server fallback and updates runtime state", async ({ page }) => {
    await mockServerSelection(page, { connectWebSocket: true });

    await page.goto("/");

    await page.getByLabel("Folder").selectOption("/Users/josh/projects/nebula");
    await page.getByRole("button", { name: "Load into control room" }).click();

    await expect(page.getByRole("heading", { name: "Choose a live graph source" })).toBeHidden();
    await openResponsiveRail(page, "Inspector");
    await expect(page.getByText("Runtime connected")).toBeVisible();
    await expect(page.getByText("projects/nebula").first()).toBeVisible();
    await expect(page.getByText("server", { exact: true }).first()).toBeVisible();
  });

  test("renders populated local bridge state and supports explorer interactions", async ({ page }) => {
    await mockLocalBridge(page);

    await page.goto("/");

    await expect(page.getByText("Local bridge is feeding the graph stage.").first()).toBeVisible();
    await expect(page.getByText("5 nodes")).toBeVisible();
    await expect(page.getByText("4 edges")).toBeVisible();

    await openResponsiveRail(page, "Explorer");
    await expect(page.getByRole("button", { name: "Focus nebula" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Folder nebula, 2 children, collapsed" })).toBeVisible();

    await page.getByRole("button", { name: "Expand nebula" }).click();
    await expect(page.getByRole("button", { name: "Expand apps" })).toBeVisible();
    await page.getByRole("button", { name: "Expand apps" }).click();
    await expect(page.getByRole("button", { name: "Expand web" })).toBeVisible();
    await page.getByRole("button", { name: "Expand web" }).click();

    await expect(page.getByRole("button", { name: "Focus page.tsx" })).toBeVisible();

    await page.getByPlaceholder("Search every visible path").fill("README.md");
    await expect(page.getByRole("button", { name: "Focus README.md" })).toBeVisible();

    await openResponsiveRail(page, "Inspector");
    await expect(page.getByText("Nebula Sync active")).toBeVisible();
    await expect(page.getByText("Focused signal")).toBeVisible();

    await page.getByRole("button", { name: "Inspector" }).click();
    await expect(page.getByText("Focused signal")).toBeHidden();
    await page.getByRole("button", { name: "Inspector" }).click();
    await expect(page.getByText("Focused signal")).toBeVisible();
  });

  test("keeps the shell operable on narrow mobile viewports", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 1280) >= 900, "This assertion is only meaningful on mobile projects.");

    await mockLocalBridge(page);
    await page.goto("/");

    await expect(page.getByRole("button", { name: "Explorer" })).toHaveAttribute("aria-pressed", "false");
    await expect(page.getByRole("button", { name: "Inspector" })).toHaveAttribute("aria-pressed", "false");

    await openResponsiveRail(page, "Explorer");
    await expect(page.getByPlaceholder("Search every visible path")).toBeVisible();

    await openResponsiveRail(page, "Inspector");
    await expect(page.getByText("Focused signal")).toBeVisible();
  });
});

import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const HOST = "127.0.0.1";
const baseURL = `http://${HOST}:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 1,
  reporter: [["line"], ["html", { open: "never" }]],
  expect: {
    timeout: 10_000
  },
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: process.env.NEBULA_USE_SYSTEM_CHROME ? "off" : "retain-on-failure"
  },
  webServer: process.env.NEBULA_EXTERNAL_SERVER ? undefined : {
    command: "npm run playwright:webserver",
    url: baseURL,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], ...(process.env.NEBULA_USE_SYSTEM_CHROME ? { channel: "chrome" } : {}) }
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] }
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] }
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"], ...(process.env.NEBULA_USE_SYSTEM_CHROME ? { channel: "chrome" } : {}) }
    },
    {
      name: "mobile-webkit",
      use: { ...devices["iPhone 14"] }
    }
  ]
});

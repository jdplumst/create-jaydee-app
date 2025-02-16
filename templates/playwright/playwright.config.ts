import { defineConfig, devices } from "@playwright/test";

import "dotenv/config";
import getBaseUrl from "~/lib/get-base-url";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: 1,
  reporter: "html",
  reportSlowTests: { max: 10, threshold: 60 * 1000 },
  timeout: 120000,
  use: {
    baseURL: getBaseUrl(),
    trace: "on-first-retry",
  },
  expect: {
    timeout: 30000,
  },

  projects: [
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],

  webServer: {
    command: "pnpm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});

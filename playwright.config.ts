import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";

// Determine the environment based on the environment variable
const environment = "dcone";
const envFile = `environments/${environment}`;
const envFilePath = path.resolve(__dirname, envFile);
console.log(`Loading environment: '${environment}' from path: ${envFilePath}`);

try {
  // Load environment variables from the appropriate .env file
  dotenv.config({ path: envFilePath });
} catch {
  console.log(`Failed to load environment: '${environment}' from path: ${envFilePath}`);
  process.exit(1); // Exit if .env loading fails
}
export default defineConfig({
  testDir: "./src/tests/",
  fullyParallel: false,
  timeout: 15 * 50 * 1000,
  // workers: process.env.RunningOnPipeline ? 1 : 6,
  workers: 1,
  retries: 0,
  reporter: [
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: false,
      },
    ],
    // ["html"],

    // [
    //   "playwright-msteams-reporter",
    //   {
    //     webhookUrl: process.env.MS_TEAMS_WEBHOOK_URL,
    //     webhookType: "powerautomate",
    //   },
    // ],
  ],
  use: {
    actionTimeout: 20_000,
    headless: true,
    navigationTimeout: 120_000,
    video: "retain-on-failure",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    permissions: ["clipboard-read"],
    contextOptions: {
      recordVideo: {
        dir: "./test-results/",
      },
    },
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1600, height: 900 },
      },
    },
    // Uncomment and configure if you want to run tests on other browsers
    // {
    //   name: "firefox",
    // },
    // {
    //   name: "safari",
    // },
  ],
});

import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './e2e/tests',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [
    [isCI ? 'dot' : 'list'],
    [
      'allure-playwright',
      { outputFolder: path.resolve(__dirname, '../cypress-e2e/results/allure-results') },
    ],
  ],
  use: {
    navigationTimeout: 60_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 },
    baseURL: 'http://localhost',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      // Build once for both apps, then start both servers and wait
      command:
        "bash -lc 'pnpm --filter typescript_app1 build && pnpm --filter typescript_app2 build && pnpm --filter typescript_app1 serve & pnpm --filter typescript_app2 serve & wait'",
      cwd: __dirname,
      port: 3001,
      reuseExistingServer: !isCI,
      timeout: 240_000,
    },
  ],
});

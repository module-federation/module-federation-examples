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
      { outputFolder: path.resolve(__dirname, '../playwright-e2e/results/allure-results') },
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
      command: 'pnpm start',
      cwd: __dirname,
      port: 3001,
      reuseExistingServer: !isCI,
      timeout: 240_000,
    },
  ],
});

import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './e2e/tests',
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'pnpm run start',
      cwd: 'remote',
      port: 8081,
      reuseExistingServer: !isCI,
      timeout: 180_000,
    },
    {
      command: 'pnpm run start',
      cwd: 'host',
      port: 8080,
      reuseExistingServer: !isCI,
      timeout: 180_000,
    },
  ],
});

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:3002',
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
      command: 'cd lib-app && pnpm serve',
      port: 3000,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'cd component-app && pnpm serve',
      port: 3001,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'cd main-app && pnpm serve',
      port: 3002,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});

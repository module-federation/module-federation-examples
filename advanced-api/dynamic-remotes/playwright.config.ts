import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  expect: {
    timeout: 10000,
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
    baseURL: 'http://localhost:3001',
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
      command: 'cd app1 && pnpm start',
      port: 3001,
      timeout: 120000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'cd app2 && pnpm start',
      port: 3002,
      timeout: 120000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'cd app3 && pnpm start',
      port: 3003,
      timeout: 120000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
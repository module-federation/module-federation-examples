import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 60000,
  expect: {
    timeout: 15000,
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
      command: `pnpm --filter dynamic-remotes_app1 ${process.env.LEGACY_MODE ? 'legacy:start' : 'start'}`,
      port: 3001,
      timeout: 120000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: `pnpm --filter dynamic-remotes_app2 ${process.env.LEGACY_MODE ? 'legacy:start' : 'start'}`,
      port: 3002,
      timeout: 120000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: `pnpm --filter dynamic-remotes_app3 ${process.env.LEGACY_MODE ? 'legacy:start' : 'start'}`,
      port: 3003,
      timeout: 120000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
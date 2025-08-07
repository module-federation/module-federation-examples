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
    baseURL: 'http://localhost:3000',
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
      command: process.env.CI && process.env.USE_LEGACY
        ? 'pnpm --filter dynamic-remotes-runtime-environment-variables_host legacy:start'
        : 'pnpm --filter dynamic-remotes-runtime-environment-variables_host start',
      port: 3000,
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      command: process.env.CI && process.env.USE_LEGACY
        ? 'pnpm --filter dynamic-remotes-runtime-environment-variables_remote legacy:start'
        : 'pnpm --filter dynamic-remotes-runtime-environment-variables_remote start',
      port: 3001,
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
  ],
});
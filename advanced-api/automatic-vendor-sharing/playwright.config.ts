import { defineConfig, devices } from '@playwright/test';

const useLegacyStart = !!process.env.LEGACY_START;

export default defineConfig({
  testDir: './e2e',
  timeout: 240000,
  expect: {
    timeout: 120000,
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
      command: useLegacyStart
        ? 'pnpm --filter automatic-vendor-sharing_app1 serve'
        : 'pnpm --filter automatic-vendor-sharing_app1 start',
      port: 3001,
      reuseExistingServer: !process.env.CI,
      timeout: 180000,
    },
    {
      command: useLegacyStart
        ? 'pnpm --filter automatic-vendor-sharing_app2 serve'
        : 'pnpm --filter automatic-vendor-sharing_app2 start',
      port: 3002,
      reuseExistingServer: !process.env.CI,
      timeout: 180000,
    },
  ],
});

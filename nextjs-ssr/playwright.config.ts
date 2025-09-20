import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : undefined,
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
      command: 'pnpm run --filter nextjs-ssr_checkout dev',
      port: 3000,
      reuseExistingServer: !isCI,
      timeout: 180_000,
    },
    {
      command: 'pnpm run --filter nextjs-ssr_home dev',
      port: 3001,
      reuseExistingServer: !isCI,
      timeout: 180_000,
    },
    {
      command: 'pnpm run --filter nextjs-ssr_shop dev',
      port: 3002,
      reuseExistingServer: !isCI,
      timeout: 180_000,
    },
  ],
});

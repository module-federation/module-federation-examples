import { defineConfig, devices } from '@playwright/test';

const reuseExistingServer = !process.env.CI;

export default defineConfig({
  testDir: './e2e',
  timeout: 120_000,
  expect: {
    timeout: 10_000,
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
    viewport: { width: 1280, height: 720 },
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
      cwd: 'remote',
      env: {
        BROWSER: 'none',
      },
      port: 3002,
      reuseExistingServer,
      timeout: 120_000,
    },
    {
      command: 'pnpm start',
      cwd: 'host',
      env: {
        BROWSER: 'none',
      },
      port: 3000,
      reuseExistingServer,
      timeout: 120_000,
    },
    {
      command: 'pnpm storybook --ci --no-open',
      cwd: 'host',
      port: 6006,
      reuseExistingServer,
      timeout: 120_000,
    },
  ],
});

import { defineConfig, devices } from '@playwright/test';

const useLegacy = process.env.USE_LEGACY === 'true';
const appCommand = useLegacy ? 'pnpm legacy:start' : 'pnpm start';
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './e2e',
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
      command: `cd app1 && ${appCommand}`,
      port: 3001,
      reuseExistingServer: !isCI,
      timeout: 120_000,
    },
  ],
});

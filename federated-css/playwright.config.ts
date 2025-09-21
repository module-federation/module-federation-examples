import { defineConfig, devices } from '@playwright/test';

const reuseExisting = !process.env.CI;

export default defineConfig({
  testDir: './e2e',
  timeout: 120_000,
  expect: {
    timeout: 15_000,
  },
  workers: process.env.CI ? 1 : undefined,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost',
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
      // Build/serve exposes and consumers-react; start next consumers; wait for all ports
      command: 'node scripts/start-all.cjs',
      cwd: __dirname,
      port: 8081,
      reuseExistingServer: reuseExisting,
      timeout: 300_000,
    },
  ],
});

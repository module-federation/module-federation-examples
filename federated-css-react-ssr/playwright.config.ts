import { defineConfig, devices } from '@playwright/test';

// Always reuse existing servers to avoid repeated start/stop cycles during runs
const reuseExisting = true;

export default defineConfig({
  testDir: './e2e',
  timeout: 180_000,
  expect: {
    timeout: 15_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']],
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
  globalTeardown: './e2e/global-teardown.ts',
  webServer: [
    {
      command: 'node scripts/start-exposes.cjs',
      cwd: __dirname,
      // Wait for the last expose to be up to avoid racing shells against early ports
      port: 3007,
      reuseExistingServer: reuseExisting,
      timeout: 900_000,
    },
    {
      // Start all shells and wait until all ports 4000-4005 respond
      command: 'node scripts/start-shells.cjs',
      cwd: __dirname,
      port: 4005,
      reuseExistingServer: reuseExisting,
      timeout: 900_000,
    },
  ],
});

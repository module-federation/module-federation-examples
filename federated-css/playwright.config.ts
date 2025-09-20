import { defineConfig, devices } from '@playwright/test';

const reuseExisting = !process.env.CI;

export default defineConfig({
  testDir: './e2e',
  timeout: 120_000,
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
      // Exposes must serve static bundles on fixed 400x ports to match remotes in consumers
      command: 'pnpm --filter "federated-css-mono_expose-*" --parallel serve',
      cwd: __dirname,
      port: 4000,
      reuseExistingServer: reuseExisting,
      timeout: 240_000,
    },
    {
      // Next.js consumers listen on 8081-8084; wait for the first to be ready
      command: 'pnpm --filter "@federated-css/*" --parallel start',
      cwd: __dirname,
      port: 8081,
      reuseExistingServer: reuseExisting,
      timeout: 240_000,
    },
  ],
});

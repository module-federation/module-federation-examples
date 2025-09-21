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
      command:
        "bash -lc 'pnpm --filter "federated-css-react-ssr_expose-*" -r run build && pnpm --filter "federated-css-react-ssr_expose-*" -r run serve'",
      cwd: __dirname,
      port: 3001,
      reuseExistingServer: reuseExisting,
      timeout: 300_000,
    },
    {
      // Start all shells and wait until all ports 4000-4005 respond
      command:
        "bash -lc 'pnpm --filter "federated-css-react-ssr_shell*" -r run build && pnpm --filter "federated-css-react-ssr_shell*" -r run serve & pnpm exec wait-on -t 300000 http://localhost:4000 http://localhost:4001 http://localhost:4002 http://localhost:4003 http://localhost:4004 http://localhost:4005'",
      cwd: __dirname,
      port: 4005,
      reuseExistingServer: reuseExisting,
      timeout: 300_000,
    },
  ],
});

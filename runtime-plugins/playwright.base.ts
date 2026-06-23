import { defineConfig, devices } from '@playwright/test';

type RuntimePluginServer = {
  directory: string;
  port: number;
  command?: string;
};

type RuntimePluginPlaywrightOptions = {
  baseURL?: string;
  useLegacyCommand?: boolean;
  webServers: RuntimePluginServer[];
};

const isCI = !!process.env.CI;
const useLegacy = process.env.USE_LEGACY === 'true';

const getDefaultCommand = (useLegacyCommand: boolean) =>
  useLegacyCommand && useLegacy ? 'pnpm legacy:start' : 'pnpm start';

export const createRuntimePluginPlaywrightConfig = ({
  baseURL = 'http://localhost:3001',
  useLegacyCommand = true,
  webServers,
}: RuntimePluginPlaywrightOptions) =>
  defineConfig({
    testDir: './e2e',
    timeout: 60_000,
    expect: {
      timeout: 15_000,
    },
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 1 : 0,
    workers: isCI ? 1 : undefined,
    reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']],
    use: {
      baseURL,
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
    webServer: webServers.map(({ directory, port, command }) => ({
      command: `cd ${directory} && ${command ?? getDefaultCommand(useLegacyCommand)}`,
      port,
      reuseExistingServer: !isCI,
      timeout: 120_000,
    })),
  });

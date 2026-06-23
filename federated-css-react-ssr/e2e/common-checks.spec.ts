import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { selectors } from '../../playwright-e2e/common/selectors';
import { CssAttr } from '../../playwright-e2e/types/cssAttr';
import { Constants } from '../../playwright-e2e/fixtures/constants';

const { css, cssModule, jss, less, scss, styledComponent, tailwindModule } =
  Constants.fullTestData.federatedCssTestData;

type ButtonConfig = {
  path: string;
  bgColor: string;
};

type ShellConfig = {
  port: number;
  buttons: ButtonConfig[];
};

type ExposeConfig = {
  port: number;
  button: ButtonConfig;
  path?: string;
};

const shellApps: ShellConfig[] = [
  { port: 4000, buttons: [css, jss] },
  { port: 4001, buttons: [css, scss, scss] },
  { port: 4002, buttons: [styledComponent, jss] },
  { port: 4003, buttons: [styledComponent, jss, cssModule] },
  { port: 4004, buttons: [less, less, scss, scss] },
  { port: 4005, buttons: [tailwindModule, scss, scss] },
];

const exposeApps: ExposeConfig[] = [
  { port: 3001, button: css, path: 'client' },
  { port: 3002, button: jss, path: 'client' },
  { port: 3003, button: tailwindModule, path: 'client' },
  { port: 3004, button: scss, path: 'client' },
  { port: 3005, button: styledComponent, path: 'client' },
  { port: 3006, button: cssModule, path: 'client' },
  { port: 3007, button: less, path: 'client' },
];

const buildUrl = (port: number, path?: string): string => {
  if (!path) {
    return `http://localhost:${port}/`;
  }

  if (path.startsWith('/')) {
    return `http://localhost:${port}${path}`;
  }

  if (path.startsWith('#')) {
    return `http://localhost:${port}/${path}`;
  }

  return `http://localhost:${port}/${path}`;
};

const expectButtonsInOrder = async (page: Page, buttons: ButtonConfig[]) => {
  await page.waitForSelector(selectors.federatedCssButton, { timeout: 30_000 });
  const buttonLocator = page.locator(selectors.federatedCssButton);
  await expect(buttonLocator).toHaveCount(buttons.length);

  for (const [index, button] of buttons.entries()) {
    await expect(buttonLocator.nth(index)).toBeVisible();
    await expect(buttonLocator.nth(index)).toHaveCSS(CssAttr.backgroundColor, button.bgColor);
  }
};

const expectAllButtonsMatch = async (page: Page, expected: ButtonConfig) => {
  await page.waitForSelector(selectors.federatedCssButton, { timeout: 30_000 });
  const buttonLocator = page.locator(selectors.federatedCssButton);
  await expect(buttonLocator).not.toHaveCount(0);

  const total = await buttonLocator.count();
  for (let index = 0; index < total; index += 1) {
    await expect(buttonLocator.nth(index)).toBeVisible();
    await expect(buttonLocator.nth(index)).toHaveCSS(CssAttr.backgroundColor, expected.bgColor);
  }
};

const visit = async (page: Page, port: number, path?: string) => {
  await page.goto(buildUrl(port, path), { waitUntil: 'domcontentloaded' });
};

test.describe('Federated CSS SSR shells', () => {
  for (const app of shellApps) {
    test(`shell port ${app.port} renders federated styles with JavaScript`, async ({ page }) => {
      await visit(page, app.port);
      await expectButtonsInOrder(page, app.buttons);
    });

    test(`shell port ${app.port} renders federated styles without JavaScript`, async ({
      browser,
    }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();

      try {
        await visit(page, app.port);
        await expectButtonsInOrder(page, app.buttons);
      } finally {
        await context.close();
      }
    });
  }
});

test.describe('Federated CSS SSR exposes', () => {
  for (const app of exposeApps) {
    test(`expose port ${app.port} renders federated styles`, async ({ page }) => {
      await visit(page, app.port, app.path);
      await expectAllButtonsMatch(page, app.button);
    });
  }
});

import { test, expect } from '@playwright/test';
import { selectors } from '../../playwright-e2e/common/selectors';
import { CssAttr } from '../../playwright-e2e/types/cssAttr';
import { Constants } from '../../playwright-e2e/fixtures/constants';

type ButtonConfig = {
  path: string;
  bgColor: string;
};

type AppConfig = {
  port: number;
  buttons: ButtonConfig[];
  isNextJs?: boolean;
};

const {
  css,
  cssModule,
  jss,
  less,
  scss,
  styledComponent,
  tailwindGlobal,
  tailwindModule,
} = Constants.fullTestData.federatedCssTestData;

const appsUnderTest: AppConfig[] = [
  {
    port: 8081,
    buttons: [css, scss, less, tailwindGlobal],
    isNextJs: true,
  },
  {
    port: 8083,
    buttons: [cssModule, jss, tailwindModule],
    isNextJs: true,
  },
  {
    port: 8082,
    buttons: [jss, tailwindGlobal],
    isNextJs: true,
  },
  {
    port: 8084,
    buttons: [styledComponent, less],
    isNextJs: true,
  },
  {
    port: 3001,
    buttons: [css, scss, less, tailwindGlobal],
  },
  {
    port: 3002,
    buttons: [tailwindModule, jss, css, less, scss],
  },
  {
    port: 3003,
    buttons: [css, styledComponent],
  },
  {
    port: 3004,
    buttons: [cssModule, jss],
  },
  {
    port: 3005,
    buttons: [less, scss],
  },
  {
    port: 3006,
    buttons: [less, tailwindGlobal],
  },
  {
    port: 3007,
    buttons: [jss, tailwindModule],
  },
  {
    port: 4000,
    buttons: [css],
  },
  {
    port: 4001,
    buttons: [cssModule],
  },
  {
    port: 4002,
    buttons: [jss],
  },
  {
    port: 4003,
    buttons: [less],
  },
  {
    port: 4004,
    buttons: [scss],
  },
  {
    port: 4005,
    buttons: [styledComponent],
  },
  {
    port: 4006,
    buttons: [tailwindGlobal],
  },
  {
    port: 4007,
    buttons: [tailwindModule],
  },
];

const buildUrl = (port: number, route?: string): string => {
  if (!route) {
    return `http://localhost:${port}/`;
  }

  if (route.startsWith('#')) {
    return `http://localhost:${port}/${route}`;
  }

  if (route.startsWith('/')) {
    return `http://localhost:${port}${route}`;
  }

  return `http://localhost:${port}/${route}`;
};

const combinedPath = (app: AppConfig): string => `${app.isNextJs ? '' : '#/'}combined`;

const pagePath = (app: AppConfig, button: ButtonConfig): string =>
  app.buttons.length > 1 ? `${app.isNextJs ? '' : '#/'}${button.path}` : '';

test.describe('Federated CSS registry', () => {
  for (const app of appsUnderTest) {
    for (const button of app.buttons) {
      test(`port ${app.port} renders ${button.path}`, async ({ page }) => {
        await page.goto(buildUrl(app.port, pagePath(app, button)), {
          waitUntil: 'domcontentloaded',
        });

        // Be tolerant to slower remote/style loading in CI
        await page.waitForSelector(selectors.federatedCssButton, { timeout: 30_000 });

        const buttons = page.locator(selectors.federatedCssButton);
        const primaryButton = buttons.first();
        await expect(primaryButton).toBeVisible();
        await expect(primaryButton).toHaveCSS(CssAttr.backgroundColor, button.bgColor);
      });
    }

    if (app.buttons.length > 1) {
      test(`port ${app.port} combined view exposes federated styles`, async ({ page }) => {
        await page.goto(buildUrl(app.port, combinedPath(app)), {
          waitUntil: 'domcontentloaded',
        });

        // Be tolerant to slower remote/style loading in CI
        await page.waitForSelector(selectors.federatedCssButton, { timeout: 30_000 });
        const buttons = page.locator(selectors.federatedCssButton);
        await expect(buttons).toHaveCount(app.buttons.length);

        for (const [index, button] of app.buttons.entries()) {
          const federatedButton = buttons.nth(index);
          await expect(federatedButton).toBeVisible();
          await expect(federatedButton).toHaveCSS(CssAttr.backgroundColor, button.bgColor);
        }
      });
    }
  }
});

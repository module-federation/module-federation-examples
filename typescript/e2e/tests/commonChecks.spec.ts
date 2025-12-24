import { expect, test, type Page } from '@playwright/test';
import { baseSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';
import { CommonTestData } from '../../../playwright-e2e/fixtures/commonTestData';

interface TypescriptAppConfig {
  host: number;
  appName: string;
  smallButton?: string;
  largeButton?: string;
}

const appsUnderTest: TypescriptAppConfig[] = [
  {
    host: 3001,
    appName: Constants.commonConstantsData.commonCountAppNames.app1,
    smallButton: Constants.updatedConstantsData.typeScriptApp.buttons.small,
    largeButton: Constants.updatedConstantsData.typeScriptApp.buttons.large,
  },
  {
    host: 3002,
    appName: Constants.commonConstantsData.commonCountAppNames.app2,
  },
];

const primaryApp = appsUnderTest[0];

if (!primaryApp.smallButton || !primaryApp.largeButton) {
  throw new Error('Primary TypeScript app configuration is missing button labels.');
}

const primaryAppButtons = {
  small: primaryApp.smallButton,
  large: primaryApp.largeButton,
};

const navigateToApp = async (page: Page, port: number) => {
  await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
};

test.describe('Typescript', () => {
  for (const app of appsUnderTest) {
    test(`checks both apps share the same header (port: ${app.host})`, async ({ page }) => {
      await navigateToApp(page, app.host);

      await expect(page.locator(baseSelectors.tags.headers.h1)).toHaveText(
        CommonTestData.commonTypeScriptAppsData[0].header,
      );
    });

    test(`checks app name visibility (port: ${app.host})`, async ({ page }) => {
      await navigateToApp(page, app.host);

      await expect(page.locator(baseSelectors.tags.headers.h2)).toHaveText(app.appName);
    });

    test(`checks both apps share ${primaryAppButtons.small} (port: ${app.host})`, async ({ page }) => {
      await navigateToApp(page, app.host);

      await expect(page.getByRole('button', { name: primaryAppButtons.small })).toBeVisible();
    });

    test(`checks ${primaryAppButtons.small} is not disabled (port: ${app.host})`, async ({ page }) => {
      await navigateToApp(page, app.host);

      await expect(page.getByRole('button', { name: primaryAppButtons.small })).toBeEnabled();
    });

    test(`checks only ${primaryApp.appName} includes ${primaryAppButtons.large} (port: ${app.host})`, async ({ page }) => {
      await navigateToApp(page, app.host);

      const largeButton = page.getByRole('button', { name: primaryAppButtons.large });

      if (app.host === primaryApp.host) {
        await expect(largeButton).toBeVisible();
        await expect(largeButton).toBeEnabled();
      } else {
        await expect(largeButton).toHaveCount(0);
      }
    });
  }
});

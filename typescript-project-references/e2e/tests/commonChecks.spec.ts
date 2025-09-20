import { test, expect } from '@playwright/test';
import { baseSelectors, updatedSelectors } from '../../cypress-e2e/common/selectors';
import { Constants } from '../../cypress-e2e/fixtures/constants';
import { CommonTestData } from '../../cypress-e2e/fixtures/commonTestData';

type TypeScriptAppConfig = (typeof CommonTestData.commonTypeScriptAppsData)[number];

const buildUrl = (port: number): string => `http://localhost:${port}/`;

const typeScriptApps: TypeScriptAppConfig[] = CommonTestData.commonTypeScriptAppsData;

const sharedButtonText = Constants.updatedConstantsData.commonAppWithButton.app2;

const getAlternatePort = (currentPort: number): number => {
  const [firstApp, secondApp] = typeScriptApps;
  return currentPort === secondApp.host ? firstApp.host : secondApp.host;
};

test.describe('TypeScript project reference apps', () => {
  for (const app of typeScriptApps) {
    test.describe(`port ${app.host}`, () => {
      test(`renders shared header ${app.header}`, async ({ page }) => {
        await page.goto(buildUrl(app.host), { waitUntil: 'domcontentloaded' });

        const headerLocator = page.locator(baseSelectors.tags.coreElements.div, {
          hasText: app.header,
        });
        await expect(headerLocator.first()).toBeVisible();
      });

      test(`renders app name ${app.appName}`, async ({ page }) => {
        await page.goto(buildUrl(app.host), { waitUntil: 'domcontentloaded' });

        const appNameLocator = page.locator(baseSelectors.tags.coreElements.div, {
          hasText: app.appName,
        });
        await expect(appNameLocator.first()).toBeVisible();
      });

      test('renders button', async ({ page }) => {
        await page.goto(buildUrl(app.host), { waitUntil: 'domcontentloaded' });

        await expect(page.locator(baseSelectors.tags.coreElements.button).first()).toBeVisible();
      });

      test('button is enabled', async ({ page }) => {
        await page.goto(buildUrl(app.host), { waitUntil: 'domcontentloaded' });

        await expect(page.locator(baseSelectors.tags.coreElements.button).first()).toBeEnabled();
      });

      test(`button displays shared text "${sharedButtonText}"`, async ({ page }) => {
        await page.goto(buildUrl(app.host), { waitUntil: 'domcontentloaded' });

        await expect(page.getByRole('button', { name: sharedButtonText })).toBeVisible();
      });

      test('app names differ between hosts', async ({ page }) => {
        await page.goto(buildUrl(app.host), { waitUntil: 'domcontentloaded' });

        const currentAppName = await page
          .locator(updatedSelectors.common.appName)
          .first()
          .textContent();

        const alternatePort = getAlternatePort(app.host);
        await page.goto(buildUrl(alternatePort), { waitUntil: 'domcontentloaded' });

        const alternateAppName = await page
          .locator(updatedSelectors.common.appName)
          .first()
          .textContent();

        expect(currentAppName?.trim()).not.toEqual(alternateAppName?.trim());
      });
    });
  }
});

import { test, expect, type Locator } from '@playwright/test';
import { baseSelectors, updatedSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';
import { CommonTestData } from '../../../playwright-e2e/fixtures/commonTestData';

type TypeScriptFallbackApp = (typeof CommonTestData.commonTypeScriptAppsData)[number];

const buildUrl = (port: number): string => `http://localhost:${port}/`;

const fallbackApps: TypeScriptFallbackApp[] = CommonTestData.commonTypeScriptAppsData;

const sharedButtonText = Constants.updatedConstantsData.commonAppWithButton.app2;

const getAlternatePort = (currentPort: number): number => {
  const alternateApp = fallbackApps.find(({ host }) => host !== currentPort);
  return alternateApp?.host ?? currentPort;
};

const getTrimmedText = async (locator: Locator): Promise<string> => {
  const content = await locator.first().textContent();
  return content?.trim() ?? '';
};

test.describe('TypeScript React fallback apps', () => {
  for (const app of fallbackApps) {
    test.describe(`port ${app.host}`, () => {
      test(`renders shared header ${app.header}`, async ({ page }) => {
        await page.goto(buildUrl(app.host), { waitUntil: 'domcontentloaded' });

        await expect(
          page.locator(baseSelectors.tags.coreElements.div, { hasText: app.header }).first(),
        ).toBeVisible();
      });

      test(`renders app name ${app.appName}`, async ({ page }) => {
        await page.goto(buildUrl(app.host), { waitUntil: 'domcontentloaded' });

        await expect(
          page.locator(baseSelectors.tags.coreElements.div, { hasText: app.appName }).first(),
        ).toBeVisible();
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

        const currentAppName = await getTrimmedText(page.locator(updatedSelectors.common.appName));

        const alternatePort = getAlternatePort(app.host);
        await page.goto(buildUrl(alternatePort), { waitUntil: 'domcontentloaded' });

        const alternateAppName = await getTrimmedText(
          page.locator(updatedSelectors.common.appName),
        );

        expect(currentAppName).not.toEqual(alternateAppName);
      });
    });
  }
});

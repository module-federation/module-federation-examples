import { test, expect } from '@playwright/test';
import { baseSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

const appsData = [
  {
    appName: Constants.elementsText.reactHostNextJsApp.remoteComponents.header,
    appNav: Constants.elementsText.reactHostNextJsApp.remoteComponents.nav,
    host: 8080,
    appType: Constants.commonConstantsData.basicComponents.host,
  },
  {
    host: 8081,
    appType: Constants.commonConstantsData.basicComponents.host,
  },
] as const;

test.describe('React Host NextJS Remote', () => {
  for (const property of appsData) {
    test(`renders ${property.appType} app on localhost:${property.host}`, async ({ page }) => {
      const url = `http://localhost:${property.host}/`;
      await page.goto(url);
      await expect(page).toHaveURL(url);

      if (property.host === 8080) {
        const header = page
          .locator(baseSelectors.tags.coreElements.div)
          .filter({ hasText: String(property.appName) });
        await expect(header).toBeVisible();

        const nav = page
          .locator(baseSelectors.tags.navigation)
          .filter({ hasText: String(property.appNav) });
        await expect(nav).toBeVisible();
      }
    });
  }
});

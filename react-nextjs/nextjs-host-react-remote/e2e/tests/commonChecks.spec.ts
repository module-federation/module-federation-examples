import { test, expect } from '@playwright/test';
import { baseSelectors } from '../../../../cypress-e2e/common/selectors';
import { CommonTestData } from '../../../../cypress-e2e/fixtures/commonTestData';

const HOST_BASE_URL = 'http://localhost:8080/';

test.describe('Common content rendering', () => {
  for (const property of CommonTestData.commonNextJsAppsData) {
    test(`renders ${property.messageType} message`, async ({ page }) => {
      await page.goto(HOST_BASE_URL);
      const target = page.locator(property.selector).filter({ hasText: property.message });
      await expect(target).toBeVisible();
    });

    if (property.linkText) {
      test(`renders ${property.messageType} message link`, async ({ page }) => {
        await page.goto(HOST_BASE_URL);
        const parent = page.locator(property.selector);
        const link = parent
          .locator(baseSelectors.tags.coreElements.link)
          .filter({ hasText: property.linkText! });
        await expect(link).toBeVisible();
      });
    }
  }
});

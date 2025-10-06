import { test, expect } from '@playwright/test';
import { baseSelectors } from '../../../../cypress-e2e/common/selectors';
import { CommonTestData } from '../../../../cypress-e2e/fixtures/commonTestData';

const HOSTS = [8080, 8081] as const;
const FOOTER_MESSAGE = CommonTestData.commonNextJsAppsData[3].message;

test.describe('Common content rendering', () => {
  for (const property of CommonTestData.commonNextJsAppsData) {
    for (const host of HOSTS) {
      test(`localhost:${host} renders ${property.messageType} message`, async ({ page }) => {
        test.skip(
          host === 8081 && property.message === FOOTER_MESSAGE,
          'Remote app does not render the footer message.',
        );

        await page.goto(`http://localhost:${host}/`);
        const target = page.locator(property.selector).filter({ hasText: property.message });
        await expect(target).toBeVisible();
      });

      if (property.linkText) {
        test(`localhost:${host} exposes ${property.messageType} link`, async ({ page }) => {
          await page.goto(`http://localhost:${host}/`);
          const link = page
            .locator(property.selector)
            .locator(baseSelectors.tags.coreElements.link)
            .filter({ hasText: property.linkText! });
          await expect(link).toBeVisible();
        });
      }
    }
  }
});

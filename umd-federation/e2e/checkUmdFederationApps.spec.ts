import { expect, test } from '@playwright/test';

import { baseSelectors } from '../../playwright-e2e/common/selectors';
import { Constants } from '../../playwright-e2e/fixtures/constants';

const appsData = [
  {
    header1: Constants.elementsText.umdFederationApp.App1.firstHeader,
    header2: Constants.elementsText.umdFederationApp.App1.secondHeader,
    header3: Constants.elementsText.umdFederationApp.App1.thirdHeader,
    host: 9001,
  },
  {
    host: 9002,
  },
];

test.describe('UMD Federation', () => {
  appsData.forEach(({ header1, header2, header3, host }) => {
    test.describe(`Check application on localhost:${host}`, () => {
      const baseUrl = `http://localhost:${host}/`;

      test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl, { waitUntil: 'networkidle' });
      });

      test('Check App elements', async ({ page }) => {
        if (!header1 || !header2 || !header3) {
          test.skip('App 2 renders external remote content without headers.');
        } else {
          const headerLocator = page.locator(baseSelectors.tags.headers.h1);

          for (const text of [header1, header2, header3]) {
            await expect(headerLocator.filter({ hasText: text })).toBeVisible();
          }
        }
      });

      test('Check App URL', async ({ page }) => {
        await expect.poll(() => page.url()).toContain(baseUrl);
      });
    });
  });
});

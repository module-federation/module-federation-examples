import { expect, test } from '@playwright/test';

import { baseSelectors } from '../../../cypress-e2e/common/selectors';
import { Constants } from '../../../cypress-e2e/fixtures/constants';

const analyticsEndpoint = 'https://www.google-analytics.com/j/collect';

test.describe('Third Party Scripts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Checks app header visibility', async ({ page }) => {
    await expect(page.locator(baseSelectors.tags.headers.h1)).toHaveText(
      Constants.commonConstantsData.basicComponents.basicHostRemote,
    );
  });

  test('Checks app description visibility', async ({ page }) => {
    await expect(page.locator(baseSelectors.tags.paragraph)).toContainText(
      Constants.commonPhrases.thirdPartyScriptsApp.description,
    );
  });

  test('Checks third party network call created', async ({ page }) => {
    const analyticsRequest = page.waitForResponse(response => {
      return (
        response.request().method() === 'POST' &&
        response.url().startsWith(analyticsEndpoint) &&
        response.status() === 200
      );
    });

    await page.reload({ waitUntil: 'networkidle' });
    await analyticsRequest;
  });
});

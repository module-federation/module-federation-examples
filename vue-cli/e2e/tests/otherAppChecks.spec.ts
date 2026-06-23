import { test } from '@playwright/test';
import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

test.describe('Vue CLI', () => {
  test.describe('It checks other app', () => {
    let basePage: BaseMethods;

    test.beforeEach(async ({ page }) => {
      basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: 9001 });
    });

    test('Checks other section browser alert text', async () => {
      await basePage.checkBrowserAlertByText({
        selector: baseSelectors.tags.coreElements.button,
        alertMessage: Constants.commonPhrases.vueCliApp.otherAppAlertMessage,
      });
    });
  });
});

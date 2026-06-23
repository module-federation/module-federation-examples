import { test } from '@playwright/test';
import { BaseMethods } from '../../playwright-e2e/common/base';
import { baseSelectors } from '../../playwright-e2e/common/selectors';
import { Constants } from '../../playwright-e2e/fixtures/constants';

const appsData = [
  {
    appNameText: Constants.commonConstantsData.basicComponents.host,
    port: 3000,
  },
  {
    appNameText: Constants.commonConstantsData.basicComponents.remote,
    port: 3002,
  },
];

appsData.forEach(({ appNameText, port }) => {
  test.describe(`Check ${appNameText}`, () => {
    test.beforeEach(async ({ page }) => {
      const basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: port });
    });

    test(`Check ${appNameText} build and running`, async ({ page }) => {
      const basePage = new BaseMethods(page);

      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.headers.h1,
        text: Constants.commonConstantsData.basicComponents.basicHostRemote,
      });

      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.headers.h2,
        text: appNameText,
      });

      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.button,
        text: Constants.elementsText.craApp.buttonText,
      });
    });
  });
});

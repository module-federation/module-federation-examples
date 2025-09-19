import { test } from '@playwright/test';

import { BaseMethods } from '../../playwright-e2e/common/base';
import { baseSelectors } from '../../cypress-e2e/common/selectors';
import { Constants } from '../../cypress-e2e/fixtures/constants';

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
      let basePage: BaseMethods;

      test.beforeEach(async ({ page }) => {
        basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: host });
      });

      test('Check App elements', async () => {
        test.skip(!header1, 'App 2 renders external remote content without headers.');

        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h1,
          text: header1!,
        });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h1,
          text: header2!,
        });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h1,
          text: header3!,
        });
      });

      test('Check App URL', async () => {
        await basePage.checkUrlText(`http://localhost:${host}/`, true);
      });
    });
  });
});

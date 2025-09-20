import { test } from '@playwright/test';
import { BaseMethods } from '../../playwright-e2e/common/base';
import { baseSelectors } from '../../playwright-e2e/common/selectors';
import { Constants } from '../../playwright-e2e/fixtures/constants';

const appsData = [
  {
    appName: Constants.commonConstantsData.commonCountAppNames.app1,
    host: 3001,
  },
  {
    appName: Constants.commonConstantsData.commonCountAppNames.app2,
    host: 3002,
  },
  {
    // App 3 renders App 2 heading text because it consumes the remote app.
    appName: Constants.commonConstantsData.commonCountAppNames.app2,
    host: 3003,
  },
];

test.describe('Federated npm', () => {
  appsData.forEach(({ appName, host }) => {
    test.describe(`Check ${appName} on port ${host}`, () => {
      test('Check header block with text visibility', async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: host });

        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h1,
          text: Constants.commonConstantsData.basicComponents.basicHostRemote,
          visibilityState: 'be.visible',
        });

        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h2,
          text: appName,
          visibilityState: 'be.visible',
        });
      });

      test('Check button text visibility', async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: host });

        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.button,
          text: Constants.updatedConstantsData.commonAppWithButton.app2,
          visibilityState: 'be.visible',
        });
      });
    });
  });
});

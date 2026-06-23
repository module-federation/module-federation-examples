import { test } from '@playwright/test';

import { BaseMethods } from '../../playwright-e2e/common/base';
import { baseSelectors } from '../../playwright-e2e/common/selectors';
import { Constants } from '../../playwright-e2e/fixtures/constants';

const host = 3001;
const appTexts = [
  Constants.commonPhrases.reduxReducerInjectionApp.welcomeMessage,
  Constants.commonPhrases.reduxReducerInjectionApp.remoteAppText,
  Constants.commonPhrases.reduxReducerInjectionApp.remoteAppsNameFromReduxStore,
];

test.describe('Redux Reducer Injection', () => {
  let basePage: BaseMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
    await basePage.openLocalhost({ number: host });
  });

  appTexts.forEach(text => {
    test(`Check that "${text}" text is visible`, async () => {
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.div,
        text,
        visibilityState: 'be.visible',
      });
    });
  });

  test('Checks dispatch RemoteApp NewName Button visibility', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.elementsText.dispatchRemoteApp.button,
      visibilityState: 'be.visible',
    });
  });

  test('Checks that Remote App name gets updated', async () => {
    await basePage.fillField({
      selector: baseSelectors.tags.inputs.input,
      text: Constants.elementsText.dispatchRemoteApp.input,
    });
    await basePage.clickElementWithText({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.elementsText.dispatchRemoteApp.button,
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.div,
      text: Constants.elementsText.dispatchRemoteApp.input,
      visibilityState: 'be.visible',
    });
  });
});

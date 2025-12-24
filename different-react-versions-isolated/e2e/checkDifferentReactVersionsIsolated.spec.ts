import { test } from '@playwright/test';

import { BaseMethods } from '../../playwright-e2e/common/base';
import { baseSelectors, selectors } from '../../playwright-e2e/common/selectors';
import { Constants } from '../../playwright-e2e/fixtures/constants';

const appsData = [
  {
    headerText: Constants.elementsText.differentReactVersionsIsolatedApp.headers.app1,
    appName: Constants.commonConstantsData.commonCountAppNames.app1,
    buttonName: Constants.updatedConstantsData.commonAppWithButton.app2,
    host: 3001,
  },
  {
    headerText: Constants.elementsText.differentReactVersionsIsolatedApp.headers.app2,
    appName: Constants.commonConstantsData.commonCountAppNames.app2,
    buttonName: Constants.updatedConstantsData.commonAppWithButton.app2,
    host: 3002,
  },
] as const;

test.describe('Different React Versions Isolated', () => {
  let basePage: BaseMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
  });

  for (const property of appsData) {
    test.describe(`Check ${property.appName}`, () => {
      test.beforeEach(async () => {
        await basePage.openLocalhost({ number: property.host });
      });

      test(`Check ${property.appName} have ${property.headerText} header`, async () => {
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h1,
          text: property.headerText,
          visibilityState: 'be.visible',
        });
      });

      test(`Check ${property.appName} have ${property.appName} subheader`, async () => {
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h2,
          text: property.appName,
          visibilityState: 'be.visible',
        });
      });

      test(`Check ${property.appName} have ${property.buttonName} button`, async () => {
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.button,
          text: property.buttonName,
          visibilityState: 'be.visible',
        });
      });

      test('Check Apps share div with React version 16.14.0', async () => {
        await basePage.checkElementVisibility({
          selector: selectors.differentReactVersionsIsolatedApp.sharedBlock,
        });

        const alternativeHost = property.host === 3001 ? 3002 : 3001;
        await basePage.openLocalhost({ number: alternativeHost });
        await basePage.checkElementVisibility({
          selector: selectors.differentReactVersionsIsolatedApp.sharedBlock,
        });
      });

      if (property.host === 3001) {
        test('Check App injects React version block into a div parent', async () => {
          await basePage.checkElementVisibility({
            parentSelector: baseSelectors.tags.coreElements.div,
            selector: selectors.differentReactVersionsIsolatedApp.sharedBlock,
          });
          await basePage.checkElementVisibility({
            selector: selectors.differentReactVersionsIsolatedApp.divParent,
          });
        });
      } else {
        test(`Check ${property.appName} did not inject React version block into a div parent`, async () => {
          await basePage.checkElementVisibility({
            parentSelector: baseSelectors.tags.coreElements.div,
            selector: selectors.differentReactVersionsIsolatedApp.sharedBlock,
          });
          await basePage.checkElementVisibility({
            selector: selectors.differentReactVersionsIsolatedApp.sharedBlock,
          });
          await basePage.checkElementVisibility({
            selector: selectors.differentReactVersionsIsolatedApp.divParent,
            isVisible: false,
          });
        });
      }

      test('Check React version 16.14.0 block', async () => {
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h1,
          text: Constants.elementsText.differentReactVersionsIsolatedApp.headers.app2,
          visibilityState: 'be.visible',
        });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.headers.h2,
          text: Constants.commonConstantsData.commonCountAppNames.app2,
          visibilityState: 'be.visible',
        });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.button,
          text: Constants.updatedConstantsData.commonAppWithButton.app2,
          visibilityState: 'be.visible',
        });
      });
    });
  }
});

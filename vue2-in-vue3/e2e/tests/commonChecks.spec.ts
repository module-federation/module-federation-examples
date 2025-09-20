import { test } from '@playwright/test';
import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

const clicksCounter = 1;

test.describe('Vue 2 in Vue 3', () => {
  const appsData = [
    {
      headerName: Constants.commonPhrases.vue2InVue3App.appsNames.vue2,
      componentState: Constants.commonPhrases.vue2InVue3App.componentState,
      host: 3001,
    },
    {
      headerName: Constants.commonPhrases.vue2InVue3App.appsNames.vue3,
      componentState: Constants.commonConstantsData.commonVueAppComponentState,
      host: 3002,
    },
  ];

  test.describe('It checks vue2-in-vue3 connection sample', () => {
    appsData.forEach(property => {
      test(`Check ${property.headerName} header visibility`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: property.host });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: property.headerName,
          visibilityState: 'be.visible',
        });
      });

      test(`Check that both apps shares the button with same text (${property.headerName})`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: property.host });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.button,
          text: Constants.elementsText.vue2InVue3App.commonButtonText,
          visibilityState: 'be.visible',
        });
      });

      test(`Check that in ${property.headerName} button is active`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: property.host });
        await basePage.checkElementState({
          selector: baseSelectors.tags.coreElements.button,
          state: 'not.be.disabled',
        });
      });

      test(`Check that in ${property.headerName} app by default counter set to 0`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: property.host });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: Constants.commonPhrases.vue2InVue3App.defaultCounterText,
          visibilityState: 'be.visible',
        });
      });

      test(`Checks component state visibility for ${property.headerName}`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: property.host });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: property.componentState,
        });
      });

      test(`Checks that only 'vue3' app recognises button as remote component (${property.headerName})`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: property.host });
        if (property.headerName === Constants.commonPhrases.vue2InVue3App.appsNames.vue3) {
          await basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.coreElements.div,
            text: Constants.commonConstantsData.commonVueAppComponentState,
            visibilityState: 'be.visible',
          });

          return;
        }

        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: Constants.commonPhrases.vue2InVue3App.componentState,
          visibilityState: 'be.visible',
        });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: Constants.commonConstantsData.commonVueAppComponentState,
          isVisible: false,
        });
      });

      test(`Check that in ${property.headerName} app color of component info set to red`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: property.host });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.css.style.replace('{style}', Constants.color.nonRgbValues.red),
          text: Constants.commonPhrases.vue2InVue3App.defaultCounterText,
        });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.css.style.replace('{style}', Constants.color.nonRgbValues.red),
          text: property.componentState,
        });
      });

      test(`Checks counter on ${property.headerName} changes after click and returns to default after reload`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: property.host });
        await basePage.checkCounterFunctionality({
          button: baseSelectors.tags.coreElements.button,
          counterElement: baseSelectors.tags.coreElements.div,
          counterText: Constants.commonPhrases.vue2InVue3App.defaultCounterText,
          isButtonTexted: false,
          isReloaded: true,
        });
      });

      test(`Compares counter on ${property.headerName} with quantity of clicks`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: property.host });
        await basePage.checkCounterFunctionality({
          button: baseSelectors.tags.coreElements.button,
          counterElement: baseSelectors.tags.coreElements.div,
          counterText: Constants.commonPhrases.vue2InVue3App.defaultCounterText,
          isButtonTexted: false,
          isValueCompared: true,
        });
      });

      test(`Checks that clicks counter is not shared between apps (${property.headerName})`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        const host = property.host === 3001 ? appsData[1].host : appsData[0].host;
        const defaultCounterText = Constants.commonPhrases.vue2InVue3App.defaultCounterText;

        await basePage.openLocalhost({ number: property.host });
        await basePage.checkCounterFunctionality({
          button: baseSelectors.tags.coreElements.button,
          counterElement: baseSelectors.tags.coreElements.div,
          counterText: Constants.commonPhrases.vue2InVue3App.defaultCounterText,
          isButtonTexted: false,
        });

        await basePage.checkInfoOnNonDefaultHost({
          host,
          element: baseSelectors.tags.coreElements.div,
          existedText: defaultCounterText,
          notExistedText: defaultCounterText.replace(/[0-9]/g, clicksCounter.toString()),
        });
      });
    });
  });
});

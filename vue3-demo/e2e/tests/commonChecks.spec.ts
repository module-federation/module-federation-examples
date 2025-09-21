import { test } from '@playwright/test';
import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

test.describe('Vue 3 Demo', () => {
  const appsData = [
    { host: 3001, appName: Constants.commonPhrases.vue3DemoApp.appsNames.layout },
    { host: 3002, appName: Constants.commonPhrases.vue3DemoApp.appsNames.remote },
  ];

  test.describe('It checks app names & messages', () => {
    appsData.forEach(({ host, appName }) => {
      test(`Checks apps name visibility (${appName})`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: host });
        const nameSelector = host === 3001 ? baseSelectors.tags.headers.h1 : baseSelectors.tags.headers.h3;
        await basePage.checkElementWithTextPresence({ selector: nameSelector, text: appName, visibilityState: 'be.visible' });
      });

      test(`Checks component state message visibility (${appName})`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: host });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.div,
          text: Constants.commonConstantsData.commonVueAppComponentState,
          visibilityState: 'be.visible',
        });
      });

      test(`Checks component state message style (${appName})`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: host });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.css.style.replace('{style}', Constants.color.nonRgbValues.red),
          text: Constants.commonConstantsData.commonVueAppComponentState,
          visibilityState: 'be.visible',
        });
      });

      test(`Checks button visibility (${appName})`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: host });
        await basePage.checkElementVisibility({
          selector: baseSelectors.tags.coreElements.button,
        });
      });

      test(`Checks that button is not disabled (${appName})`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: host });
        await basePage.checkElementState({
          selector: baseSelectors.tags.coreElements.button,
          state: 'not.be.disabled',
        });
      });

      test(`Checks button text (${appName})`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        await basePage.openLocalhost({ number: host });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.coreElements.button,
          text: Constants.commonConstantsData.helloWorldMessage,
          visibilityState: 'be.visible',
        });
      });
    });
  });
});

import { test } from '@playwright/test';
import { BaseMethods } from '../../../playwright-e2e/common/base';
import { VueCliMethods } from '../methods/methods';
import { baseSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

test.describe('Vue CLI', () => {
  const appsData = [{ host: 8080 }, { host: 9000 }, { host: 9001 }];

  test.describe('It checks elements appearing and accessibility', () => {
    appsData.forEach(({ host }) => {
      test(`Checks that fetched code appears on click and disappears after reload on ${host}`, async ({
        page,
      }) => {
        const basePage = new BaseMethods(page);
        const methodsPage = new VueCliMethods(page);
        basePage.skipTestByCondition(host === 9000);

        await basePage.openLocalhost({ number: host });
        await methodsPage.checkCodeTagAppearance();
      });

      test(`Checks core section visibility & description on ${host}`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        basePage.skipTestByCondition(host === 9001);

        await basePage.openLocalhost({ number: host });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.section,
          text: Constants.elementsText.vueCliApp.sectionsDescriptions.coreSection,
          visibilityState: 'be.visible',
        });
      });

      test(`Checks core section includes button with text on ${host}`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        basePage.skipTestByCondition(host === 9001);

        await basePage.openLocalhost({ number: host });
        await basePage.checkElementWithTextPresence({
          parentSelector: baseSelectors.tags.section,
          selector: baseSelectors.tags.coreElements.button,
          text:
            host === 8080
              ? Constants.elementsText.vueCliApp.buttonsText.consumerCoreSectionButton
              : Constants.commonConstantsData.button,
          visibilityState: 'be.visible',
        });
      });

      test(`Checks core section button is not disabled on ${host}`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        basePage.skipTestByCondition(host === 9001);

        await basePage.openLocalhost({ number: host });
        await basePage.checkElementState({
          selector: baseSelectors.tags.coreElements.button,
          text:
            host === 8080
              ? Constants.elementsText.vueCliApp.buttonsText.otherSectionButton
              : Constants.commonConstantsData.button,
          state: 'not.be.disabled',
        });
      });

      test(`Checks other section with description visibility on ${host}`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        basePage.skipTestByCondition(host === 9000);

        await basePage.openLocalhost({ number: host });
        await basePage.checkElementWithTextPresence({
          selector: baseSelectors.tags.section,
          text: Constants.elementsText.vueCliApp.sectionsDescriptions.otherSection,
          visibilityState: 'be.visible',
        });
      });

      test(`Checks that other section does not contain name header on ${host}`, async ({
        page,
      }) => {
        const basePage = new BaseMethods(page);
        basePage.skipTestByCondition(host === 9000);

        await basePage.openLocalhost({ number: host });
        await basePage.checkElementVisibility({
          parentSelector: baseSelectors.tags.section,
          selector: baseSelectors.tags.headers.h1,
          isVisible: false,
          text: Constants.elementsText.vueCliApp.sectionsDescriptions.otherSection,
        });
      });

      test(`Checks that other section includes button on ${host}`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        basePage.skipTestByCondition(host === 9000);

        await basePage.openLocalhost({ number: host });
        await basePage.checkElementWithTextPresence({
          parentSelector: baseSelectors.tags.section,
          selector: baseSelectors.tags.coreElements.button,
          text: Constants.elementsText.vueCliApp.buttonsText.otherSectionButton,
          visibilityState: 'be.visible',
        });
      });

      test(`Checks other section button text on ${host}`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        basePage.skipTestByCondition(host === 9000);

        await basePage.openLocalhost({ number: host });
        await basePage.checkElementWithTextPresence({
          parentSelector: baseSelectors.tags.section,
          selector: baseSelectors.tags.coreElements.button,
          text: Constants.elementsText.vueCliApp.buttonsText.otherSectionButton,
          visibilityState: 'be.visible',
        });
      });

      test(`Checks other section button is not disabled on ${host}`, async ({ page }) => {
        const basePage = new BaseMethods(page);
        basePage.skipTestByCondition(host === 9000);

        await basePage.openLocalhost({ number: host });
        await basePage.checkElementState({
          selector: baseSelectors.tags.coreElements.button,
          text: Constants.elementsText.vueCliApp.buttonsText.otherSectionButton,
          state: 'not.be.disabled',
        });
      });
    });
  });
});

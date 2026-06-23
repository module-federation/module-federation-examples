import { test } from '@playwright/test';
import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors, updatedSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';
import { VueCliMethods } from '../methods/methods';

test.describe('Vue CLI', () => {
  test.describe('It checks consumer app', () => {
    let basePage: BaseMethods;
    let methodsPage: VueCliMethods;

    test.beforeEach(async ({ page }) => {
      basePage = new BaseMethods(page);
      methodsPage = new VueCliMethods(page);
      await basePage.openLocalhost({ number: 8080 });
    });

    test('Checks consumer page header visibility', async () => {
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.div,
        text: Constants.elementsText.vueCliApp.consumerSection.header,
        visibilityState: 'be.visible',
      });
    });

    test('Checks core imported part message visibility', async () => {
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.headers.h4,
        text: Constants.elementsText.vueCliApp.consumerSection.importMessages.core,
        visibilityState: 'be.visible',
      });
    });

    test('Checks that imported and basic core component names are equal', async () => {
      await basePage.compareInfoBetweenHosts({
        selector: updatedSelectors.vueCliApp.sectionElements.name,
        extraHost: 9000,
      });
    });

    test('Checks that imported core section button text is not equal to base core section button text', async () => {
      await basePage.compareInfoBetweenHosts({
        selector: updatedSelectors.vueCliApp.sectionElements.button,
        extraHost: 9000,
        isEqual: false,
      });
    });

    test('Checks core section description visibility', async () => {
      await basePage.checkElementState({
        selector: baseSelectors.tags.section,
        text: Constants.elementsText.vueCliApp.sectionsDescriptions.consumerCoreSection,
        state: 'not.be.disabled',
      });
    });

    test('Checks other part message visibility', async () => {
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.headers.h4,
        text: Constants.elementsText.vueCliApp.consumerSection.importMessages.other,
        visibilityState: 'be.visible',
      });
    });

    test('Checks that imported and basic other component descriptions are equal', async () => {
      await basePage.compareInfoBetweenHosts({
        selector: baseSelectors.tags.section,
        extraHost: 9001,
        isEqual: true,
        index: 1,
      });
    });

    test('Checks that imported other section button text is equal to base other section button text', async () => {
      await basePage.compareInfoBetweenHosts({
        selector: baseSelectors.tags.coreElements.button,
        extraHost: 9001,
        isEqual: true,
        index: 1,
      });
    });

    test('Checks that on imported and base other sections same code block appears by click', async () => {
      await basePage.checkElementContainText({
        selector: baseSelectors.tags.section,
        text: Constants.elementsText.vueCliApp.otherSectionCodeBlock,
        index: 0,
        isContain: false,
      });

      await basePage.checkBrowserAlertByText({
        parentSelector: baseSelectors.tags.section,
        selector: baseSelectors.tags.coreElements.button,
        alertMessage: Constants.commonPhrases.vueCliApp.otherAppAlertMessage,
        index: 1,
      });

      await basePage.compareInfoBetweenHosts({
        selector: baseSelectors.tags.code,
        extraHost: 9001,
        isEqual: true,
        index: 0,
        clickSelector: baseSelectors.tags.coreElements.button,
        wait: 1500,
      });
    });

    test('Checks that on imported and base other sections same browser alert appears by click on button', async () => {
      await methodsPage.checkBrowserAlertForMultipleHosts({
        selector: baseSelectors.tags.coreElements.button,
        message: Constants.commonPhrases.vueCliApp.otherAppAlertMessage,
        index: 1,
        host: 9001,
        wait: 1500,
      });
    });
  });
});

import { expect, test } from '@playwright/test';

import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors, selectors, updatedSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';
import { CommonTestData } from '../../../playwright-e2e/fixtures/commonTestData';
import { AngularUniversalSsrMethods } from '../methods/methods';

const baseElementsQuantity = 3;

test.describe('Angular Universal SSR - Host App', () => {
  let basePage: BaseMethods;
  let methodsPage: AngularUniversalSsrMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
    methodsPage = new AngularUniversalSsrMethods(page);

    await basePage.openLocalhost({ number: 4000 });
  });

  test('Checks app root component visibility', async () => {
    await basePage.checkElementVisibility({
      selector: baseSelectors.tags.appRoot,
    });
  });

  test('Checks app root component header text', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.appRoot,
      text: Constants.commonPhrases.angularUniversalSsrApp.components.rootComponent,
      visibilityState: 'be.visible',
    });
  });

  test('Checks value input visibility', async () => {
    await basePage.checkElementVisibility({
      selector: baseSelectors.tags.inputs.input,
    });
  });

  test('Checks value input is not disabled', async () => {
    await basePage.checkElementState({
      parentSelector: baseSelectors.tags.coreElements.div,
      selector: baseSelectors.tags.inputs.input,
      state: 'not.be.disabled',
    });
  });

  test('Checks value input button visibility', async () => {
    await basePage.checkElementVisibility({
      parentSelector: baseSelectors.tags.coreElements.div,
      selector: baseSelectors.tags.coreElements.button,
    });
  });

  test('Checks value input button text', async () => {
    await basePage.checkElementWithTextPresence({
      parentSelector: baseSelectors.tags.coreElements.div,
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.elementsText.angularUniversalSsrApp.inputButtonText,
      visibilityState: 'be.visible',
    });
  });

  test('Checks value input button color', async ({ page }) => {
    const button = page
      .locator(baseSelectors.tags.coreElements.button)
      .filter({ hasText: Constants.elementsText.angularUniversalSsrApp.inputButtonText })
      .first();

    const background = await button.evaluate(element => window.getComputedStyle(element).getPropertyValue('background-color'));
    expect(background).toContain(Constants.color.lightGrey);
  });

  test('Checks value input button is not disabled', async () => {
    await basePage.checkElementState({
      parentSelector: baseSelectors.tags.coreElements.div,
      selector: baseSelectors.tags.coreElements.button,
      state: 'not.be.disabled',
    });
  });

  test('Checks value input has no validation', async () => {
    for (const value of CommonTestData.multipleSizeStringsArray) {
      await basePage.fillField({
        selector: baseSelectors.tags.inputs.input,
        text: value,
      });
      await basePage.checkInputValue(value);
    }
  });

  test(`Checks that by default added values quantity equal to ${baseElementsQuantity}`, async () => {
    await basePage.checkElementQuantity({
      selector: baseSelectors.tags.coreElements.list,
      quantity: baseElementsQuantity,
    });
  });

  test('Checks basically added values names', async () => {
    await methodsPage.checkTextedElementsVisibility(
      Constants.elementsText.angularUniversalSsrApp.angularUniversalSsrAddedValuesNames,
      baseSelectors.tags.coreElements.list,
    );
  });

  test('Checks add new value functionality', async () => {
    await methodsPage.addNewListValue();
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.list,
      text: Constants.commonConstantsData.standardPhrase,
      visibilityState: 'be.visible',
    });
  });

  test('Checks that after applying value status in input it can be added more than once', async () => {
    await methodsPage.addNewListValue();
    await basePage.checkInputValue(Constants.commonConstantsData.standardPhrase);
    await basePage.clickElementWithText({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.elementsText.angularUniversalSsrApp.inputButtonText,
    });
    await basePage.checkElementQuantity({
      selector: baseSelectors.tags.coreElements.list,
      quantity: 5,
    });
    await basePage.checkElementQuantity({
      selector: baseSelectors.tags.coreElements.list,
      text: Constants.commonConstantsData.standardPhrase,
      quantity: 2,
      jqueryValue: true,
    });
  });

  test('Checks that empty input would not add new value to the list', async () => {
    await basePage.checkElementQuantity({
      selector: baseSelectors.tags.coreElements.list,
      quantity: baseElementsQuantity,
    });
    await basePage.checkInputValue('');
    await basePage.clickElementWithText({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.elementsText.angularUniversalSsrApp.inputButtonText,
    });
    await basePage.checkElementQuantity({
      selector: baseSelectors.tags.coreElements.list,
      quantity: baseElementsQuantity,
    });
  });

  test('Checks that newly added value disappears after reload', async () => {
    await basePage.checkElementQuantity({
      selector: baseSelectors.tags.coreElements.list,
      quantity: baseElementsQuantity,
    });
    await basePage.fillField({
      selector: baseSelectors.tags.inputs.input,
      text: Constants.commonConstantsData.standardPhrase,
    });
    await basePage.checkInputValue(Constants.commonConstantsData.standardPhrase);
    await basePage.clickElementWithText({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.elementsText.angularUniversalSsrApp.inputButtonText,
    });
    await basePage.checkElementQuantity({
      selector: baseSelectors.tags.coreElements.list,
      quantity: 4,
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.list,
      text: Constants.commonConstantsData.standardPhrase,
      visibilityState: 'be.visible',
    });
    await basePage.reloadWindow();
    await basePage.checkElementQuantity({
      selector: baseSelectors.tags.coreElements.list,
      quantity: baseElementsQuantity,
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.list,
      text: Constants.commonConstantsData.standardPhrase,
      isVisible: false,
    });
  });

  test('Checks app home component element text', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.appRoot,
      text: Constants.commonPhrases.angularUniversalSsrApp.components.homeComponent,
      visibilityState: 'be.visible',
    });
  });

  test(`Checks that tabs quantity equal to ${baseElementsQuantity}`, async () => {
    await basePage.checkElementQuantity({
      selector: updatedSelectors.angularUniversalSsrApp.tab,
      quantity: baseElementsQuantity,
    });
  });

  test('Checks tab names visibility', async () => {
    await methodsPage.checkTextedElementsVisibility(
      Constants.elementsText.angularUniversalSsrApp.tabsNames,
      updatedSelectors.angularUniversalSsrApp.tab,
    );
  });

  test('Checks cities block appears after click on federation tab', async ({ page }) => {
    await basePage.checkElementVisibility({
      selector: selectors.angularUniversalSsrApp.citiesBlock,
      isVisible: false,
    });

    await basePage.clickElementWithText({
      selector: updatedSelectors.angularUniversalSsrApp.tab,
      text: Constants.elementsText.angularUniversalSsrApp.tabsNames[2],
    });

    await expect(page.locator(selectors.angularUniversalSsrApp.citiesBlock)).toBeVisible();
  });

  test('Checks that cities block is equal between host and client apps', async () => {
    await basePage.checkElementVisibility({
      selector: selectors.angularUniversalSsrApp.citiesBlock,
      isVisible: false,
    });

    await basePage.clickElementWithText({
      selector: updatedSelectors.angularUniversalSsrApp.tab,
      text: Constants.elementsText.angularUniversalSsrApp.tabsNames[2],
    });

    await basePage.checkElementVisibility({
      selector: selectors.angularUniversalSsrApp.citiesBlock,
    });

    await basePage.compareInfoBetweenHosts(selectors.angularUniversalSsrApp.citiesBlock, 3000);
  });

  test('Checks added cities block functionality across hosts', async () => {
    await methodsPage.checkAddedCitiesBlockFunctionalityForMultipleHosts(
      3000,
      Constants.elementsText.angularUniversalSsrApp.addedCities,
      updatedSelectors.angularUniversalSsrApp.addedCity,
      Constants.commonPhrases.angularUniversalSsrApp.selectedCityInfo,
      selectors.angularUniversalSsrApp.selectedCityInfo,
    );
  });
});

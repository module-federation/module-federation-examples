import { expect, test } from '@playwright/test';

import { BaseMethods } from '../../../playwright-e2e/common/base';
import {
  baseSelectors,
  selectors,
  updatedSelectors,
} from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';
import { AngularUniversalSsrMethods } from '../methods/methods';

test.describe('Angular Universal SSR - Client App', () => {
  let basePage: BaseMethods;
  let methodsPage: AngularUniversalSsrMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
    methodsPage = new AngularUniversalSsrMethods(page);

    await basePage.openLocalhost({ number: 3000 });
  });

  test('Checks cities block visibility', async () => {
    await basePage.checkElementVisibility({
      selector: selectors.angularUniversalSsrApp.citiesBlock,
    });
  });

  test('Checks cities block header visibility', async () => {
    await basePage.checkElementWithTextPresence({
      parentSelector: selectors.angularUniversalSsrApp.citiesBlock,
      selector: baseSelectors.tags.coreElements.div,
      text: Constants.commonPhrases.angularUniversalSsrApp.blockHeaderText,
      visibilityState: 'be.visible',
    });
  });

  test('Checks base cities names visibility', async () => {
    await methodsPage.checkTextedElementsVisibility(
      Constants.elementsText.angularUniversalSsrApp.addedCities,
      updatedSelectors.angularUniversalSsrApp.addedCity,
    );
  });

  test('Checks that both cities links can be clicked', async ({ page }) => {
    const locator = page.locator(updatedSelectors.angularUniversalSsrApp.addedCity);
    const count = await locator.count();
    expect(count).toBeGreaterThan(0);

    for (let index = 0; index < count; index++) {
      await expect(locator.nth(index)).toBeEnabled();
    }
  });

  test('Clicks on city by name and checks description with text appear', async () => {
    const cities = Constants.elementsText.angularUniversalSsrApp.addedCities;

    for (let index = 0; index < cities.length; index++) {
      const city = cities[index];
      const expected = Constants.commonPhrases.angularUniversalSsrApp.selectedCityInfo[index];

      await basePage.clickElementWithText({
        selector: updatedSelectors.angularUniversalSsrApp.addedCity,
        text: city,
      });

      await basePage.checkElementWithTextPresence({
        selector: selectors.angularUniversalSsrApp.selectedCityInfo,
        text: expected,
        visibilityState: 'be.visible',
      });
    }
  });

  test('Checks that selection of city info can be reverted after reload', async () => {
    await methodsPage.checkCitiesBlockFunctionality();
  });
});

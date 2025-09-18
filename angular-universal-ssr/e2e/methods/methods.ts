import { expect, Page } from '@playwright/test';

import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors, selectors, updatedSelectors } from '../../../cypress-e2e/common/selectors';
import { Constants } from '../../../cypress-e2e/fixtures/constants';

export class AngularUniversalSsrMethods extends BaseMethods {
  constructor(protected readonly page: Page) {
    super(page);
  }

  async checkActiveTabNameConnection(activeTabName: string, componentName: string): Promise<void> {
    const text = (await this.page.locator(selectors.angularUniversalSsrApp.activeTab).innerText()).trim();

    if (text === activeTabName) {
      await this.checkElementWithTextPresence({
        selector: baseSelectors.tags.appRoot,
        text: componentName,
        visibilityState: 'be.visible',
      });
    }
  }

  async checkAddedCitiesBlockFunctionalityForMultipleHosts(
    extraHost: number,
    addedCities: string[],
    addedCitySelector: string,
    selectedCityInfo: string[],
    selectedCityInfoSelector: string,
  ): Promise<void> {
    await this.clickElementWithText({
      selector: updatedSelectors.angularUniversalSsrApp.tab,
      text: Constants.elementsText.angularUniversalSsrApp.tabsNames[2],
    });

    await this.checkCitiesBlockFunctionality();

    const remotePage = await this.page.context().newPage();

    try {
      await remotePage.goto(`http://localhost:${extraHost}/`, { waitUntil: 'networkidle' });

      for (let index = 0; index < addedCities.length; index++) {
        const city = addedCities[index];
        const expectedInfo = selectedCityInfo[index];

        await remotePage.locator(addedCitySelector).filter({ hasText: city }).first().click();
        await expect(remotePage.locator(selectedCityInfoSelector).filter({ hasText: expectedInfo })).toBeVisible();

        await remotePage.reload({ waitUntil: 'networkidle' });
        await expect(remotePage.locator(selectedCityInfoSelector).filter({ hasText: expectedInfo })).toHaveCount(0);
      }
    } finally {
      await remotePage.close();
    }
  }

  async checkCitiesBlockFunctionality(): Promise<void> {
    for (let index = 0; index < Constants.elementsText.angularUniversalSsrApp.addedCities.length; index++) {
      const city = Constants.elementsText.angularUniversalSsrApp.addedCities[index];
      const expectedInfo = Constants.commonPhrases.angularUniversalSsrApp.selectedCityInfo[index];

      await this.clickElementWithText({
        selector: updatedSelectors.angularUniversalSsrApp.addedCity,
        text: city,
      });

      await this.checkElementWithTextPresence({
        selector: selectors.angularUniversalSsrApp.selectedCityInfo,
        text: expectedInfo,
        visibilityState: 'be.visible',
      });

      await this.reloadWindow();
      await this.checkElementVisibility({
        selector: selectors.angularUniversalSsrApp.selectedCityInfo,
        isVisible: false,
      });
    }
  }

  async checkTextedElementsVisibility(elementsArray: string[], elementSelector: string): Promise<void> {
    for (const element of elementsArray) {
      await this.checkElementWithTextPresence({
        selector: elementSelector,
        text: element,
        visibilityState: 'be.visible',
      });
    }
  }

  async addNewListValue(): Promise<void> {
    await this.checkElementQuantity({
      selector: baseSelectors.tags.coreElements.list,
      quantity: 3,
    });

    await this.fillField({
      selector: baseSelectors.tags.inputs.input,
      text: Constants.commonConstantsData.standardPhrase,
    });

    await this.checkInputValue(Constants.commonConstantsData.standardPhrase);

    await this.clickElementWithText({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.elementsText.angularUniversalSsrApp.inputButtonText,
    });

    await this.checkElementQuantity({
      selector: baseSelectors.tags.coreElements.list,
      quantity: 4,
    });
  }
}

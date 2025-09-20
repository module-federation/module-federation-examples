import { Page } from '@playwright/test';
import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

export class VueCliMethods extends BaseMethods {
  constructor(page: Page) {
    super(page);
  }

  public async checkBrowserAlertForMultipleHosts({
    selector,
    message,
    isEqual = true,
    index = 0,
    host,
    wait = 0,
  }: {
    selector: string;
    message: string;
    isEqual?: boolean;
    index?: number;
    host: number;
    wait?: number;
  }): Promise<void> {
    await super.checkBrowserAlertForMultipleHosts({
      selector,
      alertMessage: message,
      isEqual,
      index,
      host,
      wait,
    });
  }

  public async checkCodeTagAppearance(): Promise<void> {
    await this.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: Constants.elementsText.vueCliApp.otherSectionCodeBlock,
      index: 0,
      isContain: false,
    });

    const buttonLocator = this.page
      .locator(baseSelectors.tags.section)
      .locator(baseSelectors.tags.coreElements.button)
      .filter({ hasText: Constants.elementsText.vueCliApp.buttonsText.otherSectionButton })
      .first();

    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog', { timeout: 5_000 }),
      buttonLocator.click(),
    ]);

    await dialog.accept();

    await this.checkElementWithTextPresence({
      parentSelector: baseSelectors.tags.section,
      selector: baseSelectors.tags.code,
      text: Constants.elementsText.vueCliApp.otherSectionCodeBlock,
      visibilityState: 'be.visible',
    });

    await this.reloadWindow();

    await this.checkElementContainText({
      selector: baseSelectors.tags.section,
      text: Constants.elementsText.vueCliApp.otherSectionCodeBlock,
      index: 0,
      isContain: false,
    });

    await this.checkElementVisibility({
      parentSelector: baseSelectors.tags.section,
      selector: baseSelectors.tags.code,
      isVisible: false,
      notVisibleState: 'not.be.visible',
    });
  }
}

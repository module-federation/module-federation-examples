import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

import { BaseMethods } from '../../../playwright-e2e/common/base';
import { Constants } from '../../../playwright-e2e/fixtures/constants';
import { baseSelectors, selectors } from '../../../playwright-e2e/common/selectors';

const elementsQuantity = 2;

async function expectConsoleMessage(
  page: Page,
  expected: string,
  action: () => Promise<void>,
): Promise<void> {
  const consolePromise = page.waitForEvent('console', {
    predicate: message => message.type() === 'log' && message.text().includes(expected),
    timeout: 10_000,
  });

  await action();
  await consolePromise;
}

async function verifyCounter({
  basePage,
  page,
  buttonSelector,
  counterText,
  shouldReload = false,
}: {
  basePage: BaseMethods;
  page: Page;
  buttonSelector: string;
  counterText: string;
  shouldReload?: boolean;
}): Promise<void> {
  const button = page.locator(buttonSelector);
  await expect(button).toBeVisible();
  await expect(button).toContainText(counterText);

  const initialText = (await button.innerText()).trim();
  const initialValueMatch = initialText.match(/(\d+)$/);
  const initialValue = initialValueMatch ? Number(initialValueMatch[1]) : 0;

  await button.click();

  const incrementedText = counterText.replace(/\d+$/, String(initialValue + 1));
  await expect(button).toContainText(incrementedText);

  if (shouldReload) {
    await basePage.reloadWindow();
    await expect(button).toContainText(counterText);
  }
}

test.describe('Native Federation React - Host component', () => {
  let basePage: BaseMethods;

  test.beforeEach(async ({ page }) => {
    basePage = new BaseMethods(page);
    await basePage.openLocalhost({ number: 3000 });
  });

  test('Checks apps console loading module message', async ({ page }) => {
    await expectConsoleMessage(
      page,
      Constants.elementsText.nativeFederationReactApp.messages.consoleMessages.loadingModuleMessage,
      () => basePage.openLocalhost({ number: 3000 }),
    );
  });

  test('Checks apps console remote module message', async ({ page }) => {
    await expectConsoleMessage(
      page,
      Constants.elementsText.nativeFederationReactApp.messages.consoleMessages.remoteModuleMessage,
      () => basePage.openLocalhost({ number: 3000 }),
    );
  });

  test('Checks remote component greeting visibility', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.div,
      text: Constants.elementsText.nativeFederationReactApp.messages.pageMessages
        .remoteComponentGreeting,
      visibilityState: 'be.visible',
    });
  });

  test('Checks change components message visibility', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.div,
      text: Constants.elementsText.nativeFederationReactApp.messages.pageMessages
        .changeComponentMessage,
      visibilityState: 'be.visible',
    });
  });

  test('Checks page includes two links', async () => {
    await basePage.checkElementQuantity({
      parentSelector: baseSelectors.tags.coreElements.body,
      selector: baseSelectors.tags.coreElements.link,
      quantity: elementsQuantity,
    });
  });

  test('Checks both links have same names', async () => {
    await basePage.checkElementQuantity({
      selector: baseSelectors.tags.coreElements.link,
      text: Constants.elementsText.nativeFederationReactApp.elementsTexts.linkName,
      quantity: elementsQuantity,
    });
  });

  test('Checks page includes two buttons', async () => {
    await basePage.checkElementQuantity({
      parentSelector: baseSelectors.tags.coreElements.body,
      selector: baseSelectors.tags.coreElements.button,
      quantity: elementsQuantity,
    });
  });

  test('Checks buttons are not disabled', async () => {
    await basePage.checkElementQuantity({
      parentSelector: baseSelectors.tags.coreElements.body,
      selector: baseSelectors.tags.coreElements.button,
      quantity: elementsQuantity,
    });
    await basePage.checkElementState({
      selector: baseSelectors.tags.coreElements.button,
      state: 'not.be.disabled',
    });
  });

  test('Checks links are not disabled', async () => {
    await basePage.checkElementQuantity({
      selector: baseSelectors.tags.coreElements.link,
      quantity: elementsQuantity,
    });
    await basePage.checkElementState({
      selector: baseSelectors.tags.coreElements.link,
      state: 'not.be.disabled',
    });
  });

  test('Checks both linked buttons include same link', async () => {
    await basePage.checkElementHaveProperty({
      selector: baseSelectors.tags.coreElements.link,
      attr: Constants.commonConstantsData.commonAttributes.attr,
      prop: Constants.commonConstantsData.commonAttributes.href,
      value: Constants.commonConstantsData.commonLinks.react,
      isMultiple: true,
    });
  });

  test('Checks both buttons contain same text', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.elementsText.nativeFederationReactApp.elementsTexts.buttonText,
      visibilityState: 'be.visible',
      isMultiple: true,
    });
  });

  test('Checks host button visibility', async () => {
    await basePage.checkElementVisibility({
      parentSelector: baseSelectors.tags.coreElements.div,
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.elementsText.nativeFederationReactApp.buttons.host,
    });
  });

  test('Checks remote button visibility', async () => {
    await basePage.checkElementVisibility({
      parentSelector: baseSelectors.tags.coreElements.div,
      selector: baseSelectors.tags.coreElements.button,
      text: Constants.elementsText.nativeFederationReactApp.buttons.remote,
    });
  });

  test('Checks that host button counter updates and resets after reload', async ({ page }) => {
    await verifyCounter({
      basePage,
      page,
      buttonSelector: selectors.nativeFederationReactApp.buttons.host,
      counterText: Constants.elementsText.nativeFederationReactApp.elementsTexts.buttonText,
      shouldReload: true,
    });
  });

  test('Checks that remote button counter updates and resets after reload', async ({ page }) => {
    await verifyCounter({
      basePage,
      page,
      buttonSelector: selectors.nativeFederationReactApp.buttons.remote,
      counterText: Constants.elementsText.nativeFederationReactApp.elementsTexts.buttonText,
      shouldReload: true,
    });
  });
});

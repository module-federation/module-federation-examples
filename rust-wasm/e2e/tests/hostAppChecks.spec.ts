import { expect, test, type Page } from '@playwright/test';

import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors, selectors } from '../../../cypress-e2e/common/selectors';
import { Constants } from '../../../cypress-e2e/fixtures/constants';

const ports = {
  host: 8080,
};

const buttonLabels = Constants.elementsText.rustWasmApp.buttonsNames;
const consoleMessages = Constants.commonPhrases.rustWasmApp.consoleMessages;

async function initConsoleSpy(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const originalLog = window.console.log.bind(window.console);
    (window as any).__e2eLogs = [];
    window.console.log = (...args: unknown[]) => {
      const store: string[] = (window as any).__e2eLogs;
      store.push(args.map(String).join(' '));
      originalLog(...args);
    };
  });
}

async function resetConsoleLogs(page: Page): Promise<void> {
  await page.evaluate(() => {
    (window as any).__e2eLogs = [];
  });
}

async function getConsoleLogCount(page: Page, message: string): Promise<number> {
  return await page.evaluate(target => {
    const logs: string[] = (window as any).__e2eLogs ?? [];
    return logs.filter(entry => entry.includes(target)).length;
  }, message);
}

async function waitForConsoleLog(page: Page, message: string, timeout: number = 5_000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if ((await getConsoleLogCount(page, message)) > 0) {
      return;
    }

    await page.waitForTimeout(100);
  }

  throw new Error(`Console message \"${message}\" not emitted within ${timeout}ms.`);
}

test.describe('Rust Wasm - Host app checks', () => {
  let basePage: BaseMethods;

  test.beforeEach(async ({ page }) => {
    await initConsoleSpy(page);
    basePage = new BaseMethods(page);
    await basePage.openLocalhost({ number: ports.host });
  });

  test('Checks basic console message', async ({ page }) => {
    await waitForConsoleLog(page, consoleMessages.baseLoadingMessage);
  });

  test('Checks app header visibility', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.headers.h1,
      text: Constants.commonPhrases.rustWasmApp.commonHostAppName,
      visibilityState: 'be.visible',
    });
  });

  test('Checks there are three buttons on page', async () => {
    await basePage.checkElementQuantity({
      selector: baseSelectors.tags.coreElements.button,
      quantity: 3,
    });
  });

  test('Checks all buttons are not disabled', async () => {
    await basePage.checkElementState({
      selector: baseSelectors.tags.coreElements.button,
      state: ':disabled',
      isMultiple: true,
      jqueryValue: false,
    });
  });

  test('Checks all button names visibility', async () => {
    for (const name of buttonLabels) {
      if (name === buttonLabels[3]) {
        continue;
      }

      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.coreElements.button,
        text: name,
        visibilityState: 'be.visible',
      });
    }
  });

  test('Checks all buttons share same color', async () => {
    await basePage.checkElementHaveProperty({
      selector: baseSelectors.tags.coreElements.button,
      prop: 'background-color',
      value: Constants.color.lightGrey,
      isMultiple: true,
    });
  });

  test('Checks that Play button name changes to Stop after click', async () => {
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: buttonLabels[0],
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: buttonLabels[3],
      isVisible: false,
    });

    await basePage.clickElementWithText({
      selector: baseSelectors.tags.coreElements.button,
      text: buttonLabels[0],
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: buttonLabels[0],
      isVisible: false,
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: buttonLabels[3],
      visibilityState: 'be.visible',
    });
  });

  test('Checks that Play button name returns after reload', async () => {
    await basePage.clickElementWithText({
      selector: baseSelectors.tags.coreElements.button,
      text: buttonLabels[0],
    });

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: buttonLabels[3],
      visibilityState: 'be.visible',
    });

    await basePage.reloadWindow();

    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: buttonLabels[0],
      visibilityState: 'be.visible',
    });
    await basePage.checkElementWithTextPresence({
      selector: baseSelectors.tags.coreElements.button,
      text: buttonLabels[3],
      isVisible: false,
    });
  });

  test('Checks infinite looping started after game board appears', async ({ page }) => {
    await resetConsoleLogs(page);

    await basePage.clickElementWithText({
      selector: baseSelectors.tags.coreElements.button,
      text: buttonLabels[0],
    });
    await basePage.checkElementVisibility({ selector: selectors.rustWasmApp.gameBoard });

    await waitForConsoleLog(page, consoleMessages.startLoopMessage);
  });

  test('Checks looping stopped after reload', async ({ page }) => {
    await resetConsoleLogs(page);

    await basePage.clickElementWithText({
      selector: baseSelectors.tags.coreElements.button,
      text: buttonLabels[0],
    });
    await basePage.checkElementVisibility({ selector: selectors.rustWasmApp.gameBoard });

    await waitForConsoleLog(page, consoleMessages.startLoopMessage);

    await basePage.reloadWindow();
    await basePage.checkElementVisibility({
      selector: selectors.rustWasmApp.gameBoard,
      isVisible: false,
      notVisibleState: 'not.be.visible',
    });

    await resetConsoleLogs(page);
    await page.waitForTimeout(300);
    expect(await getConsoleLogCount(page, consoleMessages.startLoopMessage)).toBe(0);
  });

  test('Checks looping can be stopped by Stop button', async ({ page }) => {
    await basePage.clickElementWithText({
      selector: baseSelectors.tags.coreElements.button,
      text: buttonLabels[0],
    });
    await basePage.checkElementVisibility({ selector: selectors.rustWasmApp.gameBoard });

    await resetConsoleLogs(page);
    expect(await getConsoleLogCount(page, consoleMessages.stopLoopMessage)).toBe(0);

    await basePage.clickElementWithText({
      selector: baseSelectors.tags.coreElements.button,
      text: buttonLabels[3],
    });

    await waitForConsoleLog(page, consoleMessages.stopLoopMessage);
  });
});

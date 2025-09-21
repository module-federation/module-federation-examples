import { expect, test, type Page } from '@playwright/test';

import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors, selectors } from '../../../cypress-e2e/common/selectors';
import { Constants } from '../../../cypress-e2e/fixtures/constants';

const ports = {
  host: 8080,
};

const buttonLabels = Constants.elementsText.rustWasmApp.buttonsNames;
const consoleMessages = Constants.commonPhrases.rustWasmApp.consoleMessages;
const stopButton = buttonLabels[3];

interface ButtonTestData {
  buttonName: string;
  consoleMessage: string;
  index?: number;
}

const buttonsUnderTest: ButtonTestData[] = [
  {
    buttonName: buttonLabels[0],
    consoleMessage: consoleMessages.startLoopMessage,
  },
  {
    buttonName: buttonLabels[1],
    consoleMessage: consoleMessages.tickLoopMessage,
    index: 1,
  },
  {
    buttonName: buttonLabels[2],
    consoleMessage: consoleMessages.resetLoopMessage,
    index: 2,
  },
];

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

test.describe('Rust Wasm - Buttons behaviour', () => {
  let basePage: BaseMethods;

  test.beforeEach(async ({ page }) => {
    await initConsoleSpy(page);
    basePage = new BaseMethods(page);
    await basePage.openLocalhost({ number: ports.host });
  });

  buttonsUnderTest.forEach(({ buttonName, consoleMessage }) => {
    test(`Checks that game board appears after clicking ${buttonName}`, async ({ page }) => {
      await resetConsoleLogs(page);

      await basePage.checkElementVisibility({
        selector: selectors.rustWasmApp.gameBoard,
        isVisible: false,
        notVisibleState: 'not.be.visible',
      });
      // Allow a stray log due to async timers
      expect(await getConsoleLogCount(page, consoleMessage)).toBeLessThanOrEqual(1);

      await basePage.clickElementWithText({
        selector: baseSelectors.tags.coreElements.button,
        text: buttonName,
      });

      await basePage.checkElementVisibility({ selector: selectors.rustWasmApp.gameBoard });
      await waitForConsoleLog(page, consoleMessage);
    });

    test(`Checks that game board triggered by ${buttonName} disappears after reload`, async ({ page }) => {
      await basePage.checkElementVisibility({
        selector: selectors.rustWasmApp.gameBoard,
        isVisible: false,
        notVisibleState: 'not.be.visible',
      });

      await basePage.clickElementWithText({
        selector: baseSelectors.tags.coreElements.button,
        text: buttonName,
      });
      await basePage.checkElementVisibility({ selector: selectors.rustWasmApp.gameBoard });

      await basePage.reloadWindow();
      await basePage.checkElementVisibility({
        selector: selectors.rustWasmApp.gameBoard,
        isVisible: false,
        notVisibleState: 'not.be.visible',
      });
    });

    test(`Checks ${buttonName} button functions when game already started`, async ({ page }) => {
      test.skip(buttonName === buttonLabels[0], 'Play button covered by other tests.');

      await basePage.clickElementWithText({
        selector: baseSelectors.tags.coreElements.button,
        text: buttonLabels[0],
      });
      await basePage.checkElementVisibility({ selector: selectors.rustWasmApp.gameBoard });

      await resetConsoleLogs(page);
      // Allow a straggler log from the prior start
      expect(await getConsoleLogCount(page, consoleMessage)).toBeLessThanOrEqual(1);

      await basePage.clickElementWithText({
        selector: baseSelectors.tags.coreElements.button,
        text: buttonName,
      });

      await waitForConsoleLog(page, consoleMessage);
    });

    test(`Checks ${buttonName} button functions after stopping the game`, async ({ page }) => {
      await basePage.clickElementWithText({
        selector: baseSelectors.tags.coreElements.button,
        text: buttonLabels[0],
      });
      await basePage.checkElementVisibility({ selector: selectors.rustWasmApp.gameBoard });

      await resetConsoleLogs(page);
      expect(await getConsoleLogCount(page, consoleMessage)).toBeLessThanOrEqual(1);

      await basePage.clickElementWithText({
        selector: baseSelectors.tags.coreElements.button,
        text: stopButton,
      });
      await waitForConsoleLog(page, consoleMessages.stopLoopMessage);

      const logsAfterStop = await getConsoleLogCount(page, consoleMessage);
      if (buttonName === buttonLabels[0]) {
        expect(logsAfterStop).toBeGreaterThan(0);
      } else {
        // Occasionally a last log sneaks in right after stop; allow small tolerance.
        expect(logsAfterStop).toBeLessThanOrEqual(1);
      }

      await resetConsoleLogs(page);

      await basePage.clickElementWithText({
        selector: baseSelectors.tags.coreElements.button,
        text: buttonName,
      });
      await basePage.checkElementVisibility({ selector: selectors.rustWasmApp.gameBoard });
      await waitForConsoleLog(page, consoleMessage);
    });
  });

  buttonsUnderTest
    .filter(({ buttonName }) => buttonName !== buttonLabels[0])
    .forEach(({ buttonName, index = 0 }) => {
      const alternateIndex = index === 1 ? 2 : 1;
      const alternateMessage = alternateIndex === 2 ? consoleMessages.resetLoopMessage : consoleMessages.tickLoopMessage;
      const alternateButton = buttonLabels[alternateIndex];

      test(`Checks game board triggered by ${buttonName} can be updated by ${alternateButton}`, async ({ page }) => {
        await basePage.checkElementVisibility({
          selector: selectors.rustWasmApp.gameBoard,
          isVisible: false,
          notVisibleState: 'not.be.visible',
        });

        await basePage.clickElementWithText({
          selector: baseSelectors.tags.coreElements.button,
          text: buttonName,
        });
        await basePage.checkElementVisibility({ selector: selectors.rustWasmApp.gameBoard });

        await resetConsoleLogs(page);
        expect(await getConsoleLogCount(page, alternateMessage)).toBeLessThanOrEqual(1);

        await basePage.clickElementWithText({
          selector: baseSelectors.tags.coreElements.button,
          text: alternateButton,
        });

        await waitForConsoleLog(page, alternateMessage);
      });

      test(`Checks game triggered by ${buttonName} can be started and stopped by ${buttonLabels[0]}`, async ({ page }) => {
        await basePage.checkElementVisibility({
          selector: selectors.rustWasmApp.gameBoard,
          isVisible: false,
          notVisibleState: 'not.be.visible',
        });

        await basePage.clickElementWithText({
          selector: baseSelectors.tags.coreElements.button,
          text: buttonName,
        });
        await basePage.checkElementVisibility({ selector: selectors.rustWasmApp.gameBoard });

        await resetConsoleLogs(page);
        expect(await getConsoleLogCount(page, consoleMessages.startLoopMessage)).toBeLessThanOrEqual(1);
        expect(await getConsoleLogCount(page, consoleMessages.stopLoopMessage)).toBeLessThanOrEqual(1);

        await basePage.clickElementWithText({
          selector: baseSelectors.tags.coreElements.button,
          text: buttonLabels[0],
        });
        await waitForConsoleLog(page, consoleMessages.startLoopMessage);

        await basePage.clickElementWithText({
          selector: baseSelectors.tags.coreElements.button,
          text: stopButton,
        });
        await waitForConsoleLog(page, consoleMessages.stopLoopMessage);
      });
    });
});

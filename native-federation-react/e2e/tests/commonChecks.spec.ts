import { test } from '@playwright/test';
import type { Page } from '@playwright/test';

import { BaseMethods } from '../../../playwright-e2e/common/base';
import { baseSelectors } from '../../../playwright-e2e/common/selectors';
import { Constants } from '../../../playwright-e2e/fixtures/constants';

interface AppData {
  host: number;
  header: string;
}

const appsData: AppData[] = [
  {
    host: 3000,
    header: Constants.commonConstantsData.basicComponents.host,
  },
  {
    host: 3001,
    header: Constants.commonConstantsData.basicComponents.remote,
  },
];

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

test.describe('Native Federation React - Shared checks', () => {
  appsData.forEach(app => {
    test(`Checks ${app.header} page header visibility`, async ({ page }) => {
      const basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: app.host });
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.headers.h1,
        text: app.header,
        visibilityState: 'be.visible',
      });
    });

    test(`Checks console message visibility in ${app.header} component`, async ({ page }) => {
      const basePage = new BaseMethods(page);
      await basePage.openLocalhost({ number: app.host });
      await basePage.checkElementWithTextPresence({
        selector: baseSelectors.tags.paragraph,
        text: Constants.elementsText.nativeFederationReactApp.messages.pageMessages
          .checkConsoleMessage,
        visibilityState: 'be.visible',
      });
    });

    test(`Checks ${app.header} console date message`, async ({ page }) => {
      const basePage = new BaseMethods(page);
      await expectConsoleMessage(
        page,
        Constants.elementsText.nativeFederationReactApp.messages.consoleMessages.dateMessage,
        () => basePage.openLocalhost({ number: app.host }),
      );
      await basePage.reloadWindow();
    });

    test(`Checks ${app.header} console weekend message`, async ({ page }) => {
      const basePage = new BaseMethods(page);
      await expectConsoleMessage(
        page,
        Constants.elementsText.nativeFederationReactApp.messages.consoleMessages.weekendMessage,
        () => basePage.openLocalhost({ number: app.host }),
      );
      await basePage.reloadWindow();
    });
  });
});

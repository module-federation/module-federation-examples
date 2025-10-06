import { test, expect } from '@playwright/test';
import { baseSelectors } from '../../../cypress-e2e/common/selectors';
import { Constants } from '../../../cypress-e2e/fixtures/constants';

const appsData = [
  {
    appName: Constants.elementsText.reactHostRemoteApp.containers.header,
    appDiv: Constants.elementsText.reactHostRemoteApp.containers.div,
    host: 8080,
  },
  {
    appName: Constants.elementsText.reactHostRemoteApp.hostedDiv,
    appDiv: Constants.elementsText.reactHostRemoteApp.containers.div,
    appButtonInvoices: Constants.elementsText.reactHostRemoteApp.buttons.invoices,
    appButtonExpenses: Constants.elementsText.reactHostRemoteApp.buttons.expenses,
    appButtonInvoicesH2: Constants.elementsText.reactHostRemoteApp.buttons.invoices,
    appButtonExpensesH2: Constants.elementsText.reactHostRemoteApp.buttons.expenses,
    host: 8081,
  },
] as const;

test.describe('React Host Remote', () => {
  for (const property of appsData) {
    test(`renders expected UI on localhost:${property.host}`, async ({ page }) => {
      const url = `http://localhost:${property.host}/`;
      await page.goto(url);

      const headerDiv = page
        .locator(baseSelectors.tags.coreElements.div)
        .filter({ hasText: property.appName });
      await expect(headerDiv).toBeVisible();

      const containerDiv = page
        .locator(baseSelectors.tags.coreElements.div)
        .filter({ hasText: property.appDiv });
      await expect(containerDiv).toBeVisible();

      if (property.host === 8081) {
        if (property.appButtonInvoices) {
          const invoicesLink = page
            .locator(baseSelectors.tags.coreElements.link)
            .filter({ hasText: property.appButtonInvoices });
          await expect(invoicesLink).toBeVisible();
          await invoicesLink.click();
        }

        if (property.appButtonInvoicesH2) {
          const invoicesHeader = page
            .locator(baseSelectors.tags.headers.h2)
            .filter({ hasText: property.appButtonInvoicesH2 });
          await expect(invoicesHeader).toBeVisible();
        }

        await page.goBack();

        if (property.appButtonExpenses) {
          const expensesLink = page
            .locator(baseSelectors.tags.coreElements.link)
            .filter({ hasText: property.appButtonExpenses });
          await expect(expensesLink).toBeVisible();
          await expensesLink.click();
        }

        if (property.appButtonExpensesH2) {
          const expensesHeader = page
            .locator(baseSelectors.tags.headers.h2)
            .filter({ hasText: property.appButtonExpensesH2 });
          await expect(expensesHeader).toBeVisible();
        }
      }
    });
  }
});

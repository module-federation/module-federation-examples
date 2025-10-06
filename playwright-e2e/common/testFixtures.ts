import { test as base } from '@playwright/test';
import { BasePage } from './basePage';

export const test = base.extend<{ basePage: BasePage }>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
});

export { expect } from '@playwright/test';

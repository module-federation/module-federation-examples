import { BasePage } from './basePage';
import { expect, test as base } from './playwright';

export const test = base.extend<{ basePage: BasePage }>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
});

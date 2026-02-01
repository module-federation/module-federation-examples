import { test as base, expect, Page } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  async openLocalhost(port: number) {
    await this.page.goto(`http://localhost:${port}`);
    await this.page.waitForLoadState('networkidle');
    
    // Wait for module federation to load (give it extra time for federated components)
    await this.page.waitForTimeout(2000);
    
    // Wait for React to render
    await this.page.waitForFunction(() => {
      const elements = document.querySelectorAll('.title, .name, button');
      return elements.length > 0;
    }, { timeout: 180000 });
  }

  async checkElementWithTextPresence(selector: string, text: string) {
    const element = this.page.locator(selector).filter({ hasText: text });
    await expect(element).toBeVisible();
  }

  async clickElementWithText(selector: string, text: string) {
    const element = this.page.locator(selector).filter({ hasText: text });
    await element.click();
  }
}

export const test = base.extend<{ basePage: BasePage }>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
});

export { expect } from '@playwright/test';

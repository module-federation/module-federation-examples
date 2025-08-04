import { test as base, expect, Page } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  async openLocalhost(port: number) {
    await this.page.goto(`http://localhost:${port}`);
    await this.page.waitForLoadState('networkidle');
  }

  async checkElementWithTextPresence(selector: string, text: string, timeout: number = 10000) {
    await this.page.locator(selector).filter({ hasText: text }).waitFor({ timeout });
  }

  async checkElementVisibility(selector: string, timeout: number = 10000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  async checkElementHidden(selector: string, text: string, timeout: number = 10000) {
    await this.page.locator(selector).filter({ hasText: text }).waitFor({ state: 'hidden', timeout });
  }

  async clickElementWithText(selector: string, text: string) {
    await this.page.locator(selector).filter({ hasText: text }).click();
  }

  async waitForDynamicImport(timeout: number = 5000) {
    // Wait for any dynamic imports to complete
    await this.page.waitForTimeout(1000);
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  async checkDateFormat() {
    // Check for moment.js formatted date (MMMM Do YYYY, h:mm format)
    const dateElement = this.page.locator('text=/[A-Z][a-z]+ \\d{1,2}[a-z]{2} \\d{4}, \\d{1,2}:\\d{2}/');
    await dateElement.waitFor({ timeout: 5000 });
  }

  async waitForLoadingToDisappear(loadingText: string, timeout: number = 10000) {
    // Wait for loading text to appear first
    await this.page.locator(`text=${loadingText}`).waitFor({ timeout: 5000 });
    // Then wait for it to disappear
    await this.page.locator(`text=${loadingText}`).waitFor({ state: 'hidden', timeout });
  }
}

export const test = base.extend<{ basePage: BasePage }>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
});

export { expect };
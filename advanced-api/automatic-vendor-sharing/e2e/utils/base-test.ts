import { Page } from '@playwright/test';

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

  async checkElementBackgroundColor(selector: string, expectedColor: string) {
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible' });
    const backgroundColor = await element.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    if (backgroundColor !== expectedColor) {
      throw new Error(`Expected background color ${expectedColor}, but got ${backgroundColor}`);
    }
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
    // Check for moment.js formatted date
    const dateElement = this.page.locator('text=/\\d{1,2}\\/\\d{1,2}\\/\\d{4}/');
    await dateElement.waitFor({ timeout: 5000 });
  }
}


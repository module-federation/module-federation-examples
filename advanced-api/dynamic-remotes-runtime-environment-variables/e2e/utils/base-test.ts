import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  async openLocalhost(port: number) {
    await this.page.goto(`http://localhost:${port}`, { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('#root', { state: 'attached', timeout: 15000 });
  }

  async checkElementWithTextPresence(selector: string, text: string, timeout: number = 10000) {
    await expect(this.page.locator(selector).filter({ hasText: text }).first()).toBeVisible({ timeout });
  }

  async checkElementVisibility(selector: string, timeout: number = 10000) {
    await expect(this.page.locator(selector).first()).toBeVisible({ timeout });
  }

  async checkElementHidden(selector: string, text: string, timeout: number = 10000) {
    await expect(
      this.page.locator(selector).filter({ hasText: text }).first(),
    ).toBeHidden({ timeout });
  }

  async clickElementWithText(selector: string, text: string) {
    await this.page.locator(selector).filter({ hasText: text }).first().click();
  }

  async waitForDynamicImport(timeout: number = 5000) {
    // Wait for any dynamic imports to complete
    await this.page.waitForTimeout(1000);
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  async checkDateFormat() {
    // Check for moment.js formatted date (MMMM Do YYYY, h:mm format)
    const dateElement = this.page.locator(
      'text=/[A-Z][a-z]+ \\d{1,2}(st|nd|rd|th) \\d{4}, \\d{1,2}:\\d{2}:\\d{2} [ap]m/i',
    );
    await expect(dateElement.first()).toBeVisible({ timeout: 5000 });
  }

  async waitForLoadingToDisappear(loadingText: string, timeout: number = 10000) {
    // Wait for loading text to appear first
    const locator = this.page.locator(`text=${loadingText}`).first();
    await locator.waitFor({ state: 'attached', timeout: 5000 }).catch(() => undefined);
    await locator.waitFor({ state: 'hidden', timeout }).catch(() => undefined);
  }

  async waitForTextToDisappear(selector: string, text: string, timeout: number = 10000) {
    const locator = this.page.locator(selector).filter({ hasText: text }).first();

    try {
      await locator.waitFor({ state: 'attached', timeout: 2000 });
    } catch (error) {
      // Element never appeared; nothing to wait for.
      return;
    }

    await locator.waitFor({ state: 'hidden', timeout }).catch(() => undefined);
  }
}


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
      const elements = document.querySelectorAll('h1, h2, button, p');
      return elements.length > 0;
    }, { timeout: 30000 });
  }

  async checkElementWithTextPresence(selector: string, text: string, shouldBeVisible = true) {
    const element = this.page.locator(selector).filter({ hasText: text });
    if (shouldBeVisible) {
      await expect(element).toBeVisible();
    } else {
      await expect(element).not.toBeVisible();
    }
  }

  async checkElementVisibility(selector: string, shouldBeVisible = true) {
    const element = this.page.locator(selector);
    if (shouldBeVisible) {
      await expect(element).toBeVisible();
    } else {
      await expect(element).not.toBeVisible();
    }
  }

  async clickElementWithText(selector: string, text: string) {
    const element = this.page.locator(selector).filter({ hasText: text });
    
    // Dismiss any overlays that might be blocking clicks
    try {
      await this.page.locator('#webpack-dev-server-client-overlay').waitFor({ timeout: 1000 });
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    } catch {
      // No overlay present, continue
    }
    
    await element.click({ force: true });
    
    // Wait for any dynamic loading to complete
    await this.page.waitForTimeout(2000);
  }

  async checkElementBackgroundColor(selector: string, expectedColor: string) {
    const element = this.page.locator(selector);
    await expect(element).toHaveCSS('background-color', expectedColor);
  }

  async waitForDynamicImport() {
    // Wait for dynamic import to complete - looking for loading states to disappear
    await this.page.waitForTimeout(3000); // Give time for dynamic loading
    
    // Wait for any network activity to settle
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      // Ignore timeout - loading might already be complete
    });
  }

  async checkDateFormat() {
    // Check for moment.js formatted date (format: "Month Day Year, time")
    const dateRegex = /\w+ \d+\w+ \d{4}, \d+:\d+/;
    const textContent = await this.page.textContent('body');
    expect(textContent).toMatch(dateRegex);
  }
}

export const test = base.extend<{ basePage: BasePage }>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
});

export { expect } from '@playwright/test';
import { test as base, Page } from '@playwright/test';

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
    // Check for moment.js formatted date (MMMM Do YYYY, h:mm format)
    const dateElement = this.page.locator('text=/[A-Z][a-z]+ \\d{1,2}[a-z]{2} \\d{4}, \\d{1,2}:\\d{2}/');
    await dateElement.waitFor({ timeout: 5000 });
  }

  getDateWithFormat(): string {
    // Get current date in moment.js format: "MMMM Do YYYY, h:mm"
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    
    const day = now.getDate();
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                   day === 2 || day === 22 ? 'nd' :
                   day === 3 || day === 23 ? 'rd' : 'th';
    
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hour = now.getHours() % 12 || 12;
    const minute = now.getMinutes().toString().padStart(2, '0');
    
    return `${month} ${day}${suffix} ${year}, ${hour}:${minute}`;
  }
}

export const test = base.extend<{ basePage: BasePage }>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
});
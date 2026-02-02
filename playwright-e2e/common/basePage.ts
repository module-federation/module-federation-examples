import type { Locator, Page } from '@playwright/test';
import { expect } from './playwright';

export interface OpenLocalhostOptions {
  port: number;
  path?: string;
  waitUntilSelector?: string;
}

export interface ExpectElementWithTextOptions {
  selector: string;
  text: string;
  exact?: boolean;
  visible?: boolean;
  nth?: number;
  timeout?: number;
}

export class BasePage {
  constructor(protected readonly page: Page) {}

  async openLocalhost({ port, path, waitUntilSelector }: OpenLocalhostOptions): Promise<void> {
    const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
    const url = `http://localhost:${port}${normalizedPath}`;

    await this.page.goto(url, { waitUntil: 'networkidle' });

    if (waitUntilSelector) {
      await this.page.waitForSelector(waitUntilSelector, { state: 'visible' });
    }
  }

  protected getLocator(selector: string, nth?: number): Locator {
    return typeof nth === 'number'
      ? this.page.locator(selector).nth(nth)
      : this.page.locator(selector);
  }

  async expectElementWithTextPresence({
    selector,
    text,
    exact = true,
    visible = true,
    nth,
    timeout,
  }: ExpectElementWithTextOptions): Promise<void> {
    const locator = this.getLocator(selector, nth);

    if (!visible) {
      const filtered = locator.filter({ hasText: text });
      await expect(filtered).toHaveCount(0, { timeout });

      return;
    }

    if (exact) {
      await expect(locator).toHaveText(text, { timeout });

      return;
    }

    await expect(locator).toContainText(text, { timeout });
  }
}

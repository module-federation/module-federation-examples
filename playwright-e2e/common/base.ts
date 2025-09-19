import { expect, Locator, Page } from '@playwright/test';
import type { ElementHandle } from 'playwright';

interface VisibilityOptions {
  selector: string;
  isVisible?: boolean;
  text?: string;
  parentSelector?: string;
}

interface TextPresenceOptions {
  selector: string;
  text: string;
  isVisible?: boolean;
  visibilityState?: 'be.visible' | 'exist';
  notVisibleState?: 'not.exist' | 'not.be.visible';
  parentSelector?: string;
  isMultiple?: boolean;
  index?: number;
}

interface ClickWithTextOptions {
  selector: string;
  text: string;
  parentSelector?: string;
  isTargetChanged?: boolean;
  index?: number;
}

interface ElementContainTextOptions {
  selector: string;
  text: string | number;
  isContain?: boolean;
  index?: number;
  parentSelector?: string;
}

interface ElementQuantityOptions {
  selector: string;
  quantity: number;
  parentSelector?: string;
  text?: string;
  jqueryValue?: boolean;
}

interface ElementStateOptions {
  selector: string;
  state?: string;
  parentSelector?: string;
  text?: string;
  isMultiple?: boolean;
  jqueryValue?: boolean;
}

interface ElementPropertyOptions {
  selector: string;
  prop: string;
  value: string;
  attr?: 'css' | 'attribute';
  parentSelector?: string;
  text?: string;
  index?: number;
  isMultiple?: boolean;
  isInclude?: boolean;
}

export class BaseMethods {
  constructor(protected readonly page: Page) {}

  private resolveLocator(selector: string, options: { parentSelector?: string; text?: string; index?: number } = {}): Locator {
    const { parentSelector, text, index } = options;
    let locator = parentSelector ? this.page.locator(parentSelector).locator(selector) : this.page.locator(selector);

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (typeof index === 'number') {
      locator = locator.nth(index);
    }

    return locator;
  }

  async openLocalhost({ number, path }: { number: number; path?: string }): Promise<void> {
    const normalizedPath = path ? path.replace(/^\//, '') : '';
    const url = `http://localhost:${number}${normalizedPath ? `/${normalizedPath}` : ''}`;
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async reloadWindow(_withoutCache: boolean = false): Promise<void> {
    await this.page.reload({ waitUntil: 'networkidle' });
  }

  async checkElementVisibility({ selector, isVisible = true, text, parentSelector }: VisibilityOptions): Promise<void> {
    const locator = this.resolveLocator(selector, { parentSelector, text });

    if (isVisible) {
      await expect(locator.first()).toBeVisible();
      const count = await locator.count();
      for (let index = 0; index < count; index++) {
        await expect(locator.nth(index)).toBeVisible();
      }

      return;
    }

    try {
      await expect(locator).toHaveCount(0);
      return;
    } catch (error) {
      const count = await locator.count();
      for (let index = 0; index < count; index++) {
        await expect(locator.nth(index)).not.toBeVisible();
      }
    }
  }

  async checkElementWithTextPresence({
    selector,
    text,
    isVisible = true,
    visibilityState = 'exist',
    notVisibleState = 'not.exist',
    parentSelector,
    isMultiple = false,
    index,
  }: TextPresenceOptions): Promise<void> {
    if (isMultiple) {
      const baseLocator = this.resolveLocator(selector, { parentSelector });
      const filtered = baseLocator.filter({ hasText: text });

      if (!isVisible) {
        if (notVisibleState === 'not.exist') {
          await expect(filtered).toHaveCount(0);
          return;
        }

        const count = await filtered.count();

        if (count === 0) {
          await expect(filtered).toHaveCount(0);
          return;
        }

        for (let i = 0; i < count; i++) {
          await expect(filtered.nth(i)).not.toBeVisible();
        }

        return;
      }

      if (visibilityState === 'be.visible') {
        await expect(filtered.first()).toBeVisible();
        const count = await filtered.count();
        for (let i = 0; i < count; i++) {
          await expect(filtered.nth(i)).toBeVisible();
        }

        return;
      }

      await expect(filtered).not.toHaveCount(0);

      return;
    }

    const locator = this.resolveLocator(selector, { parentSelector, text, index });

    if (!isVisible) {
      if (notVisibleState === 'not.exist') {
        await expect(locator).toHaveCount(0);
        return;
      }

      const count = await locator.count();

      if (count === 0) {
        await expect(locator).toHaveCount(0);
        return;
      }

      for (let i = 0; i < count; i++) {
        await expect(locator.nth(i)).not.toBeVisible();
      }

      return;
    }

    if (visibilityState === 'be.visible') {
      await expect(locator.first()).toBeVisible();
      const count = await locator.count();
      for (let i = 0; i < count; i++) {
        await expect(locator.nth(i)).toBeVisible();
      }

      return;
    }

    await expect(locator).not.toHaveCount(0);
  }

  async clickElementWithText({ selector, text, parentSelector, isTargetChanged = false, index }: ClickWithTextOptions): Promise<void> {
    const locator = this.resolveLocator(selector, { parentSelector, text, index });
    const element = locator.first();

    if (isTargetChanged) {
      await element.evaluate(node => node.setAttribute('target', '_self'));
    }

    await element.click();
  }

  async checkElementContainText({ selector, text, isContain = true, index, parentSelector }: ElementContainTextOptions): Promise<void> {
    const locator = this.resolveLocator(selector, { parentSelector, index });
    const value = String(text);

    if (isContain) {
      await expect(locator).toContainText(value);

      return;
    }

    await expect(locator).not.toContainText(value);
  }

  async fillField({ selector, text, parentSelector }: { selector: string; text: string; parentSelector?: string }): Promise<void> {
    const locator = this.resolveLocator(selector, { parentSelector });
    await locator.fill('');
    await locator.fill(text);
  }

  async checkInputValue(value: string, parentElement?: string, isLengthChecked: boolean = false): Promise<void> {
    const locator = parentElement
      ? this.resolveLocator('input, textarea', { parentSelector: parentElement })
      : this.page.locator('input');

    const currentValue = await locator.inputValue();

    if (isLengthChecked) {
      expect(currentValue.length).toBe(value.length);

      return;
    }

    expect(currentValue).toBe(value);
  }

  async checkElementQuantity({ selector, quantity, parentSelector, text, jqueryValue = false }: ElementQuantityOptions): Promise<void> {
    let locator = this.resolveLocator(selector, { parentSelector });

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (jqueryValue) {
      const count = await locator.count();
      expect(count).toBe(quantity);

      return;
    }

    await expect(locator).toHaveCount(quantity);
  }

  async checkElementState({ selector, state = 'be.disabled', parentSelector, text, isMultiple = false, jqueryValue }: ElementStateOptions): Promise<void> {
    let locator = this.resolveLocator(selector, { parentSelector, text });

    if (isMultiple && state === ':disabled') {
      const handles = await locator.elementHandles();
      for (const handle of handles) {
        const isDisabled = await handle.evaluate(element => (element as HTMLInputElement).disabled);
        expect(isDisabled).toBe(Boolean(jqueryValue));
      }

      return;
    }

    if (state === 'be.disabled' || state === ':disabled') {
      await expect(locator).toBeDisabled();

      return;
    }

    if (state === 'not.be.disabled') {
      await expect(locator).toBeEnabled();

      return;
    }

    await expect(locator).toHaveClass(state);
  }

  async checkElementHaveProperty({
    selector,
    prop,
    value,
    attr = 'css',
    parentSelector,
    text,
    index,
    isMultiple = false,
    isInclude = true,
  }: ElementPropertyOptions): Promise<void> {
    let locator = this.resolveLocator(selector, { parentSelector, text, index });

    if (isMultiple) {
      const handles = await locator.elementHandles();
      for (const handle of handles) {
        const actual = await this.getProperty(handle, prop, attr);
        if (isInclude) {
          expect(actual).toContain(value);
        } else {
          expect(actual).not.toContain(value);
        }
      }

      return;
    }

    const actual = await this.getProperty(await locator.elementHandle(), prop, attr);

    if (isInclude) {
      expect(actual).toContain(value);
    } else {
      expect(actual).not.toContain(value);
    }
  }

  async checkUrlText(urlPart: string, isInclude: boolean = false): Promise<void> {
    const poller = expect.poll(() => this.page.url());

    if (isInclude) {
      await poller.toContain(urlPart);

      return;
    }

    await poller.not.toContain(urlPart);
  }

  async compareInfoBetweenHosts(
    selector: string,
    extraHost: number,
    isEqual: boolean = true,
    index: number = 0,
    clickSelector?: string,
    wait: number = 0,
  ): Promise<void> {
    const baseLocator = this.page.locator(selector).nth(index);
    const baseText = (await baseLocator.innerText()).trim();

    const remotePage = await this.page.context().newPage();

    try {
      await remotePage.goto(`http://localhost:${extraHost}/`, { waitUntil: 'networkidle' });

      if (clickSelector) {
        await remotePage.locator(clickSelector).click();
        if (wait > 0) {
          await remotePage.waitForTimeout(wait);
        }
      }

      const remoteText = (await remotePage.locator(selector).nth(index).innerText()).trim();

      if (isEqual) {
        expect(remoteText).toBe(baseText);
      } else {
        expect(remoteText).not.toBe(baseText);
      }
    } finally {
      await remotePage.close();
    }
  }

  private async getProperty(handle: ElementHandle<Node> | null, prop: string, attr: 'css' | 'attribute'): Promise<string> {
    if (!handle) {
      throw new Error('Element handle is not available for property check.');
    }

    if (attr === 'attribute') {
      const value = await handle.getAttribute(prop);
      return value ?? '';
    }

    return await handle.evaluate((element, property) => {
      const style = window.getComputedStyle(element as Element);
      return style.getPropertyValue(property as string);
    }, prop);
  }
}

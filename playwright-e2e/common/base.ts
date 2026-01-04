import { expect, Locator, Page, test } from '@playwright/test';
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
  wait?: number;
}

interface BrowserAlertOptions {
  selector: string;
  alertMessage?: string;
  isEqual?: boolean;
  index?: number;
  parentSelector?: string;
  wait?: number;
}

interface BrowserAlertForMultipleHostsOptions extends BrowserAlertOptions {
  host: number;
}

interface CompareHostsOptions {
  selector: string;
  extraHost: number;
  isEqual?: boolean;
  index?: number;
  clickSelector?: string;
  wait?: number;
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
    return this.resolveLocatorForPage(this.page, selector, options);
  }

  async checkInfoOnNonDefaultHost(opts: {
    host: number;
    element: string;
    existedText: string;
    notExistedText?: string;
  }): Promise<void> {
    const { host, element, existedText, notExistedText } = opts;
    const remote = await this.page.context().newPage();
    try {
      await remote.goto(`http://localhost:${host}/`, { waitUntil: 'domcontentloaded' });
      const locator = remote.locator(element);
      await expect(locator.filter({ hasText: existedText }).first()).toBeVisible();
      if (notExistedText) {
        await expect(locator.filter({ hasText: notExistedText })).toHaveCount(0);
      }
    } finally {
      await remote.close();
    }
  }

  private resolveLocatorForPage(
    page: Page,
    selector: string,
    options: { parentSelector?: string; text?: string; index?: number } = {},
  ): Locator {
    const { parentSelector, text, index } = options;
    let locator = parentSelector ? page.locator(parentSelector).locator(selector) : page.locator(selector);

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
    const deadline = Date.now() + 60_000;
    let lastError: unknown;

    while (Date.now() < deadline) {
      try {
        await this.page.goto(url, { waitUntil: 'networkidle' });
        return;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        if (!message.includes('ERR_CONNECTION_REFUSED') && !message.includes('ECONNREFUSED')) {
          throw error;
        }

        lastError = error;
        await this.page.waitForTimeout(1000);
      }
    }

    throw lastError ?? new Error(`Timed out waiting for ${url}`);
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

  async clickElementWithText({ selector, text, parentSelector, isTargetChanged = false, index, wait }: ClickWithTextOptions): Promise<void> {
    const locator = this.resolveLocator(selector, { parentSelector, text, index });
    const element = locator.first();

    if (isTargetChanged) {
      await element.evaluate(node => node.setAttribute('target', '_self'));
    }

    await element.click();

    if (wait && wait > 0) {
      await this.page.waitForTimeout(wait);
    }
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
    const locator = this.resolveLocator(selector, { parentSelector, text, index });
    const expectationMessage =
      attr === 'attribute'
        ? `Expected attribute "${prop}" on selector "${selector}" to ${isInclude ? '' : 'not '}include "${value}".`
        : `Expected CSS property "${prop}" on selector "${selector}" to ${isInclude ? '' : 'not '}include "${value}".`;

    const doesMatch = (actual: string): boolean => (isInclude ? actual.includes(value) : !actual.includes(value));

    await expect
      .poll(async () => {
        if (isMultiple) {
          const handles = await locator.elementHandles();
          if (handles.length === 0) {
            return false;
          }

          try {
            const results = await Promise.all(
              handles.map(async handle => {
                try {
                  return await this.getProperty(handle, prop, attr);
                } finally {
                  await handle.dispose();
                }
              }),
            );

            return results.every(doesMatch);
          } catch {
            return false;
          }
        }

        const handle = await locator.elementHandle({ timeout: 0 });
        if (!handle) {
          return false;
        }

        try {
          const actual = await this.getProperty(handle, prop, attr);
          return doesMatch(actual);
        } catch {
          return false;
        } finally {
          await handle.dispose();
        }
      }, { message: expectationMessage })
      .toBeTruthy();
  }

  async checkUrlText(urlPart: string, isInclude: boolean = false): Promise<void> {
    const poller = expect.poll(() => this.page.url());

    if (isInclude) {
      await poller.toContain(urlPart);

      return;
    }

    await poller.not.toContain(urlPart);
  }

  skipTestByCondition(condition: unknown, reason: string = 'Skipped by condition'): void {
    if (condition) {
      test.info().skip(reason);
    }
  }

  async checkBrowserAlertByText({
    selector,
    alertMessage,
    isEqual = true,
    index = 0,
    parentSelector,
    wait = 0,
  }: BrowserAlertOptions): Promise<void> {
    const locator = this.resolveLocator(selector, { parentSelector, index });

    if (wait > 0) {
      await this.page.waitForTimeout(wait);
    }

    const message = await this.captureDialogMessage(this.page, locator.first());

    if (alertMessage !== undefined) {
      if (isEqual) {
        expect(message).toBe(alertMessage);
      } else {
        expect(message).not.toBe(alertMessage);
      }
    }
  }

  async checkBrowserAlertForMultipleHosts({
    selector,
    alertMessage,
    isEqual = true,
    index = 0,
    parentSelector,
    host,
    wait = 0,
  }: BrowserAlertForMultipleHostsOptions): Promise<void> {
    const baseGroup = this.resolveLocator(selector, { parentSelector });
    const baseCount = await baseGroup.count();

    if (baseCount === 0) {
      throw new Error(`No elements found for selector "${selector}" on the base page.`);
    }

    const targetIndex = Math.min(index, baseCount - 1);

    if (wait > 0) {
      await this.page.waitForTimeout(wait);
    }

    const baseMessage = await this.captureDialogMessage(this.page, baseGroup.nth(targetIndex));

    if (alertMessage !== undefined) {
      if (isEqual) {
        expect(baseMessage).toBe(alertMessage);
      } else {
        expect(baseMessage).not.toBe(alertMessage);
      }
    }

    const remotePage = await this.page.context().newPage();

    try {
      await remotePage.goto(`http://localhost:${host}/`, { waitUntil: 'networkidle' });

      const remoteGroup = this.resolveLocatorForPage(remotePage, selector, { parentSelector });
      const remoteCount = await remoteGroup.count();

      if (remoteCount === 0) {
        throw new Error(`No elements found for selector "${selector}" on host ${host}.`);
      }

      const remoteIndex = Math.min(targetIndex, remoteCount - 1);
      const remoteMessage = await this.captureDialogMessage(remotePage, remoteGroup.nth(remoteIndex));

      if (wait > 0) {
        await remotePage.waitForTimeout(wait);
      }

      if (isEqual) {
        if (alertMessage !== undefined) {
          expect(remoteMessage).toBe(alertMessage);
        }

        expect(remoteMessage).toBe(baseMessage);
      } else {
        if (alertMessage !== undefined) {
          expect(remoteMessage).not.toBe(alertMessage);
        }

        expect(remoteMessage).not.toBe(baseMessage);
      }
    } finally {
      await remotePage.close();
    }
  }

  async compareInfoBetweenHosts(
    selectorOrOptions: string | CompareHostsOptions,
    extraHostArg?: number,
    isEqualArg: boolean = true,
    indexArg: number = 0,
    clickSelectorArg?: string,
    waitArg: number = 0,
  ): Promise<void> {
    let selector: string;
    let extraHost: number;
    let isEqual: boolean;
    let index: number;
    let clickSelector: string | undefined;
    let wait: number;

    if (typeof selectorOrOptions === 'string') {
      selector = selectorOrOptions;
      if (typeof extraHostArg !== 'number') {
        throw new Error('The "extraHost" parameter must be provided when using the positional signature.');
      }
      extraHost = extraHostArg;
      isEqual = isEqualArg;
      index = indexArg;
      clickSelector = clickSelectorArg;
      wait = waitArg;
    } else {
      ({ selector, extraHost, isEqual = true, index = 0, clickSelector, wait = 0 } = selectorOrOptions);
    }

    const baseGroup = this.page.locator(selector);
    const baseCount = await baseGroup.count();

    if (baseCount === 0) {
      throw new Error(`No elements found for selector "${selector}" on the base page.`);
    }

    const targetIndex = Math.min(index, baseCount - 1);

    if (wait > 0) {
      await this.page.waitForTimeout(wait);
    }

    const baseText = (await baseGroup.nth(targetIndex).innerText()).trim();

    const remotePage = await this.page.context().newPage();

    try {
      await remotePage.goto(`http://localhost:${extraHost}/`, { waitUntil: 'networkidle' });

      if (clickSelector) {
        const remoteClickGroup = remotePage.locator(clickSelector);
        const remoteClickCount = await remoteClickGroup.count();

        if (remoteClickCount === 0) {
          throw new Error(`No elements found for selector "${clickSelector}" on host ${extraHost}.`);
        }

        const clickIndex = Math.min(targetIndex, remoteClickCount - 1);

        try {
          await this.captureDialogMessage(remotePage, remoteClickGroup.nth(clickIndex));
        } catch (error) {
          const isTimeoutError = error instanceof Error && /Timeout/.test(error.message);
          if (isTimeoutError) {
            await remoteClickGroup.nth(clickIndex).click();
          } else {
            throw error;
          }
        }

        if (wait > 0) {
          await remotePage.waitForTimeout(wait);
        }
      }

      const remoteGroup = remotePage.locator(selector);
      const remoteCount = await remoteGroup.count();

      if (remoteCount === 0) {
        throw new Error(`No elements found for selector "${selector}" on host ${extraHost}.`);
      }

      const remoteIndex = Math.min(targetIndex, remoteCount - 1);
      const remoteText = (await remoteGroup.nth(remoteIndex).innerText()).trim();

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

  private async captureDialogMessage(page: Page, locator: Locator): Promise<string> {
    const [dialog] = await Promise.all([
      page.waitForEvent('dialog', { timeout: 5_000 }),
      locator.click(),
    ]);

    const message = dialog.message();
    await dialog.accept();

    return message;
  }

  async checkCounterFunctionality(options: {
    button: string;
    counterElement: string;
    counterText: string; // e.g. "Times button clicked: 0"
    isButtonTexted?: boolean; // unused in Playwright port, kept for parity
    isReloaded?: boolean;
    isValueCompared?: boolean;
  }): Promise<void> {
    const { button, counterElement, counterText, isReloaded = false, isValueCompared = false } = options;

    const btn = this.resolveLocator(button);
    await expect(btn.first()).toBeVisible();
    await btn.first().click();

    const counter = this.resolveLocator(counterElement).filter({ hasText: counterText.replace(/\d+$/, '') });
    await expect(counter.first()).toBeVisible();

    // Extract numeric value that follows the counterText prefix
    const text = (await counter.first().innerText()).trim();
    const match = text.match(/(\d+)/);
    const value = match ? Number(match[1]) : NaN;

    if (isValueCompared) {
      expect(value).toBeGreaterThanOrEqual(1);
    }

    if (isReloaded) {
      await this.reloadWindow();
      await this.checkElementWithTextPresence({ selector: counterElement, text: counterText, visibilityState: 'be.visible' });
    }
  }
}

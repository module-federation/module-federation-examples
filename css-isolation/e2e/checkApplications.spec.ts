import { test, expect } from '@playwright/test';

const apps = [
  {
    name: 'App 1',
    header: 'Host Application - React Version',
    url: 'http://localhost:3001',
  },
  {
    name: 'App 2',
    header: 'Remote Application - React Version',
    url: 'http://localhost:3002',
  },
];

test.describe('CSS isolation example', () => {
  for (const { name, header, url } of apps) {
    test(`${name} renders expected headings`, async ({ page }) => {
      await page.goto(url);

      const heading = page.getByRole('heading', { level: 1, name: new RegExp(header) });
      await expect(heading).toBeVisible();
      await expect(page.getByRole('heading', { level: 2, name })).toHaveText(name);
    });
  }

  test('host renders remote button inside shadow DOM', async ({ page }) => {
    await page.goto('http://localhost:3001');

    const buttonTextHandle = await page.waitForFunction(() => {
      const host = document.querySelector('#parent');

      return host?.shadowRoot?.querySelector('button')?.textContent?.trim() ?? null;
    });

    expect(await buttonTextHandle.jsonValue()).toBe('Make Everything Yellow');
  });

  test.describe('standalone remote', () => {
    test('button applies yellow styles after click', async ({ page }) => {
      await page.goto('http://localhost:3002');

      const button = page.getByRole('button', { name: 'Make Everything Yellow' });
      await expect(button).toBeVisible();

      await button.click();

      await expect(button).toHaveCSS('background-color', 'rgb(255, 255, 0)');
    });
  });
});

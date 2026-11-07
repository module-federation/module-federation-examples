import { expect, test, type Page } from '@playwright/test';

const message = 'Remote loader data from the provider';

async function readRenderedCard(page: Page, html: string) {
  return page.evaluate(responseHtml => {
    const document = new DOMParser().parseFromString(responseHtml, 'text/html');
    return {
      message: document.querySelector('[data-testid="remote-message"]')?.textContent ?? null,
      marker: document.querySelector('[data-testid="request-marker"]')?.textContent ?? null,
    };
  }, html);
}

for (const path of ['/entry-one', '/entry-one/details']) {
  test(`SSR markup and hydration at ${path}`, async ({ page }) => {
    const errors: string[] = [];
    const dataRequests: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', event => {
      if (event.type() === 'error') errors.push(event.text());
    });
    page.on('request', request => {
      if (request.url().includes('x-mf-data-fetch')) dataRequests.push(request.url());
    });

    const response = await page.goto(path);
    expect(response?.ok()).toBe(true);
    const rendered = await readRenderedCard(page, await response!.text());
    expect(rendered.message).toBe(message);
    const marker = rendered.marker;
    expect(marker).toMatch(/^[0-9a-f-]{36}$/);
    await expect(page.getByTestId('request-marker')).toHaveText(marker!);
    await page.getByRole('button', { name: 'Count: 0' }).click();
    await expect(page.getByRole('button', { name: 'Count: 1' })).toBeVisible();
    expect(await page.evaluate(() => Reflect.get(globalThis, '_mfSSRDowngrade'))).toBeUndefined();
    expect(dataRequests).toEqual([]);
    expect(errors).toEqual([]);
  });
}

for (const entry of ['entry-one', 'entry-two']) {
  test(`${entry} client navigation and deep links`, async ({ page, request }) => {
    const dataRequests: string[] = [];
    page.on('request', request => {
      if (request.url().includes('x-mf-data-fetch')) dataRequests.push(request.url());
    });
    if (entry === 'entry-two') {
      for (const path of ['/entry-two', '/entry-two/details']) {
        const response = await request.get(path);
        expect(response.ok()).toBe(true);
        const rendered = await readRenderedCard(page, await response.text());
        expect(rendered).toEqual({ message: null, marker: null });
      }
    }
    await page.goto(`/${entry}`);
    await expect(page.getByTestId('remote-message')).toHaveText(message);
    if (entry === 'entry-two') expect(dataRequests).toEqual([]);
    await page.evaluate(() => {
      document.documentElement.dataset.navigationMarker = 'same-document';
    });
    await page.getByRole('link', { name: 'Details', exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${entry}/details$`));
    await expect(page.getByRole('heading', { level: 1 })).toContainText('details');
    await expect(page.getByTestId('remote-message')).toHaveText(message);
    expect(await page.locator('html').getAttribute('data-navigation-marker')).toBe('same-document');
    await page.reload();
    await expect(page.getByTestId('remote-message')).toHaveText(message);
    await page.getByRole('button', { name: 'Count: 0' }).click();
    await expect(page.getByRole('button', { name: 'Count: 1' })).toBeVisible();
    await page.getByRole('link', { name: 'Home', exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${entry}/?$`));
  });
}

test('provider standalone uses its native route loader', async ({ page }) => {
  const response = await page.goto('http://127.0.0.1:3061/');
  expect((await readRenderedCard(page, await response!.text())).message).toBe(message);
  await expect(page.getByTestId('remote-message')).toHaveText(message);
  await page.getByRole('button', { name: 'Count: 0' }).click();
  await expect(page.getByRole('button', { name: 'Count: 1' })).toBeVisible();
});

test('SSR requests receive independent loader data', async ({ request, page }) => {
  const first = await request.get('/entry-one');
  const second = await request.get('/entry-one');
  expect(first.ok()).toBe(true);
  expect(second.ok()).toBe(true);
  const firstMarker = (await readRenderedCard(page, await first.text())).marker;
  const secondMarker = (await readRenderedCard(page, await second.text())).marker;
  expect(firstMarker).toMatch(/^[0-9a-f-]{36}$/);
  expect(secondMarker).toMatch(/^[0-9a-f-]{36}$/);
  expect(firstMarker).not.toBe(secondMarker);
});

for (const returnMethod of ['link', 'history']) {
  test(`client navigation between SSR and CSR cards using ${returnMethod}`, async ({ page }) => {
    await page.goto('/entry-one');
    await expect(page.getByTestId('remote-message')).toHaveText(message);
    await page.getByRole('button', { name: 'Count: 0' }).click();
    await expect(page.getByRole('button', { name: 'Count: 1' })).toBeVisible();

    for (let visit = 0; visit < 2; visit++) {
      await page.getByRole('link', { name: 'CSR entry', exact: true }).click();
      await expect(page).toHaveURL('/entry-two');
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Client-rendered remote data');
      await expect(page.getByTestId('remote-message')).toHaveText(message);
      await page.getByRole('button', { name: 'Count: 0' }).click();
      await expect(page.getByRole('button', { name: 'Count: 1' })).toBeVisible();

      if (returnMethod === 'history') {
        await page.goBack();
      } else {
        await page.getByRole('link', { name: 'SSR entry', exact: true }).click();
      }
      await expect(page).toHaveURL('/entry-one');
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Server-rendered remote data');
      await expect(page.getByTestId('remote-message')).toHaveText(message);
      await page.getByRole('button', { name: 'Count: 0' }).click();
      await expect(page.getByRole('button', { name: 'Count: 1' })).toBeVisible();
    }
  });
}

import { expect, test } from '@playwright/test';

const message = 'Remote loader data from the provider';
const renderedMessage = `<h2 data-testid="remote-message">${message}</h2>`;

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
    const html = await response!.text();
    expect(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')).toContain(renderedMessage);
    const marker = html.match(/<p data-testid="request-marker">([^<]+)<\/p>/)?.[1];
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
        const html = await response.text();
        expect(html).not.toContain(renderedMessage);
        expect(html).not.toContain('data-testid="request-marker"');
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
  expect((await response!.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')).toContain(
    renderedMessage,
  );
  await expect(page.getByTestId('remote-message')).toHaveText(message);
  await page.getByRole('button', { name: 'Count: 0' }).click();
  await expect(page.getByRole('button', { name: 'Count: 1' })).toBeVisible();
});

test('SSR requests receive independent loader data', async ({ request }) => {
  const first = await request.get('/entry-one');
  const second = await request.get('/entry-one');
  expect(first.ok()).toBe(true);
  expect(second.ok()).toBe(true);
  const firstMarker = (await first.text()).match(
    /<p data-testid="request-marker">([^<]+)<\/p>/,
  )?.[1];
  const secondMarker = (await second.text()).match(
    /<p data-testid="request-marker">([^<]+)<\/p>/,
  )?.[1];
  expect(firstMarker).toMatch(/^[0-9a-f-]{36}$/);
  expect(secondMarker).toMatch(/^[0-9a-f-]{36}$/);
  expect(firstMarker).not.toBe(secondMarker);
});

test('client navigation between SSR and CSR cards', async ({ page }) => {
  await page.goto('/entry-one');
  await page.getByRole('button', { name: 'Count: 0' }).click();
  await page.getByRole('link', { name: 'CSR entry', exact: true }).click();
  await expect(page).toHaveURL('/entry-two');
  await expect(page.getByTestId('remote-message')).toHaveText(message);
  await page.getByRole('button', { name: 'Count: 0' }).click();
  await expect(page.getByRole('button', { name: 'Count: 1' })).toBeVisible();
  await page.getByRole('link', { name: 'SSR entry', exact: true }).click();
  await expect(page).toHaveURL('/entry-one');
  await expect(page.getByTestId('remote-message')).toHaveText(message);
});

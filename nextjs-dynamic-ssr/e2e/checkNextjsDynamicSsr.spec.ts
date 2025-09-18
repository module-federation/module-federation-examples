import type { Page } from '@playwright/test';
import { Constants } from '../../cypress-e2e/fixtures/constants';
import { test, expect } from '../../playwright-e2e/common/testFixtures';

interface AppConfig {
  name: string;
  port: number;
}

interface NavigationLink {
  text: string;
  href: string;
  path: string;
}

interface ExternalLink {
  text: string;
  href: string;
}

interface TileLink {
  heading: string;
  href: string;
}

const appsUnderTest: AppConfig[] = [
  {
    name: Constants.commonConstantsData.home,
    port: 3001,
  },
  {
    name: Constants.elementsText.nextJsSsrApp.shop,
    port: 3002,
  },
  {
    name: Constants.elementsText.nextJsSsrApp.checkout,
    port: 3000,
  },
];

const navigationLinks: NavigationLink[] = [
  {
    text: Constants.commonConstantsData.home,
    href: Constants.commonConstantsData.commonLinks.baseLink,
    path: Constants.commonConstantsData.commonLinks.baseLink,
  },
  {
    text: Constants.elementsText.nextJsSsrApp.shop,
    href: Constants.hrefs.nextJsSsrApp.shop,
    path: Constants.hrefs.nextJsSsrApp.shop,
  },
  {
    text: Constants.elementsText.nextJsSsrApp.checkout,
    href: Constants.hrefs.nextJsSsrApp.checkout,
    path: Constants.hrefs.nextJsSsrApp.checkout,
  },
];

const externalLinks: ExternalLink[] = [
  {
    text: Constants.elementsText.nextJsSsrApp.zeit,
    href: Constants.hrefs.nextJsSsrApp.zeit,
  },
  {
    text: Constants.elementsText.nextJsSsrApp.gitHub,
    href: Constants.hrefs.nextJsSsrApp.zeitGitHub,
  },
];

const tileLinks: TileLink[] = [
  {
    heading: Constants.elementsText.nextJsSsrApp.tiles.documentation,
    href: Constants.hrefs.nextJsSsrApp.documentation,
  },
  {
    heading: Constants.elementsText.nextJsSsrApp.tiles.learn,
    href: Constants.hrefs.nextJsSsrApp.learn,
  },
  {
    heading: Constants.elementsText.nextJsSsrApp.tiles.examples,
    href: Constants.hrefs.nextJsSsrApp.examples,
  },
];

const escapeRegExp = (value: string): string => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const createFlexibleRegExp = (value: string): RegExp =>
  new RegExp(escapeRegExp(value.trim()).replace(/\s+/g, '\\s+'));

const normalizePath = (path: string): string => {
  if (!path || path === '/') {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
};

const buildPathRegex = (port: number, path: string): RegExp => {
  const normalized = normalizePath(path);

  if (normalized === '/') {
    return new RegExp(`^http://localhost:${port}\\/?$`);
  }

  const escaped = normalized.replace(/\//g, '\\/');
  return new RegExp(`^http://localhost:${port}${escaped}(?:\\/)?$`);
};

const expectSharedNavigation = async (page: Page): Promise<void> => {
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();
  await expect(nav.getByText(Constants.commonConstantsData.helloWorldMessage)).toBeVisible();

  for (const { text, href } of navigationLinks) {
    const link = nav.getByRole('link', { name: text });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', href);
  }

  for (const { text, href } of externalLinks) {
    const link = nav.getByRole('link', { name: text });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', href);
  }
};

const expectHomePageContent = async (page: Page): Promise<void> => {
  await expect(
    page.getByRole('heading', { level: 1, name: createFlexibleRegExp(Constants.elementsText.nextJsSsrApp.texts.text3) }),
  ).toBeVisible();

  await expect(page.getByText(Constants.elementsText.nextJsSsrApp.texts.text4, { exact: false })).toBeVisible();

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: createFlexibleRegExp(Constants.elementsText.nextJsSsrApp.messages.welcomeMessage),
    }),
  ).toBeVisible();

  await expect(page.getByText(Constants.elementsText.nextJsSsrApp.texts.text5, { exact: false })).toBeVisible();
};

const expectHomeTiles = async (page: Page): Promise<void> => {
  for (const { heading, href } of tileLinks) {
    const card = page.locator('a').filter({ has: page.locator('h3', { hasText: heading }) });
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute('href', href);
  }
};

const expectShopContent = async (page: Page): Promise<void> => {
  await expect(
    page.getByRole('heading', { level: 1, name: createFlexibleRegExp(Constants.elementsText.nextJsSsrApp.pages.shopPage) }),
  ).toBeVisible();

  await expect(
    page.getByText(Constants.elementsText.nextJsSsrApp.texts.mainShopText, { exact: false }),
  ).toBeVisible();
};

const expectCheckoutContent = async (page: Page): Promise<void> => {
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: createFlexibleRegExp(Constants.elementsText.nextJsSsrApp.pages.checkoutPage),
    }),
  ).toBeVisible();

  await expect(
    page.getByText(Constants.elementsText.nextJsSsrApp.messages.checkoutMessage, { exact: false }),
  ).toBeVisible();

  await expect(
    page.getByText(Constants.elementsText.nextJsSsrApp.texts.text1.trim(), { exact: false }),
  ).toBeVisible();

  await expect(page.getByText(Constants.elementsText.nextJsSsrApp.texts.text2, { exact: false })).toBeVisible();
};

const expectNavigationFlow = async (page: Page, port: number): Promise<void> => {
  for (const { text, path } of navigationLinks) {
    await page.getByRole('link', { name: text }).click();
    await expect(page).toHaveURL(buildPathRegex(port, path));
  }
};

test.describe('NextJS Dynamic SSR', () => {
  for (const { name, port } of appsUnderTest) {
    test.describe(`${name} host`, () => {
      test(`Home page renders shared navigation in ${name}`, async ({ basePage, page }) => {
        await basePage.openLocalhost({ port });
        await expectSharedNavigation(page);
      });

      test(`Home page renders federated content in ${name}`, async ({ basePage, page }) => {
        await basePage.openLocalhost({ port });
        await expectHomePageContent(page);
        await expectHomeTiles(page);
      });

      test(`Home page navigation works in ${name}`, async ({ basePage, page }) => {
        await basePage.openLocalhost({ port });
        await expectNavigationFlow(page, port);
      });

      test(`Shop page renders shared navigation in ${name}`, async ({ basePage, page }) => {
        await basePage.openLocalhost({ port, path: Constants.hrefs.nextJsSsrApp.shop });
        await expectSharedNavigation(page);
      });

      test(`Shop page renders federated content in ${name}`, async ({ basePage, page }) => {
        await basePage.openLocalhost({ port, path: Constants.hrefs.nextJsSsrApp.shop });
        await expectShopContent(page);
      });

      test(`Shop page navigation works in ${name}`, async ({ basePage, page }) => {
        await basePage.openLocalhost({ port, path: Constants.hrefs.nextJsSsrApp.shop });
        await expectNavigationFlow(page, port);
      });

      test(`Checkout page renders shared navigation in ${name}`, async ({ basePage, page }) => {
        await basePage.openLocalhost({ port, path: Constants.hrefs.nextJsSsrApp.checkout });
        await expectSharedNavigation(page);
      });

      test(`Checkout page renders federated content in ${name}`, async ({ basePage, page }) => {
        await basePage.openLocalhost({ port, path: Constants.hrefs.nextJsSsrApp.checkout });
        await expectCheckoutContent(page);
      });

      test(`Checkout page navigation works in ${name}`, async ({ basePage, page }) => {
        await basePage.openLocalhost({ port, path: Constants.hrefs.nextJsSsrApp.checkout });
        await expectNavigationFlow(page, port);
      });
    });
  }
});

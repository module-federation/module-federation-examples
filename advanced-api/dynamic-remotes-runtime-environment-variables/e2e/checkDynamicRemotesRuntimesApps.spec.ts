import { test, expect } from '@playwright/test';
import { BasePage } from './utils/base-test';
import { selectors } from './utils/selectors';
import { Constants } from './utils/constants';

const { host, remoteApp, widget } = Constants.elementsText.dynamicSystemRemotesRuntimeApp;

const { envLoader, remoteConfigLoader } = Constants.commonConstantsData;

test.describe('Dynamic Remotes with runtime environment variables', () => {
  test('host application loads the remote widget on demand', async ({ page }) => {
    const basePage = new BasePage(page);

    await basePage.openLocalhost(3000);

    await basePage.waitForTextToDisappear(selectors.tags.coreElements.div, envLoader, 15000);

    await basePage.checkElementWithTextPresence(selectors.tags.headers.h1, host.header);
    await basePage.checkElementWithTextPresence(selectors.tags.headers.h3, host.envSectionTitle);
    await basePage.checkElementWithTextPresence(selectors.tags.paragraph, host.paragraph);

    await basePage.clickElementWithText(selectors.tags.coreElements.button, host.button);

    await basePage.waitForTextToDisappear(
      selectors.tags.coreElements.div,
      host.remoteLoading,
      15000,
    );
    await basePage.waitForTextToDisappear(
      selectors.tags.coreElements.div,
      remoteConfigLoader,
      15000,
    );

    await basePage.checkElementWithTextPresence(selectors.tags.headers.h3, host.remoteSectionTitle);
    await basePage.checkElementWithTextPresence(selectors.tags.headers.h2, widget.title);

    const envHeading = page.getByRole('heading', {
      level: 2,
      name: new RegExp(`^${widget.envPrefix} `),
    });
    await expect(envHeading).toHaveText(new RegExp(`^${widget.envPrefix} https?://`));

    await basePage.checkElementWithTextPresence(selectors.tags.paragraph, widget.paragraph);
    await basePage.checkDateFormat();
  });

  test('remote application exposes the widget with runtime configuration', async ({ page }) => {
    const basePage = new BasePage(page);

    await basePage.openLocalhost(3001);

    await basePage.checkElementWithTextPresence(selectors.tags.headers.h1, remoteApp.header);
    await expect(
      page.getByRole('heading', { level: 2, name: new RegExp(`^${remoteApp.subheader}$`) }),
    ).toBeVisible();

    await basePage.waitForTextToDisappear(
      selectors.tags.coreElements.div,
      remoteConfigLoader,
      15000,
    );

    await basePage.checkElementWithTextPresence(selectors.tags.headers.h2, widget.title);

    const remoteEnvHeading = page.getByRole('heading', {
      level: 2,
      name: new RegExp(`^${widget.envPrefix}`),
    });
    await expect(remoteEnvHeading).toHaveText(new RegExp(`^${widget.envPrefix} https?://`));

    await basePage.checkElementWithTextPresence(selectors.tags.paragraph, widget.paragraph);
    await basePage.checkDateFormat();
  });
});

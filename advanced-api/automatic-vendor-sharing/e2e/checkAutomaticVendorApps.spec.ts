import { test, expect } from '@playwright/test';
import { BasePage } from './utils/base-test';
import { Constants } from './utils/constants';
import { selectors } from './utils/selectors';

type AppInfo = {
  host: number;
  appDisplayName: string;
  localButtonText: string;
  localButtonColor: string;
  remoteButtonText: string;
  remoteButtonColor: string;
  localSectionHeading: string;
  localSectionDescription: string;
  remoteSectionHeading: string;
  remoteSectionDescription: string;
};

const headerText = Constants.commonConstantsData.headerText;
const localSectionHeading = Constants.sections.localHeading;
const infoSection = Constants.infoSection;

const apps: AppInfo[] = [
  {
    host: 3001,
    appDisplayName: Constants.commonConstantsData.appDisplayNames.app1,
    localButtonText: Constants.commonConstantsData.buttonLabels.app1,
    localButtonColor: Constants.color.app1Button,
    remoteButtonText: Constants.commonConstantsData.buttonLabels.app2,
    remoteButtonColor: Constants.color.app2Button,
    localSectionHeading,
    localSectionDescription: Constants.sections.descriptions.app1Local,
    remoteSectionHeading: Constants.sections.remoteHeadings.app1,
    remoteSectionDescription: Constants.sections.descriptions.app1Remote,
  },
  {
    host: 3002,
    appDisplayName: Constants.commonConstantsData.appDisplayNames.app2,
    localButtonText: Constants.commonConstantsData.buttonLabels.app2,
    localButtonColor: Constants.color.app2Button,
    remoteButtonText: Constants.commonConstantsData.buttonLabels.app1,
    remoteButtonColor: Constants.color.app1Button,
    localSectionHeading,
    localSectionDescription: Constants.sections.descriptions.app2Local,
    remoteSectionHeading: Constants.sections.remoteHeadings.app2,
    remoteSectionDescription: Constants.sections.descriptions.app2Remote,
  },
];

test.describe('Automatic Vendor Sharing example', () => {
  for (const app of apps) {
    test.describe(app.appDisplayName, () => {
      test(`renders the shell for ${app.appDisplayName}`, async ({ page }) => {
        const basePage = new BasePage(page);
        const consoleErrors: string[] = [];

        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        await basePage.openLocalhost(app.host);

        await page.locator(selectors.tags.headers.h1).waitFor({ state: 'visible', timeout: 60000 });
        await expect(page.locator(selectors.tags.headers.h1)).toContainText(headerText);
        await expect(page.locator(selectors.tags.headers.h2)).toContainText(app.appDisplayName);

        await expect(page.getByRole('heading', { level: 3, name: app.localSectionHeading })).toBeVisible();
        await expect(page.getByText(app.localSectionDescription)).toBeVisible();

        await expect(page.getByRole('heading', { level: 3, name: app.remoteSectionHeading })).toBeVisible();
        await expect(page.getByText(app.remoteSectionDescription, { exact: false })).toBeVisible();

        await expect(page.getByRole('heading', { level: 3, name: infoSection.heading })).toBeVisible();
        await expect(page.getByText(infoSection.summary)).toBeVisible();
        await expect(page.getByText(infoSection.sharedDependencies)).toBeVisible();
        await expect(page.getByText(infoSection.loadStrategy)).toBeVisible();
        await expect(page.getByText(infoSection.benefits)).toBeVisible();

        const relevantErrors = consoleErrors.filter((error) => {
          if (error.includes('WebSocket connection to') && error.includes('WEB_SOCKET_CONNECT_MAGIC_ID')) {
            return false;
          }

          if (error.includes('dynamic-remote-type-hints-plugin')) {
            return false;
          }

          return true;
        });

        expect(relevantErrors, 'Unexpected console errors detected in the browser console').toHaveLength(0);
      });

      test(`exposes the styled local button for ${app.appDisplayName}`, async ({ page }) => {
        const basePage = new BasePage(page);

        await basePage.openLocalhost(app.host);

        const localButton = page.getByRole('button', { name: app.localButtonText });
        await expect(localButton).toBeVisible();
        await expect(localButton.locator('span')).toHaveCount(1);
        await expect(localButton).toHaveCSS('background-color', app.localButtonColor);

        await localButton.click();
        await expect(localButton.locator('span')).toHaveCount(2);
        await expect(localButton.locator('span').nth(1)).toHaveText('1');
      });

      test(`loads the remote button for ${app.appDisplayName}`, async ({ page }) => {
        const basePage = new BasePage(page);

        await basePage.openLocalhost(app.host);
        await basePage.waitForDynamicImport();

        const remoteButton = page.getByRole('button', { name: app.remoteButtonText });
        await expect(remoteButton).toBeVisible();
        await expect(page.getByText(app.remoteSectionDescription, { exact: false })).toBeVisible();
        await expect(remoteButton).toHaveCSS('background-color', app.remoteButtonColor);

        await remoteButton.click();
        await expect(remoteButton.locator('span')).toHaveCount(2);
        await expect(remoteButton.locator('span').nth(1)).toHaveText('1');
      });
    });
  }
});

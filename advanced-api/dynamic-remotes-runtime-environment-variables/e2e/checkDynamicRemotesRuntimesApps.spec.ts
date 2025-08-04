import { test, expect } from '@playwright/test';
import { BasePage } from './utils/base-test';
import { selectors } from './utils/selectors';
import { Constants } from './utils/constants';

const appsData = [
  {
    header: Constants.elementsText.dynamicSystemRemotesRuntimeApp.host.header,
    subheader: Constants.commonConstantsData.basicComponents.host,
    hostH3: Constants.elementsText.dynamicSystemRemotesRuntimeApp.host.hostH3,
    paragraph: Constants.elementsText.dynamicSystemRemotesRuntimeApp.paragraph,
    button: Constants.elementsText.dynamicSystemRemotesRuntimeApp.host.button,
    loading: Constants.commonConstantsData.loading,
    buttonHeader: Constants.elementsText.dynamicSystemRemotesRuntimeApp.buttonHeader,
    buttonH2: Constants.elementsText.dynamicSystemRemotesRuntimeApp.buttonH2,
    buttonParagraph: Constants.elementsText.dynamicSystemRemotesRuntimeApp.buttonParagraph,
    host: 3000,
  },
  {
    header: Constants.elementsText.dynamicSystemRemotesRuntimeApp.host.header,
    subheader: Constants.commonConstantsData.basicComponents.remote,
    loading: Constants.commonConstantsData.loading,
    buttonHeader: Constants.elementsText.dynamicSystemRemotesRuntimeApp.buttonHeader,
    buttonH2: Constants.elementsText.dynamicSystemRemotesRuntimeApp.buttonH2,
    buttonParagraph: Constants.elementsText.dynamicSystemRemotesRuntimeApp.buttonParagraph,
    host: 3001,
  },
];

test.describe('Dynamic Remotes Runtime Environment Variables E2E Tests', () => {
  
  appsData.forEach((appData) => {
    const { host, subheader, header, hostH3, paragraph, button, loading, buttonHeader, buttonH2, buttonParagraph } = appData;
    
    test.describe(`Check ${subheader} app`, () => {
      test(`should display ${subheader} app widget functionality and application elements`, async ({ page }) => {
        const basePage = new BasePage(page);
        await basePage.openLocalhost(host);

        // Check main header
        await basePage.checkElementWithTextPresence(
          selectors.tags.headers.h1,
          header
        );

        if (host === 3000) {
          // Host app specific elements
          await basePage.checkElementWithTextPresence(
            selectors.tags.headers.h3,
            hostH3!
          );
          
          await basePage.checkElementWithTextPresence(
            selectors.tags.paragraph,
            paragraph!
          );

          // Click the load remote component button
          await basePage.clickElementWithText(
            selectors.tags.coreElements.button,
            button!
          );

          // Wait for loading to complete
          await basePage.page.waitForTimeout(3000);
        }

        // Check that the remote component loaded successfully
        await basePage.checkElementWithTextPresence(
          selectors.tags.headers.h2,
          buttonH2
        );

        await basePage.checkElementWithTextPresence(
          selectors.tags.paragraph,
          buttonParagraph
        );

        // Check moment.js date formatting
        await basePage.checkDateFormat();
      });
    });
  });

  test.describe('Runtime Environment Variable Tests', () => {
    test('should load environment configuration successfully', async ({ page }) => {
      const networkRequests: string[] = [];
      
      page.on('request', (request) => {
        networkRequests.push(request.url());
      });

      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');

      // Check that env-config.json was loaded
      const envConfigRequests = networkRequests.filter(url => 
        url.includes('env-config.json')
      );
      
      expect(envConfigRequests.length).toBeGreaterThan(0);
    });

    test('should demonstrate dynamic remote loading with environment config', async ({ page }) => {
      const basePage = new BasePage(page);
      await basePage.openLocalhost(3000);

      // Click to load remote component
      await basePage.clickElementWithText('button', 'Load Remote Widget');

      // Wait for loading to complete
      await basePage.page.waitForTimeout(3000);

      // Verify remote component is now loaded
      await basePage.checkElementWithTextPresence('h2', 'Remote Widget');
      await basePage.checkElementWithTextPresence('p', 'Using momentjs for format the date');
    });
  });

  test.describe('Performance and Loading', () => {
    test('should load applications within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(10000); // Should load within 10 seconds
    });
  });
});
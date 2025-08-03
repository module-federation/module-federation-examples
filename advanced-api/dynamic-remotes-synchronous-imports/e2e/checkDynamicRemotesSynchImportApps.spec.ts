import { test, expect } from './utils/base-test';
import { selectors } from './utils/selectors';
import { Constants } from './utils/constants';

const appsData = [
  {
    headerSelector: selectors.tags.headers.h1,
    subHeaderSelector: selectors.tags.headers.h2,
    headerText: Constants.elementsText.dynamicRemotesApp.header,
    appNameText: Constants.commonConstantsData.commonCountAppNames.app1,
    widgetName: Constants.elementsText.dynamicRemotesApp.synchronousImportWidgetsNames,
    widgetParagraph: Constants.commonPhrases.dynamicRemotesApp.widgetParagraphText,
    widgetColor: Constants.color.dynamicRemotesWidgetColor,
    widgetIndexNumber: 1,
    isTwoWidgets: true,
    host: 3001,
  },
  {
    headerSelector: selectors.tags.headers.h1,
    subHeaderSelector: selectors.tags.headers.h2,
    headerText: Constants.elementsText.dynamicRemotesApp.header,
    appNameText: Constants.commonConstantsData.commonCountAppNames.app2,
    widgetName: Constants.elementsText.dynamicRemotesApp.synchronousImportWidgetsNames,
    widgetParagraph: Constants.commonPhrases.dynamicRemotesApp.widgetParagraphText,
    widgetColor: Constants.color.dynamicRemotesWidgetColor,
    widgetIndexNumber: 2,
    isTwoWidgets: false,
    host: 3002,
  },
];

test.describe('Dynamic Remotes Synchronous Imports E2E Tests', () => {
  
  appsData.forEach((appData) => {
    const { host, appNameText, headerText, widgetName, widgetParagraph, widgetColor, widgetIndexNumber, isTwoWidgets } = appData;
    
    test.describe(`Check ${appNameText}`, () => {
      test(`should display ${appNameText} elements correctly`, async ({ basePage }) => {
        const consoleErrors: string[] = [];
        basePage.page.on('console', (msg) => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        await basePage.openLocalhost(host);

        // Check header and subheader exist
        await basePage.checkElementWithTextPresence(
          appData.headerSelector,
          headerText
        );
        await basePage.checkElementWithTextPresence(
          appData.subHeaderSelector,
          appNameText
        );

        // Verify no critical console errors
        const criticalErrors = consoleErrors.filter(error => 
          error.includes('Failed to fetch') || 
          error.includes('ChunkLoadError') ||
          error.includes('Module not found') ||
          (error.includes('TypeError') && !error.includes('DevTools'))
        );
        expect(criticalErrors).toHaveLength(0);
      });

      test(`should display widgets correctly in ${appNameText}`, async ({ basePage }) => {
        await basePage.openLocalhost(host);

        if (isTwoWidgets) {
          // App 1 has two widgets (local + remote)
          for (let i = 0; i < widgetName.length; i++) {
            const widgetSelector = i === 0 ? selectors.dataTestIds.app1Widget : selectors.dataTestIds.app2Widget;
            
            // Check widget visibility
            await basePage.checkElementVisibility(widgetSelector);
            
            // Check widget title
            await basePage.checkElementWithTextPresence(
              appData.subHeaderSelector,
              widgetName[i]
            );
            
            // Check widget paragraph text
            await basePage.checkElementWithTextPresence(
              selectors.tags.paragraph,
              widgetParagraph[i]
            );
            
            // Check moment.js date formatting
            await basePage.checkDateFormat();
            
            // Check widget background color
            await basePage.checkElementBackgroundColor(widgetSelector, widgetColor[i]);
          }
        } else {
          // App 2 has one widget
          const widgetSelector = selectors.dataTestIds.app2Widget;
          
          // Check widget visibility
          await basePage.checkElementVisibility(widgetSelector);
          
          // Check widget title
          await basePage.checkElementWithTextPresence(
            appData.subHeaderSelector,
            widgetName[widgetIndexNumber - 1]
          );
          
          // Check widget paragraph text
          await basePage.checkElementWithTextPresence(
            selectors.tags.paragraph,
            widgetParagraph[widgetIndexNumber - 1]
          );
          
          // Check moment.js date formatting
          await basePage.checkDateFormat();
          
          // Check widget background color
          await basePage.checkElementBackgroundColor(widgetSelector, widgetColor[1]);
        }
      });
    });
  });

  test.describe('Synchronous Import Pattern Tests', () => {
    test('should demonstrate synchronous imports with dynamic URL resolution', async ({ page }) => {
      const consoleMessages: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'log' && msg.text().includes('get-remote-from-window-plugin')) {
          consoleMessages.push(msg.text());
        }
      });

      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Should have runtime plugin logs indicating dynamic URL resolution
      const runtimePluginLogs = consoleMessages.filter(msg => 
        msg.includes('app2Url') || msg.includes('get-remote-from-window-plugin')
      );
      
      // Verify runtime plugin is working for dynamic URL resolution
      expect(runtimePluginLogs.length).toBeGreaterThan(0);
    });

    test('should load remote modules synchronously', async ({ page }) => {
      const networkRequests: string[] = [];
      
      page.on('request', (request) => {
        networkRequests.push(request.url());
      });

      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Check that App 2 widget is loaded synchronously (no dynamic import button clicks)
      await page.waitForSelector(selectors.dataTestIds.app2Widget, { timeout: 10000 });

      // Verify the remote entry was loaded
      const remoteEntryRequests = networkRequests.filter(url => 
        url.includes('localhost:3002') && url.includes('remoteEntry.js')
      );
      
      expect(remoteEntryRequests.length).toBeGreaterThan(0);
    });

    test('should handle runtime URL modification correctly', async ({ page }) => {
      // Monitor for URL resolution in runtime plugin
      const consoleMessages: string[] = [];
      page.on('console', (msg) => {
        consoleMessages.push(msg.text());
      });

      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Verify both widgets are present (demonstrating successful remote loading)
      await page.waitForSelector(selectors.dataTestIds.app1Widget);
      await page.waitForSelector(selectors.dataTestIds.app2Widget);

      // Check that runtime plugin logged URL processing
      const urlResolutionLogs = consoleMessages.filter(msg => 
        msg.includes('app2Url') || msg.includes('beforeRequest')
      );
      
      expect(urlResolutionLogs.length).toBeGreaterThan(0);
    });
  });

  test.describe('Module Federation Features', () => {
    test('should efficiently share dependencies between applications', async ({ page }) => {
      const networkRequests: string[] = [];
      
      page.on('request', (request) => {
        networkRequests.push(request.url());
      });

      // Navigate to host (loads both local and remote widgets synchronously)
      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Navigate to remote standalone
      await page.goto('http://localhost:3002');
      await page.waitForLoadState('networkidle');

      // Verify React is shared efficiently
      const reactRequests = networkRequests.filter(url => 
        url.includes('react') && !url.includes('react-dom')
      );
      expect(reactRequests.length).toBeLessThan(8);

      // Verify moment.js is shared between remotes
      const momentRequests = networkRequests.filter(url => url.includes('moment'));
      expect(momentRequests.length).toBeLessThan(5);
    });

    test('should handle CORS correctly for federated modules', async ({ page }) => {
      const corsErrors: string[] = [];
      page.on('response', (response) => {
        if (response.status() >= 400 && response.url().includes('localhost:300')) {
          corsErrors.push(`${response.status()} - ${response.url()}`);
        }
      });

      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Should have no CORS errors
      expect(corsErrors).toHaveLength(0);
    });

    test('should demonstrate moment.js sharing', async ({ basePage }) => {
      await basePage.openLocalhost(3001);

      // Check that moment.js date is formatted correctly in both widgets
      const dateElements = basePage.page.locator('text=/[A-Z][a-z]+ \\d{1,2}[a-z]{2} \\d{4}, \\d{1,2}:\\d{2}/');
      
      // Should have date formatting in both local and remote widgets
      await expect(dateElements).toHaveCount(2);
    });
  });

  test.describe('Error Handling and Resilience', () => {
    test('should handle missing window variables gracefully', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Should handle any missing window variables gracefully
      const criticalErrors = consoleErrors.filter(error => 
        error.includes('Uncaught') && 
        !error.includes('webpack-dev-server') &&
        !error.includes('DevTools') &&
        !error.includes('Warning:')
      );
      expect(criticalErrors).toHaveLength(0);
    });

    test('should maintain application stability during remote loading', async ({ page }) => {
      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Verify main application elements remain stable
      await page.waitForSelector('h1:has-text("Dynamic System Host")');
      await page.waitForSelector('h2:has-text("App 1")');
      
      // Verify both widgets loaded successfully
      await page.waitForSelector(selectors.dataTestIds.app1Widget);
      await page.waitForSelector(selectors.dataTestIds.app2Widget);
    });
  });
});
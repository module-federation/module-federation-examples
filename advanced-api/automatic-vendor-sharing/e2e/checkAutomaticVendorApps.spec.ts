import { test, expect } from './utils/base-test';
import { selectors } from './utils/selectors';
import { Constants } from './utils/constants';

const appsData = [
  {
    headerSelector: selectors.tags.headers.h1,
    subHeaderSelector: selectors.tags.headers.h2,
    buttonSelector: selectors.tags.coreElements.button,
    headerText: Constants.commonConstantsData.biDirectional,
    appNameText: Constants.commonConstantsData.commonCountAppNames.app1,
    buttonColor: Constants.color.red,
    host: 3001,
  },
  {
    headerSelector: selectors.tags.headers.h1,
    subHeaderSelector: selectors.tags.headers.h2,
    buttonSelector: selectors.tags.coreElements.button,
    headerText: Constants.commonConstantsData.biDirectional,
    appNameText: Constants.commonConstantsData.commonCountAppNames.app2,
    buttonColor: Constants.color.deepBlue,
    host: 3002,
  },
];

test.describe('Automatic Vendor Sharing E2E Tests', () => {
  
  appsData.forEach((appData) => {
    const { host, appNameText, headerText, buttonColor } = appData;
    
    test.describe(`Check ${appNameText}`, () => {
      test(`should display ${appNameText} header and subheader correctly`, async ({ basePage }) => {
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
          error.includes('TypeError')
        );
        expect(criticalErrors).toHaveLength(0);
      });

      test(`should display ${appNameText} button correctly`, async ({ basePage }) => {
        await basePage.openLocalhost(host);

        const buttonText = `${appNameText} ${Constants.commonConstantsData.button}`;
        
        // Check button exists with correct text
        await basePage.checkElementWithTextPresence(
          appData.buttonSelector,
          buttonText
        );
      });

      test(`should have correct button styling in ${appNameText}`, async ({ basePage }) => {
        await basePage.openLocalhost(host);

        const buttonText = `${appNameText} ${Constants.commonConstantsData.button}`;
        const buttonSelector = `${appData.buttonSelector}:has-text("${buttonText}")`;
        
        // Check button has correct background color
        await basePage.checkElementVisibility(buttonSelector);
        await basePage.checkElementBackgroundColor(buttonSelector, buttonColor);
      });

      test(`should handle ${appNameText} button interactions`, async ({ basePage }) => {
        await basePage.openLocalhost(host);

        const buttonText = `${appNameText} ${Constants.commonConstantsData.button}`;
        
        // Click the button and verify it responds
        await basePage.clickElementWithText(appData.buttonSelector, buttonText);
        
        // Verify button is still visible and functional after click
        await basePage.checkElementWithTextPresence(
          appData.buttonSelector,
          buttonText
        );
      });
    });
  });

  test.describe('Cross-App Integration Tests', () => {
    test('should demonstrate automatic vendor sharing between apps', async ({ page }) => {
      const networkRequests: string[] = [];
      
      page.on('request', (request) => {
        networkRequests.push(request.url());
      });

      // Visit both apps to trigger vendor sharing
      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');
      
      await page.goto('http://localhost:3002');
      await page.waitForLoadState('networkidle');

      // Verify shared dependencies are loaded efficiently
      const reactRequests = networkRequests.filter(url => 
        url.includes('react') && !url.includes('react-dom')
      );
      
      // Should not load React multiple times due to vendor sharing
      expect(reactRequests.length).toBeLessThan(10);
    });

    test('should handle CORS correctly for federated modules', async ({ page }) => {
      const corsErrors: string[] = [];
      page.on('response', (response) => {
        if (response.status() >= 400 && response.url().includes('localhost:300')) {
          corsErrors.push(`${response.status()} - ${response.url()}`);
        }
      });

      // Test cross-origin requests work properly
      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Should have no CORS errors
      expect(corsErrors).toHaveLength(0);
    });

    test('should load applications within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(10000); // Should load within 10 seconds
    });
  });

  test.describe('AutomaticVendorFederation Features', () => {
    test('should demonstrate shared vendor optimization', async ({ page }) => {
      const consoleMessages: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'log' && msg.text().includes('MF Runtime')) {
          consoleMessages.push(msg.text());
        }
      });

      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Should have Module Federation runtime logs indicating vendor sharing
      const vendorSharingLogs = consoleMessages.filter(msg => 
        msg.includes('shared dependency') || msg.includes('vendor')
      );
      
      // Verify vendor sharing is working (logs should indicate shared dependencies)
      expect(vendorSharingLogs.length).toBeGreaterThan(0);
    });

    test('should handle error boundaries correctly', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Click button to test error handling
      await page.click('button:has-text("App 1 Button")');
      await page.waitForTimeout(1000);

      // Should handle any errors gracefully
      const criticalErrors = consoleErrors.filter(error => 
        error.includes('Uncaught') && 
        !error.includes('webpack-dev-server') &&
        !error.includes('DevTools')
      );
      expect(criticalErrors).toHaveLength(0);
    });
  });
});
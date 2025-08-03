import { test, expect } from './utils/base-test';
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
      test(`should display ${subheader} app widget functionality and application elements`, async ({ basePage }) => {
        const consoleErrors: string[] = [];
        basePage.page.on('console', (msg) => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        await basePage.openLocalhost(host);

        // Check main header
        await basePage.checkElementWithTextPresence(
          selectors.tags.headers.h1,
          header
        );

        // Check subheader
        await basePage.checkElementWithTextPresence(
          selectors.tags.headers.h2,
          subheader
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
        }

        // Wait for loading to appear and disappear
        await basePage.waitForLoadingToDisappear(loading);

        // Check that the remote component loaded successfully
        await basePage.checkElementWithTextPresence(
          selectors.tags.headers.h2,
          buttonHeader
        );

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

        // Verify no critical console errors
        const criticalErrors = consoleErrors.filter(error => 
          error.includes('Failed to fetch') || 
          error.includes('ChunkLoadError') ||
          error.includes('Module not found') ||
          (error.includes('TypeError') && !error.includes('DevTools'))
        );
        expect(criticalErrors).toHaveLength(0);
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

    test('should use runtime environment variables for remote URLs', async ({ page }) => {
      const networkRequests: string[] = [];
      
      page.on('request', (request) => {
        networkRequests.push(request.url());
      });

      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');

      // Click load remote component button
      await page.click('button:has-text("Load Remote Component")');
      await page.waitForTimeout(3000);

      // Verify remote was loaded from the correct URL (environment-based)
      const remoteRequests = networkRequests.filter(url => 
        url.includes('localhost:3001') && url.includes('remoteEntry.js')
      );
      
      expect(remoteRequests.length).toBeGreaterThan(0);
    });

    test('should demonstrate dynamic remote loading with environment config', async ({ basePage }) => {
      await basePage.openLocalhost(3000);

      // Initial state - no remote component
      const remoteElement = basePage.page.locator('text="Remote Component"');
      await expect(remoteElement).toHaveCount(0);

      // Click to load remote component
      await basePage.clickElementWithText('button', 'Load Remote Component');

      // Wait for loading to complete
      await basePage.waitForLoadingToDisappear('Loading...');

      // Verify remote component is now loaded
      await basePage.checkElementWithTextPresence('h2', 'Remote Component');
      await basePage.checkElementWithTextPresence('p', 'This widget was loaded from a remote application using runtime environment variables');
    });
  });

  test.describe('Module Federation Features', () => {
    test('should efficiently share dependencies between applications', async ({ page }) => {
      const networkRequests: string[] = [];
      
      page.on('request', (request) => {
        networkRequests.push(request.url());
      });

      // Navigate to host
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Load remote component
      await page.click('button:has-text("Load Remote Component")');
      await page.waitForTimeout(3000);

      // Navigate to remote standalone
      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Verify React is shared efficiently
      const reactRequests = networkRequests.filter(url => 
        url.includes('react') && !url.includes('react-dom')
      );
      expect(reactRequests.length).toBeLessThan(8);

      // Verify moment.js is shared
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

      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');

      // Load remote component
      await page.click('button:has-text("Load Remote Component")');
      await page.waitForTimeout(2000);

      // Should have no CORS errors
      expect(corsErrors).toHaveLength(0);
    });

    test('should handle dynamic loading gracefully', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');

      // Click load button multiple times to test resilience
      for (let i = 0; i < 3; i++) {
        await page.click('button:has-text("Load Remote Component")');
        await page.waitForTimeout(1000);
      }

      // Should handle multiple loads gracefully
      const criticalErrors = consoleErrors.filter(error => 
        error.includes('Uncaught') && 
        !error.includes('webpack-dev-server') &&
        !error.includes('DevTools') &&
        !error.includes('Warning:')
      );
      expect(criticalErrors).toHaveLength(0);
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

    test('should handle dynamic imports efficiently', async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');

      const startTime = Date.now();
      
      await page.click('button:has-text("Load Remote Component")');
      await page.waitForSelector('text="Remote Component"', { timeout: 10000 });
      
      const dynamicLoadTime = Date.now() - startTime;
      expect(dynamicLoadTime).toBeLessThan(8000); // Dynamic loading should be fast
    });

    test('should demonstrate environment-aware configuration loading', async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');

      // Check that environment configuration is accessible
      const envConfigExists = await page.evaluate(async () => {
        try {
          const response = await fetch('/env-config.json');
          return response.ok;
        } catch {
          return false;
        }
      });

      expect(envConfigExists).toBe(true);
    });
  });
});
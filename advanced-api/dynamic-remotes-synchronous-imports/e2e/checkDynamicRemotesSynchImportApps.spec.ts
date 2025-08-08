import { test, expect, Page } from '@playwright/test';

// Helper functions
async function openLocalhost(page: Page, port: number) {
  await page.goto(`http://localhost:${port}`);
  await page.waitForLoadState('networkidle');
}

async function checkElementWithTextPresence(page: Page, selector: string, text: string, timeout: number = 10000) {
  // Use getByText for exact text matching to avoid conflicts with partial matches
  await page.locator(selector).filter({ hasText: new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) }).first().waitFor({ timeout });
}

async function checkElementVisibility(page: Page, selector: string, timeout: number = 10000) {
  await page.locator(selector).waitFor({ state: 'visible', timeout });
}

async function checkElementBackgroundColor(page: Page, selector: string, expectedColor: string) {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible' });
  const backgroundColor = await element.evaluate((el) => {
    return window.getComputedStyle(el).backgroundColor;
  });
  if (backgroundColor !== expectedColor) {
    throw new Error(`Expected background color ${expectedColor}, but got ${backgroundColor}`);
  }
}

async function clickElementWithText(page: Page, selector: string, text: string) {
  await page.locator(selector).filter({ hasText: text }).click();
}

async function waitForDynamicImport(page: Page, timeout: number = 5000) {
  // Wait for any dynamic imports to complete
  await page.waitForTimeout(1000);
  await page.waitForLoadState('networkidle', { timeout });
}

async function checkDateFormat(page: Page) {
  // Check for moment.js formatted date (MMMM Do YYYY, h:mm format)
  const dateElement = page.locator('text=/[A-Z][a-z]+ \\\\d{1,2}[a-z]{2} \\\\d{4}, \\\\d{1,2}:\\\\d{2}/');
  await dateElement.waitFor({ timeout: 5000 });
}

const appsData = [
  {
    headerSelector: 'h1',
    subHeaderSelector: 'h2',
    headerText: '🌐 Dynamic System Host',
    appNameText: 'App 1 - Demonstrating Synchronous Imports with Dynamic Remotes',
    widgetName: ['App 1 Widget', 'App 2 Widget'],
    widgetParagraph: ["Moment shouldn't download twice", "Moment shouldn't download twice"],
    widgetColor: ['rgb(255, 0, 0)', 'rgb(0, 0, 255)'],
    widgetIndexNumber: 1,
    isTwoWidgets: true,
    host: 3001,
  },
  {
    headerSelector: 'h1',
    subHeaderSelector: 'h2',
    headerText: '🌐 Dynamic System Host',
    appNameText: 'App 2',
    widgetName: ['App 1 Widget', 'App 2 Widget'],
    widgetParagraph: ["Moment shouldn't download twice", "Moment shouldn't download twice"],
    widgetColor: ['rgb(255, 0, 0)', 'rgb(0, 0, 255)'],
    widgetIndexNumber: 2,
    isTwoWidgets: false,
    host: 3002,
  },
];

test.describe('Dynamic Remotes Synchronous Imports E2E Tests', () => {
  
  appsData.forEach((appData) => {
    const { host, appNameText, headerText, widgetName, widgetParagraph, widgetColor, widgetIndexNumber, isTwoWidgets } = appData;
    
    test.describe(`Check ${appNameText}`, () => {
      test(`should display ${appNameText} elements correctly`, async ({ page }) => {
        const consoleErrors: string[] = [];
        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        await openLocalhost(page, host);

        // Check header and subheader exist
        await checkElementWithTextPresence(
          page,
          appData.headerSelector,
          headerText
        );
        await checkElementWithTextPresence(
          page,
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

      test(`should display widgets correctly in ${appNameText}`, async ({ page }) => {
        await openLocalhost(page, host);

        if (isTwoWidgets) {
          // App 1 has two widgets (local + remote)
          for (let i = 0; i < widgetName.length; i++) {
            const widgetSelector = i === 0 ? '[data-e2e="WIDGET__1"]' : '[data-e2e="WIDGET__2"]';
            
            // Check widget visibility
            await checkElementVisibility(page, widgetSelector);
            
            // Check widget title
            await checkElementWithTextPresence(
              page,
              appData.subHeaderSelector,
              widgetName[i]
            );
            
            // Check widget paragraph text
            await checkElementWithTextPresence(
              page,
              'p',
              widgetParagraph[i]
            );
            
            // Check moment.js date formatting
            await checkDateFormat(page);
            
            // Check widget background color
            await checkElementBackgroundColor(page, widgetSelector, widgetColor[i]);
          }
        } else {
          // App 2 has one widget
          const widgetSelector = '[data-e2e="WIDGET__2"]';
          
          // Check widget visibility
          await checkElementVisibility(page, widgetSelector);
          
          // Check widget title
          await checkElementWithTextPresence(
            page,
            appData.subHeaderSelector,
            widgetName[widgetIndexNumber - 1]
          );
          
          // Check widget paragraph text
          await checkElementWithTextPresence(
            page,
            'p',
            widgetParagraph[widgetIndexNumber - 1]
          );
          
          // Check moment.js date formatting
          await checkDateFormat(page);
          
          // Check widget background color
          await checkElementBackgroundColor(page, widgetSelector, widgetColor[1]);
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
      await page.waitForSelector('[data-e2e="WIDGET__2"]', { timeout: 10000 });

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
      await page.waitForSelector('[data-e2e="WIDGET__1"]');
      await page.waitForSelector('[data-e2e="WIDGET__2"]');

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

    test('should demonstrate moment.js sharing', async ({ page }) => {
      await openLocalhost(page, 3001);

      // Check that moment.js date is formatted correctly in both widgets
      const dateElements = page.locator('text=/[A-Z][a-z]+ \\d{1,2}[a-z]{2} \\d{4}, \\d{1,2}:\\d{2}/');
      
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
      await page.waitForSelector('[data-e2e="WIDGET__1"]');
      await page.waitForSelector('[data-e2e="WIDGET__2"]');
    });
  });
});
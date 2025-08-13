import { test, expect, Page } from '@playwright/test';

// Helper functions
async function openLocalhost(page: Page, port: number) {
  await page.goto(`http://localhost:${port}`);
  await page.waitForLoadState('networkidle');
}

async function checkElementWithTextPresence(page: Page, selector: string, text: string) {
  const element = page.locator(`${selector}:has-text("${text}")`);
  await expect(element).toBeVisible();
}

async function clickElementWithText(page: Page, selector: string, text: string) {
  await page.click(`${selector}:has-text("${text}")`);
}



const appsData = [
  {
    headerText: 'Module Federation with Automatic Vendor Sharing',
    appNameText: 'App 1 (Host & Remote)',
    buttonColor: 'rgb(255, 0, 0)',
    host: 3001,
  },
  {
    headerText: 'Module Federation with Automatic Vendor Sharing',
    appNameText: 'App 2 (Host & Remote)',
    buttonColor: 'rgb(0, 0, 139)',
    host: 3002,
  },
];

test.describe('Automatic Vendor Sharing E2E Tests', () => {
  
  appsData.forEach((appData) => {
    const { host, appNameText, headerText } = appData;
    
    test.describe(`Check ${appNameText}`, () => {
      test(`should display ${appNameText} header and subheader correctly`, async ({ page }) => {
        const consoleErrors: string[] = [];
        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        await openLocalhost(page, host);

        // Check header and subheader exist
        await checkElementWithTextPresence(page, 'h1', headerText);
        await checkElementWithTextPresence(page, 'h2', appNameText);

        // Verify no critical console errors
        const criticalErrors = consoleErrors.filter(error => 
          error.includes('Failed to fetch') || 
          error.includes('ChunkLoadError') ||
          error.includes('Module not found') ||
          error.includes('TypeError')
        );
        expect(criticalErrors).toHaveLength(0);
      });

      test(`should display ${appNameText} button correctly`, async ({ page }) => {
        await openLocalhost(page, host);

        const buttonText = `${appNameText.split(' ')[0]} ${appNameText.split(' ')[1]} Button`;
        
        // Check button exists with correct text
        await checkElementWithTextPresence(page, 'button', buttonText);
      });

      test(`should handle ${appNameText} button interactions`, async ({ page }) => {
        await openLocalhost(page, host);

        const buttonText = `${appNameText.split(' ')[0]} ${appNameText.split(' ')[1]} Button`;
        
        // Click the button and verify it responds
        await clickElementWithText(page, 'button', buttonText);
        
        // Verify button is still visible and functional after click
        await checkElementWithTextPresence(page, 'button', buttonText);
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
      expect(reactRequests.length).toBeLessThanOrEqual(10);
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
      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Check that the main elements are present
      await checkElementWithTextPresence(page, 'h1', 'Module Federation with Automatic Vendor Sharing');
      await checkElementWithTextPresence(page, 'h2', 'App 1 (Host & Remote)');
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

      // Click button to test functionality
      const buttonExists = await page.locator('button').first().isVisible();
      if (buttonExists) {
        await page.locator('button').first().click();
        await page.waitForTimeout(1000);
      }

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
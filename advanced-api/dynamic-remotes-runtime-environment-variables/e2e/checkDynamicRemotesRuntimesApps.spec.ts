import { test, expect, Page } from '@playwright/test';

// Helper functions
async function openLocalhost(page: Page, port: number) {
  // Set up console and error logging
  const consoleMessages: string[] = [];
  const pageErrors: string[] = [];
  
  page.on('console', (msg) => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  });
  
  page.on('pageerror', (err) => {
    pageErrors.push(`Page error: ${err.message}\nStack: ${err.stack || 'No stack trace'}`);
  });

  await page.goto(`http://localhost:${port}`);
  
  // Wait for the page to load but don't wait for networkidle since env loading might be polling
  await page.waitForLoadState('load');
  
  // Wait for React to render - either the loading screen or the main content
  await page.waitForSelector('body > div', { timeout: 10000 });
  
  // Log any errors found
  if (pageErrors.length > 0) {
    console.log('=== PAGE ERRORS ===');
    pageErrors.forEach(error => console.log(error));
    console.log('==================');
  }
  
  if (consoleMessages.length > 0) {
    console.log('=== CONSOLE MESSAGES ===');
    consoleMessages.forEach(msg => console.log(msg));
    console.log('========================');
  }
}

async function waitForEnvironmentLoading(page: Page) {
  // Wait for either the loading screen to disappear or main content to appear
  // The loading screen shows "Loading environment configuration..."
  const loadingText = page.locator('text=Loading environment configuration...');
  const mainContent = page.locator('h1');
  
  try {
    // Wait up to 15 seconds for either loading to finish or main content to appear
    await Promise.race([
      loadingText.waitFor({ state: 'hidden', timeout: 15000 }),
      mainContent.waitFor({ state: 'visible', timeout: 15000 })
    ]);
  } catch (error) {
    console.log('Environment loading timeout - checking current page state');
    const pageContent = await page.content();
    console.log('Current page content length:', pageContent.length);
    
    // If still loading, wait a bit more and proceed
    if (await loadingText.isVisible()) {
      console.log('Still showing loading screen, waiting 10 more seconds...');
      await page.waitForTimeout(10000);
    }
  }
}

async function checkElementWithTextPresence(page: Page, selector: string, text: string) {
  const element = page.locator(`${selector}:has-text("${text}")`);
  await expect(element).toBeVisible();
}

async function clickElementWithText(page: Page, selector: string, text: string) {
  await page.click(`${selector}:has-text("${text}")`);
}

async function checkDateFormat(page: Page) {
  const dateElement = page.locator('text=/[A-Z][a-z]+ \\d{1,2}[a-z]{2} \\d{4}, \\d{1,2}:\\d{2}/').first();
  await expect(dateElement).toBeVisible();
}

const appsData = [
  {
    header: 'Dynamic Remotes with Runtime Environment Variables',
    subheader: 'Host',
    hostH3: 'Environment Configuration:',
    paragraph: 'This example demonstrates how Module Federation can load remote components dynamically',
    button: 'Load Remote Widget',
    buttonH2: 'Remote Widget',
    buttonParagraph: 'Using momentjs for format the date',
    host: 3000,
  },
  {
    header: 'Dynamic System Host',
    subheader: 'Remote',
    buttonH2: 'Remote Widget',
    buttonParagraph: 'Using momentjs for format the date',
    host: 3001,
  },
];

test.describe('Dynamic Remotes Runtime Environment Variables E2E Tests', () => {
  
  appsData.forEach((appData) => {
    const { host, subheader, header, hostH3, paragraph, button, buttonH2, buttonParagraph } = appData;
    
    test.describe(`Check ${subheader} app`, () => {
      test(`should display ${subheader} app widget functionality and application elements`, async ({ page }) => {
        await openLocalhost(page, host);

        // Wait for environment loading to complete for host app
        if (host === 3000) {
          await waitForEnvironmentLoading(page);
        }

        // Check main header
        await checkElementWithTextPresence(page, 'h1', header);

        if (host === 3000) {
          // Host app specific elements
          await checkElementWithTextPresence(page, 'h3', hostH3!);
          await checkElementWithTextPresence(page, 'p', paragraph!);

          // Click the load remote component button
          await clickElementWithText(page, 'button', button!);

          // Wait for loading to complete
          await page.waitForTimeout(3000);
        }

        // Check that the remote component loaded successfully
        await checkElementWithTextPresence(page, 'h2', buttonH2);
        await checkElementWithTextPresence(page, 'p', buttonParagraph);

        // Check moment.js date formatting
        await checkDateFormat(page);
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
      await page.waitForLoadState('load');
      await waitForEnvironmentLoading(page);

      // Check that env-config.json was loaded
      const envConfigRequests = networkRequests.filter(url => 
        url.includes('env-config.json')
      );
      
      expect(envConfigRequests.length).toBeGreaterThan(0);
    });

    test('should demonstrate dynamic remote loading with environment config', async ({ page }) => {
      await openLocalhost(page, 3000);
      await waitForEnvironmentLoading(page);

      // Click to load remote component
      await clickElementWithText(page, 'button', 'Load Remote Widget');

      // Wait for loading to complete
      await page.waitForTimeout(3000);

      // Verify remote component is now loaded
      await checkElementWithTextPresence(page, 'h2', 'Remote Widget');
      await checkElementWithTextPresence(page, 'p', 'Using momentjs for format the date');
    });
  });

  test.describe('Performance and Loading', () => {
    test('should load applications within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('load');
      await waitForEnvironmentLoading(page);
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(10000); // Should load within 10 seconds
    });
  });
});
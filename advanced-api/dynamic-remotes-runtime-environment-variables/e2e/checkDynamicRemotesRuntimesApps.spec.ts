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
    header: 'Dynamic Remotes with Runtime Environment Variables',
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
      await page.waitForLoadState('networkidle');

      // Check that env-config.json was loaded
      const envConfigRequests = networkRequests.filter(url => 
        url.includes('env-config.json')
      );
      
      expect(envConfigRequests.length).toBeGreaterThan(0);
    });

    test('should demonstrate dynamic remote loading with environment config', async ({ page }) => {
      await openLocalhost(page, 3000);

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
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(10000); // Should load within 10 seconds
    });
  });
});
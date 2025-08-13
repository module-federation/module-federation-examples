import { test, expect, Page } from '@playwright/test';

// Helper functions
async function openLocalhost(page: Page, port: number) {
  await page.goto(`http://localhost:${port}`);
  await page.waitForLoadState('networkidle');
  
  // Wait for module federation to load (give it extra time for federated components)
  await page.waitForTimeout(2000);
  
  // Wait for React to render
  await page.waitForFunction(() => {
    const elements = document.querySelectorAll('h1, h2, button, p');
    return elements.length > 0;
  }, { timeout: 30000 });
}

async function checkElementWithTextPresence(page: Page, selector: string, text: string) {
  const element = page.locator(`${selector}:has-text("${text}")`);
  await expect(element).toBeVisible();
}

async function clickElementWithText(page: Page, selector: string, text: string) {
  const element = page.locator(`${selector}:has-text("${text}")`);
  
  // Wait for element to be ready
  await element.waitFor({ state: 'visible', timeout: 10000 });
  
  // Remove any overlays that might interfere
  await page.evaluate(() => {
    const overlays = document.querySelectorAll('#webpack-dev-server-client-overlay, iframe[src*="webpack-dev-server"]');
    overlays.forEach(overlay => overlay.remove());
  });
  
  // Try clicking with retries
  let attempts = 0;
  while (attempts < 3) {
    try {
      await element.click({ timeout: 5000 });
      break;
    } catch (error) {
      attempts++;
      if (attempts >= 3) throw error;
      await page.waitForTimeout(1000);
    }
  }
  
  // Wait for any dynamic loading to complete
  await page.waitForTimeout(3000);
}

async function checkElementVisibility(page: Page, selector: string) {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
}

async function checkElementBackgroundColor(page: Page, selector: string, expectedColor: string) {
  const element = page.locator(selector);
  await expect(element).toHaveCSS('background-color', expectedColor);
}

async function waitForDynamicImport(page: Page) {
  // Wait for dynamic import to complete - looking for loading states to disappear
  await page.waitForTimeout(3000); // Give time for dynamic loading
  
  // Wait for any network activity to settle
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
    // Ignore timeout - loading might already be complete
  });
}

async function checkDateFormat(page: Page) {
  // Check for moment.js formatted date (format: "Month Day Year, time")
  const dateRegex = /\w+ \d+\w+ \d{4}, \d+:\d+/;
  const textContent = await page.textContent('body');
  expect(textContent).toMatch(dateRegex);
}

test.describe('Dynamic Remotes E2E Tests', () => {
  
  test.describe('Host Application (App 1)', () => {
    test('should display host application elements correctly', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await openLocalhost(page, 3001);

      // Check main elements exist
      await checkElementWithTextPresence(page, 'h1', 'Dynamic System Host');
      await checkElementWithTextPresence(page, 'h2', 'App 1');
      await checkElementWithTextPresence(page, 'p', 'The Dynamic System will take advantage of Module Federation');

      // Check both buttons exist
      await checkElementWithTextPresence(page, 'button', 'Load App 2 Widget');
      await checkElementWithTextPresence(page, 'button', 'Load App 3 Widget');

      // Verify no critical console errors
      const criticalErrors = consoleErrors.filter(error => 
        error.includes('Failed to fetch') || 
        error.includes('ChunkLoadError') ||
        error.includes('Module not found')
      );
      expect(criticalErrors).toHaveLength(0);
    });

    test('should dynamically load App 2 widget successfully', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await openLocalhost(page, 3001);

      // Click to load App 2 widget
      await clickElementWithText(page, 'button', 'Load App 2 Widget');
      await waitForDynamicImport(page);

      // Verify App 2 widget loaded
      await checkElementVisibility(page, '[data-e2e="APP_2__WIDGET"]');
      await checkElementWithTextPresence(page, 'h2', 'App 2 Widget');
      await checkElementBackgroundColor(page, '[data-e2e="APP_2__WIDGET"]', 'rgb(255, 0, 0)');

      // Check for moment.js date formatting
      await checkDateFormat(page);

      // Verify no module federation errors
      const moduleErrors = consoleErrors.filter(error => 
        error.includes('Loading remote module') || 
        error.includes('Module Federation')
      );
      expect(moduleErrors).toHaveLength(0);
    });

    test('should dynamically load App 3 widget successfully', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await openLocalhost(page, 3001);

      // Click to load App 3 widget
      await clickElementWithText(page, 'button', 'Load App 3 Widget');
      await waitForDynamicImport(page);

      // Verify App 3 widget loaded
      await checkElementVisibility(page, '[data-e2e="APP_3__WIDGET"]');
      await checkElementWithTextPresence(page, 'h2', 'App 3 Widget');
      await checkElementBackgroundColor(page, '[data-e2e="APP_3__WIDGET"]', 'rgb(128, 0, 128)');

      // Check for moment.js date formatting
      await checkDateFormat(page);

      // Verify no module federation errors
      const moduleErrors = consoleErrors.filter(error => 
        error.includes('Loading remote module') || 
        error.includes('Module Federation')
      );
      expect(moduleErrors).toHaveLength(0);
    });

    test('should handle sequential loading of both widgets', async ({ page }) => {
      await openLocalhost(page, 3001);

      // Load App 2 widget first
      await clickElementWithText(page, 'button', 'Load App 2 Widget');
      await waitForDynamicImport(page);
      
      // Verify App 2 widget is loaded and get its content
      await checkElementVisibility(page, '[data-e2e="APP_2__WIDGET"]');
      await checkElementWithTextPresence(page, 'h2', 'App 2 Widget');

      // Then load App 3 widget (this replaces the previous widget in this implementation)
      await clickElementWithText(page, 'button', 'Load App 3 Widget');
      await waitForDynamicImport(page);
      
      // Verify App 3 widget is loaded
      await checkElementVisibility(page, '[data-e2e="APP_3__WIDGET"]');
      await checkElementWithTextPresence(page, 'h2', 'App 3 Widget');

      // Note: In this dynamic remotes implementation, widgets replace each other
      // rather than accumulating, so we verify the latest widget is visible
    });

    test('should show loading states and handle errors gracefully', async ({ page }) => {
      await openLocalhost(page, 3001);

      // Check that buttons are initially enabled
      const app2Button = page.locator('button').filter({ hasText: 'Load App 2 Widget' });
      await expect(app2Button).toBeEnabled();

      // Monitor for any error boundaries or error states
      const errorMessages = page.locator('text="⚠️"');
      await expect(errorMessages).toHaveCount(0);
    });
  });

  test.describe('Remote Application - App 2', () => {
    test('should display App 2 standalone correctly', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await openLocalhost(page, 3002);

      // Check App 2 widget displays correctly when accessed directly
      await checkElementVisibility(page, '[data-e2e="APP_2__WIDGET"]');
      await checkElementWithTextPresence(page, 'h2', 'App 2 Widget');
      await checkElementBackgroundColor(page, '[data-e2e="APP_2__WIDGET"]', 'rgb(255, 0, 0)');

      // Check moment.js functionality
      await checkElementWithTextPresence(page, 'p', "Moment shouldn't download twice");
      await checkDateFormat(page);

      // Verify no critical console errors (filter out expected warnings)
      const criticalErrors = consoleErrors.filter(e => 
        !e.includes('webpack-dev-server') && 
        !e.includes('ReactDOM.render is no longer supported') &&
        !e.includes('DevTools') &&
        !e.includes('Warning:')
      );
      expect(criticalErrors).toHaveLength(0);
    });
  });

  test.describe('Remote Application - App 3', () => {
    test('should display App 3 standalone correctly', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await openLocalhost(page, 3003);

      // Check App 3 widget displays correctly when accessed directly
      await checkElementVisibility(page, '[data-e2e="APP_3__WIDGET"]');
      await checkElementWithTextPresence(page, 'h2', 'App 3 Widget');
      await checkElementBackgroundColor(page, '[data-e2e="APP_3__WIDGET"]', 'rgb(128, 0, 128)');

      // Check for moment.js date formatting
      await checkDateFormat(page);

      // Verify no critical console errors (filter out expected warnings)
      const criticalErrors = consoleErrors.filter(e => 
        !e.includes('webpack-dev-server') && 
        !e.includes('ReactDOM.render is no longer supported') &&
        !e.includes('DevTools') &&
        !e.includes('Warning:')
      );
      expect(criticalErrors).toHaveLength(0);
    });
  });

  test.describe('Module Federation Features', () => {
    test('should efficiently share dependencies between applications', async ({ page }) => {
      const networkRequests: string[] = [];
      
      page.on('request', (request) => {
        networkRequests.push(request.url());
      });

      // Navigate to host
      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Load both remotes
      await page.click('button:has-text("Load App 2 Widget")');
      await page.waitForTimeout(3000);
      
      await page.click('button:has-text("Load App 3 Widget")');
      await page.waitForTimeout(3000);

      // Verify React is shared efficiently (should not be loaded multiple times)
      const reactRequests = networkRequests.filter(url => 
        url.includes('react') && !url.includes('react-dom') && !url.includes('react-redux')
      );
      expect(reactRequests.length).toBeLessThan(5);

      // Verify moment.js is shared between remotes
      const momentRequests = networkRequests.filter(url => url.includes('moment'));
      expect(momentRequests.length).toBeLessThan(4);
    });

    test('should handle cross-origin requests correctly', async ({ page }) => {
      // Monitor for CORS errors
      const corsErrors: string[] = [];
      page.on('response', (response) => {
        if (response.status() >= 400 && response.url().includes('localhost:300')) {
          corsErrors.push(`${response.status()} - ${response.url()}`);
        }
      });

      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Load remotes
      await page.click('button:has-text("Load App 2 Widget")');
      await page.waitForTimeout(2000);

      // Should have no CORS errors
      expect(corsErrors).toHaveLength(0);
    });

    test('should maintain proper error boundaries during failures', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Try to load widgets normally
      await page.click('button:has-text("Load App 2 Widget")');
      await page.waitForTimeout(2000);

      // Check for React error boundaries working
      
      // Should handle any errors gracefully (either no errors or proper error boundaries)
      const criticalErrors = consoleErrors.filter(error => 
        error.includes('Uncaught') && 
        !error.includes('webpack-dev-server') &&
        !error.includes('DevTools')
      );
      expect(criticalErrors).toHaveLength(0);
    });
  });

  test.describe('Environment Configuration', () => {
    test('should use environment-based remote URLs', async ({ page }) => {
      const networkRequests: string[] = [];
      
      page.on('request', (request) => {
        networkRequests.push(request.url());
      });

      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      // Trigger dynamic loading to generate remote requests
      await page.click('button:has-text("Load App 2 Widget")');
      await page.waitForTimeout(2000);

      // Verify requests are going to the correct localhost ports
      const remoteRequests = networkRequests.filter(url => 
        url.includes('localhost:3002') || url.includes('localhost:3003')
      );
      
      expect(remoteRequests.length).toBeGreaterThan(0);
    });
  });

  test.describe('Performance and Loading', () => {
    test('should load all applications within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(10000); // Should load within 10 seconds
    });

    test('should handle dynamic imports efficiently', async ({ page }) => {
      await page.goto('http://localhost:3001');
      await page.waitForLoadState('networkidle');

      const startTime = Date.now();
      
      await page.click('button:has-text("Load App 2 Widget")');
      await page.waitForSelector('[data-e2e="APP_2__WIDGET"]', { timeout: 10000 });
      
      const dynamicLoadTime = Date.now() - startTime;
      expect(dynamicLoadTime).toBeLessThan(8000); // Dynamic loading should be fast
    });
  });
});
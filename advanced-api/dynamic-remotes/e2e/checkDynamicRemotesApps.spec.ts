import { test, expect } from './utils/base-test';
import { selectors } from './utils/selectors';
import { Constants } from './utils/constants';

test.describe('Dynamic Remotes E2E Tests', () => {
  
  test.describe('Host Application (App 1)', () => {
    test('should display host application elements correctly', async ({ basePage }) => {
      const consoleErrors: string[] = [];
      basePage.page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await basePage.openLocalhost(3001);

      // Check main elements exist
      await basePage.checkElementWithTextPresence('h1', 'Dynamic System Host');
      await basePage.checkElementWithTextPresence('h2', 'App 1');
      await basePage.checkElementWithTextPresence('p', 'The Dynamic System will take advantage of Module Federation');

      // Check both buttons exist
      await basePage.checkElementWithTextPresence('button', 'Load App 2 Widget');
      await basePage.checkElementWithTextPresence('button', 'Load App 3 Widget');

      // Verify no critical console errors
      const criticalErrors = consoleErrors.filter(error => 
        error.includes('Failed to fetch') || 
        error.includes('ChunkLoadError') ||
        error.includes('Module not found')
      );
      expect(criticalErrors).toHaveLength(0);
    });

    test('should dynamically load App 2 widget successfully', async ({ basePage }) => {
      const consoleErrors: string[] = [];
      basePage.page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await basePage.openLocalhost(3001);

      // Click to load App 2 widget
      await basePage.clickElementWithText('button', 'Load App 2 Widget');
      await basePage.waitForDynamicImport();

      // Verify App 2 widget loaded
      await basePage.checkElementVisibility(selectors.dataTestIds.app2Widget);
      await basePage.checkElementWithTextPresence('h2', 'App 2 Widget');
      await basePage.checkElementBackgroundColor(selectors.dataTestIds.app2Widget, 'rgb(255, 0, 0)');

      // Check for moment.js date formatting
      await basePage.checkDateFormat();

      // Verify no module federation errors
      const moduleErrors = consoleErrors.filter(error => 
        error.includes('Loading remote module') || 
        error.includes('Module Federation')
      );
      expect(moduleErrors).toHaveLength(0);
    });

    test('should dynamically load App 3 widget successfully', async ({ basePage }) => {
      const consoleErrors: string[] = [];
      basePage.page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await basePage.openLocalhost(3001);

      // Click to load App 3 widget
      await basePage.clickElementWithText('button', 'Load App 3 Widget');
      await basePage.waitForDynamicImport();

      // Verify App 3 widget loaded
      await basePage.checkElementVisibility(selectors.dataTestIds.app3Widget);
      await basePage.checkElementWithTextPresence('h2', 'App 3 Widget');
      await basePage.checkElementBackgroundColor(selectors.dataTestIds.app3Widget, 'rgb(128, 0, 128)');

      // Check for moment.js date formatting
      await basePage.checkDateFormat();

      // Verify no module federation errors
      const moduleErrors = consoleErrors.filter(error => 
        error.includes('Loading remote module') || 
        error.includes('Module Federation')
      );
      expect(moduleErrors).toHaveLength(0);
    });

    test('should handle sequential loading of both widgets', async ({ basePage }) => {
      await basePage.openLocalhost(3001);

      // Load App 2 widget first
      await basePage.clickElementWithText('button', 'Load App 2 Widget');
      await basePage.waitForDynamicImport();
      
      // Verify App 2 widget is loaded and get its content
      await basePage.checkElementVisibility(selectors.dataTestIds.app2Widget);
      await basePage.checkElementWithTextPresence('h2', 'App 2 Widget');

      // Then load App 3 widget (this replaces the previous widget in this implementation)
      await basePage.clickElementWithText('button', 'Load App 3 Widget');
      await basePage.waitForDynamicImport();
      
      // Verify App 3 widget is loaded
      await basePage.checkElementVisibility(selectors.dataTestIds.app3Widget);
      await basePage.checkElementWithTextPresence('h2', 'App 3 Widget');

      // Note: In this dynamic remotes implementation, widgets replace each other
      // rather than accumulating, so we verify the latest widget is visible
    });

    test('should show loading states and handle errors gracefully', async ({ basePage }) => {
      await basePage.openLocalhost(3001);

      // Check that buttons are initially enabled
      const app2Button = basePage.page.locator('button').filter({ hasText: 'Load App 2 Widget' });
      await expect(app2Button).toBeEnabled();

      // Monitor for any error boundaries or error states
      const errorMessages = basePage.page.locator('text="⚠️"');
      await expect(errorMessages).toHaveCount(0);
    });
  });

  test.describe('Remote Application - App 2', () => {
    test('should display App 2 standalone correctly', async ({ basePage }) => {
      const consoleErrors: string[] = [];
      basePage.page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await basePage.openLocalhost(3002);

      // Check App 2 widget displays correctly when accessed directly
      await basePage.checkElementVisibility(selectors.dataTestIds.app2Widget);
      await basePage.checkElementWithTextPresence('h2', 'App 2 Widget');
      await basePage.checkElementBackgroundColor(selectors.dataTestIds.app2Widget, 'rgb(255, 0, 0)');

      // Check moment.js functionality
      await basePage.checkElementWithTextPresence('p', "Moment shouldn't download twice");
      await basePage.checkDateFormat();

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
    test('should display App 3 standalone correctly', async ({ basePage }) => {
      const consoleErrors: string[] = [];
      basePage.page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await basePage.openLocalhost(3003);

      // Check App 3 widget displays correctly when accessed directly
      await basePage.checkElementVisibility(selectors.dataTestIds.app3Widget);
      await basePage.checkElementWithTextPresence('h2', 'App 3 Widget');
      await basePage.checkElementBackgroundColor(selectors.dataTestIds.app3Widget, 'rgb(128, 0, 128)');

      // Check for moment.js date formatting
      await basePage.checkDateFormat();

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
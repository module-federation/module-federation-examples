import { test, expect } from '@playwright/test';

test.describe('Debug App Structure', () => {
  test('check actual DOM structure of both apps', async ({ page }) => {
    // Listen for console errors
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    console.log('\n=== Testing App1 (port 3001) ===');
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Extra wait for React to render
    
    // Get the actual body content
    const bodyContent = await page.locator('body').innerHTML();
    console.log('App1 body HTML (first 1000 chars):', bodyContent.substring(0, 1000));
    
    // Check for any elements with text content
    const allElements = await page.locator('*').filter({ hasText: /\w+/ }).count();
    console.log('App1 elements with text:', allElements);
    
    // Check for specific patterns
    const hasModernJS = await page.locator('text=Modern.js').count();
    const hasBidirectional = await page.locator('text=Bidirectional').count();
    const hasButtons = await page.locator('button').count();
    
    console.log('App1 has Modern.js text:', hasModernJS);
    console.log('App1 has Bidirectional text:', hasBidirectional);
    console.log('App1 button count:', hasButtons);
    
    if (hasButtons > 0) {
      const buttonTexts = await page.locator('button').allTextContents();
      console.log('App1 button texts:', buttonTexts);
    }
    
    // Log console errors for App1
    console.log('App1 console errors:', consoleErrors.length > 0 ? consoleErrors : 'None');
    consoleErrors.length = 0; // Clear errors for next app
    
    console.log('\n=== Testing App2 (port 3002) ===');
    await page.goto('http://localhost:3002');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Extra wait for React to render
    
    // Get the actual body content
    const bodyContent2 = await page.locator('body').innerHTML();
    console.log('App2 body HTML (first 1000 chars):', bodyContent2.substring(0, 1000));
    
    // Check for any elements with text content
    const allElements2 = await page.locator('*').filter({ hasText: /\w+/ }).count();
    console.log('App2 elements with text:', allElements2);
    
    // Check for specific patterns
    const hasModernJS2 = await page.locator('text=Modern.js').count();
    const hasBidirectional2 = await page.locator('text=Bidirectional').count();
    const hasButtons2 = await page.locator('button').count();
    
    console.log('App2 has Modern.js text:', hasModernJS2);
    console.log('App2 has Bidirectional text:', hasBidirectional2);
    console.log('App2 button count:', hasButtons2);
    
    if (hasButtons2 > 0) {
      const buttonTexts2 = await page.locator('button').allTextContents();
      console.log('App2 button texts:', buttonTexts2);
    }
    
    // Log console errors for App2
    console.log('App2 console errors:', consoleErrors.length > 0 ? consoleErrors : 'None');
  });
});
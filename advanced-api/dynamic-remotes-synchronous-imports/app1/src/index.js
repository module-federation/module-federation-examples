/**
 * Dynamic Remote URL Initialization
 * 
 * This file demonstrates how to set up global variables that the runtime plugin
 * will use to dynamically resolve remote URLs while maintaining synchronous imports.
 */

import { app2Module } from '../../moduleConfig';

// Set up the global variable that the runtime plugin will check
// This allows dynamic URL resolution at runtime
window[app2Module.urlGlobalVariable] = app2Module.url;

console.log(`[Dynamic Remote Init] Setting ${app2Module.urlGlobalVariable} to:`, app2Module.url);

// Example: You could dynamically change this based on environment or user settings
// window.app2Url = process.env.REACT_APP_REMOTE_URL || app2Module.url;

// You could also set multiple remotes dynamically:
// window.app3Url = '//different-host:4001';
// window.app4Url = '//cdn.example.com/remotes';

// Bootstrap the application after setting up dynamic configurations
import('./bootstrap').catch(error => {
  console.error('[Dynamic Remote Init] Failed to bootstrap application:', error);
  
  // Optionally show user-friendly error message
  document.body.innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial, sans-serif;">
      <h2>Application Failed to Load</h2>
      <p>Unable to initialize the application. Please check the console for details.</p>
      <details>
        <summary>Error Details</summary>
        <pre>${error.message}</pre>
      </details>
    </div>
  `;
});

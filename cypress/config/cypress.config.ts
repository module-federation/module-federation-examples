import { defineConfig } from "cypress";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {

  return config;
}

export default defineConfig({
  e2e: {
    excludeSpecPattern: '*.js',
    specPattern: './**/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: './cypress/support/e2e.ts',
    fixturesFolder: './cypress/fixtures',
    defaultCommandTimeout: 10000,
    video: true,
    videoUploadOnPasses: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    pageLoadTimeout: 61000,
    taskTimeout: 61000,
    watchForFileChanges: false,
    retries: {
      runMode: 1,
    },
    env: {
      localhost3000: "http://localhost:3000",
      localhost3001: "http://localhost:3001",
      localhost3002: "http://localhost:3002",
      localhost3003: "http://localhost:3003",
      localhost5000: "http://localhost:5000",
      localhost5001: "http://localhost:5001"
    },
    setupNodeEvents
  },
});

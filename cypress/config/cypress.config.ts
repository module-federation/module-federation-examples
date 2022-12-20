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
    defaultCommandTimeout: 10_000,
    video: true,
    videoUploadOnPasses: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    pageLoadTimeout: 61_000,
    taskTimeout: 61_000,
    watchForFileChanges: false,
    experimentalSessionAndOrigin: true,
    chromeWebSecurity: false,
    retries: {
      runMode: 1,
    },
    env: {
      localhost3000: "http://localhost:3000",
      localhost3001: "http://localhost:3001",
      localhost3002: "http://localhost:3002",
      localhost3003: "http://localhost:3003",
      localhost3004: "http://localhost:3004",
      localhost4200: "http://localhost:4200",
      localhost4300: "http://localhost:4300",
      localhost5000: "http://localhost:5000",
      localhost5001: "http://localhost:5001",
      localhost8081: "http://localhost:8081"
    },
    setupNodeEvents
  },
});

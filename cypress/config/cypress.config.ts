import { defineConfig } from "cypress";

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
    setupNodeEvents(on, config) {
    },
    env: {
      localhost3001: "http://localhost:3001"
    }
  },
});

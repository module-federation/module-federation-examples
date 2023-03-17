import { defineConfig } from "cypress";

const fs = require('fs')
const path = require('path');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {

  // @ts-ignore
  on('before:browser:launch', (browser = {}, launchOptions) => {
    console.log(
      'launching browser %s is headless? %s',
      browser.name,
      browser.isHeadless,
    )

    // the browser width and height we want to get
    // our screenshots and videos will be of that resolution
    const width = 1920
    const height = 1080

    console.log('setting the browser window size to %d x %d', width, height)

    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push(`--window-size=${width},${height}`)

      // force screen to be non-retina and just use our given resolution
      launchOptions.args.push('--force-device-scale-factor=1')
    }

    if (browser.name === 'electron' && browser.isHeadless) {
      // might not work on CI for some reason
      launchOptions.preferences.width = width
      launchOptions.preferences.height = height
    }

    if (browser.name === 'firefox' && browser.isHeadless) {
      launchOptions.args.push(`--width=${width}`)
      launchOptions.args.push(`--height=${height}`)
    }

    // IMPORTANT: return the updated browser launch options
    return launchOptions
  })

  on ('task', 
    {
      readFile({
        filePath 
      }) {
        return fs.readFileSync(path.resolve(`../../${filePath}`),'utf8')
      }
    }
  )

  on ('task', 
  {
    writeToFile({
      filePath,
      content 
    }) {
      return new Promise((resolve, reject) => {
        //@ts-ignore
        fs.writeFile(path.resolve(`../../${filePath}`), content, err => { 
          try {
            console.log(filePath)
            resolve(true)
          } catch (error) {
            console.log(err)
            reject(error)
          }
        });
      })
    }
  }
)

allureWriter(on, config);

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
    experimentalSessionAndOrigin: true,
    chromeWebSecurity: false,
    includeShadowDom: true,
    retries: {
      runMode: 1,
    },
    env: {
      allure: true,
      allureResultsPath: '../../results/allure-results',
      localhost3000: "http://localhost:3000",
      localhost3001: "http://localhost:3001",
      localhost3002: "http://localhost:3002",
      localhost3003: "http://localhost:3003",
      localhost3004: "http://localhost:3004",
      localhost3005: "http://localhost:3005",
      localhost3006: "http://localhost:3006",
      localhost3007: "http://localhost:3007",
      localhost4000: "http://localhost:4000",
      localhost4001: "http://localhost:4001",
      localhost4002: "http://localhost:4002",
      localhost4003: "http://localhost:4003",
      localhost4004: "http://localhost:4004",
      localhost4005: "http://localhost:4005",
      localhost4006: "http://localhost:4006",
      localhost4007: "http://localhost:4007",
      localhost4008: "http://localhost:4008",
      localhost4173: "http://localhost:4173",
      localhost4200: "http://localhost:4200",
      localhost4201: "http://localhost:4201",
      localhost4300: "http://localhost:4300",
      localhost5000: "http://localhost:5000",
      localhost5001: "http://localhost:5001",
      localhost5173: "http://localhost:5173",
      localhost8080: "http://localhost:8080",
      localhost8081: "http://localhost:8081",
      localhost8082: "http://localhost:8082",
      localhost8083: "http://localhost:8083",
      localhost8084: "http://localhost:8084",
      localhost9000: "http://localhost:9000",
      localhost9001: "http://localhost:9001",
      localhost9002: "http://localhost:9002"
    },
    setupNodeEvents
  },
});

# UMD Federation Demo

This example demonstrates loading 3 remotes using the ModuleFederationPlugin
1. app2 (umd remote react app)
2. @remix-run/routr (umd remote library)
3. mf-app-01 (mf remote react app)


Run `npm run start`. This will build and serve both `app1` and `app2` on ports 9001 and 9002 respectively.

- HOST (app1): [localhost:9001](http://localhost:9001)
- REMOTE (app2): [localhost:9002](http://localhost:9002/main.js)
- REMOTE (mf-app-01): [https://cdn.jsdelivr.net/npm/mf-app-01/dist/remoteEntry.js](https://cdn.jsdelivr.net/npm/mf-app-01/dist/remoteEntry.js)

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)

## try online

https://stackblitz.com/github/module-federation/module-federation-examples/tree/master/umd-federation?file=app1/webpack.config.js

Create lerna.json if you are in online example
{
   "version": "0.0.0",
   "npmClient": "yarn",
   "useWorkspaces": true
}
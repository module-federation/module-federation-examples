# Dynamic vendor sharing

Implements a control panel in the runtime plugin for module federation 1.5 in rspack or `@module-federation/enhanced` 
Control panel allows you to change the rules for shared modules and upgrade or downgrade applications deterministically based on the inputs from the react form.


## Main parts

- `./app1/control-share.ts` - the runtime plugin that implements the rules
- `./app1/src/ControlPanel.js` - the react form that allows to change the rules
##Read More:
https://github.com/webpack/webpack/pull/10960

- `app1` exposes a red `<button>App 1 Button</button>` component.
- `app2` exposes a blue `<button>App 2 Button</button>` component.

# Running Demo

Run `yarn start`. This will build and serve both `app1` and `app2` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3001/)
- [localhost:3002](http://localhost:3002/)

# Running Cypress E2E Tests

To run tests in interactive mode, run `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)

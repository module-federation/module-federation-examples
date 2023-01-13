# React in Vue - Module Federation Demo

This demo is a simple proof of concept approach for fetching a React component from a _"remote"_ React app and mounting it within a Vue _"host"_ app using module federation.

The Vue app fetches and renders a **React button which can be used to increment a counter controlled by Vue**. The button text can be manipulated via a text input and it can also be unmounted/mounted using a checkbox.

This illusatrates that the approach used allows communication to-and-fro Vue and React, as well as correctly handling React lifecycle hooks when the host app unmounts the parent component.

---

## Running

Install dependencies

`yarn`

Then run development servers with

`yarn start`

This will build and serve both `home` and `layout` on ports `3002` and `3001` respectively.

- Host (layout, Vue app): [localhost:3001](http://localhost:3001/)
- Remote (home, React app): [localhost:3002](http://localhost:3002/)

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)

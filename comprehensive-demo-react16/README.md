# Getting Started

```sh
yarn install
yarn start
```

Open [http://localhost:3001](http://localhost:3001).

The demo is annotated so navigate through the demos and apps available.

Included apps:

- App #1 (ReactJS - acts as the app shell plus is an aggregation with other remotes): [http://localhost:3001](http://localhost:3001)
- App #2 (ReactJS - plus is an aggregation with other remotes): [http://localhost:3002](http://localhost:3002)
- App #3 (ReactJS): [http://localhost:3003](http://localhost:3003)
- App #4 (SvelteJS): [http://localhost:3004](http://localhost:3004)
- App #5 (LitElement): [http://localhost:3005](http://localhost:3005)
  <img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/ComprehensiveDemo">

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)

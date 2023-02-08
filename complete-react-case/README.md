# react-webpack-MF

[中文](./README_zh-cn.md)

A complete Webpack Module Federation Case with React.

# project directory

## lib-app

It is a low-level or basic app, which exposes libraries like `react`, `react-dom`.

It is a pure `remote`

## component-app

It is a middle-level app, which depends on modules exposed from `lib-app` : `react` ,`react-dom`. In the meantime, it also exposes components: `Dialog`, `Button` to another app called `main-app`.

It is both host and remote.

## main-app

the top-level app, which depends on `lib-app` and `component-app`.

It is a pure host.

# how to use

- `npm install`
- `npx lerna bootstrap`
- `npm run start`

after all the commands done, open your browser at `http://localhost:3002`, open the dev-tool's network tab to see resources loading details

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)

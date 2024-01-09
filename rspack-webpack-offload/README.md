# rspack as vendor offload to webpack

Speed up webpack by offloading shared modules to rspack which can parse them faster.

In this, we disable module share imports in webpack with 
`import: false` on share scope

In rspack, we ensure these modules are actually used in the build somewhere, so they are not tree shaken out. 
Often ill expose a file that imports it all to force the modules to exist, then never load that exposed key.

Now rspack will only provide npm packages, webpack will treat them as externals and expect rspack to provide them over federation.

[中文](./README_zh-cn.md)

A complete Webpack Module Federation Case with React.

# project directory

## lib-app

It is a low-level or basic app, which exposes libraries like `react`, `react-dom`.

It is a pure `remote` using rspack

## component-app

It is a middle-level app, which depends on modules exposed from `lib-app` : `react` ,`react-dom`. In the meantime, it also exposes components: `Dialog`, `Button` to another app called `main-app`.

It is both host and remote, uses webpack

## main-app

the top-level app, which depends on `lib-app` and `component-app`.

It is a pure host, uses webpack

# how to use

- `pnpm install`
- `pnpm run start`

after all the commands done, open your browser at `http://localhost:3002`, open the dev-tool's network tab to see resources loading details

# Running Cypress E2E Tests

To run tests in interactive mode, run `nppm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)

# Federating Wasm Modules

Using Module Federation to federate Wasm modules across independent applications. In this demo, we will use Conways Game of Life to illustrate how Wasm can be shared.

## Up and Running

1. Make sure you have node.js installed locally
2. From the root of the project run: `yarn && yarn start`.

This will start the `Host` and `Remote` applications in dev mode.

1. The `Host` app is hosted on port `8080`
2. The `Remote` app is hosted on port `8081`

Navigate to your browser and open the `Host` app running on http://localhost:8080. You should see a few buttons. Click the "Play" button to start the app. Click the "Stop" button (same button) to pause the execution. Press the "Tick" button to step through the execution frame-by-frame, and lastly click the "Reset" button to reset the app.

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)

## Module Federation

Webpack's Module Federation Plugin **powers** the sharing of the Wasm module between our two apps at runtime. Below is a low-fidelity diagram illustrating how webpack is used to share code.

> 💡 For more on Module federation, see the [docs](https://webpack.js.org/concepts/module-federation/)
> and checkout this [write-up](https://medium.com/swlh/webpack-5-module-federation-a-game-changer-to-javascript-architecture-bcdd30e02669).

![Diagram](https://raw.githubusercontent.com/alexUXUI/wasm-federation-demo/main/diagram.png)

As seen in the diagram above, the `Host` application imports a Wasm module from the `Remote` application. Under the hood, this import happens in an async boundary, which is created by webpack and wraps around the react app, giving webpack the opportunity to make an async HTTP call for the Wasm module.

The Wasm module on the left (purple) has a dotted line to represent that the Wasm code does not exist in the `Host` app until it is federated in at runtime.

Let's see how this is implemented in our webpack configs.

Host configs: `packages/host/webpack.config.js`

```JavaScript
new ModuleFederationPlugin({
  name: "Host",
  remotes: {
    GameOfLifeModule: `GameOfLifeModule@http://localhost:8081/remoteEntry.js`,
  },
}),
```

Remote configs: `packages/remote/webpack.config.js`

```JavaScript
new ModuleFederationPlugin({
  name: "GameOfLifeModule",
  filename: "remoteEntry.js",
  exposes: {
    "./GameOfLifeModule": "./pkg/",
  },
}),
```

The `Remote` app uses Webpack Module Federation to expose the Wasm module for consumption by the `Host` app. As pictured in the code snipet above, the `./pkg` code will be made available through the `http://localhost:8081/remoteEntry.js` file.

## Wasm

The `GameOfLife` Wasm module, pictured above as `GameOfLifeModule`, contains the logic for [Conways Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). The source code for this particular implementation was borrowed from [The Offical Rust Wasm Docs.](https://rustwasm.github.io/docs/book/game-of-life/implementing.html)

The consumption and usage of our Wasm module can be found in the `packages/host/app.jsx` file on lines 2 and 12.

On line 2 we are importing the federated Wasm module:

```JavaScript
import * as GameOfLife from "GameOfLifeModule/GameOfLifeModule";
```

and on line 12 we are consuming the module:

```JavaScript
GameOfLife.then(({ Universe }) => {
  if (!cells) {
    setCells(Universe.new());
  }
});
```

In the example above, the Wasm Module exports a class `Universe` which we use to initialize a new Game Of Life. We then set the instance of the new Universe in a slice of react state on the same line, and reference the Universe as `cells` throughout the rest of the component. This allows us to use react to control a Wasm module that is being federated into react from a completely stand-alonle remote app.

## Local Development

In order to run the Rust->Wasm toolchain, please make sure you have the project dependencies in the next section installed.

Once those are installed, go to `packages/remote/webpack.config.js` and uncomment the code that has been commented out.

you can start developing on the `Remote` app or the `Host` app with `yarn start`.

> 💡 For local development of Host app, make sure that the Remote app is also running so that the import of the Wasm module does not fail. You can start both apps by running yarn start in the top-level dir.

## Project Dependencies

Install [Rust](https://www.rust-lang.org/tools/install)

```shell
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | shv
```

Source your bash profile after the step above (source $HOME/.cargo/env)

Install [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

```shell
$ curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

## Packages Overview

This mini monorepo consists of two packages. Here is a bit more about each.

### `Packages/Host`

Consumer of federated Wasm module. Uses React to interact with the federated Wasm module but could also be written in plain JavaScript like the `Remote`.

### `Packages/Remote`

Exposes Wasm module. Wasm module is built with Rust, compiled by webpack wasm-pack loader.

> This package was bootstrapped with the [Rust Webpack Template](https://github.com/rustwasm/rust-webpack-template) project. For more, visit their repo as well as the fabulous docs at the [Rust Wasm webiste](https://rustwasm.github.io/docs/book/).

---

## Acknowledgements and Credits

This demo is built upon many OSS projects including:

- [Rust Webpack Template](https://github.com/rustwasm/rust-webpack-template) -> Template Used to bootsrap the `Remote` app
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/) -> Used to share the Wasm module across apps
- [The Offical Rust Wasm Docs](https://rustwasm.github.io/docs/book/game-of-life/implementing.html) -> Provided starter Game Of Life Code
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) -> Webpack loader for compiling Rust to Wasm

# Running Cypress E2E Tests

To run tests in interactive mode, run  `npm run cypress:debug` from the root directory of the project. It will open Cypress Test Runner and allow to run tests in interactive mode. [More info about "How to run tests"](../../cypress/README.md#how-to-run-tests)

To build app and run test in headless mode, run `yarn e2e:ci`. It will build app and run tests for this workspace in headless mode. If tets failed cypress will create `cypress` directory in sample root folder with screenshots and videos.

["Best Practices, Rules amd more interesting information here](../../cypress/README.md)

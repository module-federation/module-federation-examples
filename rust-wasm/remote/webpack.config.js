const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

// @TODO: uncomment this if you want to dev on the Rust src code.
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    index: './public/index.js',
  },
  // This example is only exercised in modern browsers (Playwright Chromium).
  // Allow async/await in output to prevent overlay warnings that can block e2e clicks.
  target: ['web', 'es2017'],
  output: {
    path: dist,
    filename: '[name].js',
  },
  devServer: {
    client: {
      overlay: false,
    },
    port: 8081,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  experiments: { asyncWebAssembly: true },
  plugins: [
    new CopyPlugin({ patterns: [{ from: path.resolve(__dirname, '') }] }),

    // @TODO: uncomment this if you want to dev on the Rust src code.
    // Webpack will load the Rust code and compile it to Wasm using Wasm-Pack.
    // Wasm-pack will also generate all the JS bindings needed to interop with JS,
    // found in the `./pkg` directory.
    //
    // new WasmPackPlugin({
    //   crateDirectory: __dirname,
    // }),

    new ModuleFederationPlugin({
      experiments: { asyncStartup: true },
      name: 'GameOfLifeModule',
      shareStrategy: 'loaded-first',
      filename: 'remoteEntry.js',
      exposes: {
        './GameOfLifeModule': './pkg/',
      },
    }),
  ],
};

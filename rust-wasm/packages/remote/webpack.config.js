const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

// @TODO: uncomment this if you want to dev on the Rust src code.
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    index: './public/index.js',
  },
  output: {
    path: dist,
    filename: '[name].js',
  },
  devServer: {
    port: 8081,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8080',
    },
  },
  experiments: { asyncWebAssembly: true },
  plugins: [
    new CopyPlugin({patterns: [
      {from: path.resolve(__dirname, "")}
    ]}),

    // @TODO: uncomment this if you want to dev on the Rust src code.
    // Webpack will load the Rust code and compile it to Wasm using Wasm-Pack.
    // Wasm-pack will also generate all the JS bindings needed to interop with JS,
    // found in the `./pkg` directory.
    //
    // new WasmPackPlugin({
    //   crateDirectory: __dirname,
    // }),

    new ModuleFederationPlugin({
      name: 'GameOfLifeModule',
      filename: 'remoteEntry.js',
      exposes: {
        './GameOfLifeModule': './pkg/',
      },
    }),
  ],
};

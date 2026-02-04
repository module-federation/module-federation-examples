const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  // The sample uses async remotes + async WebAssembly, and runs in modern browsers (Playwright Chromium).
  // Explicitly allow async/await in output to avoid webpack-dev-server overlay warnings that can block clicks in e2e.
  target: ['web', 'es2017'],
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          // `src/index.js` contains JSX, so ensure .js files are parsed as JSX.
          // This is safe for plain JS files too.
          loader: 'jsx',
          target: 'es2015',
        },
      },
      {
        test: /\.jsx$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'es2015',
        },
      },
    ],
  },
  devServer: {
    client: {
      // The overlay iframe can intercept pointer events and make Playwright clicks hang.
      // Keep warnings in terminal output instead.
      overlay: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080,
    open: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      experiments: { asyncStartup: true },
      name: 'Host',
      shareStrategy: 'loaded-first',
      remotes: {
        GameOfLifeModule: `GameOfLifeModule@http://localhost:8081/remoteEntry.js`,
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

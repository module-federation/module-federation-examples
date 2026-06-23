const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  mode: 'development',
  cache: false,
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
  },
  output: {
    // Ensure this build doesn't collide with App1's webpack chunk globals when both are on the same page.
    uniqueName: 'single_runtime_app2',
    publicPath: 'auto',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      experiments: { asyncStartup: true },
      name: 'app2',
      // Keep MF runtime from colliding with other instances.
      // Also used as the key for the remote entry global.
      library: { type: 'var', name: 'app2' },
      // With enhanced federation + asyncStartup we must keep remotes loaded via script tags.
      // Otherwise webpack treats `app1@http://.../remoteEntry.js` as a `var` external and emits invalid JS.
      remoteType: 'script',
      shareStrategy: 'loaded-first',
      filename: 'remoteEntry.js',
      remotes: {
        app1: 'app1@http://localhost:3001/remoteEntry.js',
      },
      runtimePlugins: [require.resolve('./single-runtime.js')],
      exposes: {
        './Button': './src/Button',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
        lodash: {},
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

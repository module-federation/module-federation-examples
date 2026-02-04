const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  cache: false,
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3001,
  },
  target: 'web',
  output: {
    // Ensure this build doesn't collide with App2's webpack chunk globals when both are on the same page.
    uniqueName: 'single_runtime_app1',
    publicPath: 'auto',
  },
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
      name: 'app1',
      // Keep MF runtime from colliding with other instances.
      // Also used as the key for the remote entry global.
      library: { type: 'var', name: 'app1' },
      // With enhanced federation + asyncStartup we must keep remotes loaded via script tags.
      // Otherwise webpack treats `app2@http://.../remoteEntry.js` as a `var` external and emits invalid JS.
      remoteType: 'script',
      shareStrategy: 'loaded-first',
      filename: 'remoteEntry.js',
      remotes: {
        app2: 'app2@http://localhost:3002/remoteEntry.js',
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
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      excludeChunks: ['app1', 'app1_partial'],
    }),
  ],
};

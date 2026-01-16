const {
  HtmlRspackPlugin,
} = require('@rspack/core');
const {ModuleFederationPlugin} = require('@module-federation/enhanced/rspack')

const path = require('path');
module.exports = {
  // Build a Node-consumable remoteEntry (CommonJS container interface).
  target: 'async-node',
  entry: './index.js',
  mode: 'development',
  devtool: 'hidden-source-map',
  output: {
    publicPath: 'http://localhost:3001/',
    clean: true,
    library: { type: 'commonjs-module', name: 'component_app' },
  },
  resolve: {
    extensions: [".jsx", ".js", ".json", ".wasm"]
  },
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'component_app',
      library: { type: 'commonjs-module', name: 'component_app' },
      filename: 'remoteEntry.js',
      // Enable MF runtime support for loading remote chunks over HTTP in Node.
      runtimePlugins: [require.resolve('@module-federation/node/runtimePlugin')],
      exposes: {
        './Button': './src/Button.jsx',
        './Dialog': './src/Dialog.jsx',
        './Logo': './src/Logo.jsx',
        './ToolTip': './src/ToolTip.jsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '17.0.2' },
        'react-dom': { singleton: true, requiredVersion: '17.0.2' },
      },
    }),
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
  ],
};

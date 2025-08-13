const {
  HtmlRspackPlugin,
} = require('@rspack/core');
const {ModuleFederationPlugin} = require('@module-federation/enhanced/rspack')

const path = require('path');
const deps = require('./package.json').dependencies;
const { createSharedConfig, createDevServerConfig, swcConfig } = require('../shared-config');
module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: createDevServerConfig(3003),
  target: 'web',
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'builtin:swc-loader',
          options: swcConfig,
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app3',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/Widget',
      },
      shared: createSharedConfig({
        moment: {
          requiredVersion: deps.moment,
          singleton: false,
        },
        'react-redux': {
          requiredVersion: deps['react-redux'],
          singleton: true,
        },
        redux: {
          requiredVersion: deps.redux,
          singleton: true,
        },
      }),
      dts: {
        generateTypes: false,
        generateAPITypes: false,
      },
      manifest: {
        fileName: 'mf-manifest.json',
        getPublicPath: () => 'auto',
      },
    }),
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
  ],
};

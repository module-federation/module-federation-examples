const { HtmlRspackPlugin } = require('@rspack/core');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const path = require('path');
const { createSharedConfig, createDevServerConfig, swcConfig } = require('../shared-config');

module.exports = {
  entry: './src/index',
  mode: 'development',
  target: 'web',
  devServer: createDevServerConfig(3001),
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@module-federation/runtime$': require.resolve('@module-federation/runtime'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'builtin:swc-loader',
          options: {
            ...swcConfig,
            jsc: {
              ...swcConfig.jsc,
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
            },
          },
        },
      },
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
      experiments: { asyncStartup: true },
      name: 'app1',
      // adds react as shared module
      // version is inferred from package.json
      // there is no version check for the required version
      // so it will always use the higher version found
      shared: createSharedConfig(),
      dts: {
        generateTypes: true,
        generateAPITypes: true,
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

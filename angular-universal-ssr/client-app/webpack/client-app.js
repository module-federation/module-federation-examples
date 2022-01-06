const { resolve } = require('path');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = (env = {}) => {
  const buildFolder = resolve('./dist');

  return {
    entry: ['./src/polyfills.ts', './src/main.ts'],
    mode: 'production',
    output: {
      publicPath: 'http://localhost:5000/',
      path: resolve(__dirname, buildFolder),
    },
    plugins: [
      new ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, '../src/index.html'),
      }),
      new ModuleFederationPlugin({
        name: 'clientApp',
        filename: 'remoteEntry.js',
        library: { type: 'var', name: 'clientApp' },
        exposes: {
          './Component': './src/app/client-cities/client-city/client-city.component.ts',
          './Module': './src/app/client-cities/client-cities.module.ts',
        },
        shared: [
          { '@angular/core': { singleton: true, eager: true } },
          { '@angular/common': { singleton: true, eager: true } },
          { '@angular/router': { singleton: true, eager: true } },
        ],
      }),

      new AngularCompilerPlugin({
        tsConfigPath: './tsconfig.app.json',
        entryModule: './src/app/app.module#AppModule',
        skipCodeGeneration: true,
        directTemplateLoading: false,
      }),
    ],
    devServer: {
      static: {
        directory: buildFolder,
      },
      port: 5000,
    },
    module: {
      rules: [...require('./_loaders')],
    },
  };
};

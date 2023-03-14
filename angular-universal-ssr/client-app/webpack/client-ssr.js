const { AngularWebpackPlugin } = require('@ngtools/webpack');
const { resolve } = require('path');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = (env = {}) => {
  const buildFolder = resolve('./dist/server');

  return {
    entry: ['./src/main.ts'],
    mode: 'production',
    resolve: {
      mainFields: ['browser', 'module', 'main'],
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: '[name].js',
      path: resolve(__dirname, buildFolder),
      chunkFilename: '[id].[chunkhash].js',
      libraryTarget: 'commonjs2',
    },
    target: 'async-node',
    plugins: [
      new ProgressPlugin(),
      new ModuleFederationPlugin({
        name: 'clientApp',
        filename: 'remoteEntry.js',
        library: { type: 'commonjs2' },
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
      new AngularWebpackPlugin({
        entryModule: resolve(__dirname, '../src/app/app.module#AppModule'),
        tsConfigPath: './tsconfig.app.json',
        platform: 1,
        jitMode: true,
        skipCodeGeneration: true,
        directTemplateLoading: false,
      }),
    ],
    module: {
      rules: [...require('./_loaders')],
    },
  };
};

const { resolve } = require('path');
const { AngularWebpackPlugin } = require('@ngtools/webpack');
const { ContextReplacementPlugin } = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = (env = {}) => {
  const buildFolder = resolve('./dist/server');

  return {
    entry: ['./server.js'],
    mode: 'production',
    resolve: {
      mainFields: ['es2015', 'module', 'main'],
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: '[name].js',
      path: resolve(__dirname, buildFolder),
      chunkFilename: '[id].[chunkhash].js',
      libraryTarget: 'commonjs2',
    },
    target: 'async-node',
    optimization: { minimize: false },
    externals: ['enhanced-resolve'],
    plugins: [
      new ProgressPlugin(),

      new ModuleFederationPlugin({
        name: 'hostApp',
        filename: 'remoteEntry.js',
        library: { type: 'commonjs2' },
        remotes: {
          clientApp: resolve(__dirname, '../../client-app/dist/server/remoteEntry.js'),
        },
        shared: [
          { '@angular/core': { singleton: true, eager: true } },
          { '@angular/common': { singleton: true, eager: true } },
          { '@angular/router': { singleton: true, eager: true } },
        ],
      }),

      new ContextReplacementPlugin(/@?hapi(\\|\/)/),
      new ContextReplacementPlugin(/express(\\|\/)/),
      new AngularWebpackPlugin({
        entryModule: resolve(__dirname, '../src/app/app.server.module#AppServerModule'),
        tsConfigPath: './tsconfig.server.json',
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

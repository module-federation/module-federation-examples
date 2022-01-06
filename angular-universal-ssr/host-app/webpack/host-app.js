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
      path: resolve(__dirname, buildFolder),
    },
    plugins: [
      new ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, '../src/index.html'),
      }),

      // new ContainerReferencePlugin({
      //   remoteType: "var",
      //   remotes: { clientApp: "clientApp" },
      //   overrides: ["@angular/core", "@angular/common", "@angular/router"],
      // }),

      new ModuleFederationPlugin({
        library: { type: 'var' },
        remotes: {
          clientApp: 'clientApp',
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
    module: {
      rules: [...require('./_loaders')],
    },
  };
};

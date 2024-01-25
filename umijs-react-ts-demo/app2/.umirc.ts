import { defineConfig } from "umi";
import { join } from 'path';

function webpackDeepPathImportWorkaround() {
  const mod = require('module');
  const resolveFilename = mod._resolveFilename;

  mod._resolveFilename = function (request: string, parent: any, isMain: boolean, options: any) {
    let newRequest = request;

    if (/@umijs\/bundler-webpack\/compiled\/(lib|schemas)\//.test(request)) {
      newRequest = request.replace(
        /.*\/@umijs\/bundler-webpack\/compiled\/(lib|schemas)\//,
        join(__dirname, '../node_modules/webpack/$1', './'),
      );
    }

    return resolveFilename.call(mod, newRequest, parent, isMain, options);
  };
}

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'pnpm',
  chainWebpack: (config) => {
    // reference https://github.com/umijs/umi/issues/10583
    webpackDeepPathImportWorkaround();

    const { ModuleFederationPlugin } = require('@module-federation/enhanced');

    config.plugin('mf').use(ModuleFederationPlugin, [{
      remotes: [
        {
          name: "app1",
          entry: `http://localhost:3001/remoteEntry.js`,
          alias: "app1",
        },
      ],
      shared: {
        react: {
          singleton: true,
          version: '18.2.48',
        },
        'react-dom': {
          singleton: true,
          version: '18.2.18',
        },
      },
    }])
  }
});

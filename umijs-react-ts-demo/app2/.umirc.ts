import { defineConfig } from "umi";
import { join } from 'path';

const externals = {
  react: "window.React",
  "react-dom": "window.ReactDOM",
}

function webpackDeepPathImportWorkaround() {
  const mod = require('module');
  const resolveFilename = mod._resolveFilename;

  mod._resolveFilename = function (request: string, parent: any, isMain: boolean, options: any) {
    let newRequest = request;

    if (/@umijs\/bundler-webpack\/compiled\/(lib|schemas)\//.test(request)) {
      newRequest = request.replace(
        /.*\/@umijs\/bundler-webpack\/compiled\/(lib|schemas)\//,
        join(__dirname, './node_modules/webpack/$1', './'),
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
  chainWebpack: (config: any) => {
    // reference https://github.com/umijs/umi/issues/10583
    webpackDeepPathImportWorkaround();

    const { ModuleFederationPlugin } = require('@module-federation/enhanced');

    config.plugin('mf').use(ModuleFederationPlugin, [{
      remotes: {
        app1: 'app1@http://localhost:3001/remoteEntry.js'
      },
      shared: {
        react: {
          import: false,
          singleton: true,
          version: '18.2.0',
        },
        'react-dom': {
          import: false,
          singleton: true,
          version: "16.14.0",
        },
      },
      runtimePlugins: [require.resolve('./runtime.js')],
    }])
  },
  headScripts: [
    "https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.production.min.js",
    "https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
  ],
  externals,
  mfsu: false
});

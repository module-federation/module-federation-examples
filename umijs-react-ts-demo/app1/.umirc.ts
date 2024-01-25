import { defineConfig } from 'umi';
import { join } from 'path';

const pkg = require('../package.json');
const deps = pkg.dependencies;

function webpackDeepPathImportWorkaround() {
  const mod = require('module');
  const resolveFilename = mod._resolveFilename;

  mod._resolveFilename = function (request: string, parent: any, isMain: boolean, options: any) {
    let newRequest = request;

    if (/\/@umijs\/deps\/compiled\/(lib|schemas)\//.test(request)) {
      newRequest = request.replace(
        /.*@umijs\/deps\/compiled\/(lib|schemas)\//,
        join(__dirname, './node_modules/webpack/$1', './'),
      );
    }

    return resolveFilename.call(mod, newRequest, parent, isMain, options);
  };
}

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  chainWebpack: (config) => {
    // reference https://github.com/umijs/umi/issues/10583
    webpackDeepPathImportWorkaround();

    const { ModuleFederationPlugin } = require('@module-federation/enhanced');

    config.plugin('mf').use(ModuleFederationPlugin, [{
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/pages/index',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: '^17.0.0',
          version: '0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^17.0.0',
          version: '0',
        },
      },
    }])
  }
});

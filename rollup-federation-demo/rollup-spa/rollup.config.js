import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import federation from '@module-federation/rollup-federation';
import copy from 'rollup-plugin-copy'

import pkg from './package.json';

export default {
  input: 'src/index.js',
  preserveEntrySignatures: false,
  plugins: [
    injectProcessEnv({
      NODE_ENV: 'production',
    }),
    resolve({
      browser: true,
      transformMixedEsModules: true,
      modulesOnly: true,
      dedupe: ['react', 'react-dom'],
      extensions: ['.mjs', '.js', '.jsx', '.json'],
      preferBuiltins: false,
    }),
    commonjs({
      transformMixedEsModules: true,
      include: ['node_modules/*', '../node_modules/*'],
    }),
    babel(),
    // This hack is required to have rollup inside yarn worskpaces since it can't properly resolve dependencies from
    // parent folder.
    copy({
      targets: [
        {src: [
            '../node_modules/react/umd/react.development.js',
            '../node_modules/react/umd/react.production.min.js',
            '../node_modules/react-dom/umd/react-dom.development.js',
            '../node_modules/react-dom/umd/react-dom.production.min.js'
          ],
          dest: 'vendor'
        }
      ]
    }),
    federation({
      remotes: {
        foo_app1: 'rwebpackremote',
        foo_rollup_spa: 'rollup_spa',
      },
      shared: {
      },
    }),
  ],
  output: [{ format: 'system', dir: pkg.main }],
};

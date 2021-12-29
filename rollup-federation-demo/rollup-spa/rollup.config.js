import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import federation from '@module-federation/rollup-federation';

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
      include: ['node_modules/*'],
    }),
    babel(),
    federation({
      remotes: {
        foo_app1: 'rwebpackremote',
        foo_rollup_spa: 'rollup_spa',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: pkg.dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: pkg.dependencies['react-dom'],
        },
      },
    }),
  ],
  output: [{ format: 'system', dir: pkg.main }],
};

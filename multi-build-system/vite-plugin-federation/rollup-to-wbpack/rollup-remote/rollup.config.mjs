import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import federation from '@originjs/vite-plugin-federation';
import copy from 'rollup-plugin-copy'

export default {
  input: "src/main.jsx",
  preserveEntrySignatures: false,
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),,
    resolve(),
    babel({   
      babelrc: true,
      exclude: 'node_modules/**'
    }),
    commonjs(),
    federation({
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button.jsx"
      }
    }),
    copy({
      targets: [
        { src: 'index.html', dest: 'dist' },
      ]
    })
  ],
  output: {
    format: "esm",
    dir: "dist"
  },
};
const path = require('path');
const deps = require('./package.json').dependencies;
const {
  UniversalFederationPlugin,
  NodeFederationPlugin,
  StreamingTargetPlugin,
} = require('@module-federation/node');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  name: 'server',
  entry: ['@babel/polyfill', path.resolve(__dirname, './src/index')],
  devtool: false,
  mode: 'development',
  output: {
    path: path.join(__dirname, '/dist/server'),
    filename: 'index.js',
    libraryTarget: 'commonjs-module',
  },
  target: false,
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  externals: {
    '@azure/functions-core': '@azure/functions-core',
    fs: 'fs',
    path: 'path',
    stream: 'stream',
    buffer: 'buffer',
    util: 'util',
  },
  node: {
    __dirname: false,
  },
  stats: {
    colors: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
        },
      },
    ],
  },
  plugins: [
    new NodeFederationPlugin({
      name: 'shell',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remotes: {
        remote: 'remote@http://localhost:8080/server/remote.js',
        fake: 'promise new Promise((resolve) => {resolve({get:()=>Promise.resolve(()=>{}),init:()=>{}})})',
      },
      shared: [],
    }),
    new StreamingTargetPlugin({
      name: 'shell',
      library: { type: 'commonjs-module' },
      remotes: {
        remote: 'remote@http://localhost:8080/server/remote.js',
        fake: 'promise new Promise((resolve) => {resolve({get:()=>Promise.resolve(()=>{}),init:()=>{}})})',
      },
    }),
  ],
};

const path = require('path');

const { ModuleFederationPlugin } = require('webpack').container;

const pkg = require('./package.json');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index',
  mode: 'production',
  target: 'web',
  devtool: 'eval-source-map',
  output: {
    libraryTarget: 'system',
    libraryExport: 'main',
    publicPath: 'http://localhost:8081/',
  },
  optimization: {
    minimize: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512_000,
    maxAssetSize: 512_000
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'rwebpackremote',
      library: { type: 'system' },
      filename: 'remoteEntry.js',
      remotes: {
        rollup_spa: 'rollup_spa',
      },
      exposes: {
        './Button': './src/Button',
      },
      shared: {
        react: {
          eager: true,
          singleton: true,
          requiredVersion: pkg.dependencies.react,
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: pkg.dependencies['react-dom'],
        },
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
};

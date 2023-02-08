const path = require('path');

const { ModuleFederationPlugin } = require('webpack').container;

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index',
  mode: 'production',
  target: 'web',
  devtool: false,
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
  externals: ['../node_modules/react', '../node_modules/react-dom'],
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

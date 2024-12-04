const { UniversalFederationPlugin } = require('@module-federation/node');
const webpack = require('webpack');
const path = require("path");

module.exports = {
  entry: './src/index',
  mode: 'development',
  target: 'async-node',
  output: {
    publicPath: 'auto',
    // publicPath: 'http://localhost:3002/',
    // library: { type: 'commonjs-module' },
    // filename: '[name]-[contenthash].js',
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    hot: true,
    port: 3002,
    devMiddleware: {
      writeToDisk: true, // Force writing files to disk
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new UniversalFederationPlugin({
      remoteType: 'script',
      isServer: true,
      name: 'remote',
      useRuntimePlugin: true,
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      exposes: {
        './string': './src/expose-string.ts',
        './class': './src/expose-class.ts',
      },
    }),
  ],
};

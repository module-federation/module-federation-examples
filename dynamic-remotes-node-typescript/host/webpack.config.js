const { UniversalFederationPlugin } = require('@module-federation/node');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  target: 'async-node',
  externals: [],
  output: {
    publicPath: 'http://localhost:3001/',
    library: { type: 'commonjs-module' },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    noParse: /yargs/,
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false, // Enables type-checking and .d.ts file emission
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new UniversalFederationPlugin({
      remoteType: 'script',
      isServer: true,
      name: 'host',
      useRuntimePlugin: true,
      exposes: {
        './noop': './src/noop.ts',
      },
    }),
  ],
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const { container } = require('webpack');
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  cache: false,
  mode: 'development',
  optimization: {
    runtimeChunk: 'single',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3001,
  },
  target: 'web',
  output: {
    publicPath: 'auto',
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
    new container.ContainerPlugin({
      name: 'app1_partial',
      filename: 'app1_partial.js',
      library: {
        type: 'var',
        name: 'app1',
      },
      runtime: undefined,
      exposes: {
        './Button': './src/Button',
      },
    }),
    new ModuleFederationPlugin({
      experiments: { asyncStartup: true },
      name: 'app1',
      runtime: false,
      filename: 'remoteEntry.js',
      remotes: {
        app2: 'app2@http://localhost:3002/remoteEntry.js',
      },
      runtimePlugins: [require.resolve('./single-runtime.js')],
      exposes: {
        './Button': './src/Button',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      excludeChunks: ['app1', 'app1_partial'],
    }),
  ],
};

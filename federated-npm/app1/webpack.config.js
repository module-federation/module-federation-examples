const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const path = require('path');

const remotes = {
  app2: 'app2@http://localhost:3002/remoteEntry.js',
  app3: 'app3@http://localhost:3003/remoteEntry.js',
};

const deps = require('./package.json').dependencies;
module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3001,
  },
  output: {
    publicPath: 'auto',
  },
  optimization: {
    minimize: false,
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
      name: 'app1',
      remotes: {
        ...remotes,
      },
      runtimePlugins: [require.resolve('./npm-runtime-global-plugin')],
      shared: {
        ...deps,
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

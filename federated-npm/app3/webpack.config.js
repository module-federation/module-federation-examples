const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3003,
  },
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
    new ModuleFederationPlugin({
      name: 'app3',
      library: { type: 'var', name: 'app3' },
      filename: 'remoteEntry.js',
      exposes: {
        '.': 'data:text/javascript,export default "nothing here"',
      },
      runtimePlugins: [
        // uses global plugin injected by app1
      ],
      shared: {
        qs: {
          import: 'qs',
          requiredVersion: '^6.9.4',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

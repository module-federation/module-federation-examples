const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: { port: 3000 },
  output: { publicPath: 'auto' },
  module: {
    rules: [{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }]
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        'remotevite': `promise import('http://127.0.0.1:3001/remoteEntry.js')
                         .then(module => ({
                         get: request => module.get(request),
                         init: arg => module.init(arg)
                      }))`
      },
      shared: {
        react: { singleton: true, requiredVersion: '18.3.1' },
        "react-dom": { singleton: true, requiredVersion: '18.3.1' },
      }
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
};

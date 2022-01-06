var path = require('path');
var webpack = require('webpack');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

var serverConfig = {
  entry: path.resolve(__dirname, 'server.js'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'public/server'),
    filename: 'server.js',
    publicPath: 'auto',
  },
  externals: ['enhanced-resolve'],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimize: false,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|GeneralJS|Global)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'website2',
      library: { type: 'commonjs-module' },
      filename: 'container.js',

      exposes: {
        './SharedComponent': './remoteServer/SharedComponent',
      },
      //shared: ["react", "react-dom"],
    }),
  ],
};

module.exports = [serverConfig];

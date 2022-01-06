const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const pkg = require('./package.json');

module.exports = {
  entry: './src/index',
  mode: 'production',
  target: 'web',
  devtool: 'eval-source-map',
  output: {
    libraryTarget: 'system',
    libraryExport: 'main',
    publicPath: 'http://localhost:8080/',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },

  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },

  optimization: {
    minimize: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'rollup_spa',
      library: { type: 'system' },
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './Header': './src/Header',
      },
      shared: require('./package.json').dependencies,
    }),
  ],
};

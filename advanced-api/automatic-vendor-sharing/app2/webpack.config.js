const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  mode: 'development',
  output: {
    publicPath: 'auto',
    uniqueName: 'automatic_vendor_sharing_app2',
  },
  devServer: {
    port: 3002,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
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
      experiments: { asyncStartup: true },
      name: 'app2',
      filename: 'remoteEntry.js',
      dts: false,
      shareStrategy: 'loaded-first',
      remotes: {
        app1: 'app1@http://localhost:3001/remoteEntry.js',
      },
      exposes: {
        './Button': './src/Button',
      },
      runtimePlugins: [require.resolve('./src/runtimePlugin')],
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
          import: 'react',
          shareScope: 'default',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
          import: 'react-dom',
          shareScope: 'default',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

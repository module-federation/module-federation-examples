const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('@module-federation/enhanced');
const path = require('path');
const {dependencies} = require('./package.json')
/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
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
      name: 'app2',
      filename: 'remoteEntry.js',
      runtimePlugins: [require.resolve('./react-adapter-runtime-plugin.ts')],
      exposes: {
        './Button': './src/components/Button',
        './ModernComponent': './src/components/ModernReactComponent',
        // './newReact': require.resolve('react'),
        // './newReactDOM': require.resolve('react-dom'),
      },
      shared: {
        'react-dom': {
          requiredVersion: dependencies['react-dom'],
          strictVersion: true,
          shareKey: 'react-dom',
          shareScope: 'modern', // share scope with this name will be used
          // singleton: true, // only a single version of the shared module is allowed
        },
        'react': {
          requiredVersion:dependencies['react'],
          strictVersion: true,
          shareScope: 'modern',
          shareKey: 'react',
          // singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = webpackConfig;

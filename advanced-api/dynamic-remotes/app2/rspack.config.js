const {
  HtmlRspackPlugin,
} = require('@rspack/core');
const {ModuleFederationPlugin} = require('@module-federation/enhanced/rspack')

const path = require('path');
const deps = require('./package.json').dependencies;
module.exports = {
  entry: './src/index',
  mode: 'development',
  target: 'web',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    port: 3002,
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
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/Widget',
      },
      shared: {
        moment: {
          requiredVersion: deps.moment,
          singleton: false,
        },
        'react/jsx-runtime': {
          singleton: true,
        },
        'react/jsx-dev-runtime': {
          singleton: true,
        },
        react: {
          requiredVersion: '^18.3.1',
          import: 'react',
          shareKey: 'react',
          shareScope: 'default',
          singleton: true,
          strictVersion: true,
        },
        'react-dom': {
          requiredVersion: '^18.3.1',
          singleton: true,
          strictVersion: true,
        },
      },
    }),
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
  ],
};

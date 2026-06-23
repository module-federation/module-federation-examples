const { HtmlRspackPlugin } = require('@rspack/core');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');

const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
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
  target: 'web',
  output: {
    publicPath: 'auto',
    uniqueName: 'automatic_vendor_sharing_app2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
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
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
  ],
};

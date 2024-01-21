const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@rspack/core').container;
const path = require('path');
const deps = require('./package.json').dependencies;

/**
 * @type {import('webpack').Configuration}
 **/
const webpackConfig = {
  entry: './src/index',
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    port: 3001,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
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
        test: /\.(js|ts)x?$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
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
      name: 'app1',
      library: { type: 'var', name: 'app1' },
      remotes: {
        app2: 'app2',
      },
      shared: {
        ...deps,
        'react-dom': {
          import: 'react-dom', // the "react" package will be used a provided and fallback module
          shareKey: 'react-dom', // under this name the shared module will be placed in the share scope
          shareScope: 'legacy', // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      app2RemoteEntry: getRemoteEntryUrl(3002),
    }),
  ],
};

module.exports = webpackConfig;

function getRemoteEntryUrl(port) {
  const { CODESANDBOX_SSE, HOSTNAME = '' } = process.env;

  // Check if the example is running on codesandbox
  // https://codesandbox.io/docs/environment
  if (!CODESANDBOX_SSE) {
    return `//localhost:${port}/remoteEntry.js`;
  }

  const parts = HOSTNAME.split('-');
  const codesandboxId = parts[parts.length - 1];

  return `//${codesandboxId}-${port}.sse.codesandbox.io/remoteEntry.js`;
}

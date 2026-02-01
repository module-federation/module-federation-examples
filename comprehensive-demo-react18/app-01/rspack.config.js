const {
  HtmlRspackPlugin,
} = require('@rspack/core');
const {ModuleFederationPlugin} = require('@module-federation/enhanced/rspack')
const path = require('path');

const { RsdoctorRspackPlugin } = require('@rsdoctor/rspack-plugin');
const ReactRefreshWebpackPlugin = require('@rspack/plugin-react-refresh');

const deps = require('./package.json').dependencies;
const isProd = process.env.NODE_ENV === 'production';
const reactPath = path.dirname(require.resolve('react/package.json'));
const reactDomPath = path.dirname(require.resolve('react-dom/package.json'));
module.exports = {
  entry: './src/index',

  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.mjs'],
    alias: {
      react: reactPath,
      'react-dom': reactDomPath,
    },
  },
  optimization: {
    minimize: false,
  },
  output: {
    publicPath: 'auto',
    uniqueName: 'app1',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
                  development: !isProd,
                  refresh: !isProd,
                },
              },
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.md$/,
        type: 'asset/source',
      },
    ],
  },
  devServer: {
    port: 3001,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      experiments: { asyncStartup: true },
      dts: false,
      name: 'app_01',
      filename: 'remoteEntry.js',
      remotes: {
        app_02: 'app_02@http://localhost:3002/remoteEntry.js',
        app_03: 'app_03@http://localhost:3003/remoteEntry.js',
        app_04: 'app_04@http://localhost:3004/remoteEntry.js',
        app_05: 'app_05@http://localhost:3005/remoteEntry.js',
      },
      exposes: {
        './SideNav': './src/SideNav',
        './Page': './src/Page',
      },
      shareStrategy: 'loaded-first',
      shared: {
        ...deps,
        '@material-ui/core': {
          singleton: true,
        },
        'react-router-dom': {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: false,
          eager: false,
        },
        react: {
          singleton: true,
          requiredVersion: false,
          eager: false,
        },
      },
    }),
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    // new RsdoctorRspackPlugin()
  ].filter(Boolean),
};

const {
  HtmlRspackPlugin,
} = require('@rspack/core');
const {ModuleFederationPlugin} = require('@module-federation/enhanced/rspack')
const { RsdoctorRspackPlugin } = require('@rsdoctor/rspack-plugin');
const ReactRefreshWebpackPlugin = require('@rspack/plugin-react-refresh');

const deps = require('./package.json').dependencies;
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  entry: './src/index',

  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.mjs'],
  },
  optimization: {
    minimize: false,
  },
  output: {
    publicPath: 'http://localhost:3001/',
    uniqueName: 'app1'
  },
  experiments: {
    css: true
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
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_01',
      filename: 'remoteEntry.js',
      remotes: {
        app_02: 'app_02@http://localhost:3002/mf-manifest.json',
        app_03: 'app_03@http://localhost:3003/mf-manifest.json',
        app_04: 'app_04@http://localhost:3004/mf-manifest.json',
        app_05: 'app_05@http://localhost:3005/mf-manifest.json',
      },
      exposes: {
        './SideNav': './src/SideNav',
        './Page': './src/Page',
      },
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
        },
        react: {
          singleton: true,
        },
      },
    }),
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
    isProd ? new ReactRefreshWebpackPlugin() : undefined,
  ].filter(Boolean),
};

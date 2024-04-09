const {
  container: { ModuleFederationPlugin },
  HtmlRspackPlugin,
} = require('@rspack/core');
const deps = require('./package.json').dependencies;
const ReactRefreshWebpackPlugin = require('@rspack/plugin-react-refresh');
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
  devServer: {
    port: 3002,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  output: {
    publicPath: 'auto',
    uniqueName: 'app2'
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
    ],
  },
  experiments: {
    css: true,
    rspackFuture: {
      disableTransformByDefault: true,
    },
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'app_02',
      filename: 'remoteEntry.js',
      remotes: {
        app_01: 'app_01@http://localhost:3001/remoteEntry.js',
        app_03: 'app_03@http://localhost:3003/remoteEntry.js',
      },
      exposes: {
        './Dialog': './src/Dialog',
        './Tabs': './src/Tabs',
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
      chunks: ['main'],
    }),
    new ReactRefreshWebpackPlugin()
  ],
};

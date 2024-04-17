const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const { RsdoctorWebpackPlugin } = require('@rsdoctor/webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'
const isDevelopment = !isProd;

const deps = require('./package.json').dependencies;
module.exports = {
  entry: './src/index',
  cache: false,
  devServer: {
    port: 3001,
    hot: isDevelopment,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false,
  },

  output: {
    uniqueName: 'app1',
    publicPath: 'auto',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.mjs'],
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
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [require.resolve('@babel/preset-react')],
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ],
  },

  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new ModuleFederationPlugin({
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
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // new RsdoctorWebpackPlugin({
    //   // plugin options
    // }),
  ].filter(Boolean),
};

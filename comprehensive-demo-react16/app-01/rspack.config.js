const {
  HtmlRspackPlugin,
  container: { ModuleFederationPlugin },
} = require('@rspack/core');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.mjs'],
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3001,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.mjs'],
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'builtin:swc-loader',
        exclude: /node_modules/,
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
      {
        test: /\.md$/,
        type: 'asset/source',
      },
    ],
  },
  plugins: [
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
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
  ],
};

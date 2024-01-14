const {
  container: { ModuleFederationPlugin },
  HtmlRspackPlugin,
} = require('@rspack/core');
const deps = require('./package.json').dependencies;

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
    publicPath: 'auto',
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

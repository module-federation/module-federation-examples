const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@rspack/core').container;
const path = require('path');
const deps = require('./package.json').dependencies;
module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
    hot: true,
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
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
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
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      library: { type: 'var', name: 'app2' },
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button',
        './ModernComponent': './src/components/ModernReactComponent',
      },
      shared: [
        'react-dom',
        {
          react: {
            import: 'react', // the "react" package will be used a provided and fallback module
            shareKey: 'react', // under this name the shared module will be placed in the share scope
            shareScope: 'modern', // share scope with this name will be used
            singleton: true, // only a single version of the shared module is allowed
          },
          // reactNew: {
          //   import: "react", // the "react" package will be used a provided and fallback module
          //   shareKey: "reactNew", // under this name the shared module will be placed in the share scope
          //   shareScope: "modern", // share scope with this name will be used
          //   singleton: true, // only a single version of the shared module is allowed
          // },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      app2RemoteEntry: getRemoteEntryUrl(3002),
    }),
  ],
};

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

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;
const path = require('path');


const remotes = {
  app2: "app2@http://localhost:3002/remoteEntry.js",
}

const delegatedRemote = {
  app3: "app3@http://localhost:3003/remoteEntry.js",
}

const delegatedRemotesObject = Object.entries(delegatedRemote).reduce((acc, [name, url]) => {
  acc[name] = `./remote-delegate.js?remote=${url}&dontExtract[lodash]`;
  return acc;
}, {})


const deps = require('./package.json').dependencies;
module.exports = {
  entry: [...Object.values(delegatedRemotesObject), './src/index'],
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3001,
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
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },

      },
    ],
  },
  //http://localhost:3002/remoteEntry.js
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      remotes: {
        ...Object.entries(delegatedRemotesObject).reduce((acc, [name, url]) => {
          acc[name] = `internal ${url}`
          return acc;
        }, {}),
        ...remotes
      },
      shared: {
        ...deps
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

console.log({
  remotes: {
    ...Object.entries(delegatedRemote).reduce((acc, [name, url]) => {
      acc[name] = `internal ${url}`
      return acc;
    }, {}),
    ...remotes
  },
})

function getRemoteEntryUrl(port) {
  const {CODESANDBOX_SSE, HOSTNAME = ''} = process.env;

  // Check if the example is running on codesandbox
  // https://codesandbox.io/docs/environment
  if (!CODESANDBOX_SSE) {
    return `//localhost:${port}/remoteEntry.js`;
  }

  const parts = HOSTNAME.split('-');
  const codesandboxId = parts[parts.length - 1];

  return `//${codesandboxId}-${port}.sse.codesandbox.io/remoteEntry.js`;
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const {container} = require('@rspack/core')
const path = require('path');

const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  mode: 'development',
  optimization: {
    runtimeChunk: 'single',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    port: 3001,
  },
  target: 'web',
  output: {
    publicPath: 'auto',
    uniqueName: 'jcreo',
  },
  module: {
    rules: [
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
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
      {
        test: /\.ts$/,
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
    new container.ContainerPlugin({
      name: 'app1_partial',
      filename: 'app1_partial.js',
      library:{
        type: 'var',
        name: 'app1'
      },
      runtime: undefined,
      runtimePlugins: [require.resolve('./single-runtime.js')],
      exposes: {
        './Button': './src/Button',
      },
    }),
    new ModuleFederationPlugin({
      name: 'app1',
      runtime: false,
      filename: 'remoteEntry.js',
      remotes: {
        app2: 'app2@http://localhost:3002/remoteEntry.js',
      },
      runtimePlugins: [require.resolve('./single-runtime.js')],
      exposes: {
        './Button': './src/Button',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
        lodash: {},
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      excludeChunks: ['app1', 'app1_partial'],
    }),
  ],
};

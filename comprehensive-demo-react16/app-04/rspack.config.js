const {
  HtmlRspackPlugin,
  container: { ModuleFederationPlugin },
} = require('@rspack/core');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    bundle: ['./src/main.js'],
  },
  devServer: {
    port: 3004,
  },
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  decorators: true,
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
        ],
      },
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mjs'],
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: 'auto',
  },
  mode,
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_04',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/main.js',
        './loadApp': './src/loadApp.js',
      },
      shared: [],
    }),
  ],
};

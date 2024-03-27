const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

/**
 * @type {import('webpack').Configuration}
 */
const configuration = {
  mode: 'development',
  entry: './src/bootstrap.ts',
  output: {
    clean: true,
    path: __dirname + '/dist',
  },
  target: ['web', 'es2015'],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        use: 'vue-loader',
      },
      {
        test: /\.ts$/i,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'ts',
              target: 'es2015',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      manifest: false,
      shared: ['vue', 'shared-lib', 'shared-lib-2'],
      exposes: {
        '.': './src/index.ts',
      },
      runtimePlugins: [require.resolve('./isolatePlugin.ts')],
    }),
  ],
  optimization: {
    // Improve visibility of loaded chunks in the network tab
    minimize: false,
    moduleIds: 'named',
    chunkIds: 'named',
  },
  devtool: false,
  devServer: {
    hot: false,
  }
};

module.exports = configuration;

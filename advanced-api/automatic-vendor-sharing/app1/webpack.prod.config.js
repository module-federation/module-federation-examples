const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin, AutomaticVendorFederation } = require('@module-federation/enhanced');

// Production configuration for optimized builds
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  mode: 'production',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          enforce: true,
        },
      },
    },
    usedExports: true,
    sideEffects: false,
  },
  target: 'web',
  output: {
    publicPath: 'auto',
    uniqueName: 'automatic_vendor_sharing_app1',
    chunkLoadingGlobal: 'app1ChunkLoading',
    clean: true,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['@babel/preset-react', { runtime: 'automatic' }],
            ['@babel/preset-env', {
              targets: {
                browsers: ['> 1%', 'last 2 versions']
              },
              modules: false
            }],
            '@babel/preset-typescript'
          ],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      remotes: {
        app2: 'app2@/remoteEntry.js', // Use relative URL for production
      },
      exposes: {
        './Button': './src/Button',
        './ErrorBoundary': './src/ErrorBoundary',
      },
      runtimePlugins: [require.resolve('./src/runtimePlugin')],
      shared: {
        ...AutomaticVendorFederation({
          exclude: ['@module-federation/enhanced'],
          ignoreVersion: ['react', 'react-dom'],
          shareStrategy: 'loaded-first',
          eager: false, // Optimize for production loading
        }),
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager: false,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
          eager: false,
        },
      },
      experiments: {
        federationRuntime: 'hoisted',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
};
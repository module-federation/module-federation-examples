const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const packageJson = require('../package.json');

// Defaults
const isProduction = process.env.NODE_ENV == 'production';

module.exports = function(options) {
  const DIST_PATH = `${__dirname}/../dist`;

  if (isProduction) {
    console.log(`Preparing release: ${packageJson.name} (${packageJson.version})`);
  }

  const plugins = [
    // Build progress
    // https://webpack.js.org/plugins/progress-plugin
    new webpack.ProgressPlugin({
      percentBy: 'entries'
    }),
    // Extract CSS files
    // https://webpack.js.org/plugins/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
      chunkFilename: 'css/[name].[chunkhash].css',
    }),
    // Copy files
    // https://webpack.js.org/plugins/copy-webpack-plugin
    new CopyPlugin({
      patterns: [
        { from: 'src/assets/images', to: 'images' },
      ],
    }),
  ];

  const optimization = {
    mergeDuplicateChunks: true,
    removeAvailableModules: true,
    emitOnErrors: true,
    minimizer: [],
    splitChunks: {
      // https://medium.com/dailyjs/webpack-4-splitchunks-plugin-d9fbbe091fd0
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          // We don't care about the lazy load modules (async)
          chunks: 'all',
          minChunks: 2,
          priority: 3,
        },
        // https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-1
        commons: {
          test: /[\\/]src[\\/]/,
          name: 'commons',
          // We don't care about the lazy load modules (async)
          chunks: 'all',
          minChunks: 3, // if 3 chunks import something, put it in common
          priority: 2,
        }
      }
    }
  };

  // Remove `console.log` statements in the release version
  if (isProduction) {
    optimization.minimizer.push(
      new TerserPlugin({
        terserOptions: {
          sourceMap: true,
          compress: {
            drop_console: true,
          }
        }
      })
    );

    // Minify CSS files
    // https://github.com/webpack-contrib/css-minimizer-webpack-plugin
    optimization.minimizer.push(new CssMinimizerPlugin());
  }

  return {
    // Mode
    // https://webpack.js.org/configuration/mode
    mode: isProduction ? 'production' : 'development',
    // Devtool
    // https://webpack.js.org/configuration/devtool
    devtool: 'source-map',
    // Output
    // https://webpack.js.org/configuration/output
    output: {
      // Absolute output directory
      path: `${DIST_PATH}/`,
      publicPath: '/',
      clean: true,
      filename: 'js/[name].[chunkhash].js',
      chunkFilename: 'js/[name].[chunkhash].js',
      // Assets
      // https://webpack.js.org/guides/asset-modules/#custom-output-filename
      assetModuleFilename: 'assets/[name][ext]',
    },
    // Optimization
    // https://webpack.js.org/configuration/optimization/#optimizationsplitchunks
    optimization,
    // Plugins
    // https://webpack.js.org/configuration/plugins
    // https://webpack.js.org/plugins
    plugins,
  }
}

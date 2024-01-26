const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = function(options) {
  // Set development server port
  const devServerPort = options.devServerPort || 3200;

  return {
    // Mode
    // https://webpack.js.org/configuration/mode
    mode: 'development',
    // Stats
    // https://webpack.js.org/configuration/stats
    stats: {
      modules: false,
      assets: false,
    },
    // Devtool
    // https://webpack.js.org/configuration/devtool
    //
    // Eval/Eval Cheap Source Map is the better performance to use in development mode
    // If you think it is hard to debug the source code, change it to `eval-source-map`
    // https://blog.scottlogic.com/2017/11/01/webpack-source-map-options-quick-guide.html
    devtool: 'eval-cheap-source-map',
    // Dev Server config
    // https://webpack.js.org/configuration/dev-server
    devServer: {
      port: devServerPort,
      // Enable gzip compression of generated files.
      compress: true,
      // Allows to set log level in the browser, e.g. before reloading, before an error
      // or when Hot Module Replacement is enabled.
      // https://webpack.js.org/configuration/dev-server/#devserverclient
      client: {
        progress: true,
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      // Enable hot reloading server. It will provide WDS_SOCKET_PATH endpoint
      // for the WebpackDevServer client so it can learn when the files were
      // updated. The WebpackDevServer client is included as an entry point
      // in the webpack development configuration. Note that only changes
      // to CSS are currently hot reloaded. JS changes will refresh the browser.
      hot: true,
    },
    plugins: [
      // Browser Sync
      // https://github.com/Va1/browser-sync-webpack-plugin
      new BrowserSyncPlugin({
        // browse to http://localhost:4000/ during development
        host: 'localhost',
        port: 3000,
        // Proxy the Webpack Dev Server endpoint through BrowserSync
        // (which should be serving on http://localhost:3100/)
        proxy: `http://localhost:${devServerPort}`,
      },{
        // Prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }),
      // Hot reload
      // https://webpack.js.org/plugins/hot-module-replacement-plugin/
      new webpack.HotModuleReplacementPlugin(),
    ],
  }
}

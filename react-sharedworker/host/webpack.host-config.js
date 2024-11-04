const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container } = require('webpack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'host-bundle-[name].js',
    chunkFilename: 'host-chunk-[name].js',
  },
  plugins: [
    new container.ModuleFederationPlugin({
      remotes: {
        myModule: `promise new Promise(resolve => {
      // This part depends on how you plan on hosting and versioning your federated modules
      if (globalThis.SharedWorkerGlobalScope) {
        const remoteUrlWithVersion = 'http://localhost:3001/worker/remoteEntry.js'
        importScripts(remoteUrlWithVersion)
        resolve(globalThis.myModule);
        return;
      }
      const remoteUrlWithVersion = 'http://localhost:3001/remoteEntry.js'
      const script = document.createElement('script')
      script.src = remoteUrlWithVersion
      script.onload = () => {
        // the injected script has loaded and is available on window
        // we can now resolve this Promise
        const proxy = {
          get: (request) => window.myModule.get(request),
          init: (...arg) => {
            try {
              return window.myModule.init(...arg)
            } catch(e) {
              console.log('remote container already initialized')
            }
          }
        }
        resolve(proxy)
      }
      // inject this script with the src set to the versioned remoteEntry.js
      document.head.appendChild(script);
    })
    `,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 3000,
  }
};

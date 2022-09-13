const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');
const deps = require('./package.json').dependencies;
const AddRuntimeRequiremetToPromiseExternalPlugin = require('./AddRuntimeRequiremetToPromiseExternal');

module.exports = {
  entry: './src/index',
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
  plugins: [
    new AddRuntimeRequiremetToPromiseExternalPlugin(),
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      remotes: {
        app2: `promise new Promise(function (resolve, reject) {
          var __webpack_error__ = new Error()
          if (typeof window["app2"] !== 'undefined') return resolve();
          __webpack_require__.l(
            "http://localhost:3002/remoteEntry.js",
            function (event) {
              if (typeof app2 !== 'undefined') return resolve();
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              __webpack_error__.message =
                'Loading script failed.\\n(' + errorType + ': ' + realSrc + ')';
              __webpack_error__.name = 'ScriptExternalLoadError';
              __webpack_error__.type = errorType;
              __webpack_error__.request = realSrc;
              reject(__webpack_error__);
            },
            "app2",
          );
        }).then(function(){
         var proxy = {
         get: app2.get,
         init: app2.init
         }
         return proxy
        }).catch(function(e) {
          console.log('rejected');
          let newProxy = {
            get: (module, scope) => () => [],
            init: () => {}
          }
          return(newProxy); 
        })`,
      },
      exposes: {
        './Navigation': './src/Navigation',
        './routes': './src/routes',
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

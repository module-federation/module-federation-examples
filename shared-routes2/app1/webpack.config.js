const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');
const deps = require('./package.json').dependencies;
const dummyModule = require('./src/placeholder');

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
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      remotes: {
        app2: `promise new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = "http://localhost:3002/remoteEntry.js"
          script.onload = () => {
            // the injected script has loaded and is available on window
            // we can now resolve this Promise
            const proxy = {
              get: (request) => window.app2.get(request),
              init: (arg) => {
                try {
                  return window.app2.init(arg)
                } catch(e) {
                  console.log('remote container already initialized')
                }
              }
            }
            resolve(proxy)
          }
          script.onerror = () => {
            // script failed to load, return a placeholder module
            console.log('app2 script failed to load, falling back to placeholder module');
            let newProxy = {
              get: (module, scope) => ${dummyModule},
              init: () => {}
            }
            resolve(newProxy);
          }
          document.head.appendChild(script);
        })`
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

const {
  HtmlRspackPlugin,
} = require('@rspack/core');
const {ModuleFederationPlugin} = require('@module-federation/enhanced/rspack')
const mode = process.env.NODE_ENV || 'development';
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/index.ts',
  devServer: {
    port: 3005,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
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
                    development: !isProd,
                    refresh: !isProd,
                  },
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mjs'],
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: 'http://localhost:3005/',
    uniqueName: 'app5'
  },
  mode,
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_05',
      filename: 'remoteEntry.js',
      exposes: {
        './ActionButton': './src/components/action-button.ts',
        './AlertBox': './src/components/alert-box.ts',
        './components': './src/index.ts',
      },
      shared: [],
    }),
    new HtmlRspackPlugin({
      title: 'LitHTML Typescript Example',
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
};

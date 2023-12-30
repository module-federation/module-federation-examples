const {
  HtmlRspackPlugin,
  container: { ModuleFederationPlugin },
} = require('@rspack/core');
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/index.ts',
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
    publicPath: 'auto',
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

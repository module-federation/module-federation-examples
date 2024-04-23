const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
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
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button',
        './ModernComponent': './src/components/ModernReactComponent',
        './newReact': require.resolve('react'),
        './newReactDOM': require.resolve('react-dom'),
      },
      shared: [
        'react-dom',
        {
          react: {
            import: 'react', // the "react" package will be used a provided and fallback module
            shareKey: 'newReact', // under this name the shared module will be placed in the share scope
            shareScope: 'default', // share scope with this name will be used
            singleton: true, // only a single version of the shared module is allowed
          },
          // reactNew: {
          //   import: "react", // the "react" package will be used a provided and fallback module
          //   shareKey: "reactNew", // under this name the shared module will be placed in the share scope
          //   shareScope: "modern", // share scope with this name will be used
          //   singleton: true, // only a single version of the shared module is allowed
          // },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

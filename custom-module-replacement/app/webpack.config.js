const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin, ContainerReferencePlugin }  = require("webpack").container
const { SharePlugin, ConsumeSharedPlugin, ProvideSharedPlugin } = require('webpack').sharing;

const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index",
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: "auto",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json", ".mjs"],
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
        options: {
          presets: [require.resolve("@babel/preset-react")],
        },
      },
      {
        test: /\.md$/,
        loader: "raw-loader",
      },
    ],
  },

  plugins: [
    // new ContainerReferencePlugin({
    //   remoteType: 'script',
    //   remotes: {
    //     'container': {
    //       external: [
    //         'container@http://localhost:3002/foo.js',
    //       ]
    //     }
    //   }
    // }),
    new ContainerReferencePlugin({
      remoteType: 'promise',
      remotes: {
        'app2': {
          external: 'getFoo',
        },
        "./replacement": {
          external: 'getFoo',
        }
      }
    }),
    new ModuleFederationPlugin({
      name: "app_01",
      filename: "remoteEntry.js",
      remotes: {
        // app2: `app2@http://localhost:3002/remoteEntry.js'`,
      },
      exposes: {
      },
      shared: {
        ...deps,
        "react-router-dom": {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
        react: {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

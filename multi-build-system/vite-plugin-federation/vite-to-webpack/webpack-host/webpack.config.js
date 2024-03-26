const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const loadRemote = (resolve) => {
  const url = "http://localhost:5001/assets/remoteEntry.js";
  import(url).then(lib => {
    const proxy = {
      get: (request) => lib.get(request),
      init: (arg) => {
        try {
          return lib.init(arg)
        } catch(e) {
          console.log('remote container already initialized')
        }
      }
    }
    resolve(proxy);  
  })
}

module.exports = {
  output: {
    publicPath: "http://localhost:3001/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        "my-nav": `promise new Promise(${loadRemote.toString()})`,
      },
      shared: {}
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
  devtool: false
};

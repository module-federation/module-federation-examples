const { ModuleFederationPlugin } = require("webpack").container;
const { dependencies } = require("../package.json");

module.exports = {
  output: {
    publicPath: "http://localhost:8080/",
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  devServer: {
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dogs",
      library: { type: "var", name: "dogs" },
      filename: "remoteEntry.js",
      exposes: {
        "./Dog": "../src/components/Dog",
      },
      shared: {
        ...dependencies,
        react: {
          // import: false,
          singleton: true,
        },
      },
    }),
  ],
};

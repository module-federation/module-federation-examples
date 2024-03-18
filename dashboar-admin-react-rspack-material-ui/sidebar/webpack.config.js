const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    assetModuleFilename: 'images/[hash].[ext]'
  },
  devServer: {
    port: 3002,
    hot: true,
    historyApiFallback: true, 
    
  },
  name: "nav",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            {
            loader: "babel-loader",            
            options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
            },
            },
        ],
      },
      {
        test: /\.png/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['*', '.js', '.jsx'],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "Nav",
      filename: "remoteEntry.js",
      remotes: {
        Dashboard: "Dashboard@http://localhost:3001/remoteEntry.js",
        FAQ: "FAQ@http://localhost:3003/remoteEntry.js"
      },
      exposes: {
        "./Nav": "./src/Sidebar.js"
      },
      shared: {
        ...dependencies,
        "react": {
          singleton: true,
          requiredVersion: dependencies.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"]
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: dependencies["react-router-dom"]
        },
        "@mui/material": {
          singleton: true,
          requiredVersion: dependencies["@mui/material"]
        },
        "@mui/icons-material": {
          singleton: true,
          requiredVersion: dependencies["@mui/icons-material"]
        },
        "@emotion/react": {
          singleton: true,
          requiredVersion: dependencies["@emotion/react"]
        },
      }
    })
  ],
  target: "web",

};
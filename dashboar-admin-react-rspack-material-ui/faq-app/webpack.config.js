const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");
const path = require('path');

module.exports = {
    entry: "./src/index.js",  
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'bundle.js',
      publicPath: 'auto',
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    mode: "development",
    devServer: {
      port: 3003,
      historyApiFallback: true, 
      hot: true,

    },
    module: {
      rules: [
        {
        test: /\.(js|jsx)?$/,
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
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
          }),
        new ModuleFederationPlugin({
          name: "FAQ",
          filename: "remoteEntry.js",
          exposes: {
            "./FAQ": "./src/FAQ",
          },
          remotes: {
            Sidebar: "Sidebar@http://localhost:3002/remoteEntry.js",
            Dashboard: "Dashboard@http://localhost:3001/remoteEntry.js",
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
          },
      }),
    ],
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['*', '.js', '.jsx'],
  
    },
    target: "web",
};
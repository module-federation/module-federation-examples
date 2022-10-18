const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
    output: {
        publicPath: "http://localhost:3002/",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
        port: 3002,
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
            {
                test: /\.json$/,
                type: 'json'
            }
        ],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "reactRemote",
            filename: "remoteEntry.js",
            remotes: {},
            exposes: {
                "./Content": "./src/Content"
            },
            shared: {
                "i18next-shared-lib/": { // BEWARE THE TRAILING "/" !!
                    singleton: true,
                },
                i18next: {
                    singleton: true,
                    requiredVersion: deps.i18next
                },
                "react-i18next": {
                    singleton: true,
                    requiredVersion: deps["react-i18next"]
                },
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
        }),
    ],
};

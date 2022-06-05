const deps = require("../package.json").dependencies;
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports =  {
    client: new ModuleFederationPlugin({
        name: "remote2",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
            './Image': './src/Image'
        },
        shared: {
            ...deps,
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
    server: new ModuleFederationPlugin({
        name: "remote2",
        filename: "remoteEntry.js",
        library: { type: "commonjs2" },
        remotes: {},
        exposes: {
            './Image': './src/Image'
        },
        shared: {
            ...deps,
            react: {
                singleton: true,
                requiredVersion: deps.react,
            },
            "react-dom": {
                singleton: true,
                requiredVersion: deps["react-dom"],
            },
        },
    })
}
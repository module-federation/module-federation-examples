const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const { NodeFederationPlugin, StreamingTargetPlugin } = require("@module-federation/node");

module.exports =  {
    client: new ModuleFederationPlugin({
        name: "expose_jss",
        filename: "remoteEntry.js",
        remotes: {
        },
        exposes: {
            './Content': './src/Content'
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
            "react-jss": {
                singleton: true,
            },
        },
    }),
    server: [
        new NodeFederationPlugin({
            name: "expose_jss",
            filename: "remoteEntry.js",
            library: { type: "commonjs-module" },
            remotes: {
            },
            exposes: {
                './Content': './src/Content'
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
                "react-jss": {
                    singleton: true,
                },
            },
        }),
        new StreamingTargetPlugin({
            name: "expose_jss",
            library: { type: "commonjs-module" },
            remotes: {
            },
        }),
    ]
}

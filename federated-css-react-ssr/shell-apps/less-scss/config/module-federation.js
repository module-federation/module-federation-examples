
const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const { NodeFederationPlugin, StreamingTargetPlugin } = require("@module-federation/node");

module.exports = {
    client: new ModuleFederationPlugin({
        name: "shell",
        filename: "container.js",
        remotes: {
            expose_less: "expose_less@http://localhost:3007/client/remoteEntry.js",
            expose_scss: "expose_scss@http://localhost:3004/client/remoteEntry.js",
        },
        shared: [{ "react": deps.react, "react-dom": deps["react-dom"],

            "styled-components": {
                singleton: true,
            },
            "react-jss": {
                singleton: true,
            }, }],
    }),
    server: [
        new NodeFederationPlugin({
            name: "shell",
            library: { type: "commonjs-module" },
            filename: "remoteEntry.js",
            remotes: {
                expose_less: "expose_less@http://localhost:3007/server/remoteEntry.js",
                expose_scss: "expose_scss@http://localhost:3004/server/remoteEntry.js",
            },
            shared: [{ "react": deps.react, "react-dom": deps["react-dom"],
                "styled-components": {
                    singleton: true,
                },
                "react-jss": {
                    singleton: true,
                }, }],
        }),
        new StreamingTargetPlugin({
            name: "shell",
            library: { type: "commonjs-module" },
            remotes: {
                expose_less: "expose_less@http://localhost:3007/server/remoteEntry.js",
                expose_scss: "expose_scss@http://localhost:3004/server/remoteEntry.js",
            },
            shared: {
                "styled-components": {
                    singleton: true,
                },
                "react-jss": {
                    singleton: true,
                },
            }
        }),
    ]
}

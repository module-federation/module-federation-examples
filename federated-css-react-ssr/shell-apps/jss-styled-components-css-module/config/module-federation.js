
const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const { NodeFederationPlugin, StreamingTargetPlugin } = require("@module-federation/node");

module.exports = {
    client: new ModuleFederationPlugin({
        name: "shell",
        filename: "container.js",
        remotes: {
            expose_styled_component: "expose_styled_component@http://localhost:3005/client/remoteEntry.js",
            expose_jss: "expose_jss@http://localhost:3002/client/remoteEntry.js",
            expose_css_module: "expose_css_module@http://localhost:3006/client/remoteEntry.js",
        },
        shared: [{ "react": deps.react, "react-dom": deps["react-dom"],

            "styled-components": {
                singleton: true,
            },
            "react-jss": {
                singleton: true,
            },
            "isomorphic-style-loader": {
                singleton: true,
            }, }],
    }),
    server: [
        new NodeFederationPlugin({
            name: "shell",
            library: { type: "commonjs-module" },
            filename: "remoteEntry.js",
            remotes: {
                expose_styled_component: "expose_styled_component@http://localhost:3005/server/remoteEntry.js",
                expose_jss: "expose_jss@http://localhost:3002/server/remoteEntry.js",
                expose_css_module: "expose_css_module@http://localhost:3006/server/remoteEntry.js",
            },
            shared: [{ "react": deps.react, "react-dom": deps["react-dom"],
                "styled-components": {
                    singleton: true,
                },
                "react-jss": {
                    singleton: true,
                },
                "isomorphic-style-loader": {
                    singleton: true,
                }, }],
        }),
        new StreamingTargetPlugin({
            name: "shell",
            library: { type: "commonjs-module" },
            remotes: {
                expose_styled_component: "expose_styled_component@http://localhost:3005/server/remoteEntry.js",
                expose_jss: "expose_jss@http://localhost:3002/server/remoteEntry.js",
                expose_css_module: "expose_css_module@http://localhost:3006/server/remoteEntry.js",
            },
            shared: {
                "styled-components": {
                    singleton: true,
                },
                "react-jss": {
                    singleton: true,
                },
                "isomorphic-style-loader": {
                    singleton: true,
                },
            }
        }),
    ]
}

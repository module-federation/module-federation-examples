const deps = require("../package.json").dependencies;
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

const remotePath = path.resolve(
    __dirname,
    "../../remote1/dist/server/remoteEntry.js"
)

module.exports = {
    client: new ModuleFederationPlugin({
        name: "shell",
        filename: "container.js",
        remotes: {
            remote1: "remote1@http://localhost:3001/client/remoteEntry.js",
        },
        shared: [{ "react": deps.react, "react-dom": deps["react-dom"] }],
    }),
    server: new ModuleFederationPlugin({
        name: "shell",
        library: { type: "commonjs2" },
        filename: "remoteEntry.js",
        remotes: {
            // remote1: remotePath
            remote1: {
                // we dont need to do this, just intersting to see in action
                external: `promise new Promise((resolve)=>{ console.log('shell: requiring remote1');delete require.cache['${remotePath}']; resolve(require('${remotePath}')) })`
            },
        },
        shared: [{ "react": deps.react, "react-dom": deps["react-dom"] }],
    })
}
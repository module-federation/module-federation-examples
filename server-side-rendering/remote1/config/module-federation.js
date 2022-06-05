const path = require("path");
const deps = require("../package.json").dependencies;
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const remote2path = path.resolve(
    __dirname,
    "../../remote2/dist/server/remoteEntry.js"
)

module.exports =  {
    client: new ModuleFederationPlugin({
        name: "remote1",
        filename: "remoteEntry.js",
        remotes: {
            'remote2': 'remote2@http://localhost:3002/client/remoteEntry.js'
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
        },
    }),
    server: new ModuleFederationPlugin({
        name: "remote1",
        filename: "remoteEntry.js",
        library: { type: "commonjs2" },
        remotes: {
            remote2: {
                external: `promise new Promise((resolve) => {
                    console.log('remote1: requiring remote2'); 
                    delete require.cache['${remote2path}']; 
                    resolve(require('${remote2path}'));
                })`
            }
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
        },
    })
}
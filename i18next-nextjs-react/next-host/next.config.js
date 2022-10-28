const NextFederationPlugin = require('@module-federation/nextjs-mf');
const deps = require("./package.json").dependencies;

module.exports = {
    webpack(config, options) {
        if (!options.isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: 'next-host',
                    filename: 'static/chunks/remoteEntry.js',
                    remotes: {
                        reactRemote: "reactRemote@http://localhost:3002/remoteEntry.js"
                    },
                    exposes: {},
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
                    },
                }),
            );
        }
        return config;
    },
};

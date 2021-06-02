const packageJsonDeps = require("./package.json").dependencies;

module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    const federationConfig = {
      remotes: {
        reception: "reception@http://localhost:8886/remoteEntry.js",
        sessions: "sessions@http://localhost:8885/remoteEntry.js",
      },
      shared: {
        ...packageJsonDeps,
        react: {
          eager: true, // we need this to fix "Uncaught Error: Shared module is not available for eager consumption"
          requiredVersion: packageJsonDeps.react,
          // singleton: true, we don't need singleton true because we are using React 17
        },
        "react-dom": {
          eager: true, // we need this to fix "Uncaught Error: Shared module is not available for eager consumption"
          requiredVersion: packageJsonDeps["react-dom"],
        },
      },
    };

    config.plugins.push(
      new options.webpack.container.ModuleFederationPlugin(federationConfig)
    );

    return config;
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};

const withModuleFederation = (webpack) => {
  if (parseInt(webpack.version, 10) !== 5) {
    throw new Error(
      "Module Federation is only available in Webpack 5, it cannot be back-ported."
    );
  }
  class WithModuleFederation extends webpack.container.ModuleFederationPlugin {
    constructor(options) {
      super(options);
      if (!options.shared) {
        return;
      }
      if (Array.isArray(options.shared)) {
        if (
          options.shared.includes("react") ||
          options.shared.includes("react-dom")
        ) {
          throw new Error(
            "Next does not support sharing 'react' or 'react-dom'. It must be re-exported or excluded from shared"
          );
        }
      } else if (Object.keys(options.shared).length > 0) {
        if (options.shared.react) {
          throw new Error(
            "Next does not support sharing 'react'. It must be re-exported or excluded from shared"
          );
        }
        if (options.shared["react-dom"]) {
          throw new Error(
            "Next does not support sharing 'react-dom'. It must be re-exported or excluded from shared"
          );
        }
      }
    }
  }
  return WithModuleFederation;
};

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const W5Plugins = config.plugins.filter((plugin) => {
        // not currently supported in Webpack 5
        return plugin.constructor.name !== "ReactFreshWebpackPlugin";
      });

      W5Plugins.push(new ModuleFederationPlugin(nextConfig));

      config.plugins = W5Plugins;

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

module.exports.moduleFederationPlugin = withModuleFederation;

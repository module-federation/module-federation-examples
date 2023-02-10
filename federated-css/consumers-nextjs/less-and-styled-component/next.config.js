const NextFederationPlugin = require('@module-federation/nextjs-mf/lib/NextFederationPlugin');
const mfConfig = require('./mf-plugin.config');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.module.rules.push(
          {
              test: /\.css$/,
              use: ["style-loader", "css-loader"],
          },
      );
      config.plugins.push(
        new NextFederationPlugin(mfConfig),
      );
    }
    return config;
  },
  // your original next.config.js export
  reactStrictMode: true,
};

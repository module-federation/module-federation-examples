const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const mfConfig = require('./mf-plugin.config');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      });

      config.plugins.push(new NextFederationPlugin(mfConfig));
    } else {
      config.externals = config.externals || [];
      config.externals.push(/^expose_/);
    }

    return config;
  },
  // your original next.config.js export
  reactStrictMode: true,
  eslint: {
    // Skip linting during CI builds/start to avoid legacy options failure and speed up startup
    ignoreDuringBuilds: true,
  },
};

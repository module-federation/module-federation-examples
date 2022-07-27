const { withFederatedSidecar } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
module.exports = withFederatedSidecar({
  name: 'host',
  remotes: {
    remote: 'remote@http://localhost:3001/remote.js'
  },
  shared: {},
})({
  webpack: (config, _options) => {
    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-mf/lib/federation-loader.js',
    });

    return config;
  },
});

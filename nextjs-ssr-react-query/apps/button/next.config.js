const { withNx } = require('@nrwl/next/plugins/with-nx');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const { dependencies } = require('../../package.json');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  /**
   *
   * @param {import('webpack').Configuration} config
   * @returns {import('webpack').Configuration}
   */
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'button',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {},
        extraOptions: {
          automaticAsyncBoundary: true,
        },
        exposes: {
          './Button': './components/Button/index.tsx',
        },
        shared: {
          'styled-components': {
            eager: true,
            singleton: true,
            requiredVersion: dependencies['styled-components'],
          },
        },
      })
    );

    return config;
  },
};

module.exports = withNx(nextConfig);

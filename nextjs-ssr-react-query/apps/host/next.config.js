const { withNx } = require('@nrwl/next/plugins/with-nx');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const { dependencies } = require('../../package.json');

const PLP_APP_URL =
  process.env.NEXT_PUBLIC_PLP_APP_URL || 'http://localhost:3001';

const HEADER_APP_URL =
  process.env.NEXT_PUBLIC_HEADER_APP_URL || 'http://localhost:3002';

const BUTTON_APP_URL =
  process.env.NEXT_PUBLIC_BUTTON_APP_URL || 'http://localhost:3003';

// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';

  return {
    plp: `plp@${PLP_APP_URL}/_next/static/${location}/remoteEntry.js`,
    header: `header@${HEADER_APP_URL}/_next/static/${location}/remoteEntry.js`,
    button: `button@${BUTTON_APP_URL}/_next/static/${location}/remoteEntry.js`,
  };
};

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  images: {
    domains: ['dummyjson.com', 'i.dummyjson.com'],
  },
  /**
   *
   * @param {import('webpack').Configuration} config
   * @returns {import('webpack').Configuration}
   */
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes(isServer),
        extraOptions: {
          automaticAsyncBoundary: true,
        },
        exposes: {},
        shared: {
          '@tanstack/react-query': {
            requiredVersion: false,
            singleton: true,
          },
          '@tanstack/query-core': {
            requiredVersion: false,
            singleton: true,
          },
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

const { withNx } = require('@nrwl/next/plugins/with-nx');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const { dependencies } = require('../../package.json');

const BUTTON_APP_URL =
  process.env.NEXT_PUBLIC_BUTTON_APP_URL || 'http://localhost:3003';

// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';

  return {
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
        name: 'plp',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes(isServer),
        extraOptions: {
          automaticAsyncBoundary: true,
        },
        exposes: {
          './ProductsPage': './pages/index.tsx',
          './ProductList': './components/ProductList/index.tsx',
          './ProductCard': './components/ProductCard/index.tsx',
        },
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

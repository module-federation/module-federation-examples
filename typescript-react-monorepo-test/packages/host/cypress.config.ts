const { defineConfig } = require('cypress');

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: async () => {
        const config = await import('./configs/webpack.cypress.js');
        return {
          ...config.default,
          devServer: {
            port: 9999,
          },
        };
      },
    },
  },
});

import appTools, { defineConfig } from '@modern-js/app-tools';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  server: {
    port: 3002,
  },
  dev: {
    // set publicPath
    assetPrefix: 'http://localhost:3002/',
  },
  runtime: {
    router: true,
  },
  source: {
    // automatically generated asynchronous boundary via Dynamic Import, allowing the page code to consume remote modules generated by the module federation.
    enableAsyncEntry: true,
  },
  tools: {
    webpack: (config, { webpack, appendPlugins }) => {
      appendPlugins([
        new webpack.container.ModuleFederationPlugin({
          name: 'app2',
          library: { type: 'window', name: 'app2' },
          runtime: false,
          filename: 'static/js/remoteEntry.js',
          exposes: {
            './Button': './src/components/Button.js',
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
          },
        }),
      ]);
    },
  },
  plugins: [appTools()],
});

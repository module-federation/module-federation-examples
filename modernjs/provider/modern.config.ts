import appTools, { defineConfig } from '@modern-js/app-tools';
import ChunkPatchPlugin from './ChunkPatchPlugin';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  dev: {
    // set publicPath
    assetPrefix: 'http://localhost:3002/',
  },
  source: {
    // automatically generated asynchronous boundary via Dynamic Import, allowing the page code to consume remote modules generated by the module federation.
    enableAsyncEntry: true,
  },
  server: {
    port: 3002,
  },
  tools: {
    webpack: (config, { webpack, appendPlugins }) => {
      //@ts-ignore
      config.output.publicPath = 'auto';
      appendPlugins([
        new webpack.container.ModuleFederationPlugin({
          name: 'provider',
          library: { type: 'var', name: 'provider' },
          filename: 'static/js/remoteEntry.js',
          exposes: {
            './Button': './src/components/Button',
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
          },
        }),
        // modern.js has default ChunkSplit strategy which will cause remoteEntry chunk can not load normally
        // user can config config.optimization?.splitChunks or delete config.optimization?.splitChunks and then use webpack default ChunkSplit strategy directly
        new ChunkPatchPlugin('provider'),
      ]);
      // modern.js set runtimeChunk true by default
      delete config.optimization?.runtimeChunk;
    },
  },
  plugins: [appTools()],
});

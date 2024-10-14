import { createModuleFederationConfig } from '@module-federation/modern-js';
export default createModuleFederationConfig({
  name: 'host',
  filename: 'remoteEntry.js',
  // exposes: {
  //   './Content': './src/entry-one/components/Content.tsx',
  // },
  remotes: {
    remote: 'remote@http://localhost:3061/mf-manifest.json',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});

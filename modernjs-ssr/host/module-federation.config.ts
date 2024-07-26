import { createModuleFederationConfig } from '@module-federation/modern-js';

export default createModuleFederationConfig({
  name: 'consumer',
  remotes: {
    remote: 'provider@http://localhost:3006/mf-manifest.json',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});

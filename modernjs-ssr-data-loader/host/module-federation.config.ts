import { createModuleFederationConfig } from '@module-federation/modern-js-v3';

export default createModuleFederationConfig({
  name: 'data_host',
  remotes: { remote: 'data_provider@http://127.0.0.1:3061/static/mf-manifest.json' },
  shared: {
    react: { singleton: true, requiredVersion: '18.3.1' },
    'react-dom': { singleton: true, requiredVersion: '18.3.1' },
  },
});

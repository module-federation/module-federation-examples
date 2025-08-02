import { createModuleFederationConfig } from '@module-federation/modern-js';

export default createModuleFederationConfig({
  name: 'app1',
  remotes: {
    app2: 'app2@http://localhost:3002/mf-manifest.json',
  },
  exposes: {
    './Button': './src/components/button.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
  dts: false,
});
import { createModuleFederationConfig } from '@module-federation/modern-js';

export default createModuleFederationConfig({
  name: 'app2',
  remotes: {
    app1: 'app1@http://localhost:3001/mf-manifest.json',
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
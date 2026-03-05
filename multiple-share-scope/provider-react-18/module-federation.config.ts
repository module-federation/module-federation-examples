import { createModuleFederationConfig } from '@module-federation/modern-js';

export default createModuleFederationConfig({
  name: 'provider18',
  exposes: {
    './LandingPage': './src/components/LandingPage.tsx',
  },
  shareScope:['react18','default'],
  shared: {
    react: {
      shareScope: 'react18',
      singleton: true,
    },
    'react-dom': {
      shareScope: 'react18',
      singleton: true,
    },
  },
});
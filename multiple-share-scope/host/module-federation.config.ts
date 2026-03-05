import { createModuleFederationConfig } from '@module-federation/modern-js';

export default createModuleFederationConfig({
  name: 'host',
  remotes: {
    provider17: {
      external: 'provider17@http://localhost:8081/mf-manifest.json',
    },
    provider18: {
      external: 'provider18@http://localhost:8082/mf-manifest.json',
      shareScope: ['react18', 'default'],
    },
  },
  shared: {
    react: {
      singleton: true,
      shareScope: 'react18',
    },
    'react-dom': {
      singleton: true,
      shareScope: 'react18',
    },
    react17: {
      shareKey: 'react',
      request: 'react17',
      shareScope: 'default',
      singleton: true,
    },
    'react-dom17': {
      shareKey: 'react-dom',
      request: 'react-dom17',
      shareScope: 'default',
      singleton: true,
    },
  },
});

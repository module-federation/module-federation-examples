import { createModuleFederationConfig } from '@module-federation/modern-js-v3';

export default createModuleFederationConfig({
  name: 'data_provider',
  manifest: { filePath: 'static' },
  filename: 'static/remoteEntry.js',
  dts: { generateTypes: { typesFolder: 'static/@mf-types' } },
  exposes: {
    './DataCard': './src/components/DataCard.tsx',
    './ClientDataCard': './src/components/ClientDataCard.tsx',
  },
  shared: {
    react: { singleton: true, requiredVersion: '18.3.1' },
    'react-dom': { singleton: true, requiredVersion: '18.3.1' },
  },
});

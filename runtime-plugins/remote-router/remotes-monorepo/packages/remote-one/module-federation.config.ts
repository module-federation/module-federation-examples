import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'remote-one',
  exposes: {
    './HelloWorld': './src/HelloWorld',
  },
  library: {
    name: 'remote_one',
    type: 'var'
  },
};

export default config;

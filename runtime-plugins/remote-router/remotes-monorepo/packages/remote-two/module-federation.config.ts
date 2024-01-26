import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'remote-two',
  exposes: {
    './Button': './src/Button',
  },
  library: {
    name: 'remote_two',
    type: 'var'
  },
};

export default config;

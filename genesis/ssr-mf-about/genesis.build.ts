import { Build } from '@fmfe/genesis-compiler';

import { ssr } from './genesis';

const start = () => {
  const build = new Build(ssr);
  return build.start();
};
start();

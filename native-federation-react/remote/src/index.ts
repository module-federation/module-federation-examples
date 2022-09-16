import { initFederation } from '@softarc/native-federation';

initFederation()
  .catch(err => console.error('err', err))
  .then(() => import('./app'))
  .catch(err => console.error('err', err));

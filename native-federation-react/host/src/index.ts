import { initFederation } from '@softarc/native-federation';

initFederation({
  remote: 'http://localhost:3001/remoteEntry.json',
})
  .catch(err => console.error('err', err))
  .then(() => import('./app'))
  .catch(err => console.error('err', err));

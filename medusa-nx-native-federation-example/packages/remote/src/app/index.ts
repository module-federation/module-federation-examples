import { initFederation, loadRemoteModule } from '@softarc/native-federation';

const reactAppMod = loadRemoteModule({
  remoteName: 'remote',
  exposedModule: './react-remote2222'
});

initFederation()
  .catch((err) => console.error('err', err))
  .then(() => import('./app'))
  .catch((err) => console.error('err', err));

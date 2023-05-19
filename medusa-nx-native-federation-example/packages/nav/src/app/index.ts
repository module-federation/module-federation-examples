import { initFederation } from '@softarc/native-federation';
import { loadRemoteEntryVersionsMemo } from 'native-federation-plugin/lib';

const getRemoteVersions = loadRemoteEntryVersionsMemo('remotes.json');

(async () => {
  const remotes = await getRemoteVersions();

  try {
    await initFederation({
      'dsl': remotes['dsl'] || 'http://localhost:3002/remoteEntry.json',
      'search': remotes['search'] || 'http://localhost:3004/remoteEntry.json',
      'utils': remotes['utils'] || 'http://localhost:3005/remoteEntry.json',
    });

    await import('./bootstrap');
  } catch(e) {
    throw new Error(`NativeFederationInitError: 'nav' app error: ${e}`);
  }
})();
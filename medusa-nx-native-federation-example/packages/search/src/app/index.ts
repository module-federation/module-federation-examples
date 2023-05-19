import { initFederation } from '@softarc/native-federation';
import { loadRemoteEntryVersionsMemo } from 'native-federation-plugin/lib';

export const getRemoteVersions = loadRemoteEntryVersionsMemo('remotes.json');

(async () => {
  const remotes = await getRemoteVersions();

  try {
    await initFederation({
      'home': remotes['home'] || 'http://localhost:3001/remoteEntry.json',
      'dsl': remotes['dsl'] || 'http://localhost:3002/remoteEntry.json',
      'nav': remotes['nav'] || 'http://localhost:3003/remoteEntry.json',
      'utils': remotes['utils'] || 'http://localhost:3005/remoteEntry.json',
    });

    await import('./bootstrap');
  } catch(e) {
    throw new Error(`NativeFederationInitError: 'search' app error: ${e}`);
  }
})();
import { initFederation } from '@softarc/native-federation';
import { loadRemoteEntryVersions } from 'native-federation-plugin/lib';

(async () => {
  const remotes = await loadRemoteEntryVersions('remotes.json');

  try {
    await initFederation({
      'dsl': remotes['dsl'] || 'http://localhost:3002/remoteEntry.json',
      'nav': remotes['nav'] || 'http://localhost:3003/remoteEntry.json',
      'search': remotes['search'] || 'http://localhost:3004/remoteEntry.json',
      'utils': remotes['utils'] || 'http://localhost:3005/remoteEntry.json',
    });

    await import('./bootstrap');
  } catch(e) {
    throw new Error(`NativeFederationInitError: 'home' app error: ${e}`);
  }
})();
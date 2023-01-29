import { initFederation } from '@softarc/native-federation';

(async () => {
  try {
    await initFederation({
      'dsl': 'http://localhost:3002/remoteEntry.json',
      'nav': 'http://localhost:3003/remoteEntry.json',
      'search': 'http://localhost:3004/remoteEntry.json',
      'utils': 'http://localhost:3005/remoteEntry.json',
    });
    
    await import('./bootstrap');
  } catch(e) {
    throw new Error(`NativeFederationInitError: 'home' app error: ${e}`); 
  }
})();
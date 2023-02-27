import { initFederation } from '@softarc/native-federation';

(async () => {
  try {
    await initFederation();
    await import('./bootstrap');
  } catch(e) {
    throw new Error(`NativeFederationInitError: 'dsl' app error: ${e}`);
  }
})();
import { initFederation } from '@softarc/native-federation';
import { sendAnalyticsMessage } from './analytics';

(async () => {
  try {
    await initFederation();
    sendAnalyticsMessage('sendAnalytics hello');
  } catch(e) {
    throw new Error(`NativeFederationInitError: 'utils' app error: ${e}`); 
  }
})();
import type { FederationRuntimePlugin } from '@module-federation/runtime/types';
import offlineRemotePlugin from './offline-remote.js';

export default offlineRemotePlugin as () => FederationRuntimePlugin;

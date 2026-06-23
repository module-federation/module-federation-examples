import type { FederationRuntimePlugin } from '@module-federation/runtime/types';
import pickRemotePlugin from './pick-remote.js';

export default pickRemotePlugin as () => FederationRuntimePlugin;

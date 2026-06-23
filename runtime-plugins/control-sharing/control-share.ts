import type {
  FederationRuntimePlugin,
} from '@module-federation/runtime/types';
import ControlScopeResolvePlugin from './control-share.js';

export default ControlScopeResolvePlugin as () => FederationRuntimePlugin;

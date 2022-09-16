import { createFederatedCatchAll } from '../../shared';

export default createFederatedCatchAll(process.env.REMOTES);

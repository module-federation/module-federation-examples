import { createFederatedCatchAll } from 'nextjs-shared';

export default createFederatedCatchAll(process.env.REMOTES);

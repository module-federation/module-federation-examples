import { createFederatedCatchAll } from 'nextjs-shared';

export default createFederatedCatchAll(['home', 'shop']);

import dynamic from 'next/dynamic';
const page = import('../realPages/[...slug]');

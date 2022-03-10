import { routes as about } from 'ssr-mf-about/src/routes';

import { routes as home } from '../routes';
import { createApp } from './create-app';

export default createApp([...home, ...about]);

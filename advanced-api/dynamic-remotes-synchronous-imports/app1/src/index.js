import { app2Module } from '../../moduleConfig';

window[app2Module.urlGlobalVariable] = app2Module.url;

import('./bootstrap');

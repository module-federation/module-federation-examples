import { RouteConfig } from 'vue-router';

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('./views/home.vue').then(m => m.default),
  },
];

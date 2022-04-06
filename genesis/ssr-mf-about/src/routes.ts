import { RouteConfig } from 'vue-router';

export const routes: RouteConfig[] = [
  {
    path: '/about',
    component: () => import('./views/about.vue').then(m => m.default),
  },
];

import React from 'react';

const AboutPage = React.lazy(() => import('./AboutPage'));

const routes = [
  {
    path: '/about',
    component: AboutPage,
  },
];

export default routes;

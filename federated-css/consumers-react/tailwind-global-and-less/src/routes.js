import React from 'react';
import consumedRoutes from './pages/consumed-routes';
const HomePage = React.lazy(() => import('./HomePage'));
const Combined = React.lazy(() => import('./combined-pages'));

const homeRoute = {
    path: '/',
    component: HomePage,
    exact: true,
};

const routes = [
    homeRoute,
    ...consumedRoutes,
    {
        path: 'combined',
        component: Combined,
    },
];

export default routes;

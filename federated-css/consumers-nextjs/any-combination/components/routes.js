import React from 'react';
import consumedRoutes from './pages/consumed-routes';

const homeRoute = {
    path: '/',
};

const routes = [
    homeRoute,
    ...consumedRoutes,
    {
        path: 'combined',
    },
];

export default routes;

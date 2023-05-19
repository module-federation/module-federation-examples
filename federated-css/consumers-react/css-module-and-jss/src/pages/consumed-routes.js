import React from 'react';
const Page1 = React.lazy(() => import('./consume-css-module-page'));
const Page2 = React.lazy(() => import('./consume-jss-page'));

const consumedRoutes = [
    {
        path: 'consume-css-module-page',
        component: Page1,
    },
    {
        path: 'consume-jss-page',
        component: Page2,
    }
];

export default consumedRoutes;

import React from 'react';
const Page1 = React.lazy(() => import('./consume-less-page'));
const Page2 = React.lazy(() => import('./consume-scss-page'));

const consumedRoutes = [
    {
        path: 'consume-less-page',
        component: Page1,
    },
    {
        path: 'consume-scss-page',
        component: Page2,
    }
];

export default consumedRoutes;

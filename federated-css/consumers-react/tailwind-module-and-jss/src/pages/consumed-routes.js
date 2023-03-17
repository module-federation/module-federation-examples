import React from 'react';
const Page1 = React.lazy(() => import('./consume-jss-page'));
const Page2 = React.lazy(() => import('./consume-tailwind-module-css-page'));

const consumedRoutes = [
    {
        path: 'consume-jss-page',
        component: Page1,
    },
    {
        path: 'consume-tailwind-module-css-page',
        component: Page2,
    }
];

export default consumedRoutes;

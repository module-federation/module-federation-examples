import React from 'react';
const Page0 = React.lazy(() => import('./consume-tailwind-module-css-page'));
const Page1 = React.lazy(() => import('./consume-jss-page'));
const Page2 = React.lazy(() => import('./consume-css-page'));
const Page3 = React.lazy(() => import('./consume-less-page'));
const Page4 = React.lazy(() => import('./consume-scss-page'));

const consumedRoutes = [
    {
        path: 'consume-tailwind-module-css-page',
        component: Page0,
    },
    {
        path: 'consume-jss-page',
        component: Page1,
    },
    {
        path: 'consume-css-page',
        component: Page2,
    },
    {
        path: 'consume-less-page',
        component: Page3,
    },
    {
        path: 'consume-scss-page',
        component: Page4,
    }
];

export default consumedRoutes;

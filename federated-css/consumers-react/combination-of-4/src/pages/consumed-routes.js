import React from 'react';
const Page0 = React.lazy(() => import('./consume-css-page'));
const Page1 = React.lazy(() => import('./consume-scss-page'));
const Page2 = React.lazy(() => import('./consume-less-page'));
const Page3 = React.lazy(() => import('./consume-tailwind-global-css-page'));

const consumedRoutes = [
    {
        path: 'consume-css-page',
        component: Page0,
    }, 
    {
        path: 'consume-scss-page',
        component: Page1,
    }, 
    {
        path: 'consume-less-page',
        component: Page2,
    }, 
    {
        path: 'consume-tailwind-global-css-page',
        component: Page3,
    }
];

export default consumedRoutes;

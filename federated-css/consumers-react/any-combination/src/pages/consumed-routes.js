import React from 'react';
const Page0 = React.lazy(() => import('./consume-scss-page'));
const Page1 = React.lazy(() => import('./consume-styled-component-page'));

const consumedRoutes = [
    {
        path: 'consume-scss-page',
        component: Page0,
    }, 
    {
        path: 'consume-styled-component-page',
        component: Page1,
    }
];

export default consumedRoutes;

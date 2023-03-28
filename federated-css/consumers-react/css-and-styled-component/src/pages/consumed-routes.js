import React from 'react';
const Page1 = React.lazy(() => import('./consume-css-page'));
const Page2 = React.lazy(() => import('./consume-styled-component-page'));

const consumedRoutes = [
    {
        path: 'consume-css-page',
        component: Page1,
    },
    {
        path: 'consume-styled-component-page',
        component: Page2,
    }
];

export default consumedRoutes;

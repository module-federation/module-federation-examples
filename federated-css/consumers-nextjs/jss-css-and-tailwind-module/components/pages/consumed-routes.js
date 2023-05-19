import React from 'react';
import Page0 from './consume-css-module-page';
import Page1 from './consume-jss-page';
import Page2 from './consume-tailwind-module-css-page';

const consumedRoutes = [
    {
        path: 'consume-css-module-page',
        component: Page0,
    }, 
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

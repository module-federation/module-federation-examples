import React from 'react';
import Page0 from './consume-css-page';
import Page1 from './consume-scss-page';
import Page2 from './consume-less-page';
import Page3 from './consume-tailwind-global-css-page';

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

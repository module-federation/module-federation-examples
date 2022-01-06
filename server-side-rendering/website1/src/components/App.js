import React from 'react';
import loadable from '@loadable/component';

// eslint-disable-next-line
const SomeComponent = loadable(() => import('website2/SomeComponent'));

export default () => (
  <div>
    <h1 onClick={() => alert('website1 is interactive')}>This is website 1</h1>
    <SomeComponent />
  </div>
);

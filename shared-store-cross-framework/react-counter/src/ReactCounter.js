import React from 'react';
import { createApi } from 'effector';

import $counter from 'store/Counter';

import Layout from './components/Layout';
import Button from './components/Button';

const { increment, decrement } = createApi($counter, {
  increment: state => state + 1,
  decrement: state => state - 1,
});

const ReactCounter = () => (
  <Layout>
    <div>
      <Button data-e2e="DECREMENT_BUTTON" onClick={decrement}>-</Button>
      <Button data-e2e="INCREMENT_BUTTON" onClick={increment}>+</Button>
    </div>
  </Layout>
);

export default ReactCounter;

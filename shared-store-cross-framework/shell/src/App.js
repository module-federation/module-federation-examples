import React from 'react';
import { useStore } from 'effector-react';

import $counter from 'store/Counter';

import Container from './components/Container';
import Layout from './components/Layout';
import Label from './components/Label';
import Counter from './components/Counter';

const ReactCounter = React.lazy(() => import('react_counter/ReactCounter'));
const VueCounter = React.lazy(() => import('./WrappedVueCounter'));

const App = () => {
  const counter = useStore($counter);

  return (
    <Container className="main">
      <Label>Shell</Label>
      <Layout>
        <Container data-e2e="REMOTE_REACT__BUTTONS_BLOCK_MODULE">
          <Label>Remote React module</Label>
          <React.Suspense fallback="Loading ReactCounter">
            <ReactCounter />
          </React.Suspense>
        </Container>
        <Counter data-e2e="CLICKS_COUNTER">{counter}</Counter>
        <Container data-e2e="REMOTE_VUE__BUTTONS_BLOCK_MODULE">
          <Label>Remote Vue module</Label>
          <React.Suspense fallback="Loading VueCounter">
            <VueCounter />
          </React.Suspense>
        </Container>
      </Layout>
    </Container>
  );
};

export default App;

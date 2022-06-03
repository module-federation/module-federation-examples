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
        <Container>
          <Label>Remote React module</Label>
          <React.Suspense fallback="Loading ReactCounter">
            <ReactCounter />
          </React.Suspense>
        </Container>
        <Counter>{counter}</Counter>
        <Container>
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

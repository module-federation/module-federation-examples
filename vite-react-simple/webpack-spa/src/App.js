import LocalButton from './Button';
import React from 'react';

import Button from './Button';
const Header = React.lazy(() => import('rollup_spa/Header'));

const App = () => (
  <div>
    <React.Suspense fallback={<div>Loading the header</div>}>
      <Header />
    </React.Suspense>
    <h1>Webpack Remote</h1>

    <Button />
  </div>
);

export default App;

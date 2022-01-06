import React from 'react';

const Button = React.lazy(() => import('foo_app1/Button'));
const Header = React.lazy(() => import('foo_rollup_spa/Header'));

const App = () => {
  return (
    <React.Suspense fallback="Loading App...">
      <Header />
      <h1>Rollup Host</h1>
      <Button />
    </React.Suspense>
  );
};

export default App;

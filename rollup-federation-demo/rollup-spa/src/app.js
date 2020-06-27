import React from 'react';

const Button = React.lazy(() => import('foo/Button'));

const App = () => {
  return (
    <React.Suspense fallback="Loading App...">
      <Button />
    </React.Suspense>
  )
};

export default App;

import React from 'react';

const RemoteButton = React.lazy(() => import('app1/Button'));

const style = {
  padding: 12,
  backgroundColor: '#cccccc',
};

const ButtonContainer = () => (
  <div style={style}>
    App 2 Container
    <br />
    <br />
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
    </React.Suspense>
  </div>
);

export default ButtonContainer;

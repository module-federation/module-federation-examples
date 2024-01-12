import * as React from 'react';

//@ts-ignore
const RemoteButton = React.lazy(() => import('app2/Button'));

const Components = () => (
  <React.Suspense fallback="Loading Button">
    <RemoteButton />
  </React.Suspense>
);

export default Components;
